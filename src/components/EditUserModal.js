import '../styles/modal.css';
import React, { useState } from 'react';
import userService from '../services/userService';
import handleError from '../helpers/error';

function EditUserModal({ selectedUser, onClose }) {
  const [formData, setFormData] = useState({
    name: selectedUser.name,
    email: selectedUser.email,
    password: selectedUser.password,
    type: selectedUser.type,
  });

  const handleEditUser = async (e) => {
    e.preventDefault();
    try {
      await userService.updateUser(selectedUser.id, formData);
      onClose();
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Editar Usuário</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleEditUser}>
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
          <button type="submit" className="btn btn-primary">Salvar</button>
        </form>
      </div>
    </div>
  );
}

export default EditUserModal;