import initialState from '../Reducers/userState';
import _ from 'lodash';

export function addStudent(name, subject) {
  return {
    type: 'ADD_STUDENT',
    student: {
      id: _.uniqueId('student_' + Math.floor((Math.random()*10) + 1)),
      name: name,
      subject: subject
    }
  };
}

export function editStudentDetails(name, subject, id) {
    return {
        type: 'EDIT_DETAILS',
        student: {
            id,
            name,
            subject
        }
    }
}

export function deleteStudentDetail(value) {
    return {
        type: 'DELETE_DETAILS',
        value
    }
}