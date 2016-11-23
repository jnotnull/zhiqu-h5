import pathToRegexp from 'path-to-regexp';
import {isMeet} from '../common/utils';

export default {
  namespace: 'essence',
  state: {
    query: '',
    chatlist: [],
    currentpage: 1,
    loading: false
  },
  subscriptions: {
    setup({ dispatch, history, state, props}) {
      history.listen(({ pathname }, state) => {
        if (pathToRegexp('/essence/:id').test(pathname)) {

          //TODO 当前dva没法在subscriptions中通过其他方式获得url参数，已经提bug
          var pathnameArr = pathname.split("/");
          if (pathnameArr.length > 2) {
            dispatch({
              type: 'setQuery',
              payload: pathnameArr[2]
            });
          }

        }
      });

      // 滚动加载
      window.addEventListener('scroll', function(){
        
        // 判断是否在可视区域内
        var result = isMeet(document.getElementById("loading"));

        if (result) {
          dispatch({
            type: 'loadMore',
            payload: null
          });
        }
      });
    }
  },
  effects: {
    setQuery: [function*({ payload }, { put, call, select }) {

      // 获得当前页码
      const currentpage = yield select(({ essence }) => essence.currentpage);

      const { success, data } = yield fetch(`/api/search?q=${payload}&currentpage=${currentpage}`)
        .then(res => res.json());
      if (success) {
        yield put({
          type: 'setChatlist',
          payload: data,
        });

        // 页码+1
        yield put({
          type: 'setCurrentpage',
          payload: currentpage + 1,
        });
      }

    }, { type: 'takeLatest' }],

    loadMore: [function*({ payload }, { put, call, select }) {

      // 如果正在加载则返回
      const loading = yield select(({ essence }) => essence.loading);
      if (loading) {
        return false;
      }

      yield put({
        type: 'setLoading',
        payload: true,
      });

      // 获得当前页码和请求参数
      const currentpage = yield select(({ essence }) => essence.currentpage);
      const query = yield select(({ essence }) => essence.query);

      const { success, data } = yield fetch(`/api/search?q=${query}&currentpage=${currentpage}`)
        .then(res => res.json());
      if (success) {
        yield put({
          type: 'setChatlist',
          payload: data,
        });

        // 页码+1
        yield put({
          type: 'setCurrentpage',
          payload: currentpage + 1,
        });
      }

      // 加载完成
      yield put({
        type: 'setLoading',
        payload: false,
      });

    }, { type: 'takeLatest' }],
  },
  reducers: {
    setQuery(state, { payload }) {
      return { ...state, query: payload };
    },
    setCurrentpage(state, { payload }) {
      return { ...state, currentpage: payload };
    },
    setChatlist(state, { payload }) {
      return { ...state, chatlist: state.chatlist.concat(payload) };
    },
  }
}