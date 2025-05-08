import React, { useState, useEffect } from 'react';
import UserCard from '../components/UserCard';
import DeleteUserModal from '../components/DeleteUserModal';
import EditUserModal from '../components/EditUserModal';
import AddUserModal from '../components/AddUserModal';
import userService from '../services/userService';
import handleError from '../helpers/error';
import { BsFillPersonPlusFill } from "react-icons/bs";
import { BsBoxArrowInRight } from "react-icons/bs";
import { BsSun } from "react-icons/bs";
import './usersPage.css';
import authService from '../services/authService';

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loggedUser, setLoggedUser] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    getLoggedUser();
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const users = await userService.getUsers();
      setUsers(users ?? []);
    } catch (error) {
      handleError(error);
      setUsers([]);
    }
  };

  const getLoggedUser = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    setLoggedUser(user);
  };

  return (
    <div className="users-page">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="welcome-header">
          <BsSun size={32} color='#e99400' />
          <h2>Bem-vindo{loggedUser ? `, ${loggedUser.name}!` : '...'}</h2>
        </div>
        <button className='btn-logout' onClick={() => {
          authService.logout();
        }}>
          <BsBoxArrowInRight size={32} color='#e99400' />
        </button>
      </div>
      <div className='users-page-header'>
        <h1>Lista de Usuários</h1>
        <button className={`${loggedUser?.type === 'admin' ? 'btn btn-primary btn-add' : 'hidden'}`} onClick={() => {
          setShowAddModal(true);
        }}>
          <BsFillPersonPlusFill size={20} />
          <p>Novo</p>
        </button>
      </div>

      <div className="user-cards-grid">
        {users.map(user => (
          <UserCard
            key={user.id}
            user={user}
            isAdmin={loggedUser?.type === 'admin'}
            onEdit={() => {
              setSelectedUser(user);
              setShowEditModal(true);
            }}
            onDelete={() => {
              setSelectedUser(user);
              setShowDeleteModal(true);
            }}
          />
        ))}
      </div>

      {showAddModal && (
        <AddUserModal
          onClose={async () => {
            setShowAddModal(false);
            await loadUsers();
          }}
        />
      )}

      {showEditModal && (
        <EditUserModal
          selectedUser={selectedUser}
          onClose={async () => {
            setShowEditModal(false);
            await loadUsers();
          }}
        />
      )}

      {showDeleteModal && (
        <DeleteUserModal
          selectedUser={selectedUser}
          onClose={async () => {
            setShowDeleteModal(false);
            await loadUsers();
          }}
        />
      )}
    </div>
  );
}

export default UsersPage;
