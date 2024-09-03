import React from 'react';
import axios from 'axios';

const TheirMessage = ({ lastMessage, message }) => {
  // Check if this is the first message by the user in a series
  const isFirstMessageByUser = !lastMessage || lastMessage.sender.username !== message.sender.username;

  // Function to fetch the avatar from your API if necessary
  const fetchAvatar = async (userId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/users/${userId}/avatar/`);
      return response.data.avatar_url;
    } catch (error) {
      console.error('Error fetching avatar:', error);
      return null;
    }
  };

  // Optionally, you could replace the inline avatar URL fetching logic
  const avatarUrl = message.sender && message.sender.avatar ? message.sender.avatar : fetchAvatar(message.sender.id);

  return (
    <div className="message-row">
      {/* Render avatar if this is the first message in a series */}
      {isFirstMessageByUser && avatarUrl && (
        <div
          className="message-avatar"
          style={{ backgroundImage: `url(${avatarUrl})` }}
        />
      )}

      {/* Render image if the message contains an attachment */}
      {message.attachments && message.attachments.length > 0 ? (
        <img
          src={message.attachments[0].file} // URL to the attached image
          alt="message-attachment"
          className="message-image"
          style={{ marginLeft: isFirstMessageByUser ? '4px' : '48px' }} // Conditional margin for alignment
        />
      ) : (
        // Render text if there is no attachment
        <div
          className="message"
          style={{
            float: 'left',             // Align message to the left
            backgroundColor: '#CABCDC', // Light background color for the message bubble
            marginLeft: isFirstMessageByUser ? '4px' : '48px', // Conditional margin for alignment
            padding: '10px',           // Add padding inside the bubble
            borderRadius: '10px',       // Rounded corners for the bubble
            maxWidth: '60%',            // Restrict the maximum width of the message bubble
            wordWrap: 'break-word',     // Allow breaking of words to fit inside the bubble
          }}
        >
          {message.text} // Display the message text
        </div>
      )}
    </div>
  );
};

export default TheirMessage;
