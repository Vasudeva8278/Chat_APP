import Chat from '../components/Chat';
import FriendsList from '../components/FriendsList';
import ChatWindow from '../components/ChatWindow';

export default function HomePage() {
  return (
    <div className="chat-container">
      <FriendsList />
      <ChatWindow />
      <Chat />
    </div>
  );
}
