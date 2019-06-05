import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Form from '../components/Form';
import Button from '@material-ui/core/Button';
import Aux from '../hoc/Aux';
import { createGetList, createEmployee } from '../redux/actions';
import dateFormat from 'dateformat';
import defaultAvatar from '../assets/default.png';
import base64Img from 'base64-img';
//import AvatarEditor from 'react-avatar-editor';
class CreatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "xxx",
      title: "xxx",
      sex: "male",
      start_date: dateFormat(new Date(), "yyyy-mm-dd"),
      office_phone: "6666666666",
      cell_phone: "6666666666",
      sms: "6666666666",
      email: "abc@163.com",
      manager: "",
      imgURL: defaultAvatar
    }
  }
  componentDidMount() {
    this.props.createGetList();
  }
  //--------------all the field change handler
  handleNameChange = (e) => {
    //console.log(e.target.value);
    this.setState({ name: e.target.value });
  }
  handleTitleChange = (e) => {
    //console.log(e.target.value);
    this.setState({ title: e.target.value });
  }
  handleSexChange = (e) => {
    console.log(e.target.value);
    this.setState({ sex: e.target.value });
  }
  handleDateChange = (e) => {
    console.log(e.target.value);
    this.setState({ start_date: e.target.value });
  }
  handleOpChange = (e) => {
    //console.log(e.target.value);
    this.setState({ office_phone: e.target.value });
  }
  handleCpChange = (e) => {
    //console.log(e.target.value);
    this.setState({ cell_phone: e.target.value });
  }
  handleSmsChange = (e) => {
    //console.log(e.target.value);
    this.setState({ sms: e.target.value });
  }
  handleEmailChange = (e) => {
    //console.log(e.target.value);
    this.setState({ email: e.target.value });
  }
  handleManagerChange = (e) => {
    console.log(e.target.value);
    this.setState({ manager: e.target.value });
  }
  handleImgFileChange = (e) => {
    console.log("inside img change handler");
    this.setState({imgURL:URL.createObjectURL(e.target.files[0])});
  }
  handleSubmit = (e) => {
    console.log("inside submit");
    e.preventDefault();
    const { name, title, sex, start_date,
      office_phone, cell_phone, sms, email, manager } = this.state;
    this.props.createEmployee(
      {
        name, title, sex, start_date, office_phone,
        cell_phone, sms, email, manager
      }, this.props.history
    );
  }
  handleBack = () => {
    console.log("go back to main page");
    this.props.history.push("/");
  }
  //------------------------------------------
  render() {
    const { name, title, sex, start_date,
      office_phone, cell_phone, sms, email, manager, imgURL } = this.state;
    const { managerlist } = this.props;
    return (
      <Aux>
        <div className="btn-bar">
          <Button variant="outlined" color="primary" onClick={this.handleBack}>&#8249; back</Button>
          <Button variant="outlined" color="secondary" onClick={this.handleSubmit}>Submit</Button>
        </div>
        <div className="createpage-container">
          <div className="upload-container">
            <img src={imgURL} alt="avatar" className="img-container"/>
            <input type="file" className="img-selector" onChange={this.handleImgFileChange}/>
          </div>
          <Form
            init={null}
            nameChange={this.handleNameChange}
            titleChange={this.handleTitleChange}
            sexChange={this.handleSexChange}
            dateChange={this.handleDateChange}
            opChange={this.handleOpChange}
            cpChange={this.handleCpChange}
            smsChange={this.handleSmsChange}
            emailChange={this.handleEmailChange}
            managerChange={this.handleManagerChange}
            name={name}
            title={title}
            sex={sex}
            start_date={start_date}
            office_phone={office_phone}
            cell_phone={cell_phone}
            sms={sms}
            email={email}
            manager={manager}
            managerlist={managerlist}
            handleSubmit={this.handleSubmit}
          />
        </div>
      </Aux>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    isLoading: state.createReducer.isLoading,
    error: state.createReducer.error,
    managerlist: state.createReducer.managerlist
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    createGetList: () => dispatch(createGetList()),
    createEmployee: (newEmp, history) => dispatch(createEmployee(newEmp, history))
  }
}
const CreatePageWithRouter = withRouter(CreatePage);
export default connect(mapStateToProps, mapDispatchToProps)(CreatePageWithRouter);