import { useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);

  // CREATE + UPDATE
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email) {
      alert("Please fill all fields");
      return;
    }

    if (editId !== null) {
      // UPDATE
      setUsers(
        users.map((user) =>
          user.id === editId
            ? {
                ...user,
                name: name,
                email: email,
              }
            : user
        )
      );

      setEditId(null);
    } else {
      // CREATE
      const newUser = {
        id: Date.now(),
        name: name,
        email: email,
      };

      setUsers([...users, newUser]);
    }

    setName("");
    setEmail("");
  };

  // DELETE
  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // EDIT
  const handleEdit = (user) => {
    setName(user.name);
    setEmail(user.email);
    setEditId(user.id);
  };

  return (
    <div>
      <h1>User CRUD</h1>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">
          {editId !== null ? "Update User" : "Add User"}
        </button>
      </form>

      <hr />

      {/* READ */}
      <h2>Users List</h2>

      {users.length === 0 ? (
        <p>No users available</p>
      ) : (
        users.map((user) => (
          <div key={user.id}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>

            <button onClick={() => handleEdit(user)}>
              Edit
            </button>

            <button onClick={() => handleDelete(user.id)}>
              Delete
            </button>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default App;