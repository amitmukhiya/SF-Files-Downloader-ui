import React from "react";
import useReveal from "../../hooks/useReveal";
import "./ReleaseNotes.css";

const RELEASES = [
  {
    version: "v1.0.0",
    date: "2025-06-01",
    badge: "LATEST",
    label: "INITIAL RELEASE — Chrome Web Store",
    changes: [
      "Initial public release on the Chrome Web Store",
      "Bulk download Salesforce ContentVersion files via Excel (.xlsx) upload",
      "Automatic session detection from active Salesforce tab using the sid cookie",
      "SOAP login fallback for manual authentication (production and sandbox orgs)",
      "Configurable concurrency — 1 to 10 simultaneous downloads",
      "Smart deduplication — already-downloaded files are skipped automatically",
      "S3 presigned URL support for NEILON file types (credential-free fetch)",
      "Optional Claude AI integration via Anthropic API for column mapping and debugging",
      "Real-time download progress UI with per-file status and error reporting",
      "Files saved under sf_downloads/ in Chrome's configured Downloads folder",
      "Support for production (.my.salesforce.com) and sandbox (.sandbox.my.salesforce.com) orgs",
      "Microsoft Defender MCAS proxy suffix stripping for enterprise environments",
    ],
  },
];

export default function ReleaseNotes() {
  useReveal();

  return (
    <main>
      <div className="page-wrap">
        <div className="sec-eyebrow">Changelog</div>
        <h2 className="sec-h">Release Notes</h2>
        <p className="sec-lead">
          All changes to SF File Downloader, newest first. Each version is
          published on the Chrome Web Store.
        </p>

        {RELEASES.map((r) => (
          <div className="release-card reveal" key={r.version}>
            <div className="release-head">
              <div className="release-meta">
                <span className="rel-ver">{r.version}</span>
                <span className="rel-badge">{r.badge}</span>
              </div>
              <span className="rel-date">{r.date}</span>
            </div>

            <div className="release-body">
              <p className="release-label">{r.label}</p>
              {r.changes.map((text, i) => (
                <div className="change-row" key={i}>
                  <span className="change-tag">NEW</span>
                  <span className="change-text">{text}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="callout callout-blue reveal">
          <strong>Roadmap:</strong> Upcoming releases will include ZIP export,
          partial download resumption, multi-org session management, and a
          download history log.
        </div>
      </div>
    </main>
  );
}
