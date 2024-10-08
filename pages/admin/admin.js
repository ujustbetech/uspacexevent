import Link from 'next/link';
import Header from '../../component/Header';
import Navbar from '../../component/Navbar';
import Image from 'next/image';
import '../index.css';



const AdminDashboard = () => {
  return (
    <>
    <Header/>
   
     <div className='logoContainer'>
      <img  src="/ujustlogo.png"  alt="Logo" className="logos" />
    </div> 
     <Navbar/>
    <main className='maincontainer'>
    <div>
      {/* <h1>Admin Dashboard</h1> */}
      {/* <nav>
        <ul>
          <li>
            <Link href="/create-event">Create New Event</Link>
          </li>
          <li>
            <Link href="/manage-event">Manage Events</Link>
          </li>
        </ul>
      </nav> */}
    </div>
    </main>
    </>
  );
};

export default AdminDashboard;
