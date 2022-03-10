import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
const Users = (props) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function getUsers() {
      const result = await axios("https://jsonplaceholder.typicode.com/users");
      setUsers(result.data);
    }
    getUsers();
  });

  return (
    <ul>
      <h1>hello</h1>
      {users.map((user) => (
        <li key={user.id}> {user.name} </li>
      ))}
    </ul>
  );
};

export default Users;
