import React from 'react';
import { TableRow, TableCell } from '@material-ui/core';


const Employee = (props) => {
  const { name, title, sex, start_date, office_phone,
    cell_phone, sms, email, manager, dr } = props.employee;
  const manager_name = manager?manager.manager_name:"N/A";
  const dr_count = dr.length;
  //console.log(new Date(start_date.substring(0, 10) + " PST"));
  return (
    <TableRow hover={true}>
      <TableCell align="left"></TableCell>
      <TableCell align="left">{name}</TableCell>
      <TableCell align="left">{title}</TableCell>
      <TableCell align="left">{sex}</TableCell>
      <TableCell align="left">{start_date.substring(0, 10)}</TableCell>
      <TableCell align="left">{office_phone}</TableCell>
      <TableCell align="left">{cell_phone}</TableCell>
      <TableCell align="left">{sms}</TableCell>
      <TableCell align="left">{email}</TableCell>
      <TableCell align="left">{manager_name}</TableCell>
      <TableCell align="left">{dr_count}</TableCell>
      <TableCell align="left"></TableCell>
      <TableCell align="left"></TableCell>
    </TableRow>
  )
}
export default Employee;