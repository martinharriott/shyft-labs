import StudentsList from './StudentsList';
import React, { useState, useEffect } from 'react'

export default function Students({students, setStudents}) {
  
    const [firstName, setFirstName] = useState("");
    const [validFirstName, setValidFirstName] = useState(false);
  
    const [familyName, setFamilyName] = useState("");
    const [validFamilyName, setValidFamilyName] = useState(false);
  
    const [dob, setDob] = useState(new Date());
    const [validDob, setValidDob] = useState(false);
    const [error, setError] = useState(false);

    const apiURL = "http://localhost:8080/student";

    useEffect(() => {
        fetch(apiURL).then((data) => {
          data.json().then(json => {
            setStudents(json);
          });
        });
      }, []);
    
      useEffect(() => {
        const today = new Date(Date.now());
        const youngestDob = new Date(new Date().setFullYear(today.getFullYear() - 10));
        setValidDob(dob < youngestDob);
      
      }, [dob]);
    
      useEffect(() => {
        setValidFirstName(firstName.length > 0);
      }, [firstName]);

      useEffect(() => {
        setValidFamilyName(familyName.length > 0);
      }, [familyName]);
    
      function submit() {
        if (!validDob || !validFirstName || !validFamilyName) {
          setError(true);
          return;
        }
    
        setError(false);

        const student = {
          "firstName": firstName,
          "familyName": familyName,
          "dob": dob.toISOString().substring(0, 10)
        };
        setStudents(prevStudents => {
          return [...prevStudents, student]
        });

        try {
          fetch(apiURL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(student),
          }).then(() => alert("Student added successfully"));
          
        }
        catch (error) {
          console.error(error);
        }
        setFirstName("");
        setFamilyName("");
        setDob("");
      }

  return (
    <div className="students">
        <h1>Students</h1>
        <div className="container">
          <div className="form">
            <section>
              <p className={error && !validFirstName ? "errorMsg" : "offscreen"}>First name is required</p>
              <p className={error && !validFamilyName ? "errorMsg" : "offscreen"}>Family name is required</p>
              <p className={error && !validDob ? "errorMsg" : "offscreen"}>You must be over 10 years old</p>
            </section>
            <label htmlFor="firstName">First name: </label><br/><input required type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)}></input><br></br>
            <label htmlFor="familyName">Family name: </label><br/><input required type="text" id="familyName" value={familyName} onChange={(e) => setFamilyName(e.target.value)}></input><br></br>
            <label htmlFor="dob">Date of birth: </label><br/>
            <input 
              required 
              onChange={(e) => setDob(new Date(e.target.value))} 
              type="date" id="dob" name="dob" min="1900-01-01" max="2014-01-01">
                </input><br></br>
          </div>
        </div>
        <button className="submit" onClick={submit}>Submit</button>
        <hr/>
        {students.length > 0 ? <StudentsList students={students}></StudentsList> : <p>No records yet.</p>}
    </div>
  )
}
