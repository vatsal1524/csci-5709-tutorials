import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://express-t4.onrender.com/api/users"
        );
        if (response.status === 200) {
          setUsers(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={handleSearch}
      />
      <ul>
        {filteredUsers.map((user) => (
          <li key={user._id}>
            <img src={user.picture} alt={user.name} />
            <span>Name: {user.name}</span>
            <span>Email: {user.email}</span>
            <button
              onClick={() => {
                navigate("/users/" + user._id);
              }}
            >
              View details
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
