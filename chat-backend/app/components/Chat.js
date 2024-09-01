import { useState } from 'react';
import FriendsList from './FriendsList';
import ChatWindow from './Chatwindow';

export default function Chat() {
  const [selectedFriend, setSelectedFriend] = useState(null);

  return (
    <div className="chat-container">
      <FriendsList onSelectFriend={setSelectedFriend} />
      <ChatWindow selectedFriend={selectedFriend} />
      <style jsx>{`
        .chat-container {
          display: flex;
          height: 100vh;
        }
      `}</style>
    </div>
  );
}
