import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/documentation", label: "Documentation" },
  { path: "/release-notes", label: "Release Notes" },
  { path: "/privacy-policy", label: "Privacy Policy" },
];

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <button className="nav-logo" onClick={() => navigate("/")}>
        <span className="logo-sq">⬇</span>
        SF File Downloader
      </button>

      <div className="nav-links">
        {NAV_LINKS.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/"}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>

      <button
        className="nav-cta"
        onClick={() => navigate("/documentation")}
        aria-label="Install Extension"
      >
        ⬇ <span>Add to Chrome</span>
      </button>
    </nav>
  );
}
