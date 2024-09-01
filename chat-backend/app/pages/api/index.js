import { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';

interface Friend {
  id: number;
  name: string;
}

interface Message {
  from: string;
  message: string;
}

let socket: Socket;

export default function Home() {
  const [friends] = useState<Friend[]>([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alice Johnson' },
  ]);

  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socketInitializer();
  }, []);

  useEffect(() => {
    if (selectedFriend) {
      setMessages([]); // Clear messages when selecting a new friend
    }
  }, [selectedFriend]);

  const socketInitializer = async () => {
    await fetch('/api/socket');
    socket = io();

    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on('chat message', (msg: Message) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
  };

  const selectFriend = (friend: Friend) => {
    setSelectedFriend(friend);
  };

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() && selectedFriend) {
      const newMessage = { message, from: 'You' };
      socket.emit('chat message', { ...newMessage, to: selectedFriend.id });
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="left-side">
        <div className="friends-list">
          {friends.map((friend) => (
            <div
              key={friend.id}
              className={`friend-item ${
                selectedFriend?.id === friend.id ? 'selected' : ''
              }`}
              onClick={() => selectFriend(friend)}
            >
              {friend.name}
            </div>
          ))}
        </div>
      </div>
      <div className="right-side">
        {selectedFriend ? (
          <div className="chat-window">
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
          </div>
        ) : (
          <div>Please select a friend to chat with</div>
        )}
      </div>
      <style jsx>{`
        .chat-container {
          display: flex;
          height: 100vh;
        }
        .left-side {
          width: 30%;
          border-right: 1px solid #ddd;
          padding: 10px;
          overflow-y: auto;
        }
        .right-side {
          width: 70%;
          padding: 10px;
        }
        .friends-list {
          display: flex;
          flex-direction: column;
        }
        .friend-item {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          cursor: pointer;
        }
        .friend-item.selected {
          background-color: #e0e0e0;
        }
        .chat-window {
          display: flex;
          flex-direction: column;
          height: 100%;
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
