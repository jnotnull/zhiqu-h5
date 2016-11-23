import React, { PropTypes } from 'react';
import Chat from './Chat';
import styles from './index.less';

const propTypes = {
  chatlist: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string.isRequired
  }))
};

const defaultProps = {
  chatlist: []
};

var lastNickname = "";
var rightClass = false;

const ChatList = ({ chatlist }) => (
  <ul className={styles.directChatMessages}>
    {chatlist.map( (chat) => {
      var nickname = chat.nickname;

      // flat数据
      if (typeof nickname == 'undefined') {
        nickname = "";
      }

      // 进行取反
      if (nickname != lastNickname) {
        rightClass = !rightClass;
      }

      // 重置给下次使用
      lastNickname = nickname;

      return <li key={chat.row_id.mostSignificantBits}>
        <Chat chat={chat} rightclass={rightClass}/>
      </li>
    })}
  </ul>
);

ChatList.propTypes = propTypes;
ChatList.defaultProps = defaultProps;

export default ChatList;
