import React, { PropTypes } from 'react';
import styles from './index.less';

const propTypes = {
};

function getImg(img) {
  if (img.indexOf("/CTY_analyze/images/default.jpg") > -1) {
  	return "http://www.funthinker.cn:8090/CTY_analyze/images/default.jpg"
  }
  return img;
}

const weekArr = ["星期日", "星期一","星期二","星期三","星期四","星期五","星期六"];
function getweek(dateStr) {
	return weekArr[new Date(dateStr).getDay()];
}

const Chat = ({chat}) => (
  <div className={styles.directChatMsg}>
  	<div className={styles.directChatInfo + " " + styles.clearfix}>
  		<span className={styles.directChatName + " " } id="nickName">未知</span>
  		<span className={styles.directChatTimestamp + " " + styles.pullRight}>{chat.update_time}{getweek(chat.updated_time.time)}</span>
    </div>
    <img className={styles.directChatImg} src={[getImg(chat.img_path)]} alt="message user image"/>
    <div className={styles.directChatText} style={{background: '#CCDAF5'}}>{chat.content}</div>
  </div>
);

Chat.propTypes = propTypes;
export default Chat;