import '../styles/modal.css';
import React, { useState } from 'react';
import userService from '../services/userService';
import handleError from '../helpers/error';
import { toast, ToastContainer } from 'react-toastify';
import { isAxiosError } from 'axios';

function AddUserModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    type: 'user'
  });

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await userService.createUser(formData);
      onClose();
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 400) {
        toast('Esse e-mail já existe!', {
          hideProgressBar: true,
          style: {
            backgroundColor: 'orange',
            color: 'white',
          },
        });
      }
      handleError(error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Novo Usuário</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleAddUser}>
          <div className="form-group">
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="type">Permissão:</label>
            <select
              id="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              required
            >
              <option value="user">Usuário</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Adicionar</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddUserModal;