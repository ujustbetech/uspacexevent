import { useState } from 'react';
import { db } from '../../firebaseConfig'; // Adjust the path to your Firebase setup
import { collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
import Header from '../../component/Header';
import Navbar from '../../component/Navbar';

const CreateEvent = () => {
  const [eventName, setEventName] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [agendaPoints, setAgendaPoints] = useState(['']); // Array to handle multiple agenda points
  const [zoomLink, setZoomLink] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleAddAgendaPoint = () => {
    setAgendaPoints([...agendaPoints, '']); // Add a new empty agenda point
  };

  const handleRemoveAgendaPoint = (index) => {
    const updatedPoints = agendaPoints.filter((_, i) => i !== index);
    setAgendaPoints(updatedPoints); // Remove the selected agenda point
  };

  const handleAgendaChange = (index, value) => {
    const updatedPoints = [...agendaPoints];
    updatedPoints[index] = value; // Update the specific agenda point
    setAgendaPoints(updatedPoints);
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    if (!eventName || !eventTime || !zoomLink || agendaPoints.some(point => point === '')) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const monthlyMeetRef = collection(db, 'monthlymeet');
      const uniqueId = doc(monthlyMeetRef).id; // Generate a unique ID
      const eventDocRef = doc(monthlyMeetRef, uniqueId);

      await setDoc(eventDocRef, {
        name: eventName,
        time: Timestamp.fromDate(new Date(eventTime)),
        agenda: agendaPoints, // Save agenda points as an array
        zoomLink: zoomLink,
        uniqueId: uniqueId,
      });

      setSuccess('Event created successfully!');
      setEventName('');
      setEventTime('');
      setAgendaPoints(['']);
      setZoomLink('');
      setError('');

      // Redirect to the event details page
      return router.push(`/events/${uniqueId}`);
    } catch (error) {
      setError('Error creating event. Please try again.');
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
    <div className="leave-requests-container">
    <div className="leave-container">
          <h2>Create New Event</h2>
          <button className="m-button-5" onClick={() => window.history.back()}>
    Back
  </button>
          <div className="form-group">
          <form onSubmit={handleCreateEvent}>
            <input
              type="text"
              placeholder="Event Name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
            />
            <input
              type="datetime-local"
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
              required
            />

            {/* Dynamic agenda input fields */}
            <h3>Agenda</h3>
{agendaPoints.map((point, index) => (
  <div key={index} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '10px' }}>
    <textarea
      value={point}
      onChange={(e) => handleAgendaChange(index, e.target.value)}
      placeholder={`Agenda Point ${index + 1}`}
      required
      rows={3} 
      style={{ width: '300px', marginRight: '10px' }}
    />
    {agendaPoints.length > 1 && (
      <button
        type="button"
        onClick={() => handleRemoveAgendaPoint(index)}
        style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px' }}
      >
        Remove
      </button>
    )}
  </div>
))}


            <input
              type="text"
              placeholder="Zoom Link"
              value={zoomLink}
              onChange={(e) => setZoomLink(e.target.value)}
              required
            />
            <button className="m-button" type="submit">Create Event</button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
        </div>
        </div>
        
      </main>
    </>
  );
};

export default CreateEvent;
