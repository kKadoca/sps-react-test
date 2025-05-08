import React from 'react';
import { BsShieldShaded } from "react-icons/bs";
import { BsPersonFill } from "react-icons/bs";
import { BsFillPencilFill } from "react-icons/bs";
import { BsTrashFill } from "react-icons/bs";
import './userCard.css';

function UserCard({ user, isAdmin, onEdit, onDelete }) {
  return (
    <div className="user-card">
      <div className="user-card-name">
        {
          user.type === 'admin' ?
            <BsShieldShaded size={22} color='#474747' /> :
            <BsPersonFill size={24} color='#474747' />
        }
        <h3>{user.name}</h3>
      </div>
      <p>{user.email}</p>
      <div className={`${isAdmin ? 'user-card-btns' : 'hidden'}`} >
        <button className="btn-user-card btn-edit" onClick={() => onEdit(user)}>
          <BsFillPencilFill size={18} color='#e99400' />
          <p>Editar</p>
        </button>
        <button className="btn-user-card btn-delete" onClick={() => onDelete(user)}>
          <BsTrashFill size={18} color='#e99400' />
          <p>Excluir</p>
        </button>
      </div>
    </div>
  );
}

export default UserCard;