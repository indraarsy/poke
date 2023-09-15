import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: 'male',
    status: 'active'
    // Add more fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className={`fixed inset-0 ${isOpen ? 'flex' : 'hidden'} justify-center items-center z-[9999] bg-gray-600/80`}>
      <div className="modal w-1/3">
        <div className="modal-content">
          <div className="flex justify-between items-center align-center">
            <h2 className="text-xl font-bold mb-4 mr-4">Add New User</h2>
            <button onClick={(e) => {
              e.preventDefault()
              onClose()
            }}><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path fill="white" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full border border-neutral-700 rounded-lg p-4 bg-zinc-800"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border border-neutral-700 rounded-lg p-4 bg-zinc-800"
                required
              />
            </div>
            {/* Add more form fields as needed */}
            <div className="text-center">
              <button type="submit" className="w-full mt-4 border border-neutral-700 rounded-lg p-4 bg-zinc-800 ">Add User</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal

