import userState from './userState';

const Student = (state = JSON.parse(localStorage.getItem('studentDetails'))?JSON.parse(localStorage.getItem('studentDetails')):userState.students, action) => {
  switch (action.type) {
    case 'ADD_STUDENT':
      return [
        ...state,
        action.student
      ]
    case 'EDIT_DETAILS':
      let studentData = [...state];
      studentData[action.student.id] = {
            id: action.student.id + 1,
            name: action.student.name,
            subject:  action.student.subject
        }
      return studentData
    case 'DELETE_DETAILS':
      let newStudentData = state.filter((item) => item.id !== action.value);
      // newStudentData.splice(action.index,1);
      return newStudentData
    default:
      return state;
  }
};
export default Student;