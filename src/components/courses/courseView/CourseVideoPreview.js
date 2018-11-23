import React from 'react'


export default function CourseVideoPreview(props) {
  console.log(props)
  // Trying to bring in watchedLessons to give user a different message depending 
  // on wether they have watched lessons on this course or not.

  // let previewMessage = ''

  // if(props.auth.watchedLessons.length === 0) {
  //    previewMessage = <p>Begin watching {props.title} now!</p>
  // } else {
  //   previewMessage = <p>Continue watching {props.title} now!</p>
  // }

  return (
    <div className="preview-video-section">
        <div className="row">
          <div className="col">
            <a href="#" className="video" data-video={props.videoUrl}>
              <i className="fas fa-play"></i>
              {/* <p>Continue where you left off on course.title!</p> */}
              <p>Begin watching {props.title} now!</p>  
              {/* {previewMessage} */}
            </a>
          </div>
        </div>
      </div>
    // <div id="lesson-video">
      
    //       <div class="col-md-8 m-auto">
    //         <div class="embed-responsive embed-responsive-16by9">
    //           <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" allowfullscreen></iframe>
    //         </div>
    //       </div>
    //     </div>
    
  )
}