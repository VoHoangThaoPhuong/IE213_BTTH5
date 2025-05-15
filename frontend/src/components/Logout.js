import React from 'react';

function Logout({ setUser }) {
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
  );
}

export default Logout;
