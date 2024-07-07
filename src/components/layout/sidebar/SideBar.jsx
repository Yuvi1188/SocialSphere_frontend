import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { GoHomeFill } from "react-icons/go";
import { BsSearch, BsCompass, BsCameraReels, BsChatDots, BsHeart, BsPlusCircle, BsPerson } from "react-icons/bs";
import Drawer from "@mui/material/Drawer";
import SearchSideBar from './SearchSideBar';
import { FaBars } from 'react-icons/fa';
import NotificationsSideBar from "./NotificationsSideBar"; // Assuming you have a Notifications sidebar component
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../../../store/user-actions';

const SideBar = ({ onCreatePost }) => {
    const dispatch = useDispatch();
    const [activeComponent, setActiveComponent] = useState(null);
    const drawerRef = useRef(null);
    const user = useSelector((state) => state.user.user);


    const handleClick = (componentName, event) => {
        if (activeComponent === componentName) {
            setActiveComponent(null); // Close if the same component is clicked
        } else {
            setActiveComponent(componentName); // Open the drawer with the selected component
        }
        event.stopPropagation(); // Prevent event propagation
    };

    const handleClose = () => {
        setActiveComponent(null);
    };

    const handleLogout = () => {
        dispatch(logOutUser())
    }
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target)) {
                handleClose();
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    return (
        <div className="fixed top-0 left-0 h-full text-white p-3 border-r border-gray-600 flex flex-col justify-between" style={{ width: '220px', backgroundColor: '#010001' }}>
            <div>
                <NavLink to="/" className="flex items-center mb-3 text-white text-decoration-none">
                    <svg className="bi pe-none me-2" width="40" height="32"><use xlinkHref="#bootstrap"></use></svg>
                    <span className="fs-4">Sidebar</span>
                </NavLink>

                <ul className="nav flex-column mb-auto">
                    <li className="nav-item mb-3">
                        <NavLink to="/" end className={({ isActive }) => `nav-link flex items-center text-white ${isActive ? 'active' : ''}`}>
                            <GoHomeFill className="mr-4" size={24} />
                            <span>Home</span>
                        </NavLink>
                    </li>
                    <li className="nav-item mb-3" onClick={(event) => handleClick('search', event)}>
                        <div className="nav-link flex items-center text-white cursor-pointer">
                            <BsSearch className="mr-4" size={24} />
                            <span>Search</span>
                        </div>
                    </li>
                    <li className="nav-item mb-3">
                        <NavLink to="/explore" className={({ isActive }) => `nav-link flex items-center text-white ${isActive ? 'active' : ''}`}>
                            <BsCompass className="mr-4" size={24} />
                            <span>Explore</span>
                        </NavLink>
                    </li>
                    <li className="nav-item mb-3">
                        <NavLink to="/reels" className={({ isActive }) => `nav-link flex items-center text-white ${isActive ? 'active' : ''}`}>
                            <BsCameraReels className="mr-4" size={24} />
                            <span>Reels</span>
                        </NavLink>
                    </li>
                    <li className="nav-item mb-3">
                        <NavLink to="/messages" className={({ isActive }) => `nav-link flex items-center text-white ${isActive ? 'active' : ''}`}>
                            <BsChatDots className="mr-4" size={24} />
                            <span>Messages</span>
                        </NavLink>
                    </li>
                    <li className="nav-item mb-3" onClick={(event) => handleClick('notifications', event)}>
                        <div className="nav-link flex items-center text-white cursor-pointer">
                            <BsHeart className="mr-4" size={24} />
                            <span>Notifications</span>
                        </div>
                    </li>
                    <li className="nav-item mb-3">
                        <button onClick={onCreatePost} className="nav-link flex items-center text-white bg-transparent border-0">
                            <BsPlusCircle className="mr-4" size={24} />
                            <span>Create</span>
                        </button>
                    </li>
                    <li className="nav-item mb-3">
                        <NavLink to={`/profile/${user._id}`} className={({ isActive }) => `nav-link flex items-center text-white ${isActive ? 'active' : ''}`}>
                            <BsPerson className="mr-4" size={24} />
                            <span>Profile</span>
                        </NavLink>
                    </li>
                </ul>

            </div>
            <div className="dropdown ml-5">
                <button className="flex gap-3 items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <FaBars size={24} />
                    <span>More</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow dropup" style={{ backgroundColor: "#292929" }}>
                    <li><NavLink className="dropdown-item" to="/accounts">Settings</NavLink></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li className="dropdown-item" onClick={handleLogout}>Log out</li>
                </ul>
            </div>


            <Drawer
                anchor="left"
                open={activeComponent !== null}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        marginLeft: activeComponent !== null ? '65px' : '0', // Start transition after 65px
                        transition: 'margin-left 0.4s ease-in-out' // Add transition effect
                    }
                }}
                ModalProps={{
                    // keepMounted: true,
                    // onBackdropClick: handleClose,
                }}
                // variant="persistent"
                ref={drawerRef}
            >
                <div style={{ width: '100%' }}>
                    {activeComponent === 'search' && <SearchSideBar onClose={handleClose} />}
                    {activeComponent === 'notifications' && <NotificationsSideBar onClose={handleClose} />}
                </div>
            </Drawer>
        </div>
    );
};

export default SideBar;