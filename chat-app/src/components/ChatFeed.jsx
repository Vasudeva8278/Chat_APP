import { useEffect, useState } from 'react';
import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage';
import MessageForm from './MessageForm';
import axios from 'axios';

const ChatFeed = ({ chats = [], activeChat, userName, messages = {}, setMessages }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ensure `activeChat` is valid and `chats` is an array
  const chat = Array.isArray(chats) ? chats.find(chat => chat.id === activeChat) : null;

  useEffect(() => {
    const fetchMessages = async () => {
      if (chat) {
        try {
          setLoading(true);
          const { data } = await axios.get(`http://127.0.0.1:8000/api/chatrooms/${chat.id}/messages/`);
          setMessages(data);
          setError(null);
        } catch (error) {
          console.error('Error fetching messages:', error);
          setError('Error fetching messages');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchMessages();
  }, [chat, setMessages]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!chat) return <div>No chat found</div>;

  const renderReadReceipts = (message, isMyMessage) => chat.people.map((person, index) => person.last_read === message.id && (
    <div
      key={`read_${index}`}
      className="read-receipt"
      style={{
        float: isMyMessage ? 'right' : 'left',
        backgroundImage: person.person.avatar ? `url(${person.person.avatar})` : 'none',
      }}
    />
  ));

  const renderMessages = () => {
    const keys = Object.keys(messages);

    return keys.map((key, index) => {
      const message = messages[key];
      const lastMessageKey = index === 0 ? null : keys[index - 1];
      const isMyMessage = userName === message.sender.username;

      return (
        <div key={`msg_${index}`} style={{ width: '100%' }}>
          <div className="message-block">
            {isMyMessage
              ? <MyMessage message={message} />
              : <TheirMessage message={message} lastMessage={messages[lastMessageKey]} />}
          </div>
          <div className="read-receipts" style={{ marginRight: isMyMessage ? '18px' : '0px', marginLeft: isMyMessage ? '0px' : '68px' }}>
            {renderReadReceipts(message, isMyMessage)}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="chat-feed">
      <div className="chat-title-container">
        <div className="chat-title">{chat.title}</div>
        <div className="chat-subtitle">
          {chat.people.map((person) => ` ${person.person.username}`)}
        </div>
      </div>
      {renderMessages()}
      <div style={{ height: '100px' }} />
      <div className="message-form-container">
        <MessageForm chatId={activeChat} />
      </div>
    </div>
  );
};

export default ChatFeed;
