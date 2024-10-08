// src/App.js
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { UserProvider } from './src/UserContext'; // Adjust the path as necessary
import Login from './pages/login';
import EventRegistration from './pages/events/[eventId]';
import UploadExcel from './pages/upload-excel';

const App = () => {
  return (
    <UserProvider>
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/events/:eventId" element={<EventRegistration />} />
          <Route path="/upload-excel" element={<UploadExcel />} />
          {/* Add more routes as necessary */}
        </Routes>
      </div>
    </Router>
  </UserProvider>
  );
};

export default App;
