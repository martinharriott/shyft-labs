import './App.css';
import React, { useState } from 'react';
import {Route, Routes} from 'react-router-dom';
import Students from './components/Students';
import Courses from './components/Courses';
import Results from './components/Results';
import Home from './components/Home';
import NavMenu from './components/NavMenu'


function App() {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  return (
    <>
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/students" element={<Students students={students} setStudents={setStudents}></Students>}></Route>
      <Route path="/courses" element={<Courses courses={courses} setCourses={setCourses}></Courses>}></Route>
      <Route path="/results" element={<Results students={students} setStudents={setStudents} courses={courses} setCourses={setCourses}></Results>}></Route>
    </Routes>
    <NavMenu></NavMenu>
    </>
  );
}

export default App;
