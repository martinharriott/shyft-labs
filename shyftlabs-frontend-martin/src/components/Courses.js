import React, { useState, useEffect } from 'react'
import CoursesList from './CoursesList';

export default function Courses({courses, setCourses}) {
    const [courseName, setCourseName] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const apiURL = "http://localhost:8080/course";

    useEffect(() => {
        fetch(apiURL).then((data) => {
          data.json().then(json => {
            console.log(json);
            setCourses(json);
          });
        })
      }, []);

    function submit() {
        let fail = false;
        if (courseName.length < 1) {
          setErrorMsg("Course name is required");
          fail = true;
        }

        if (fail) {
            return;
        }
        const course = {name: courseName}
        setCourses(prevCourses => {
          return [...prevCourses, course]
        });

        try {
            fetch(apiURL, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(course),
            }).then(() => alert("Course added successfully"));
            
          }
          catch (error) {
            console.error(error);
          }

          setCourseName("");
    }

    return (
        <div className="courses">
            <h1>Courses</h1>
            <section>
                <p className={errorMsg ? "errorMsg" : "offscreen"}>{errorMsg}</p>
            </section>
            <label htmlFor="courseName">Course name: </label><br/><input required type="text" id="courseName" value={courseName} onChange={(e) => setCourseName(e.target.value)}></input><br></br>
            <button className="submit" onClick={submit}>Submit</button>
            <hr/>
            {courses.length > 0 ? <CoursesList courses={courses}></CoursesList> : <p>No records yet.</p>}
        </div>
    )
}
