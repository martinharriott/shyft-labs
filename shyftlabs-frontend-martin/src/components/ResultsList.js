import React from 'react'

export default function ResultsList({results}) {
  return (
    <table>
        <tr>
            <th>Course</th>
            <th>Student</th>
            <th>Score</th>
        </tr>
        {results.map((result, key) => {
            return (
            <tr key={key}>
                <td>{result.course}</td>
                <td>{result.student}</td>
                <td>{result.score}</td>
            </tr>
            )
        })}
        </table>
  )
}
