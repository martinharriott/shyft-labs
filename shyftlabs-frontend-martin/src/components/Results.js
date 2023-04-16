import React, { useState, useEffect } from 'react'
import ResultsList from './ResultsList';

export default function Results({students, setStudents, courses, setCourses}) {
    const scores = ["A", "B", "C", "D", "E", "F"];

    const [course, setCourse] = useState();
    const [student, setStudent] = useState();
    const [score, setScore] = useState(scores[0]);

    const [error, setError] = useState(false);
    const [results, setResults] = useState([]);
    
    const apiURL = "http://localhost:8080/result";
    const coursesApiURL = "http://localhost:8080/course";
    const studentsApiURL = "http://localhost:8080/student";

    useEffect(() => {
        fetch(apiURL).then((data) => {
          data.json().then(json => {
            console.log(json);
            setResults(json);
          });
        });
        fetch(studentsApiURL).then((data) => {
            data.json().then(json => {
              console.log(json);
              setStudents(json);
              if (json.length > 0) setStudent(json[0].firstName + ' ' + json[0].familyName);
            });
          });
          fetch(coursesApiURL).then((data) => {
            data.json().then(json => {
              console.log(json);
              setCourses(json);
              if (json.length > 0) setCourse(json[0].name);
            });
          })
      }, []);

    function submit() {
        if (!score || !student || !course) {
            setError(true);
            return;
        }

        setError(false);

        const result = {
            "course": course, 
            "student": student,
            "score": score
        }

        setResults(prevResults => {
          return [...prevResults, result]
        });

        try {
            fetch(apiURL, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(result),
            }).then(() => alert("Result added successfully"));
            
          }
          catch (error) {
            console.error(error);
          }
    }
  return (
    <div>
        <h1>Results</h1>
        <section>
              <p className={error && !course ? "errorMsg" : "offscreen"}>Course is required</p>
              <p className={error && !student ? "errorMsg" : "offscreen"}>Student is required</p>
              <p className={error && !score ? "errorMsg" : "offscreen"}>Score is required</p>
            </section>
        {courses.length > 0 ? <select onChange={(e) => setCourse(e.target.value)}>
            {courses.map((value) => (
            <option key={value.name} value={value.name}>
                {value.name}
            </option>
            ))}
        </select> : <select><option disabled>No courses yet.</option></select>}
        {students.length > 0 ?         <select onChange={(e) => setStudent(e.target.value)}>
            {students.map((value) => (
            <option key={value.firstName + ' ' + value.familyName} value={value.firstName + ' ' + value.familyName}>
                {value.firstName + ' ' + value.familyName}
            </option>
            ))}
        </select> : <select><option disabled>No students yet.</option></select>}
        <select onChange={(e) => setScore(e.target.value)}>
            {scores.map((value) => (
            <option key={value} value={value}>
                {value}
            </option>
            ))}
        </select><br></br>
        <button className="submit" onClick={submit}>Submit</button>
        <hr/>
        {results.length > 0 ? <ResultsList results={results}></ResultsList> : <p>No records yet.</p>}
    </div>
  )
}
