// src/App.jsx
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import Login from './components/Login';
import Register from './components/Register';
import ChatBox from './components/ChatBox'; // এইটা পরের ধাপে বানাবো

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  if (user) {
    return (
      <div>
        <h2>Welcome, {user.email}</h2>
        <button onClick={() => signOut(auth)}>Logout</button>
        <ChatBox user={user} />
      </div>
    );
  }

  return showLogin
    ? <Login onSwitch={() => setShowLogin(false)} />
    : <Register onSwitch={() => setShowLogin(true)} />;
}

export default App;
