import { useState } from 'react';
function StudentInfo({ student }) {
  const [picture, setPicture] = useState(student.profilePicture);

  function handlePictureChange(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      setPicture(imageUrl);
    }
  }

  return (
    <section className="student-card">
      {picture ? (
        <img src={picture} alt="Profile" />
      ) : (
        <div className="placeholder-image">No Profile Picture</div>
      )}

      <input
        type="file"
        id="picture-upload"
        accept="image/*"
        hidden
        onChange={handlePictureChange}
      />

      <label htmlFor="picture-upload" className="edit-button">
        {picture ? 'Change Picture' : 'Add Picture'}
      </label>

      <h2>{student.name}</h2>

      <ul>
        <li>Role: {student.role}</li>
        <li>ID: {student.id}</li>
        <li>Department: {student.department}</li>
        <li>Email: {student.email}</li>
        <li>Assigned Advisor: {student.assignedAdvisor}</li>
      </ul>
    </section>
  );
}

export default StudentInfo;
