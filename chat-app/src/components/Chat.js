import FriendsList from './FriendsList';
import ChatWindow from './ChatWindow';

export default function Chat() {
  return (
    <div style={{ display: 'flex' }}>
      <FriendsList />
      <ChatWindow />
    </div>
  );
}
