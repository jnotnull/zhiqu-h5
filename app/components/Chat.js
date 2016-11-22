import React, { PropTypes } from 'react';

const propTypes = {
  name: PropTypes.string,
  username: PropTypes.string
};

const Chat = ({ name, username }) => (
  <div className="friend-thumbnail">
    <h4>{name} <span className="username">{username}</span></h4>
  </div>
);

Chat.propTypes = propTypes;
export default Chat;
