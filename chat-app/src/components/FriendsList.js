import { useState } from 'react';


export default function FriendsList() {
  const [friends] = useState([
    { name: 'Vasudev', photo: 'assest/images/one.jpg' },
    { name: 'Lahari', photo: '/images/lahari.jpg' },
    { name: 'Preethi', photo: '/images/preethi.jpg' },
    { name: 'Prasanthi', photo: '/images/prasanthi.jpg' },
    { name: 'Ganesh', photo: '/images/ganesh.jpg' },
    { name: 'Priya', photo: '/images/priya.jpg' },
    { name: 'Prasanna', photo: '/images/prasanna.jpg' }
    // Add more friends as needed
  ]);

  const [selectedFriend, setSelectedFriend] = useState(null);
  const [message, setMessage] = useState('');

  const user = { name: 'Your Name', photo: '/images/your-photo.jpg' }; // Replace with actual user data

  const handleFriendClick = (friend) => {
    setSelectedFriend(friend);
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendClick = () => {
    // Placeholder for sending message (no server interaction)
    console.log('Message sent:', message);
    setMessage(''); // Clear message input after sending
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '250px', overflowX: 'auto', whiteSpace: 'nowrap', borderRight: '1px solid #ddd' }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '10px', borderBottom: '1px solid #ddd' }}>
          <img
            src={user.photo}
            alt={`${user.name}'s profile`}
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              marginRight: '10px'
            }}
          />
          <h4 style={{ margin: 0 }}>{user.name}</h4>
        </div>
        {friends.map((friend, index) => (
          <div
            key={index}
            onClick={() => handleFriendClick(friend)}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px',
              cursor: 'pointer',
              backgroundColor: friend.name === selectedFriend?.name ? '#e9ecef' : 'transparent',
              borderRadius: '4px'
            }}
          >
            <img
              src={friend.photo}
              alt={`${friend.name}'s profile`}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                marginRight: '10px'
              }}
            />
            {friend.name}
          </div>
        ))}
      </div>

      <div style={{ flex: 1, padding: '20px', borderLeft: '1px solid #ddd' }}>
        {selectedFriend ? (
          <div>
            <h5>Chat with {selectedFriend.name}</h5>
            <div style={{ border: '1px solid #ddd', borderRadius: '4px', padding: '10px', height: '300px', overflowY: 'auto' }}>
              {/* Chat messages would be displayed here */}
              <p>No messages yet.</p>
            </div>
            <div style={{ display: 'flex', marginTop: '10px' }}>
              <input
                type="text"
                value={message}
                onChange={handleInputChange}
                placeholder="Type a message"
                style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
              />
              <button
                onClick={handleSendClick}
                style={{ marginLeft: '10px', padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#007bff', color: '#fff' }}
              >
                Send
              </button>
            </div>
          </div>
        ) : (
          <p>Select a friend to start chatting.</p>
        )}
      </div>
    </div>
  );
}
