
import { useEffect, useState } from 'react';
import { db } from '../../../firebaseConfig';
import { collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router'; 
import Header from '../../../component/Header'; 
import Navbar from '../../../component/Navbar'; 

const RegisteredUsers = () => {
  const router = useRouter();
  const { eventId } = router.query; 
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [feedbacks, setFeedbacks] = useState({}); 
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRegisteredUsers = async () => {
      if (!eventId) return; 
      try {
        const registeredUsersCollection = collection(db, `monthlymeet/${eventId}/registeredUsers`);
        const registeredUsersSnapshot = await getDocs(registeredUsersCollection);

        // Fetch registered user IDs
        const registeredUserIds = registeredUsersSnapshot.docs.map(doc => doc.id);

        // Fetch user details for each registered user
        const userDetailsPromises = registeredUserIds.map(async (userId) => {
          const userDoc = await getDoc(doc(db, 'userdetails', userId));
          if (userDoc.exists()) {
            return { id: userId, ...userDoc.data() };
          } else {
            return null; // Return null if the document doesn't exist
          }
        });

        const userDetails = await Promise.all(userDetailsPromises);
        const filteredUserDetails = userDetails.filter(user => user !== null);
        setRegisteredUsers(filteredUserDetails);
      } catch (error) {
        console.error('Error fetching registered users:', error);
        setError('Error fetching registered users. Please try again.');
      }
    };

    fetchRegisteredUsers();
  }, [eventId]); 

  const handleFeedbackChange = (userId, feedback) => {
    setFeedbacks(prev => ({ ...prev, [userId]: feedback })); 
  };

  const handleFeedbackSubmit = async (userId) => {
    if (!feedbacks[userId]) {
      alert("Please enter feedback before submitting.");
      return;
    }

    try {
      const userRef = doc(db, `monthlymeet/${eventId}/registeredUsers`, userId);
      await updateDoc(userRef, { feedback: feedbacks[userId] }); // Update Firestore with feedback
      alert("Feedback submitted successfully!");
      setFeedbacks(prev => ({ ...prev, [userId]: '' })); // Clear feedback after submission
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert("Error submitting feedback. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div className='logoContainer'>
                <img src="/ujustlogo.png" alt="Logo" className="logos" />
            </div>
      <Navbar />
      <main className='maincontainer'>
        <h2>Registered Users</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        {/* User Table */}
        <table className="leave-requests-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Phone</th>
              <th>Feedback</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {registeredUsers.length > 0 ? (
              registeredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user[" Name"]}</td>
                  <td>{user["Mobile no"]}</td>
                  <td>
                    <input
                      type="text"
                      value={feedbacks[user.id] || ''}
                      onChange={(e) => handleFeedbackChange(user.id, e.target.value)}
                      placeholder="Enter feedback"
                    />
                  </td>
                  <td>
                    <button onClick={() => handleFeedbackSubmit(user.id)}>Submit Feedback</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No users registered for this event.</td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </>
  );
};

export default RegisteredUsers;
