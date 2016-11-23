import React from 'react';
import { connect } from '../common/index';

// 本地库
import styles from './essence.less';
import ChatList from '../components/ChatList';

const Appview = (props) => {
  return (
    <div>
      <ChatList chatlist={props.chatlist} />

      <div id="loading" className={styles.loading}><span></span>客官，正在加载，请稍等...</div>
      <div className={styles.loading}><span></span>客官，没有更多了/(ㄒoㄒ)/~~</div>
    </div>
  );
} 

export default connect(
({ essence }) => ({
  query: essence.query,
  chatlist: essence.chatlist,
})
)(Appview);
