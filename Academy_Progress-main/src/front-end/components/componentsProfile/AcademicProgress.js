function AcademicProgress() {
  return (
    <div className="academic-progress">
      <h2>Academic Progress & Risk Thresholds</h2>
      <table>
        <thead>
          <tr>
            <th>Course</th>
            <th>Attendance</th>
            <th>Current Grade</th>
            <th>Risk Status</th>
            <th>Advising Plan</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>CS302</td>
            <td>90%</td>
            <td>A</td>
            <td><span className="on-track">On Track</span></td>
            <td>Continue current study plan</td>
          </tr>
          <tr>
            <td>CS309</td>
            <td>85%</td>
            <td>B+</td>
            <td><span className="on-track">On Track</span></td>
            <td>Seek additional help and resources</td>
          </tr>
          <tr>
            <td>CS305</td>
            <td>70%</td>
            <td>C</td>
            <td><span className="warning">Warning</span></td>
            <td>Attend tutoring sessions and review materials</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AcademicProgress;