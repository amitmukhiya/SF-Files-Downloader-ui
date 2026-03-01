import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <span>© 2026 SF File Downloader. All rights reserved.</span>
      <div className="footer-links">
        <Link to="/privacy-policy">Privacy Policy</Link>
        <Link to="/release-notes">Release Notes</Link>
        <Link to="/documentation">Documentation</Link>
      </div>
    </footer>
  );
}
