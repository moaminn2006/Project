import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import Navbar from '../components/componentsProfile/Navbar';
import StudentInfo from '../components/componentsProfile/StudentInfo';
import AcademicProgress from '../components/componentsProfile/AcademicProgress';
import AdvisingSessionReview from '../components/componentsProfile/AdvisingSessionReview';

function Profile() {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    document.title = 'Profile - Faculty of Science';

    const savedUser = localStorage.getItem('currentUser');
    if (!savedUser) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(savedUser);

    fetch(`http://localhost:5000/api/users/${parsedUser._id}`)
      .then((res) => res.json())
      .then((data) => {
        setStudent({
          profilePicture: null,
          name: data.fullName,
          role: data.role,
          id: data.universityId,
          department: data.department || 'N/A',
          email: data.email,
          assignedAdvisor: data.assignedAdvisor,
        });
      })
      .catch(() => {
        setStudent({
          profilePicture: null,
          name: parsedUser.fullName,
          role: parsedUser.role,
          id: parsedUser.universityId,
          department: parsedUser.department || 'N/A',
          email: parsedUser.email,
          assignedAdvisor: parsedUser.assignedAdvisor,
        });
      });
  }, [navigate]);

  function handleSignOut() {
    localStorage.removeItem('currentUser');
    navigate('/login');
  }

  if (!student) return null;

  return (
    <>
      <Navbar onSignOut={handleSignOut} />
      <StudentInfo student={student} />
      <AcademicProgress />
      <AdvisingSessionReview />
    </>
  );
}

export default Profile;