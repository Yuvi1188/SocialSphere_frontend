import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { FaUserEdit, FaBell, FaVolumeMute, FaHeart, FaLock, FaUserFriends, FaBan, FaEyeSlash, FaEnvelope, FaTags, FaComments, FaShare, FaUserShield, FaEye, FaArchive, FaLanguage, FaGlobe, FaUserCog, FaQuestionCircle, FaExclamationCircle } from 'react-icons/fa';

const Settings = () => {
  const location = useLocation();

  return (
    <div className="flex ">
      <aside className="w-72 bg-black p-4 text-white overflow-y-auto fixed left-72 top-0 h-full">
        <IconContext.Provider value={{ className: 'inline-block mr-2 text-lg' }}>
          <nav className="space-y-4">
            <NavLink to="/editProfile" className={`flex items-center space-x-2 p-2 rounded-md hover:bg-gray-800 ${location.pathname.includes('editProfile') ? 'bg-gray-800' : ''}`} activeClassName="bg-gray-800">
              <FaUserEdit />
              <span>Edit Profile</span>
            </NavLink>
            <NavLink to="/notifications" className={`flex items-center space-x-2 p-2 rounded-md hover:bg-gray-800 ${location.pathname.includes('notifications') ? 'bg-gray-800' : ''}`} activeClassName="bg-gray-800">
              <FaBell />
              <span>Notifications</span>
            </NavLink>
            <NavLink to="/mutedAccounts" className={`flex items-center space-x-2 p-2 rounded-md hover:bg-gray-800 ${location.pathname.includes('mutedAccounts') ? 'bg-gray-800' : ''}`} activeClassName="bg-gray-800">
              <FaVolumeMute />
              <span>Muted Accounts</span>
            </NavLink>
            <NavLink to="/likeShareCounts" className={`flex items-center space-x-2 p-2 rounded-md hover:bg-gray-800 ${location.pathname.includes('likeShareCounts') ? 'bg-gray-800' : ''}`} activeClassName="bg-gray-800">
              <FaHeart />
              <span>Like and Share Counts</span>
            </NavLink>
            <NavLink to="/accountPrivacy" className={`flex items-center space-x-2 p-2 rounded-md hover:bg-gray-800 ${location.pathname.includes('accountPrivacy') ? 'bg-gray-800' : ''}`} activeClassName="bg-gray-800">
              <FaLock />
              <span>Account Privacy</span>
            </NavLink>
            <NavLink to="/closeFriends" className={`flex items-center space-x-2 p-2 rounded-md hover:bg-gray-800 ${location.pathname.includes('closeFriends') ? 'bg-gray-800' : ''}`} activeClassName="bg-gray-800">
              <FaUserFriends />
              <span>Close Friends</span>
            </NavLink>
            <NavLink to="/blocked" className={`flex items-center space-x-2 p-2 rounded-md hover:bg-gray-800 ${location.pathname.includes('blocked') ? 'bg-gray-800' : ''}`} activeClassName="bg-gray-800">
              <FaBan />
              <span>Blocked</span>
            </NavLink>
            <NavLink to="/hideStoryAndLive" className={`flex items-center space-x-2 p-2 rounded-md hover:bg-gray-800 ${location.pathname.includes('hideStoryAndLive') ? 'bg-gray-800' : ''}`} activeClassName="bg-gray-800">
              <FaEyeSlash />
              <span>Hide Story and Live</span>
            </NavLink>
            <NavLink to="/messageAndStoryReplies" className={`flex items-center space-x-2 p-2 rounded-md hover:bg-gray-800 ${location.pathname.includes('messageAndStoryReplies') ? 'bg-gray-800' : ''}`} activeClassName="bg-gray-800">
              <FaEnvelope />
              <span>Message and Story Replies</span>
            </NavLink>
            <NavLink to="/tagsAndMentions" className={`flex items-center space-x-2 p-2 rounded-md hover:bg-gray-800 ${location.pathname.includes('tagsAndMentions') ? 'bg-gray-800' : ''}`} activeClassName="bg-gray-800">
              <FaTags />
              <span>Tags and Mentions</span>
            </NavLink>
            <NavLink to="/comments" className={`flex items-center space-x-2 p-2 rounded-md hover:bg-gray-800 ${location.pathname.includes('comments') ? 'bg-gray-800' : ''}`} activeClassName="bg-gray-800">
              <FaComments />
              <span>Comments</span>
            </NavLink>
            <NavLink to="/sharing" className={`flex items-center space-x-2 p-2 rounded-md hover:bg-gray-800 ${location.pathname.includes('sharing') ? 'bg-gray-800' : ''}`} activeClassName="bg-gray-800">
              <FaShare />
              <span>Sharing</span>
            </NavLink>
            <NavLink to="/restrictedAccounts" className={`flex items-center space-x-2 p-2 rounded-md hover:bg-gray-800 ${location.pathname.includes('restrictedAccounts') ? 'bg-gray-800' : ''}`} activeClassName="bg-gray-800">
              <FaUserShield />
              <span>Restricted Accounts</span>
            </NavLink>
            <NavLink to="/hiddenWords" className={`flex items-center space-x-2 p-2 rounded-md hover:bg-gray-800 ${location.pathname.includes('hiddenWords') ? 'bg-gray-800' : ''}`} activeClassName="bg-gray-800">
              <FaEye />
              <span>Hidden Words</span>
            </NavLink>
            <NavLink to="/archivingAndDownloading" className={`flex items-center space-x-2 p-2 rounded-md hover:bg-gray-800 ${location.pathname.includes('archivingAndDownloading') ? 'bg-gray-800' : ''}`} activeClassName="bg-gray-800">
              <FaArchive />
              <span>Archiving and Downloading</span>
            </NavLink>
            <NavLink to="/language" className={`flex items-center space-x-2 p-2 rounded-md hover:bg-gray-800 ${location.pathname.includes('language') ? 'bg-gray-800' : ''}`} activeClassName="bg-gray-800">
              <FaLanguage />
              <span>Language</span>
            </NavLink>
            <NavLink to="/websitesPermissions" className={`flex items-center space-x-2 p-2 rounded-md hover:bg-gray-800 ${location.pathname.includes('websitesPermissions') ? 'bg-gray-800' : ''}`} activeClassName="bg-gray-800">
              <FaGlobe />
              <span>Websites Permissions</span>
            </NavLink>
            <NavLink to="/supervision" className={`flex items-center space-x-2 p-2 rounded-md hover:bg-gray-800 ${location.pathname.includes('supervision') ? 'bg-gray-800' : ''}`} activeClassName="bg-gray-800">
              <FaUserCog />
              <span>Supervision</span>
            </NavLink>
            <NavLink to="/accountTypeAndTools" className={`flex items-center space-x-2 p-2 rounded-md hover:bg-gray-800 ${location.pathname.includes('accountTypeAndTools') ? 'bg-gray-800' : ''}`} activeClassName="bg-gray-800">
              <FaUserCog />
              <span>Account Type and Tools</span>
            </NavLink>
            <NavLink to="/help" className={`flex items-center space-x-2 p-2 rounded-md hover:bg-gray-800 ${location.pathname.includes('help') ? 'bg-gray-800' : ''}`} activeClassName="bg-gray-800">
              <FaQuestionCircle />
              <span>Help</span>
            </NavLink>
            <NavLink to="/accountStatus" className={`flex items-center space-x-2 p-2 rounded-md hover:bg-gray-800 ${location.pathname.includes('accountStatus') ? 'bg-gray-800' : ''}`} activeClassName="bg-gray-800">
              <FaExclamationCircle />
              <span>Account Status</span>
            </NavLink>
          </nav>
        </IconContext.Provider>
      </aside>

    </div>
  );
};

export default Settings;