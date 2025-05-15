import React, { useState } from 'react';

function Login({ setUser }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(username); 
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex">
      <input
        type="text"
        placeholder="Username"
        className="form-control me-2"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit" className="btn btn-success">Login</button>
    </form>
  );
}

export default Login;