import React, { PropTypes } from 'react';
import styles from './index.less';

const propTypes = {
};

// 常量定义
const weekArr = ["星期日", "星期一","星期二","星期三","星期四","星期五","星期六"];
const noNickname = '未知';
const defaultImg = "http://www.funthinker.cn:8090/CTY_analyze/images/default.jpg";

// 帮组类
var helpers = {
	getImg: function(img) {
		if (img.indexOf("/CTY_analyze/images/default.jpg") > -1) {
		  	return defaultImg;
		}
		return img;
	},

	getWeek: function(dateStr) {
		return weekArr[new Date(dateStr).getDay()];
	},

	getNickname : function(nickname) {
		if (!nickname) {
			return noNickname;
		}
		return nickname;
	},

	isRightClass: function(rightClass) {
		if (rightClass) {
			return styles.right;
		}

		return '';
	},

	isChatNamePullRightClass: function(rightClass) {
		if (rightClass) {
			return styles.pullRight;
		}

		return '';
	},

	isChatTimesStampPullRightClass: function(rightClass) {
		if (!rightClass) {
			return styles.pullRight;
		}

		return '';
	},

	rightTextClass: function(rightClass) {
		if (rightClass) {
			return styles.rightTextClass;
		}

		return '';
	},

	getChatTextBackground: function(type, content) {
		var result = {};
		if (type == '9999' || type == '10000' || type == '10002'){
			result = {background: '#CCDAF5'};
		}
		return result;
	},

	formatContent: function(content, type) {

		var map = {
			"49": function(content) {// 分享链接
				var content = content.split(",")
				var title = content[0];
				var url = content[1];
				return '<div title="' + title + '" url="' + url + '"><a class="box2" href="' + url +'" target="_blank">' + title + '</a></div>';
			},
			
			"3": function(content) { // 图片
				return '<div><img id="photosImg" src="http://114.55.141.110:8888/wx/image/' + content.replace("THUMBNAIL_DIRPATH://",'') + '"></div>';
			},

			"34": function(content) { // 声音
				return '<audio controls="controls" id="source_' + math.random() + '">'
		         + '<source src="http://114.55.141.110:8888//wx/voice/msg_' + content + '.mp3" type="audio/mpeg">'
		    	 + '</audio>';
			}
		}

		var result = content;

		if (result.length > 80) {
			result = result.substring(0, 80) + "...";
		}
		if (typeof map[type] != 'undefined') {
			result = map[type].apply(this, [content]);
		}

		return {"__html": result};
		
		// var sysColorStyle = "";
		// if (item.type == '9999' ||item.type == '10000' ||item.type == '10002'){
		// 	sysColorStyle = "background:#CCDAF5";
		// }
	}
}

// var name = item.nickname;
// if(typeof(item.nickname) == "undefined"||item.nickname==""||item.nickname==null){
// 	name = "未知";
// }

// if(lastName != name && lastName != ""){
// 		if(lastClass == '' && (item.type != '9999' && item.type != '10000' && item.type != '10002')){
// 	 		rightClass = "right";
// 		}else{
// 			rightClass = "";
// 		}
// 	}else if(lastName == name && lastName != ""){
// 		rightClass = lastClass;
// 	}

// UI
const Chat = ({chat, rightclass}) => (
  <div className={styles.directChatMsg + " " + helpers.isRightClass(rightclass)}>
  	<div className={styles.directChatInfo + " " + styles.clearfix}>
  		<span className={styles.directChatName + " " + helpers.isChatNamePullRightClass(rightclass)} id="nickName">{[helpers.getNickname(chat.nickname)]}</span>
  		<span className={styles.directChatTimestamp + " " + helpers.isChatTimesStampPullRightClass(rightclass)}>{chat.update_time}{helpers.getWeek(chat.updated_time.time)}</span>
    </div>
    <img className={styles.directChatImg} src={[helpers.getImg(chat.img_path)]} alt="message user image"/>
    <div className={styles.directChatText + " " + helpers.rightTextClass(rightclass)} style={helpers.getChatTextBackground(chat.type, chat.content)} dangerouslySetInnerHTML={helpers.formatContent(chat.content, chat.type)}></div>
  </div>
);

Chat.propTypes = propTypes;
export default Chat;