import axios from "axios";
import React, { useEffect, useState } from "react";

const User = () => {
  const [userdata, setuserData] = useState([]);
  const [user, setuser] = useState({ name: "", email: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users`).then((req) => {
      console.log(req);
      localStorage.setItem("user", JSON.stringify(req));
      // const data = req.userdata;
      setuserData(req.data);
    });
  }, []);
  const handleDelete = (index, e) => {
    // First way to delete the row data through traversal method
    // e.target.parentNode.parentNode.parentNode.deleteRow(index);
    // Second way to delete the row data through ID
    setuserData(userdata.filter((item, i) => i !== index));
    // Third way to delete the row data through Splice Method
    // const rows = [...userdata];
    // rows.splice(index, 1);
    // setuserData(rows);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  // To Add the row data
  const addRows = () => {
    if (user.name && user.email) {
      userdata.push(user);
      setuserData([...userdata]);
      setuser({ name: "", email: "" });
    } else {
      alert("filed required");
    }
  };
  // TO Remove All User Data
  const removeAllUserData = () => {
    setuserData([]);
  };
  const handleEdit = (data,index) => {
    setuser(data)
    setEditingUser(userdata[index]);
    setIsEditing(true);
  };
  const handleUpdate = () => {
    // Update the userdata with the edited user data
    setuserData(
      userdata.map((data) =>
        data === editingUser ? { ...data, ...user } : data
      )
    );
    setEditingUser(null);
    setIsEditing(false);
    setuser({ name: "", email: "" });
  };
  return (
    <>
      <h1>User Data</h1>
      <form onSubmit={handleSubmit}>
        {isEditing ? (
          <>
            <input
              type="text"
              placeholder="Enter Your Name"
              value={user.name}
              onChange={(e) => setuser({ ...user, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Enter Your Email"
              value={user.email}
              onChange={(e) => setuser({ ...user, email: e.target.value })}
              required
            />
            <button onClick={handleUpdate}>Update</button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter Your Name"
              value={user.name}
              onChange={(e) => setuser({ ...user, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Enter Your Email"
              value={user.email}
              onChange={(e) => setuser({ ...user, email: e.target.value })}
              required
            />
            <button style={{ backgroundColor: "green" }} onClick={addRows}>
              Add
            </button>
          </>
        )}
      </form>
      <table>
        <thead style={{ textAlign: "center" }}>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userdata.map((data, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>
                  {/* <button onClick={handleDelete}>Delete</button> */}
                  <button onClick={(e) => handleDelete(index, e)}>
                    Delete
                  </button>
                  {editingUser === data ? (
                    <button onClick={handleUpdate}>Update</button>
                  ) : (
                    <button onClick={() => handleEdit(data,index)}>Edit</button>
                  )}
                </td>
              </tr>
            );
          })}
          {userdata.length >= 1 && (
            <button onClick={removeAllUserData}>Remove All</button>
          )}
        </tbody>
      </table>
    </>
  );
};

export default User;
