import { useState, useEffect } from "react";

/* ─────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────── */
const style = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:       #f5f4f0;
    --paper:    #ffffff;
    --ink:      #141210;
    --ink2:     #3d3a35;
    --ink3:     #7a756c;
    --rule:     #e2dfd9;
    --accent:   #d4500a;
    --accent2:  #1a56db;
    --accent3:  #0e7a4e;
    --tag-bg:   #fdf1ec;
    --tag-bd:   #f3c5ad;
  }

  html { scroll-behavior: smooth; }
  body {
    background: var(--bg);
    color: var(--ink);
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    line-height: 1.6;
    overflow-x: hidden;
  }

  .mono { font-family: 'DM Mono', monospace; }

  nav {
    position: sticky; top: 0; z-index: 100;
    background: var(--paper);
    border-bottom: 1.5px solid var(--ink);
    display: flex; align-items: stretch;
  }
  .nav-logo {
    display: flex; align-items: center; gap: 10px;
    padding: 0 2rem; border-right: 1.5px solid var(--ink);
    font-weight: 700; font-size: 0.95rem; cursor: pointer;
    min-height: 56px; letter-spacing: -0.01em;
    text-decoration: none; color: var(--ink); white-space: nowrap;
    background: none; border-top: none; border-bottom: none;
    font-family: 'DM Sans', sans-serif;
  }
  .logo-sq {
    width: 28px; height: 28px; background: var(--ink); color: var(--paper);
    border-radius: 5px; display: flex; align-items: center; justify-content: center;
    font-size: 0.9rem; font-weight: 800; flex-shrink: 0;
  }
  .nav-links { display: flex; flex: 1; }
  .nav-link {
    background: none; border: none; border-right: 1px solid var(--rule);
    color: var(--ink2); font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem; font-weight: 500; cursor: pointer;
    padding: 0 1.4rem; white-space: nowrap;
    transition: background 0.15s, color 0.15s; letter-spacing: 0.01em;
  }
  .nav-link:hover { background: var(--tag-bg); color: var(--accent); }
  .nav-link.active { background: var(--ink); color: var(--paper); }
  .nav-cta {
    margin-left: auto; background: var(--accent); color: #fff;
    border: none; font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem; font-weight: 600; cursor: pointer;
    padding: 0 1.5rem; white-space: nowrap;
    display: flex; align-items: center; gap: 6px;
    transition: opacity 0.15s; letter-spacing: 0.01em;
  }
  .nav-cta:hover { opacity: 0.88; }

  .page-wrap { max-width: 860px; margin: 0 auto; padding: 3rem 2rem 6rem; }
  .wide-wrap  { max-width: 1080px; margin: 0 auto; padding: 3rem 2rem 6rem; }

  .hero { border-bottom: 1.5px solid var(--ink); background: var(--paper); }
  .hero-inner {
    max-width: 1080px; margin: 0 auto; padding: 5rem 2rem 0;
    display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: end;
  }
  .hero-eyebrow {
    font-family: 'DM Mono', monospace; font-size: 0.7rem;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 1.2rem;
    display: flex; align-items: center; gap: 8px;
  }
  .hero-eyebrow::before { content: ''; display: block; width: 24px; height: 1.5px; background: var(--accent); }
  .hero h1 {
    font-size: clamp(2.4rem, 5vw, 3.8rem); font-weight: 700;
    line-height: 1.07; letter-spacing: -0.04em; margin-bottom: 1.4rem;
  }
  .hero h1 em { font-style: normal; color: var(--accent); }
  .hero-sub { font-size: 1.05rem; color: var(--ink2); line-height: 1.7; margin-bottom: 2rem; max-width: 480px; }
  .btn-row { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 3rem; }
  .btn {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 0.72rem 1.4rem; font-family: 'DM Sans', sans-serif;
    font-size: 0.875rem; font-weight: 600; cursor: pointer;
    border-radius: 4px; transition: all 0.15s; border: 1.5px solid transparent;
    letter-spacing: 0.01em;
  }
  .btn-solid { background: var(--ink); color: var(--paper); border-color: var(--ink); }
  .btn-solid:hover { background: var(--accent); border-color: var(--accent); }
  .btn-outline { background: transparent; color: var(--ink); border-color: var(--ink); }
  .btn-outline:hover { background: var(--ink); color: var(--paper); }

  .hero-visual {
    align-self: end; border: 1.5px solid var(--ink); border-bottom: none;
    border-radius: 8px 8px 0 0; overflow: hidden; background: #f0ede8;
  }
  .browser-bar {
    background: var(--ink); padding: 0.6rem 1rem;
    display: flex; align-items: center; gap: 8px;
  }
  .b-dot { width: 9px; height: 9px; border-radius: 50%; }
  .browser-url {
    flex: 1; background: rgba(255,255,255,0.1); border-radius: 4px;
    padding: 3px 8px; font-family: 'DM Mono', monospace;
    font-size: 0.7rem; color: rgba(255,255,255,0.5); margin-left: 6px;
  }
  .ext-ui { padding: 1.25rem; }
  .ext-row { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
  .ext-label { font-size: 0.72rem; font-family: 'DM Mono', monospace; color: var(--ink3); width: 80px; flex-shrink: 0; }
  .ext-pill {
    background: #e8f4ec; border: 1px solid #a3d4b0; color: var(--accent3);
    font-size: 0.7rem; font-family: 'DM Mono', monospace; padding: 3px 10px; border-radius: 100px;
  }
  .ext-val { font-size: 0.78rem; font-family: 'DM Mono', monospace; color: var(--ink2); }
  .ext-progress { background: var(--rule); border-radius: 4px; height: 6px; overflow: hidden; margin-top: 8px; }
  .ext-bar { height: 100%; width: 68%; background: linear-gradient(90deg, var(--accent3), #34c97a); border-radius: 4px; }

  .feature-strip {
    border-top: 1.5px solid var(--ink); border-bottom: 1.5px solid var(--ink);
    background: var(--paper);
    display: grid; grid-template-columns: repeat(3, 1fr);
  }
  .feature-item {
    padding: 2rem; border-right: 1px solid var(--rule); transition: background 0.15s;
  }
  .feature-item:last-child { border-right: none; }
  .feature-item:hover { background: var(--tag-bg); }
  .fi-icon { font-size: 1.4rem; margin-bottom: 0.8rem; }
  .fi-title { font-size: 0.9rem; font-weight: 700; margin-bottom: 0.35rem; }
  .fi-desc { font-size: 0.825rem; color: var(--ink3); line-height: 1.6; }

  .sec-eyebrow {
    font-family: 'DM Mono', monospace; font-size: 0.68rem;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 0.6rem;
  }
  .sec-h { font-size: 2rem; font-weight: 700; letter-spacing: -0.03em; margin-bottom: 0.75rem; }
  .sec-lead { color: var(--ink2); line-height: 1.7; max-width: 620px; margin-bottom: 2.5rem; }

  hr.divider { border: none; border-top: 1px solid var(--rule); margin: 2.5rem 0; }

  .install-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 1px; background: var(--rule);
    border: 1px solid var(--rule); border-radius: 10px; overflow: hidden;
  }
  .install-card {
    background: var(--paper); padding: 1.75rem;
    display: flex; gap: 1.25rem; align-items: flex-start; transition: background 0.15s;
  }
  .install-card:hover { background: var(--tag-bg); }
  .step-n {
    flex-shrink: 0; width: 36px; height: 36px; border-radius: 50%;
    background: var(--ink); color: var(--paper);
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 0.85rem;
  }
  .step-body h3 { font-size: 0.95rem; font-weight: 700; margin-bottom: 0.35rem; }
  .step-body p { font-size: 0.85rem; color: var(--ink2); line-height: 1.6; }
  .step-body a { color: var(--accent2); text-decoration: underline; font-weight: 500; }

  .code-wrap {
    border: 1.5px solid var(--ink); border-radius: 8px; overflow: hidden; margin: 1.5rem 0;
    box-shadow: 4px 4px 0 var(--ink);
  }
  .code-head {
    background: var(--ink); color: rgba(255,255,255,0.55);
    padding: 0.6rem 1.1rem; font-family: 'DM Mono', monospace;
    font-size: 0.72rem; display: flex; align-items: center; gap: 8px;
  }
  .code-head .fname { color: #fff; font-weight: 500; }
  pre {
    background: #1c1a16; padding: 1.25rem 1.4rem;
    font-family: 'DM Mono', monospace; font-size: 0.8rem;
    line-height: 1.75; overflow-x: auto; color: #d4cfc7;
  }
  .kw { color: #e0935c; } .str { color: #8fc98e; }
  .cm { color: #636059; font-style: italic; } .fn { color: #79b8ff; }

  .callout {
    border-left: 3px solid var(--accent); background: var(--tag-bg);
    border-radius: 0 6px 6px 0; padding: 1rem 1.25rem;
    font-size: 0.875rem; color: var(--ink2); line-height: 1.65; margin: 1.25rem 0;
  }
  .callout strong { color: var(--ink); }
  .callout-blue { border-color: var(--accent2); background: #edf3ff; }
  .callout-green { border-color: var(--accent3); background: #edf7f2; }

  table { width: 100%; border-collapse: collapse; margin: 1rem 0; font-size: 0.85rem; }
  th {
    text-align: left; padding: 0.65rem 1rem;
    background: var(--ink); color: var(--paper);
    font-family: 'DM Mono', monospace; font-size: 0.72rem;
    letter-spacing: 0.06em; font-weight: 500;
  }
  td { padding: 0.65rem 1rem; border-bottom: 1px solid var(--rule); color: var(--ink2); vertical-align: top; }
  tr:last-child td { border-bottom: none; }
  tr:nth-child(even) td { background: #faf9f7; }
  .tag-green { color: var(--accent3); font-weight: 600; }
  .tag-orange { color: var(--accent); font-weight: 600; }
  .tag-blue { color: var(--accent2); font-weight: 600; }

  .policy-section { margin-bottom: 2.75rem; }
  .policy-section h3 {
    font-size: 1.05rem; font-weight: 700; margin-bottom: 0.75rem;
    padding-bottom: 0.5rem; border-bottom: 1px solid var(--rule);
    display: flex; align-items: center; gap: 0.6rem;
  }
  .policy-section h3 .sec-num {
    background: var(--accent); color: #fff;
    border-radius: 4px; font-size: 0.7rem; padding: 2px 7px;
    font-family: 'DM Mono', monospace; font-weight: 500;
  }
  .policy-section p { font-size: 0.9rem; color: var(--ink2); line-height: 1.8; margin-bottom: 0.75rem; }
  .policy-section ul { padding-left: 1.2rem; }
  .policy-section ul li { font-size: 0.875rem; color: var(--ink2); line-height: 1.7; margin-bottom: 0.3rem; }
  .policy-meta {
    background: var(--paper); border: 1.5px solid var(--ink); border-radius: 8px;
    padding: 1.5rem 2rem; display: grid; grid-template-columns: repeat(3,1fr);
    gap: 1rem; margin-bottom: 3rem; box-shadow: 4px 4px 0 var(--rule);
  }
  .meta-item label { display: block; font-family: 'DM Mono', monospace; font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink3); margin-bottom: 0.25rem; }
  .meta-item span { font-size: 0.875rem; font-weight: 600; color: var(--ink); }

  .release-card {
    border: 1.5px solid var(--ink); border-radius: 8px;
    overflow: hidden; margin-bottom: 1.75rem; box-shadow: 3px 3px 0 var(--rule);
  }
  .release-head {
    background: var(--ink); color: var(--paper);
    padding: 1rem 1.5rem; display: flex; align-items: center; justify-content: space-between;
  }
  .rel-ver { font-family: 'DM Mono', monospace; font-size: 1rem; font-weight: 500; }
  .rel-date { font-family: 'DM Mono', monospace; font-size: 0.75rem; color: rgba(255,255,255,0.5); }
  .rel-badge {
    font-size: 0.65rem; font-weight: 700; padding: 3px 9px;
    border-radius: 100px; letter-spacing: 0.08em; border: 1px solid;
  }
  .badge-latest { background: rgba(14,122,78,0.25); color: #4cd997; border-color: #4cd997; }
  .release-body { padding: 1.5rem; }
  .change-row { display: flex; gap: 10px; align-items: flex-start; margin-bottom: 0.75rem; }
  .change-tag {
    flex-shrink: 0; font-size: 0.62rem; font-weight: 700;
    padding: 2px 7px; border-radius: 3px; font-family: 'DM Mono', monospace;
    letter-spacing: 0.05em; margin-top: 3px;
  }
  .tag-new { background: #e8f7ef; color: var(--accent3); }
  .change-text { font-size: 0.875rem; color: var(--ink); line-height: 1.55; }

  footer {
    border-top: 1.5px solid var(--ink); background: var(--paper);
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.25rem 2rem; font-size: 0.8rem; color: var(--ink3);
  }

  .reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.55s ease, transform 0.55s ease; }
  .reveal.visible { opacity: 1; transform: none; }

  @media (max-width: 700px) {
    .hero-inner { grid-template-columns: 1fr; }
    .hero-visual { display: none; }
    .feature-strip { grid-template-columns: 1fr; }
    .install-grid { grid-template-columns: 1fr; }
    .policy-meta { grid-template-columns: 1fr; }
    .nav-cta span { display: none; }
    .nav-link { padding: 0 0.75rem; font-size: 0.75rem; }
  }
`;

function useReveal() {
  useEffect(() => {
    const run = () => {
      const els = document.querySelectorAll(".reveal");
      const obs = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
        { threshold: 0.1 }
      );
      els.forEach((el) => obs.observe(el));
      return () => obs.disconnect();
    };
    const cleanup = run();
    return cleanup;
  });
}

export default function App() {
  const [page, setPage] = useState("Home");
  useReveal();
  const pages = ["Home", "Documentation", "Release Notes", "Privacy Policy"];

  return (
    <>
      <style>{style}</style>
      <nav>
        <button className="nav-logo" onClick={() => setPage("Home")}>
          <div className="logo-sq">⬇</div>
          SF File Downloader
        </button>
        <div className="nav-links">
          {pages.map((p) => (
            <button key={p} className={`nav-link ${page === p ? "active" : ""}`} onClick={() => setPage(p)}>
              {p}
            </button>
          ))}
        </div>
        <button className="nav-cta" onClick={() => setPage("Documentation")}>
          ⬇ <span>Add to Chrome</span>
        </button>
      </nav>

      {page === "Home"           && <HomePage setPage={setPage} />}
      {page === "Documentation"  && <DocsPage />}
      {page === "Release Notes"  && <ReleasePage />}
      {page === "Privacy Policy" && <PrivacyPage />}

      <footer>
        <span>© 2025 SF File Downloader. All rights reserved.</span>
        <button style={{ background: "none", border: "none", color: "var(--accent2)", cursor: "pointer", fontSize: "0.8rem", textDecoration: "underline" }} onClick={() => setPage("Privacy Policy")}>
          Privacy Policy
        </button>
      </footer>
    </>
  );
}

/* ── HOME ─────────────────────────────────── */
function HomePage({ setPage }) {
  return (
    <main>
      <div className="hero">
        <div className="hero-inner">
          <div>
            <div className="hero-eyebrow">Chrome Web Store · v1.0.0</div>
            <h1>Bulk Download<br /><em>Salesforce Files</em><br />at Scale</h1>
            <p className="hero-sub">
              Upload a Salesforce SOQL export, configure concurrency, and watch hundreds of
              Notes &amp; Attachments download automatically — no scripts, no servers.
            </p>
            <div className="btn-row">
              <button className="btn btn-solid" onClick={() => setPage("Documentation")}>
                ⬇ Add to Chrome — It's Free
              </button>
              <button className="btn btn-outline" onClick={() => setPage("Documentation")}>
                Read the Docs →
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="browser-bar">
              <div className="b-dot" style={{ background: "#ff5f57" }} />
              <div className="b-dot" style={{ background: "#febc2e" }} />
              <div className="b-dot" style={{ background: "#28c840" }} />
              <div className="browser-url">chrome-extension://sf-downloader/app.html</div>
            </div>
            <div className="ext-ui">
              <div className="ext-row"><span className="ext-label">Session</span><span className="ext-pill">● Auto Detected</span></div>
              <div className="ext-row"><span className="ext-label">Org</span><span className="ext-val">company.my.salesforce.com</span></div>
              <div className="ext-row"><span className="ext-label">File</span><span className="ext-val">export_cv_2025.xlsx (142 rows)</span></div>
              <div className="ext-row"><span className="ext-label">Concurrency</span><span className="ext-val">5 simultaneous</span></div>
              <div style={{ marginTop: "1rem" }}>
                <div style={{ fontSize: "0.72rem", fontFamily: "DM Mono", color: "var(--ink3)", marginBottom: "6px" }}>Downloading — 97 / 142 files</div>
                <div className="ext-progress"><div className="ext-bar" /></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="feature-strip">
        {[
          { icon: "⚡", title: "Concurrent Downloads", desc: "Up to 10 parallel downloads with configurable thread count." },
          { icon: "📊", title: "Excel-Driven Workflow", desc: "Export via SOQL, upload the .xlsx — no URL copying required." },
          { icon: "🔐", title: "Session Auto-Detection", desc: "Reads your active Salesforce tab. No passwords stored anywhere." },
          { icon: "☁️", title: "S3 Presigned URL Support", desc: "Works with Salesforce-native files and NEILON S3 presigned URLs." },
          { icon: "🤖", title: "AI Field Mapping", desc: "Optional Claude AI assistant helps map columns and debug errors." },
          { icon: "🛡️", title: "Smart Deduplication", desc: "Already-downloaded files are detected and skipped automatically." },
        ].map((f) => (
          <div className="feature-item reveal" key={f.title}>
            <div className="fi-icon">{f.icon}</div>
            <div className="fi-title">{f.title}</div>
            <div className="fi-desc">{f.desc}</div>
          </div>
        ))}
      </div>

      <div className="wide-wrap">
        <div className="sec-eyebrow">Quick Start</div>
        <h2 className="sec-h reveal">From SOQL export to<br />bulk download in minutes</h2>
        <div className="code-wrap reveal">
          <div className="code-head"><span className="fname">Salesforce Workbench · SOQL Query</span></div>
          <pre><span className="kw">SELECT</span>  <span className="fn">Id</span>, <span className="fn">Title</span>, <span className="fn">FileExtension</span>, <span className="fn">ContentDocumentId</span>, <span className="fn">VersionData</span>{"\n"}<span className="kw">FROM</span>    <span className="str">ContentVersion</span>{"\n"}<span className="kw">WHERE</span>   IsLatest = <span className="str">true</span>{"\n"}<span className="cm">-- Export to Excel → upload to extension → click Start</span></pre>
        </div>
      </div>
    </main>
  );
}

/* ── DOCS ─────────────────────────────────── */
function DocsPage() {
  const [activeTab, setActiveTab] = useState("install");
  const tabs = [
    { id: "install",  label: "Installation" },
    { id: "export",   label: "Export from Salesforce" },
    { id: "download", label: "Running Downloads" },
    { id: "ai",       label: "AI Assistant" },
    { id: "s3",       label: "S3 / NEILON Files" },
    { id: "faq",      label: "Troubleshooting" },
  ];
  return (
    <main style={{ display: "flex", minHeight: "calc(100vh - 56px)" }}>
      <aside style={{ width: "220px", flexShrink: 0, borderRight: "1.5px solid var(--ink)", background: "var(--paper)", padding: "2rem 0", position: "sticky", top: "56px", height: "calc(100vh - 56px)", overflowY: "auto" }}>
        <div style={{ padding: "0 1.25rem 1rem", fontSize: "0.68rem", fontFamily: "DM Mono", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink3)" }}>Contents</div>
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ display: "block", width: "100%", background: activeTab === t.id ? "var(--tag-bg)" : "none", border: "none", borderLeft: activeTab === t.id ? "3px solid var(--accent)" : "3px solid transparent", padding: "0.6rem 1.25rem", textAlign: "left", cursor: "pointer", fontSize: "0.85rem", color: activeTab === t.id ? "var(--accent)" : "var(--ink2)", fontWeight: activeTab === t.id ? "600" : "400", fontFamily: "DM Sans, sans-serif" }}>
            {t.label}
          </button>
        ))}
        <div style={{ margin: "2rem 1.25rem 0", background: "var(--ink)", borderRadius: "6px", padding: "1rem" }}>
          <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.55)", marginBottom: "0.5rem", fontFamily: "DM Mono" }}>Available on</div>
          <div style={{ fontSize: "0.85rem", color: "#fff", fontWeight: 600, marginBottom: "0.75rem" }}>Chrome Web Store</div>
          <div style={{ background: "var(--accent)", borderRadius: "4px", padding: "0.5rem 0.75rem", fontSize: "0.78rem", color: "#fff", fontWeight: 600, textAlign: "center", cursor: "pointer" }}>⬇ Add to Chrome</div>
        </div>
      </aside>
      <div style={{ flex: 1 }}>
        <div className="page-wrap">
          {activeTab === "install"  && <DocInstall />}
          {activeTab === "export"   && <DocExport />}
          {activeTab === "download" && <DocDownload />}
          {activeTab === "ai"       && <DocAI />}
          {activeTab === "s3"       && <DocS3 />}
          {activeTab === "faq"      && <DocFAQ />}
        </div>
      </div>
    </main>
  );
}

function DocInstall() {
  return (
    <>
      <div className="sec-eyebrow">Installation</div>
      <h2 className="sec-h">Install from the Chrome Web Store</h2>
      <p className="sec-lead">SF File Downloader is published on the Chrome Web Store. No developer mode or sideloading required — install in seconds.</p>
      <div className="callout callout-blue reveal"><strong>Requires Google Chrome (desktop).</strong> Not compatible with Firefox, Safari, or Edge at this time.</div>
      <div className="install-grid reveal">
        {[
          { n: "1", title: "Visit the Chrome Web Store", body: <>Search for <strong>"SF File Downloader"</strong> on the Chrome Web Store, or follow the direct listing link from this page.</> },
          { n: "2", title: 'Click "Add to Chrome"', body: <>A permissions dialog will appear listing the required access. Review it and click <strong>Add extension</strong> to confirm.</> },
          { n: "3", title: "Pin the Extension", body: <>Click the 🧩 puzzle icon in your Chrome toolbar and pin <strong>SF File Downloader</strong> for one-click access.</> },
          { n: "4", title: "Open a Salesforce Tab", body: "Log into your Salesforce org in any Chrome tab. The extension auto-detects your session when you open it." },
        ].map((s) => (
          <div className="install-card" key={s.n}>
            <div className="step-n">{s.n}</div>
            <div className="step-body"><h3>{s.title}</h3><p>{s.body}</p></div>
          </div>
        ))}
      </div>
      <hr className="divider" />
      <h3 style={{ fontWeight: 700, marginBottom: "1rem" }}>Why These Permissions Are Required</h3>
      <table className="reveal">
        <thead><tr><th>Permission</th><th>Purpose</th></tr></thead>
        <tbody>
          {[
            ["downloads", "Saves fetched file bytes to your local Downloads folder via the Chrome Downloads API"],
            ["storage", "Caches your Salesforce session between extension opens — stored locally, never synced"],
            ["tabs", "Identifies which Salesforce org you're logged into by checking open tab URLs"],
            ["cookies", "Reads the Salesforce sid session cookie to authenticate API calls"],
            ["scripting", "Injects a lightweight script to capture your org's normalized hostname"],
          ].map(([p, r]) => (
            <tr key={p}><td><code style={{ fontFamily: "DM Mono", fontSize: "0.78rem", color: "var(--accent)" }}>{p}</code></td><td>{r}</td></tr>
          ))}
        </tbody>
      </table>
      <div className="callout callout-green reveal" style={{ marginTop: "1.5rem" }}>
        <strong>No remote servers.</strong> All data stays on your machine. The extension only contacts your Salesforce org, AWS S3 (for presigned URLs), and optionally Anthropic's API if you enable AI features.
      </div>
    </>
  );
}

function DocExport() {
  return (
    <>
      <div className="sec-eyebrow">Salesforce Export</div>
      <h2 className="sec-h">Exporting Files from Salesforce</h2>
      <p className="sec-lead">The extension works from a standard Salesforce SOQL query export. Use Workbench, Data Loader, or any tool that exports results to Excel (.xlsx).</p>
      <h3 style={{ fontWeight: 700, marginBottom: "0.75rem" }}>Required SOQL Query</h3>
      <div className="code-wrap reveal">
        <div className="code-head"><span className="fname">workbench-export.soql</span></div>
        <pre><span className="kw">SELECT</span>{"\n"}  <span className="fn">Id</span>,{"\n"}  <span className="fn">Title</span>,{"\n"}  <span className="fn">FileExtension</span>,{"\n"}  <span className="fn">ContentDocumentId</span>,{"\n"}  <span className="fn">VersionData</span>{"\n"}<span className="kw">FROM</span> <span className="str">ContentVersion</span>{"\n"}<span className="kw">WHERE</span> IsLatest = <span className="str">true</span>{"\n"}{"\n"}<span className="cm">-- Optional: filter by parent record</span>{"\n"}<span className="kw">AND</span>  FirstPublishLocationId = <span className="str">'001XXXXXXXXXXXXXXX'</span></pre>
      </div>
      <h3 style={{ fontWeight: 700, margin: "2rem 0 0.75rem" }}>Required Excel Columns</h3>
      <table className="reveal">
        <thead><tr><th>Column</th><th>Example</th><th>Required?</th></tr></thead>
        <tbody>
          {[
            ["Title", "Q4 Invoice", "Yes"],
            ["FileExtension", "pdf", "Yes"],
            ["VersionData", "/services/data/v65.0/sobjects/ContentVersion/.../VersionData", "Yes"],
            ["Id", "068XXXXXXXXXXXXXXX", "Recommended"],
            ["ContentDocumentId", "069XXXXXXXXXXXXXXX", "Recommended"],
          ].map(([c, e, r]) => (
            <tr key={c}><td><code style={{ fontFamily: "DM Mono", fontSize: "0.78rem" }}>{c}</code></td><td style={{ color: "var(--ink3)", fontSize: "0.82rem" }}>{e}</td><td className={r === "Yes" ? "tag-orange" : "tag-blue"}>{r}</td></tr>
          ))}
        </tbody>
      </table>
      <div className="callout reveal" style={{ marginTop: "1.5rem" }}>
        <strong>Tip:</strong> Column headers are case-sensitive. If your export uses different names, use the optional AI assistant to auto-map them.
      </div>
    </>
  );
}

function DocDownload() {
  return (
    <>
      <div className="sec-eyebrow">Running Downloads</div>
      <h2 className="sec-h">Starting a Bulk Download</h2>
      <p className="sec-lead">Once installed and connected to a Salesforce session, a bulk download is four steps.</p>
      {[
        { n: "1", title: "Open the Extension", body: "Click the SF File Downloader icon in your Chrome toolbar. It opens as a full tab for a better workspace." },
        { n: "2", title: "Verify Your Session", body: "Your Salesforce org URL and username appear automatically. If not, click ↻ Refresh or use the SOAP login form for manual authentication." },
        { n: "3", title: "Upload Your Excel File", body: "Drag and drop your exported .xlsx file. The extension validates the column structure and shows a row count." },
        { n: "4", title: "Configure & Start", body: "Set concurrency (1–10), toggle skip-existing if partially downloaded before, then click START DOWNLOAD." },
      ].map((s) => (
        <div className="install-card reveal" key={s.n} style={{ border: "1px solid var(--rule)", borderRadius: "8px", marginBottom: "1rem" }}>
          <div className="step-n">{s.n}</div>
          <div className="step-body"><h3>{s.title}</h3><p>{s.body}</p></div>
        </div>
      ))}
      <h3 style={{ fontWeight: 700, margin: "2rem 0 0.75rem" }}>Download Settings</h3>
      <table className="reveal">
        <thead><tr><th>Setting</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          {[
            ["Concurrency", "3", "Number of files downloaded simultaneously (1–10)"],
            ["Skip Existing", "On", "Files already in sf_downloads/ are skipped"],
            ["Save Path", "sf_downloads/", "Subfolder inside your Chrome Downloads directory"],
          ].map(([s, d, desc]) => (
            <tr key={s}><td><strong>{s}</strong></td><td><code style={{ fontFamily: "DM Mono", fontSize: "0.78rem" }}>{d}</code></td><td style={{ color: "var(--ink2)" }}>{desc}</td></tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function DocAI() {
  return (
    <>
      <div className="sec-eyebrow">AI Assistant</div>
      <h2 className="sec-h">Claude AI Integration</h2>
      <p className="sec-lead">An optional AI assistant powered by Claude (Anthropic) helps map non-standard column names, troubleshoot errors, and answer process questions.</p>
      <div className="callout reveal"><strong>Entirely Optional.</strong> Disabled by default. You must supply your own Anthropic API key. Standard Anthropic pricing applies to your key.</div>
      {[
        { n: "1", title: "Get an Anthropic API Key", body: <><a href="https://console.anthropic.com" target="_blank" rel="noreferrer">console.anthropic.com</a> → create an API key under your account.</> },
        { n: "2", title: "Enter the Key in Settings", body: "Open the extension, click ⚙ Settings, paste your key into the Anthropic API Key field." },
        { n: "3", title: "Use the Assistant", body: "The assistant button becomes active. Ask it to map columns, explain errors, or suggest SOQL fixes." },
      ].map((s) => (
        <div className="install-card reveal" key={s.n} style={{ border: "1px solid var(--rule)", borderRadius: "8px", marginBottom: "1rem" }}>
          <div className="step-n">{s.n}</div>
          <div className="step-body"><h3>{s.title}</h3><p>{s.body}</p></div>
        </div>
      ))}
      <div className="callout callout-blue reveal">
        <strong>Privacy:</strong> Your API key is stored in Chrome local storage only. It is sent exclusively to <code style={{ fontFamily: "DM Mono", fontSize: "0.8rem" }}>api.anthropic.com</code> when you explicitly trigger an AI request. No key data is ever sent to any other server.
      </div>
    </>
  );
}

function DocS3() {
  return (
    <>
      <div className="sec-eyebrow">S3 / NEILON Files</div>
      <h2 className="sec-h">S3 Presigned URL Support</h2>
      <p className="sec-lead">The extension supports Salesforce-native file paths and NEILON S3 presigned URLs. Format is detected automatically — no configuration required.</p>
      <table className="reveal">
        <thead><tr><th>File Type</th><th>VersionData Format</th><th>Auth Method</th></tr></thead>
        <tbody>
          {[
            ["Salesforce Native", "/services/data/v65.0/sobjects/ContentVersion/.../VersionData", "Bearer token (your sid)"],
            ["NEILON S3", "https://bucket.s3.amazonaws.com/...?X-Amz-Signature=...", "No auth (signed URL contains credentials)"],
          ].map(([t, f, a]) => (
            <tr key={t}><td><strong>{t}</strong></td><td style={{ fontFamily: "DM Mono", fontSize: "0.75rem", color: "var(--ink3)", wordBreak: "break-all" }}>{f}</td><td>{a}</td></tr>
          ))}
        </tbody>
      </table>
      <div className="callout callout-green reveal" style={{ marginTop: "1.5rem" }}>
        <strong>Mixed files:</strong> Your Excel can contain both Salesforce-native and S3 URLs in the same sheet. Each row is handled correctly based on its URL pattern.
      </div>
    </>
  );
}

function DocFAQ() {
  const faqs = [
    { q: "Session not detected automatically", a: "Ensure you have an active Salesforce tab open before clicking the extension icon. If the tab was open before installation, refresh the Salesforce tab and try ↻ Refresh in the extension." },
    { q: "HTTP 401 / Unauthorized errors", a: "Your Salesforce session may have expired. Refresh your Salesforce tab to renew the sid cookie, then click ↻ Refresh in the extension." },
    { q: "Files download with wrong or missing extension", a: "Verify that the FileExtension column in your Excel is populated correctly. Values like 'pdf' or 'docx' without dots are expected." },
    { q: "Downloads are very slow", a: "Increase the concurrency setting (up to 10). Note that very high concurrency may approach Salesforce API governor limits for some orgs." },
    { q: "Extension shows wrong org URL", a: "If multiple Salesforce tabs are open, close all but the correct one and click ↻ Refresh. The extension uses the first matching tab it finds." },
    { q: "AI assistant not responding", a: "Verify your Anthropic API key is correct and has available balance. Open the browser console (F12) for specific API error messages." },
  ];
  return (
    <>
      <div className="sec-eyebrow">Troubleshooting</div>
      <h2 className="sec-h">Common Issues</h2>
      <p className="sec-lead">Solutions to the most frequently encountered problems.</p>
      {faqs.map((f, i) => (
        <div className="reveal" key={i} style={{ borderBottom: "1px solid var(--rule)", paddingBottom: "1.25rem", marginBottom: "1.25rem" }}>
          <h3 style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.5rem", display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
            <span style={{ color: "var(--accent)", fontFamily: "DM Mono", fontSize: "0.8rem", flexShrink: 0 }}>Q{i + 1}</span>
            {f.q}
          </h3>
          <p style={{ color: "var(--ink2)", fontSize: "0.875rem", lineHeight: 1.7, paddingLeft: "1.75rem" }}>{f.a}</p>
        </div>
      ))}
    </>
  );
}

/* ── RELEASE NOTES ────────────────────────── */
function ReleasePage() {
  return (
    <main>
      <div className="page-wrap">
        <div className="sec-eyebrow">Changelog</div>
        <h2 className="sec-h">Release Notes</h2>
        <p className="sec-lead">All changes to SF File Downloader, newest first.</p>
        <div className="release-card reveal">
          <div className="release-head">
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span className="rel-ver">v1.0.0</span>
              <span className="rel-badge badge-latest">LATEST</span>
            </div>
            <span className="rel-date">2025-06-01</span>
          </div>
          <div className="release-body">
            <div style={{ fontSize: "0.8rem", fontFamily: "DM Mono", color: "var(--ink3)", marginBottom: "1rem", letterSpacing: "0.05em" }}>INITIAL RELEASE — Chrome Web Store</div>
            {[
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
            ].map((text, i) => (
              <div className="change-row" key={i}>
                <span className="change-tag tag-new">NEW</span>
                <span className="change-text">{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="callout callout-blue reveal">
          <strong>Roadmap:</strong> Upcoming releases will include ZIP export, partial download resumption, multi-org session management, and a download history log.
        </div>
      </div>
    </main>
  );
}

/* ── PRIVACY POLICY (Google CWS compliant) ── */
function PrivacyPage() {
  return (
    <main>
      <div className="page-wrap">
        <div className="sec-eyebrow">Legal</div>
        <h2 className="sec-h">Privacy Policy</h2>
        <p style={{ color: "var(--ink2)", lineHeight: 1.7, marginBottom: "2rem", maxWidth: "680px" }}>
          This Privacy Policy describes how <strong>SF File Downloader</strong> ("the Extension", "we", "our") handles
          information when you install and use our Chrome Extension. We are committed to full transparency and minimal
          data collection. This policy is written to comply with the{" "}
          <a href="https://developer.chrome.com/docs/webstore/program-policies/user-data-faq" target="_blank" rel="noreferrer" style={{ color: "var(--accent2)" }}>
            Chrome Web Store User Data Privacy Policy requirements
          </a>.
        </p>

        <div className="policy-meta reveal">
          <div className="meta-item"><label>Effective Date</label><span>June 1, 2025</span></div>
          <div className="meta-item"><label>Last Updated</label><span>June 1, 2025</span></div>
          <div className="meta-item"><label>Extension Version</label><span>v1.0.0</span></div>
        </div>

        <div className="policy-section reveal">
          <h3><span className="sec-num">01</span> Who We Are</h3>
          <p>
            SF File Downloader is a Chrome Extension published on the Google Chrome Web Store. It is developed
            independently and is not affiliated with Salesforce, Inc. or Anthropic, PBC.
          </p>
          <p>
            <strong>Developer Contact:</strong> For all privacy-related inquiries, please use the
            <strong> Support</strong> link on the Extension's Chrome Web Store listing page. We will
            respond within a reasonable timeframe.
          </p>
        </div>

        <div className="policy-section reveal">
          <h3><span className="sec-num">02</span> Single Purpose Statement</h3>
          <p>
            The Extension has a single purpose: <strong>to enable Salesforce administrators and developers
            to bulk-download Salesforce ContentVersion files (Notes &amp; Attachments) and NEILON S3 presigned
            URL files using an Excel file export.</strong> All permissions requested are necessary solely for this purpose.
          </p>
        </div>

        <div className="policy-section reveal">
          <h3><span className="sec-num">03</span> Data Accessed — Complete Inventory</h3>
          <p>The following table is a complete inventory of every category of data this Extension accesses.</p>
          <table>
            <thead>
              <tr><th>Data</th><th>Specific Value</th><th>Purpose</th><th>Where Stored</th><th>Transmitted To</th></tr>
            </thead>
            <tbody>
              {[
                ["Salesforce Session Cookie", "sid cookie value", "Authenticate Salesforce REST API calls", "chrome.storage.local (device only)", "Your Salesforce org only"],
                ["Salesforce Instance URL", "Org hostname", "Construct API endpoint URLs", "chrome.storage.local (device only)", "Never"],
                ["Salesforce Username", "Email/username from userinfo endpoint", "Display in UI for identity confirmation", "chrome.storage.local (device only)", "Never"],
                ["Uploaded Excel File", "User-selected .xlsx file", "Parse the list of files to download", "In-memory only — never written to disk by Extension", "Never"],
                ["Downloaded File Content", "Raw bytes from Salesforce or S3", "Written to user's local Downloads folder", "User's local Downloads folder only", "Never (written locally)"],
                ["Anthropic API Key (optional)", "User-provided key string", "Call api.anthropic.com for AI assistant", "chrome.storage.local (device only)", "api.anthropic.com only, user-initiated"],
              ].map(([d, v, p, s, t]) => (
                <tr key={d}>
                  <td><strong>{d}</strong></td>
                  <td style={{ fontSize: "0.8rem", color: "var(--ink3)" }}>{v}</td>
                  <td style={{ fontSize: "0.82rem" }}>{p}</td>
                  <td style={{ fontFamily: "DM Mono", fontSize: "0.75rem", color: "var(--ink3)" }}>{s}</td>
                  <td className={t === "Never" ? "tag-green" : "tag-orange"} style={{ fontSize: "0.82rem" }}>{t}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="policy-section reveal">
          <h3><span className="sec-num">04</span> Data We Do NOT Collect</h3>
          <p>The Extension does <strong>not</strong> collect, process, or transmit:</p>
          <ul>
            <li>Browsing history, visited URLs, or web activity outside Salesforce org domains</li>
            <li>Salesforce record data beyond what is needed to construct file download URLs</li>
            <li>Analytics, telemetry, usage metrics, or crash reports of any kind</li>
            <li>Device identifiers, IP addresses, or geolocation data</li>
            <li>Payment or financial information</li>
            <li>Health, financial, or other sensitive personal information</li>
            <li>Information from users under 13 years of age</li>
          </ul>
          <div className="callout callout-green" style={{ marginTop: "1rem" }}>
            <strong>No backend servers.</strong> SF File Downloader operates no servers, databases, or analytics infrastructure. All processing happens locally in your browser.
          </div>
        </div>

        <div className="policy-section reveal">
          <h3><span className="sec-num">05</span> Chrome Permissions — Justified Use</h3>
          <p>
            Each Chrome permission requested by this Extension is necessary for core functionality and is used for
            no other purpose. The Chrome Web Store requires Extensions to justify each sensitive permission.
          </p>
          <table>
            <thead><tr><th>Permission</th><th>Necessity Justification</th></tr></thead>
            <tbody>
              {[
                ["downloads", "Necessary to write fetched file bytes to the user's local Downloads folder using chrome.downloads.download(). Without this, files cannot be saved."],
                ["storage", "Necessary to persist the Salesforce session token, instance URL, and username in chrome.storage.local so users do not need to re-authenticate each time the extension opens. Data is device-local and never synced to Chrome Sync."],
                ["tabs", "Necessary to query open Chrome tabs in order to identify which Salesforce org the user is currently logged into, enabling automatic session detection without requiring manual credential entry."],
                ["cookies", "Necessary to read the Salesforce sid session cookie from the active org tab. This cookie is the authentication credential used for all Salesforce REST API calls within the extension."],
                ["scripting", "Necessary to inject content.js into Salesforce-domain pages to capture the normalized org hostname (handling Lightning and sandbox URL variants) and pass it to the background service worker for session detection."],
              ].map(([p, j]) => (
                <tr key={p}>
                  <td><code style={{ fontFamily: "DM Mono", fontSize: "0.78rem", color: "var(--accent)" }}>{p}</code></td>
                  <td style={{ fontSize: "0.83rem", color: "var(--ink2)", lineHeight: 1.65 }}>{j}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="policy-section reveal">
          <h3><span className="sec-num">06</span> Third-Party Services &amp; Network Requests</h3>
          <p>The Extension contacts only the following external services. No other domains are contacted.</p>
          <table>
            <thead><tr><th>Domain</th><th>When</th><th>What Is Sent</th><th>Purpose</th></tr></thead>
            <tbody>
              {[
                ["*.salesforce.com, *.force.com, *.lightning.force.com (your org)", "Every download session", "Salesforce sid token as Bearer header", "Authenticate and fetch file content the user requested"],
                ["login.salesforce.com / test.salesforce.com", "Only on explicit manual login", "Username + password entered by the user", "SOAP login to obtain a session token"],
                ["*.amazonaws.com", "Only for NEILON S3 presigned URL files", "No credentials — presigned URL contains embedded auth", "Download files stored in AWS S3 via time-limited signed URLs"],
                ["api.anthropic.com", "Only when user explicitly triggers AI assistant", "User-provided API key + user-typed message", "Power the optional AI field-mapping and troubleshooting assistant"],
              ].map(([d, w, s, p]) => (
                <tr key={d}>
                  <td style={{ fontFamily: "DM Mono", fontSize: "0.75rem", wordBreak: "break-word" }}>{d}</td>
                  <td style={{ fontSize: "0.8rem", color: "var(--ink3)" }}>{w}</td>
                  <td style={{ fontSize: "0.8rem", color: "var(--ink3)" }}>{s}</td>
                  <td style={{ fontSize: "0.82rem" }}>{p}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="policy-section reveal">
          <h3><span className="sec-num">07</span> Data Storage &amp; Retention</h3>
          <p>
            <strong>Session data</strong> (session ID, instance URL, username) is stored in{" "}
            <code style={{ fontFamily: "DM Mono", fontSize: "0.82rem" }}>chrome.storage.local</code> on the user's
            device only. It is never synced via Chrome Sync or transmitted to any server operated by this Extension.
            It is deleted when the user clicks <em>Log Out</em>, uninstalls the Extension, or clears Chrome storage.
          </p>
          <p>
            <strong>Anthropic API key</strong> (if provided) is stored in{" "}
            <code style={{ fontFamily: "DM Mono", fontSize: "0.82rem" }}>chrome.storage.local</code> on the user's device.
            It is only sent to <code style={{ fontFamily: "DM Mono", fontSize: "0.82rem" }}>api.anthropic.com</code> upon
            explicit user action. It can be deleted at any time from Settings.
          </p>
          <p>
            <strong>Uploaded Excel files</strong> are parsed in browser RAM only. They are never written to disk
            by the Extension, never transmitted externally, and are discarded when the extension tab is closed.
          </p>
          <p>
            <strong>Downloaded files</strong> are written directly to the user's local Downloads folder via the
            Chrome Downloads API. The Extension retains no copy.
          </p>
        </div>

        <div className="policy-section reveal">
          <h3><span className="sec-num">08</span> User Control &amp; Data Deletion</h3>
          <ul>
            <li>Click <strong>Log Out</strong> in the extension to immediately remove all stored session data.</li>
            <li>Remove your Anthropic API key from Settings at any time to disable AI features.</li>
            <li>Uninstalling the Extension from Chrome automatically deletes all associated local storage data.</li>
            <li>Files downloaded to your Downloads folder are under your full control and can be deleted at any time.</li>
          </ul>
        </div>

        <div className="policy-section reveal">
          <h3><span className="sec-num">09</span> Data Sharing &amp; Sale</h3>
          <p>
            We do <strong>not</strong> sell, rent, share, or trade user data with any third party, advertiser, data
            broker, or analytics service. Data is only transmitted to the external services listed in Section 06,
            and only to fulfill the explicit action initiated by the user.
          </p>
          <p>
            We do not use user data to build advertising profiles, serve targeted ads, or train machine learning models.
          </p>
        </div>

        <div className="policy-section reveal">
          <h3><span className="sec-num">10</span> Security</h3>
          <p>
            All network communication with Salesforce, AWS S3, and Anthropic is made exclusively over HTTPS (TLS).
            Session credentials are never logged, never transmitted to Extension-operated servers, and are stored
            in Chrome's isolated, sandboxed extension storage.
          </p>
          <p>
            The Extension does not execute any remotely-hosted code. All extension code is bundled locally,
            reviewed, and published through the Chrome Web Store review process in compliance with Chrome's
            Content Security Policy requirements.
          </p>
        </div>

        <div className="policy-section reveal">
          <h3><span className="sec-num">11</span> Children's Privacy</h3>
          <p>
            This Extension is intended for Salesforce administrators and developers (adults in a professional context).
            It is not directed at children under the age of 13. We do not knowingly collect personal information
            from children. If you believe a child has used this Extension and information was collected,
            please contact us immediately via the Chrome Web Store support link.
          </p>
        </div>

        <div className="policy-section reveal">
          <h3><span className="sec-num">12</span> Changes to This Policy</h3>
          <p>We may update this Privacy Policy when we add new features or when required by Chrome Web Store policy changes. When we do:</p>
          <ul>
            <li>The <strong>Last Updated</strong> date at the top of this page will be revised.</li>
            <li>Material changes will be described in the Extension's Release Notes on the Chrome Web Store listing.</li>
            <li>Continued use of the Extension after a policy update constitutes acceptance of the revised policy.</li>
          </ul>
        </div>

        <div className="policy-section reveal">
          <h3><span className="sec-num">13</span> Contact Us</h3>
          <p>
            For questions, concerns, or data deletion requests related to this Privacy Policy, please use
            the <strong>Support</strong> link on the Extension's Chrome Web Store listing page. We aim to
            respond to all privacy inquiries within 7 business days.
          </p>
        </div>

        <div className="callout callout-blue reveal">
          <strong>Chrome Web Store Compliance Notice:</strong> This policy is structured to satisfy
          the <a href="https://developer.chrome.com/docs/webstore/program-policies/" target="_blank" rel="noreferrer" style={{ color: "var(--accent2)" }}>Chrome Web Store Developer Program Policies</a>,
          including Section 4 (User Data Privacy), the Prominent Disclosure requirement, and the requirement
          to justify each sensitive permission with a clear statement of necessity.
        </div>
      </div>
    </main>
  );
}
