const MyMessage = ({ message }) => {
  // Check if the message contains any attachments (like images or files)
  if (message.attachments && message.attachments.length > 0) {
    return (
      <img
        src={message.attachments[0].file} // Display the attached image
        alt="message-attachment"
        className="message-image"
        style={{ float: 'right' }} // Align the image to the right
      />
    );
  }

  // If there are no attachments, display the message text
  return (
    <div
      className="message"
      style={{
        float: 'right',          // Align the text to the right
        marginRight: '18px',     // Add some margin to the right for spacing
        color: 'white',          // Set the text color to white
        backgroundColor: '#3B2A50', // Background color for the message bubble
        padding: '10px',         // Add some padding inside the message bubble
        borderRadius: '10px',    // Rounded corners for the message bubble
        maxWidth: '60%',         // Restrict the maximum width of the message bubble
        wordWrap: 'break-word',  // Allow breaking of words to fit inside the bubble
      }}
    >
      {message.text} // Display the message text
    </div>
  );
};

export default MyMessage;
