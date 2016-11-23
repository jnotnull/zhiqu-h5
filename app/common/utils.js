export default {

  // 判断是否在可视区域内
  isMeet: function(el) {
    var result = false;
    var bcr = el.getBoundingClientRect(); //取得元素在可视区的位置

    var mw = el.offsetWidth; //元素自身宽度
    var mh = el.offsetHeight; //元素自身的高度
    var w = window.innerWidth; //视窗的宽度
    var h = window.innerHeight; //视窗的高度
    var boolY = (!((bcr.bottom) <= 0 && ((bcr.top + mh)) <= 0) && !((bcr.top) >= h && (bcr.bottom) >= (mh + h))); //上下符合条件
    if (boolY) {
        result = true;
    }

    return result;
  }
}
