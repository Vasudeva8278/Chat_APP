import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ChatWindow() {
  const [messages, setMessages] = useState([
    { sender: 'Alice', text: 'Hey, how are you?' },
    { sender: 'You', text: 'I am good, thanks!' },
    // Add more messages as needed
  ]);

  return (
    <div className="d-flex flex-column p-3" style={{ flex: 1, height: '100vh', overflowY: 'auto' }}>
      <div className="container-fluid">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`row mb-3 ${message.sender === 'You' ? 'justify-content-end' : ''}`}
          >
            <div
              className={`col-12 col-md-auto p-2 ${message.sender === 'You' ? 'bg-primary text-white' : 'bg-light'} rounded`}
              style={{ maxWidth: '70%' }}
            >
              <strong>{message.sender}: </strong>{message.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
