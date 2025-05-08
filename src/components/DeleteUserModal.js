import '../styles/modal.css';
import React from 'react';
import userService from '../services/userService';
import handleError from '../helpers/error';

function DeleteUserModal({ selectedUser, onClose }) {
  const handleDeleteUser = async () => {
    try {
      await userService.deleteUser(selectedUser.id);
      onClose();
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Excluir usuário?</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <p style={{ fontSize: '18px' }}>Deseja realmente excluir {selectedUser.name}?</p>
        <div className="user-card-actions" style={{ marginTop: '32px' }}>
          <button className="btn btn-primary" onClick={handleDeleteUser}>Excluir</button>
          <button className="btn btn-secondary" onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteUserModal;