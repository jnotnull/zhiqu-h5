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

const ChatList = ({ chatlist }) => (
  <ul className={styles.directChatMessages}>
    {chatlist.map(chat => (
      <li key={chat.row_id.mostSignificantBits}>
        <Chat chat={chat} />
      </li>
    ))}
  </ul>
);

ChatList.propTypes = propTypes;
ChatList.defaultProps = defaultProps;

export default ChatList;
