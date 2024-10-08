import React from 'react';
import { AiOutlineHome } from "react-icons/ai";
import { MdEventAvailable } from "react-icons/md";
import { MdOutlineContentPaste } from "react-icons/md";
import { RiListSettingsLine } from "react-icons/ri";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { FaAward } from "react-icons/fa";
import { BsAward } from "react-icons/bs";
import { FiAward } from "react-icons/fi";
import { MdLocalPostOffice } from "react-icons/md";
import { TfiAnnouncement } from "react-icons/tfi";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineNoteAdd } from "react-icons/md";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaRegFilePdf } from "react-icons/fa";
import Link from 'next/link';
import { useRouter } from "next/router";

const Navbar = (props) => {
    console.log("nav props",props.expand);

    const router = useRouter();

    return (
         <>
            <nav className={props.expand ? 'm-navbar expand' : 'm-navbar unexpand' }>
            <ul>
  {/* Event */}
  <li>
    <Link href=" ">
      <span className="icons"><MdEventAvailable /></span>
      <span className="linklabel">Event</span>
      <span className="submenuIcon"><MdOutlineKeyboardArrowDown /></span>
    </Link>
    <ul>
      <li>
      <Link href="/admin/create-event">
          Add Event
        </Link>
      </li>
      <li>
        <Link href="/admin/manage-event">
          Manage Events
        </Link>
      </li>
      
    </ul>
  </li>

  {/* Users */}
  <li>
    <Link href="/admin/userslist">
      <span className="icons"><FaRegUser /></span>
      <span className="linklabel">Users</span>
      <span className="submenuIcon"><MdOutlineKeyboardArrowDown /></span>
    </Link>
    <ul>
      <li>
        <Link href="/admin/userslist">
          Users Listing
        </Link>
      </li>
    </ul>
  </li>

  {/* Badges */}
  {/* <li>
    <Link href="/admin/addbadges">
      <span className="icons"><FaAward /></span>
      <span className="linklabel">Rewards</span>
      <span className="submenuIcon"><MdOutlineKeyboardArrowDown /></span>
    </Link>
    <ul>
      <li>
        <Link href="/admin/addbadges">
          Add Badges
        </Link>
      </li>
      <li>
        <Link href="/admin/badgeslist">
          Badges List
        </Link>
      </li>
    </ul>
  </li> */}

  {/* Settings */}
  <li>
    <Link href="/admin/upload-excel">
      <span className="icons"><RiListSettingsLine /></span>
      <span className="linklabel">Upload Excel</span>
    </Link>
  </li>
</ul>

            </nav>
        </>
    );
}

export default Navbar;
