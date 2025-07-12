// src/components/ChatBox.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, push, onValue } from 'firebase/database';

const ChatBox = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');

  // Load messages in real-time
  useEffect(() => {
    const messagesRef = ref(db, 'messages');
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedMessages = data ? Object.values(data) : [];
      setMessages(loadedMessages);
    });
  }, []);

  // Send message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMsg.trim() === '') return;

    const messageData = {
      text: newMsg,
      sender: user.email,
      timestamp: Date.now(),
    };

    await push(ref(db, 'messages'), messageData);
    setNewMsg('');
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatArea}>
        {messages.map((msg, index) => (
          <div key={index} style={{
            ...styles.message,
            backgroundColor: msg.sender === user.email ? '#dcf8c6' : '#fff'
          }}>
            <strong>{msg.sender}:</strong> {msg.text}
            <div style={styles.time}>{new Date(msg.timestamp).toLocaleTimeString()}</div>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} style={styles.form}>
        <input
          type="text"
          placeholder="Type a message"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Send</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '10px',
  },
  chatArea: {
    height: '400px',
    overflowY: 'auto',
    padding: '10px',
    background: '#f5f5f5',
    marginBottom: '10px',
  },
  message: {
    padding: '8px',
    marginBottom: '5px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  time: {
    fontSize: '0.8rem',
    color: '#555',
  },
  form: {
    display: 'flex',
    gap: '5px',
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 15px',
    fontSize: '1rem',
    borderRadius: '5px',
    background: '#4caf50',
    color: '#fff',
    border: 'none',
  }
};

export default ChatBox;
