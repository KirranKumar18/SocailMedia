import './HomePage.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function HomePage() {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');

  // Fetch messages from backend
  const fetchMessages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/school/group123/messages');
      setMessages(res.data);
    } catch (err) {
      console.error("❌ Error fetching messages:", err);
    }
  };

  // Send a message to backend
  const sendMessage = async () => {
    if (newMsg.trim() === '') return;
    try {
      await axios.post('http://localhost:5000/messages', {
        sender: "kirran",           // you can replace this dynamically
        text: newMsg,
        groupId: "group123"
      });
      setNewMsg('');
      fetchMessages(); // re-fetch after sending
    } catch (err) {
      alert("Error sending message: " + err.message);
    }
  };

  // Fetch messages on page load
  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <>
      <div className="parent">
        <div className="left">
          <h1>left</h1>
          <button className='Hp-btn'>New Chat</button>
        </div>

        <div className='main-holder'>
          <div className="top">
            <h1>GROUP CHAT</h1>
          </div>
          <hr />

          <div className="main">
            {messages.map((msg, index) => (
              <div key={index} className="message">
                <strong>{msg.sender}:</strong> {msg.text}
              </div>
            ))}
          </div>

          <div className="input-box">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </>
  );
}
