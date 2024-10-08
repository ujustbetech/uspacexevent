import React from 'react';
import Image from 'next/image';
import { BiLogOutCircle } from 'react-icons/bi';
import { IoMdLogIn } from 'react-icons/io';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router'; // Use the hook instead of directly importing Router

const Header = () => {
  const router = useRouter(); // Initializing the useRouter hook

  const handleLogout = () => {
    Swal.fire({
      title: 'Logout!',
      text: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: 'middle',
          icon: 'success',
          title: 'Logout',
          showConfirmButton: false,
          timer: 1500,
        });

        localStorage.removeItem('ucoreadmin');
        router.push('/admin/login'); // Use router.push instead of Router.push
      }
    });
  };

  return (
    <header className="wrapper m-header">
      {/* header */}
      <div className="headerLeft"></div>
      <div className="headerRight">
        {/* <div>
          <span>
            <IoMdLogIn />
          </span>
          <Link href="/admin/login">
            Login
          </Link>
        </div> */}
        <div>
          <span onClick={handleLogout} className="icon-rotate-90">
            <BiLogOutCircle />
          </span>
          Logout
        </div>
      </div>
    </header>
  );
};

export default Header;
