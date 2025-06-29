import React, { useState, useEffect } from "react";
import "./sideBar.css"; // Import the regular CSS file
import { NavLink } from "react-router-dom";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import LogoutIcon from '@mui/icons-material/Logout';
import { navData } from "./sidebardata";
import SidenavLogoOpened from "./SidenavLogo";
import SidenavLogoClosed from "./SidenavLogoClosed";
import SideNavCard from "./SideNavCard";

export default function Sidenav({ onLogout }) {
    const [open, setOpen] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            setOpen(window.innerWidth >= 767 || window.innerWidth >= 900);
        };

        handleResize(); // Set initial state based on window width

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className={open ? "sidenav" : "sidenavClosed"}>
            <button className="menuBtn" onClick={() => setOpen(!open)}>
                {open ? (
                    <>
                        <SidenavLogoOpened />
                        <KeyboardDoubleArrowLeftIcon />
                        <SideNavCard />
                    </>
                ) : (
                    <>
                        <SidenavLogoClosed />
                        <KeyboardDoubleArrowRightIcon />
                    </>
                )}
            </button>

            {navData.map((item) => (
                <NavLink
                    key={item.id}
                    className={`sideitem ${window.location.pathname === item.link ? 'active' : ''}`}
                    to={item.link}
                >
                    {item.icon}
                    {open && <span className="linkText">{item.text}</span>}
                </NavLink>
            ))}

            <div style={{
                display: 'flex',
                minHeight: '1vh',
                marginTop: '250px',
                justifyContent: 'flex-start'
            }}>
                <button type="button" onClick={onLogout} style={{ alignSelf: 'end', background: 'none', border: 'none', outline: 'none', cursor: 'pointer', padding: '0', flexWrap: "wrap", marginLeft: '10px', marginTop:'30px' }}>
                    <LogoutIcon />
                    {open && 'Logout'}
                </button>
            </div>
        </div>
    );
}
