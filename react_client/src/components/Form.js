import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import dateFormat from 'dateformat';
import { InputLabel, MenuItem, Select, FormControl } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%",
  },
  formControl: {
    margin: theme.spacing(1),
    width: "100%",
  },
  menu: {
    width: 200,
  },
}));
const Form = ({ nameChange, titleChange, sexChange, dateChange, opChange, cpChange,
  smsChange, emailChange, managerChange, managerlist,
  name, title, sex, start_date,
  office_phone, cell_phone, sms, email, manager
 }) => {
  const classes = useStyles();
  return (
    <form  className="form-container">
      <TextField
        required
        id="name"
        label="name"
        value={name}
        onChange={nameChange}
        className={classes.textField}
        margin="normal"
      />
      <TextField
        required
        id="title"
        label="title"
        value={title}
        onChange={titleChange}
        className={classes.textField}
        margin="normal"
      />
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="sex">Select a gender</InputLabel>
        <Select
          value={sex}
          onChange={sexChange}
          inputProps={{ id: 'sex' }}
        >
          <MenuItem value="male">male</MenuItem>
          <MenuItem value="female">female</MenuItem>
        </Select>
      </FormControl>
      {/*start date day picker here*/}
      <TextField
        id="date"
        label="Start Date"
        type="date"
        value={start_date}
        onChange={dateChange}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        required
        id="officePhone"
        label="office phone"
        value={office_phone}
        onChange={opChange}
        className={classes.textField}
        margin="normal"
      />
      <TextField
        required
        id="cellPhone"
        label="cell phone"
        value={cell_phone}
        onChange={cpChange}
        className={classes.textField}
        margin="normal"
      />
      <TextField
        required
        id="sms"
        label="sms"
        value={sms}
        onChange={smsChange}
        className={classes.textField}
        margin="normal"
      />
      <TextField
        required
        id="email"
        label="email"
        value={email}
        onChange={emailChange}
        className={classes.textField}
        margin="normal"
      />
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="mng">Select a manager</InputLabel>
        <Select
          value={manager}
          onChange={managerChange}
          inputProps={{ id: 'mng' }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {managerlist.map((ele) => {
            return (
              <MenuItem key={ele._id} value={ele._id}>{ele.name}</MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </form>
  );
}
export default Form;