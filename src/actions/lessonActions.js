import axios from 'axios';
import {API_BASE_URL} from '../config';
import {
   GET_ALL_LESSONS,
   EDIT_LESSON,
   LESSON_LOADING, 
   SET_CURRENT_LESSON,
   SET_CURRENT_COURSE,
   DELETE_LESSON,
  } from './types';
  
// Get A Lesson
export const getLesson = (id) => dispatch => {
  dispatch(setLessonLoading());
  axios.get(`${API_BASE_URL}/lesson/${id}`)
    .then(res => {  
      dispatch({
        type: SET_CURRENT_LESSON,
        payload: res.data
      });

      let course = res.data.course;
      
      if(course){
        dispatch({
          type: SET_CURRENT_COURSE,
          payload: course
        })
      }
    })
    .catch(err => console.log(err))
}

export const setCurrentLesson = (id) => dispatch => {
  dispatch({
    type: SET_CURRENT_LESSON,
    payload: id
  })
}
  
// Get All Lessons 
export const getAllLessons = () => dispatch => {
  dispatch(setLessonLoading());
  axios.get(`${API_BASE_URL}/lesson`)
    .then(res => 
      dispatch({
        type: GET_ALL_LESSONS,
        payload: res.data
      })
    )
    .catch(err => console.log(err))
}

// Edit A Lesson
export const editLesson = (lesson, history) => dispatch => {
  
    if(lesson._id){
      dispatch(setLessonLoading());
      axios.put(`${API_BASE_URL}/lesson/${lesson._id}`, lesson)
        .then(res => 
          dispatch({
            type: EDIT_LESSON,
            history: history.goBack(),
            payload: res.data
          })
        )
        .catch(err => console.log(err))
    } else {
      dispatch({
        type: EDIT_LESSON,
        history: history.goBack(),
        payload: lesson
      })
    }
}

// Lesson Loading
export const setLessonLoading = () => {
  return {
    type: LESSON_LOADING
  }
}

// Delete Course
export const deleteLesson = (id) => dispatch => {
  dispatch(setLessonLoading());
  axios.delete(`${API_BASE_URL}/lesson/${id}`)
    .then(res => 
      dispatch({
        type: DELETE_LESSON,
        payload: res.data
      })
    )
    .catch(err => console.log(err))
}