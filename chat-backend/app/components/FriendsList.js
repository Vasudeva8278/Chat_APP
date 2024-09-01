export default function FriendsList({ onSelectFriend }) {
    const friends = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
      { id: 3, name: 'Alice Johnson' },
    ];
  
    return (
      <div className="friends-list">
        {friends.map((friend) => (
          <div
            key={friend.id}
            className="friend-item"
            onClick={() => onSelectFriend(friend)}
          >
            {friend.name}
          </div>
        ))}
        <style jsx>{`
          .friends-list {
            width: 30%;
            border-right: 1px solid #ddd;
            padding: 10px;
            overflow-y: auto;
          }
          .friend-item {
            padding: 10px;
            border-bottom: 1px solid #ddd;
            cursor: pointer;
          }
        `}</style>
      </div>
    );
  }
  