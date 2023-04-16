import React from 'react'

export default function CoursesList({courses}) {

    console.log(courses);
  return (
    <table>
    <tr>
        <th>Course</th>
    </tr>
    {courses.map((course, key) => {
        return (
        <tr key={key}>
            <td>{course.name}</td>
        </tr>
        )
    })}
    </table>
  )
}
