import React from 'react';
import { TableRow, TableCell } from '@material-ui/core';
import defaultAvatar from '../assets/default.png'


const Employee = (props) => {
  const { name, title, sex, start_date, office_phone,
    cell_phone, sms, email, manager, dr, _id, imagePath } = props.employee;
  const { handleEdit, handleDelete, handleGetManager, handleGetDR } = props;
  const manager_name = manager ? manager.manager_name : "N/A";
  const manager_id = manager ? manager.manager_id : "";
  const dr_count = dr.length;
  return (
    <TableRow hover={true}>
      <TableCell align="left">
        <img
          src={imagePath && imagePath.length > 7 ? imagePath : defaultAvatar}
          className={"smallImage"}
        />
      </TableCell>
      <TableCell align="left">{name}</TableCell>
      <TableCell align="left">{title}</TableCell>
      <TableCell align="left">{sex}</TableCell>
      <TableCell align="left">{start_date.substring(0, 10)}</TableCell>
      <TableCell align="left"><a href={`tel:${office_phone}`}>{office_phone}</a></TableCell>
      <TableCell align="left">{cell_phone}</TableCell>
      <TableCell align="left">{sms}</TableCell>
      <TableCell align="left">{email}</TableCell>
      <TableCell align="left">
        <span className="tag" onClick={() => handleGetManager(manager_id)}>
          {manager_name}
        </span>
      </TableCell>
      <TableCell align="left">
        <span className="tag" onClick={() => handleGetDR(_id)}>
          {dr_count}
        </span>
      </TableCell>
      <TableCell align="left">
        <button onClick={() => handleEdit(_id)}>
          <i className="far fa-edit"></i>
        </button>
      </TableCell>
      <TableCell align="left">
        <button onClick={() => handleDelete(_id)}>
          <i className="fas fa-trash-alt"></i>
        </button>
      </TableCell>
    </TableRow>
  )
}
export default Employee;