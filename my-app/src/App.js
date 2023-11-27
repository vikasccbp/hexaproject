import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import './App.css';

function App() {
  const [userData, setUserData] = useState([]);
  const [searchText, setSearchText] = useState('');

  const fetchData = async (query) => {
      const response = await axios.get(`http://localhost:8001/v1/users?searchText=${query}`)
      setUserData(response.data)
  }

  const searchQuery = (query)=>{
    setSearchText(query)
    fetchData(query)
  }
  

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    fetchData();
  }, []);

  // const handleSearchChange = event => {
  //   setSearchText(event.target.value);
  // };



  return (
    <div className="data-container">
      <h1 className="heading">User Data</h1>
      <input type="text" value={searchText} onChange={({target}) =>  searchQuery(target.value)} className="data-container"/>
      <button className="data-container" onClick={fetchData}>Search</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Posts</th>
          </tr>
        </thead>
        <tbody>
          {userData.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <ul>
                  {user.posts.map(post => (
                    <li key={post.id}>{post.title}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;