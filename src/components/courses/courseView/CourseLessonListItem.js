import React from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteLesson } from '../../../actions/lessonActions';
import { deleteSelectedCourseLesson, deleteNewCourseLesson } from '../../../actions/courseLessonActions';
import './CourseLessonListItem.css'


export function CourseLessonListItem(props) {
  const {lesson, courseRole, mode} = props;
  
  let pageName = props.history.location.pathname.split('/').filter(Boolean).shift()

  let liClasses = "bd-highlight bg-warning shadow p-3 mb-3 rounded text-black lesson-list-item";
  
  if(props.mode === 'menu'){
     liClasses = "lesson-item list-group-item list-group-item-action text-black";
  }

  if(courseRole === 'author' && props.mode === 'menu') {
    return (
      <Link to={`/lesson/${lesson._id}`}>
        <li className="bd-highlight bg-warning shadow p-4 mb-3 rounded text-black lesson-list-item">
            {lesson.title}
        </li>
      </Link>
    )
  }

  function handleOnClickLessonDelete(e){
    
    if(props.courses.selectedCourse) {
      if(pageName === 'course'){
        props.deleteLesson(lesson._id)
      } else {
        props.deleteSelectedCourseLesson(props.index)
      }
    } else if(props.courses.newCourse) {
      props.deleteNewCourseLesson(props.index)
    } 
  }

  if(courseRole === 'author') {
    let lessonId = lesson._id || props.index;
    return (
        <li className={liClasses}>{lesson.title}
          <div className="btnBox">
            <button 
                onClick={handleOnClickLessonDelete}
                className="btn btn-danger m-2">
                Delete
            </button>
            <Link to={`/edit-lesson/${lessonId}`} className="btn btn-success m-2">
              Edit
            </Link>
          </div>
        </li>
        )
  }
 


  if(courseRole === 'student'){
    return (
      <Link to={`/lesson/${lesson._id}`}>
        <li className="bd-highlight bg-warning shadow p-4 mb-3 rounded text-black lesson-list-item">
            {lesson.title}
        </li>
      </Link>
    )
  }

  // default view
  return (
    <div>
      <p className="mb-3 text-white">Lesson cannot be viewed until course is purchased</p>
      <li className={liClasses}>
        {lesson.title}
      </li>
    </div>
  )
  
}

CourseLessonListItem.propTypes = {
  deleteLesson: PropTypes.func.isRequired,
  deleteSelectedCourseLesson: PropTypes.func.isRequired,
  deleteNewCourseLesson: PropTypes.func.isRequired,
  courses: PropTypes.object.isRequired  
}

const mapStateToProps = (state) => ({
  courses: state.courses,
  auth: state.auth,
  lessons: state.lessons
});


export default connect(mapStateToProps, { deleteLesson, deleteNewCourseLesson, deleteSelectedCourseLesson })(withRouter(CourseLessonListItem));

