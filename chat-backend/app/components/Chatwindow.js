import { useState, useEffect } from 'react';
import io from 'socket.io-client';

let socket;

export default function ChatWindow({ selectedFriend }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (selectedFriend) {
      setMessages([]); // Clear messages when a new friend is selected
      socketInitializer();
    }
  }, [selectedFriend]);

  const socketInitializer = async () => {
    await fetch('/api/socket');
    socket = io();

    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && selectedFriend) {
      const newMessage = { message, from: 'You', to: selectedFriend.id };
      socket.emit('chat message', newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage('');
    }
  };

  return (
    <div className="chat-window">
      {selectedFriend ? (
        <>
          <h2>Chat with {selectedFriend.name}</h2>
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index}>
                <strong>{msg.from}:</strong> {msg.message}
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage}>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <button type="submit">Send</button>
          </form>
        </>
      ) : (
        <div>Please select a friend to chat with</div>
      )}
      <style jsx>{`
        .chat-window {
          width: 70%;
          padding: 10px;
          display: flex;
          flex-direction: column;
        }
        .chat-messages {
          flex-grow: 1;
          overflow-y: auto;
          border-bottom: 1px solid #ddd;
        }
        form {
          display: flex;
          margin-top: 10px;
        }
        input {
          flex-grow: 1;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        button {
          padding: 10px 20px;
          margin-left: 10px;
          border: none;
          background-color: #007bff;
          color: white;
          border-radius: 4px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
