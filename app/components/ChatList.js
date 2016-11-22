import React, { PropTypes } from 'react';
import Chat from './Chat';

const propTypes = {
  friends: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }))
};

const defaultProps = {
  chatlist: []
};

const ChatList = ({ chatlist }) => (
  <ul className="friend-list">
    {chatlist.map(chat => (
      <li key={chat.id}>
        <Chat username={chat.username} name={chat.name} />
      </li>
    ))}
  </ul>
);

ChatList.propTypes = propTypes;
ChatList.defaultProps = defaultProps;

export default ChatList;
