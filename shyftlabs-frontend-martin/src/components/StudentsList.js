import React from 'react'

export default function StudentsList({students}) {
  return (
    <div className="App">
        <table>
            <tr>
                <th>First Name</th>
                <th>Family Name</th>
                <th>Date of Birth</th>
            </tr>
            {students.map((student, key) => {
                return (
                <tr key={key}>
                    <td>{student.firstName}</td>
                    <td>{student.familyName}</td>
                    <td>{student.dob}</td>
                </tr>
                )
            })}
            </table>
    </div>
  )
}
