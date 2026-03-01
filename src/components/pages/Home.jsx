import React from "react";
import { useNavigate } from "react-router-dom";
import useReveal from "../../hooks/useReveal";
import "./Home.css";

const FEATURES = [
  {
    icon: "⚡",
    title: "Concurrent Downloads",
    desc: "Up to 10 parallel downloads with a configurable thread count to maximize throughput.",
  },
  {
    icon: "📊",
    title: "Excel-Driven Workflow",
    desc: "Export via SOQL, upload the .xlsx — no URL copying, no scripting required.",
  },
  {
    icon: "🔐",
    title: "Session Auto-Detection",
    desc: "Reads your active Salesforce tab session cookie. No passwords stored anywhere.",
  },
  {
    icon: "☁️",
    title: "S3 Presigned URL Support",
    desc: "Works with both Salesforce-native files and NEILON S3 presigned URL file types.",
  },
  {
    icon: "🤖",
    title: "AI Field Mapping",
    desc: "Optional Claude AI assistant helps map non-standard columns and debug errors.",
  },
  {
    icon: "🛡️",
    title: "Smart Deduplication",
    desc: "Already-downloaded files are detected and skipped automatically.",
  },
];

export default function Home() {
  const navigate = useNavigate();
  useReveal();

  return (
    <main>
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-text">
            <div className="hero-eyebrow">Chrome Web Store · v1.0.0</div>
            <h1>
              Bulk Download<br />
              <em>Salesforce Files</em><br />
              at Scale
            </h1>
            <p className="hero-sub">
              Upload a Salesforce SOQL export, configure concurrency, and watch
              hundreds of Notes &amp; Attachments download automatically — no
              scripts, no servers.
            </p>
            <div className="btn-row">
              <button
                className="btn btn-solid"
                onClick={() => navigate("/documentation")}
              >
                ⬇ Add to Chrome — It's Free
              </button>
              <button
                className="btn btn-outline"
                onClick={() => navigate("/documentation")}
              >
                Read the Docs →
              </button>
            </div>
          </div>

          {/* Mock browser UI */}
          <div className="hero-visual" aria-hidden="true">
            <div className="browser-bar">
              <span className="b-dot" style={{ background: "#ff5f57" }} />
              <span className="b-dot" style={{ background: "#febc2e" }} />
              <span className="b-dot" style={{ background: "#28c840" }} />
              <span className="browser-url">
                chrome-extension://sf-downloader/app.html
              </span>
            </div>
            <div className="ext-ui">
              <div className="ext-row">
                <span className="ext-label">Session</span>
                <span className="ext-pill">● Auto Detected</span>
              </div>
              <div className="ext-row">
                <span className="ext-label">Org</span>
                <span className="ext-val">company.my.salesforce.com</span>
              </div>
              <div className="ext-row">
                <span className="ext-label">File</span>
                <span className="ext-val">export_cv_2025.xlsx (142 rows)</span>
              </div>
              <div className="ext-row">
                <span className="ext-label">Concurrency</span>
                <span className="ext-val">5 simultaneous</span>
              </div>
              <div className="ext-progress-wrap">
                <div className="ext-progress-label">
                  Downloading — 97 / 142 files
                </div>
                <div className="ext-progress">
                  <div className="ext-bar" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Feature strip ── */}
      <section className="feature-strip">
        {FEATURES.map((f) => (
          <div className="feature-item reveal" key={f.title}>
            <div className="fi-icon">{f.icon}</div>
            <div className="fi-title">{f.title}</div>
            <div className="fi-desc">{f.desc}</div>
          </div>
        ))}
      </section>

      {/* ── Quick start ── */}
      <div className="wide-wrap">
        <div className="sec-eyebrow">Quick Start</div>
        <h2 className="sec-h reveal">
          From SOQL export to<br />bulk download in minutes
        </h2>
        <p className="sec-lead reveal">
          Run this query in Salesforce Workbench, export the result to Excel,
          upload it to the extension, and hit Start. That's the entire workflow.
        </p>
        <div className="code-wrap reveal">
          <div className="code-head">
            <span className="fname">Salesforce Workbench · SOQL Query</span>
          </div>
          <pre>
{`SELECT  `}<span className="fn">Id</span>{`, `}<span className="fn">Title</span>{`, `}<span className="fn">FileExtension</span>{`, `}<span className="fn">ContentDocumentId</span>{`, `}<span className="fn">VersionData</span>{`
FROM    `}<span className="str">ContentVersion</span>{`
WHERE   IsLatest = `}<span className="str">true</span>{`
`}<span className="cm">-- Export to Excel → upload to extension → click Start</span>
          </pre>
        </div>

        <div className="home-steps reveal">
          {[
            { n: "1", label: "Install from Chrome Web Store" },
            { n: "2", label: "Open a Salesforce tab — session is auto-detected" },
            { n: "3", label: "Upload your Excel export" },
            { n: "4", label: "Click START DOWNLOAD" },
          ].map((s) => (
            <div className="home-step" key={s.n}>
              <span className="home-step-n">{s.n}</span>
              <span className="home-step-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
