import React, { useState, useEffect } from 'react';
import './App.css'; // Optional: You can remove this if not using custom styles
import { EmployeeData } from './EmployeeData.js';

function App() {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [idCounter, setIdCounter] = useState(1);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    // Simulating initial data load from EmployeeData.js
    setData(EmployeeData);
  }, []);

  const handleSave = () => {
    if (editingId !== null) {
      // Editing existing item
      const updatedData = data.map(item =>
        item.id === editingId ? { id: editingId, firstName, lastName, age } : item
      );
      setData(updatedData);
      setEditingId(null);
    } else {
      // Adding new item
      const newItem = { id: idCounter, firstName, lastName, age };
      setData([...data, newItem]);
      setIdCounter(idCounter + 1);
    }
    // Clear input fields after save
    setFirstName('');
    setLastName('');
    setAge('');
  };

  const handleEdit = (id) => {
    const itemToEdit = data.find(item => item.id === id);
    if (itemToEdit) {
      setFirstName(itemToEdit.firstName);
      setLastName(itemToEdit.lastName);
      setAge(itemToEdit.age);
      setEditingId(id);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const updatedData = data.filter(item => item.id !== id);
      setData(updatedData);
      // Reset editing state if deleting the currently edited item
      if (editingId === id) {
        setEditingId(null);
      }
    }
  };

  const handleClear = () => {
    setFirstName('');
    setLastName('');
    setAge('');
    setEditingId(null);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">CRUD React App</h2>
      <div className="row justify-content-center mb-4">
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder="Enter First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              placeholder="Enter Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-2">
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              type="text"
              className="form-control"
              id="age"
              placeholder="Enter Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
        </div>
        <br></br>
        <div className="col-md-1" style={{ marginTop: '2%' }}>
          <button className="btn btn-primary btn-block" onClick={handleSave}>
            {editingId !== null ? 'Update' : 'Save'}
          </button>
        </div>
        <div className="col-md-2" style={{ marginTop: '2%' }}>
          <button className="btn btn-danger btn-block" onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>

      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Sr.No</th>
            <th scope="col">Id</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Age</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <th scope="row">{index + 1}</th>
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.age}</td>
              <td>
                <button style={{ marginLeft: '2%' }} className="btn btn-primary mr-2" onClick={() => handleEdit(item.id)}>
                  Edit
                </button>
                <button style={{ marginLeft: '2%' }} className="btn btn-danger" onClick={() => handleDelete(item.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
