
import React from 'react';
import { Col, Row, Button, Modal } from 'react-bootstrap';
import { Input } from 'react-toolbox/lib/input';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { hashHistory } from 'react-router';
import { addStudent, editStudentDetails, deleteStudentDetail } from '../Actions/Student'
import { logOutUser } from '../Actions/Login'

const inputStyle = {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '75%'
};
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            subject: '',
            active: false,
            header: '',
            buttonName: '',
            editIndex: -1,
            studentData: this.props.students
        };
        this.changeName = ev => this.setState({ name: ev });
        this.changeSubject = ev => this.setState({ subject: ev });
        this.openAddStudent = this.openAddStudent.bind(this);
        this.addStudent = this.addStudent.bind(this);
        this.handleCancelAction = this.handleCancelAction.bind(this);
    }
    componentDidMount()
    {
        const studentData = JSON.parse(localStorage.getItem('studentDetails'))
        localStorage.setItem('isLogin',true)
    }
    componentWillReceiveProps(nextProps)
    {
        if(nextProps.students != this.props.students)
        {
            localStorage.setItem("studentDetails", JSON.stringify(nextProps.students));
            this.setState({
                studentData: nextProps.students
            })
        }
        if(nextProps.isLogin == false)
        {
            localStorage.removeItem('studentDetails')
            hashHistory.push('login');
        }
    }
    editStudent(value,index) {
        this.setState({ active: true, name: value.name, subject: value.subject, header: 'Edit Details', buttonName: 'Edit', editIndex: index });
    }
    deleteStudent(value) {
        this.props.deleteStudentDetail(value);
    }
    handleCancelAction() {
        this.setState({ active: false });
    }
    openAddStudent() {
        this.setState({ active: true, name: '', subject: '',  header: 'Add Details', buttonName: 'Add' });
    }
    addStudent() {
        if(this.state.name && this.state.subject)
        {
            this.props.addStudent(this.state.name, this.state.subject);
            this.setState({ active: false });
        }
    }
    editDetails() {
        this.props.editStudentDetails(this.state.name, this.state.subject, this.state.editIndex);
        this.setState({ active: false });
    }
    removeLocalData()
    {
        this.props.logOutUser()
    }
    render() {
        const { students } = this.props;
        return (
            <Col>
                <Col className="student-title">Students Data</Col>
                <table style={{ width: '100%' }}>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>subject</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    {this.state.studentData.map((student,index) => (
                        <tr key={student.id}>
                            <td>{index+1}</td>
                            <td>{student.name}</td>
                            <td>{student.subject}</td>
                            <td><a onClick={this.editStudent.bind(this, student,index)}>Edit</a></td>
                            <td><a onClick={this.deleteStudent.bind(this, student.id)}>Delete</a></td>
                        </tr>
                    )
                    )}
                </table>
                <Col className="add-student-btn">
                    <Button
                        className="btn btn-md btn-primary"
                        type="button"
                        onClick={this.openAddStudent}>
                        Add
                    </Button>
                    <Button
                        className="btn btn-md btn-primary log-button-style"
                        type="button"
                        onClick={this.removeLocalData.bind(this)}>
                        logout
                    </Button>
                </Col>
                <Col className="static-modal">
                    <Modal show={this.state.active} onHide={this.handleCancelAction} >
                        <Modal.Header style={{ backgroundColor: '#6ab5db', color: '#f2f2f2' }}>
                            <Modal.Title>{this.state.header}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <fieldset className="form-group" style={inputStyle}>
                                    <Input
                                        type="text"
                                        label="Name"
                                        placeholder="Enter Name"
                                        value={this.state.name}
                                        onChange={this.changeName}
                                    />
                                </fieldset>
                                <fieldset className="form-group" style={inputStyle}>
                                    <Input
                                        type="text"
                                        label="Subject"
                                        placeholder="Enter subject"
                                        value={this.state.subject}
                                        onChange={this.changeSubject}
                                    />
                                </fieldset>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className="btn btn-md btn-default"
                                type="button"
                                onClick={this.handleCancelAction}>
                                Cancel
                            </Button>
                            <Button
                                className="btn btn-md btn-primary"
                                type="button"
                                onClick={this.state.buttonName == 'Add'?this.addStudent : this.editDetails.bind(this)}>
                                {this.state.buttonName}
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Col>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        students: state.Student,
        isLogin: state.authentication.isLogin,
    };
};
const mapDispatchToProps = (dispatch) => {
  return {
      addStudent: (name,subject) => {
          dispatch(addStudent(name,subject))
      },
      editStudentDetails: (name,subject,index) => {
          dispatch(editStudentDetails(name,subject,index))
      },
      deleteStudentDetail: (index) => {
          dispatch(deleteStudentDetail(index))
      },
      logOutUser: () => {
          dispatch(logOutUser())
      }
  }
}  
Home.propTypes = {
    dispatch: PropTypes.func
};
export default connect(mapStateToProps,mapDispatchToProps)(Home); 
