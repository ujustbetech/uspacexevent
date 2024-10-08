import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { db } from '../firebaseConfig'; // Adjust the path to your Firebase setup
import { collection, doc, setDoc } from 'firebase/firestore';

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();
  const { eventName } = router.query; // Get the event name from URL

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send the phone number to your API to check if the user exists
      const response = await axios.post('https://api.ujustbe.com/mobile-check', {
        MobileNo: phoneNumber,
      });

      if (response.data.message[0].type === 'SUCCESS') {
        // Store the user information in local storage
        localStorage.setItem('userPhoneNumber', phoneNumber);

        // Register the user for the event
        await registerUserForEvent(eventName, phoneNumber);

        // Redirect back to the event details page
        router.push(`/events/${eventName}`);
      } else {
        setError('Phone number not registered.');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('Login failed. Please try again.');
    }
  };

  const registerUserForEvent = async (eventName, phoneNumber) => {
    try {
      // Create a document in the 'registeredUsers' sub-collection for the event
      const registeredUsersRef = collection(db, 'monthlymeet', eventName, 'registeredUsers');
      const userDocRef = doc(registeredUsersRef, phoneNumber); // Use phone number as document ID
      await setDoc(userDocRef, { phoneNumber }); // You can add more user info if needed
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className='mainContainer'>
      <div className="signin">
        <div className="loginInput">
      
      <form onSubmit={handleLogin}>
      <ul>
      <li>
        <input
          type="text"
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        </li>
        <li>
        <button type="submit">Login</button>
        </li>
        </ul>
      </form>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
    </div>
  );
};

export default LoginPage;
