import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useReveal from "../../hooks/useReveal";
import "./Documentation.css";

const TABS = [
  { id: "install",  label: "Installation" },
  { id: "export",   label: "Export from Salesforce" },
  { id: "download", label: "Running Downloads" },
  { id: "ai",       label: "AI Assistant" },
  { id: "s3",       label: "S3 / NEILON Files" },
  { id: "faq",      label: "Troubleshooting" },
];

export default function Documentation() {
  const [activeTab, setActiveTab] = useState("install");
  const navigate = useNavigate();
  useReveal();

  return (
    <main className="docs-layout">
      {/* ── Sidebar ── */}
      <aside className="docs-sidebar">
        <p className="sidebar-heading">Contents</p>
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`sidebar-link ${activeTab === t.id ? "active" : ""}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}

        <div className="sidebar-cta">
          <p className="sidebar-cta-label">Available on</p>
          <p className="sidebar-cta-title">Chrome Web Store</p>
          <button
            className="sidebar-cta-btn"
            onClick={() => navigate("/documentation")}
          >
            ⬇ Add to Chrome
          </button>
        </div>
      </aside>

      {/* ── Content ── */}
      <div className="docs-content">
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

/* ── Installation ─────────────────────────────────────────────────────── */
function DocInstall() {
  useReveal();
  return (
    <>
      <div className="sec-eyebrow">Installation</div>
      <h2 className="sec-h">Install from the Chrome Web Store</h2>
      <p className="sec-lead">
        SF File Downloader is published on the Chrome Web Store. No developer
        mode or sideloading required — install in seconds.
      </p>

      <div className="callout callout-blue reveal">
        <strong>Requires Google Chrome (desktop).</strong> Not compatible with
        Firefox, Safari, or Edge at this time.
      </div>

      <div className="install-grid reveal">
        {[
          {
            n: "1",
            title: "Visit the Chrome Web Store",
            body: (
              <>
                Search for <strong>"SF File Downloader"</strong> on the Chrome
                Web Store, or follow the direct listing link from this page.
              </>
            ),
          },
          {
            n: "2",
            title: 'Click "Add to Chrome"',
            body: (
              <>
                A permissions dialog will appear listing the required access.
                Review it and click <strong>Add extension</strong> to confirm.
              </>
            ),
          },
          {
            n: "3",
            title: "Pin the Extension",
            body: (
              <>
                Click the 🧩 puzzle icon in your Chrome toolbar and pin{" "}
                <strong>SF File Downloader</strong> for one-click access.
              </>
            ),
          },
          {
            n: "4",
            title: "Open a Salesforce Tab",
            body: "Log into your Salesforce org in any Chrome tab. The extension auto-detects your session when you open it.",
          },
        ].map((s) => (
          <div className="install-card" key={s.n}>
            <div className="step-n">{s.n}</div>
            <div className="step-body">
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          </div>
        ))}
      </div>

      <hr className="divider" />

      <h3 className="sub-heading">Why These Permissions Are Required</h3>
      <table className="data-table reveal">
        <thead>
          <tr>
            <th>Permission</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["downloads",  "Saves fetched file bytes to your local Downloads folder via the Chrome Downloads API"],
            ["storage",    "Caches your Salesforce session between extension opens — stored locally, never synced"],
            ["tabs",       "Identifies which Salesforce org you're logged into by checking open tab URLs"],
            ["cookies",    "Reads the Salesforce sid session cookie to authenticate API calls"],
            ["scripting",  "Injects a lightweight script to capture your org's normalized hostname"],
          ].map(([p, r]) => (
            <tr key={p}>
              <td>
                <code className="mono" style={{ fontSize: "0.78rem", color: "var(--accent)" }}>
                  {p}
                </code>
              </td>
              <td>{r}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="callout callout-green reveal" style={{ marginTop: "1.5rem" }}>
        <strong>No remote servers.</strong> All data stays on your machine. The
        extension only contacts your Salesforce org, AWS S3 (for presigned
        URLs), and optionally Anthropic's API if you enable AI features.
      </div>
    </>
  );
}

/* ── Export ───────────────────────────────────────────────────────────── */
function DocExport() {
  useReveal();
  return (
    <>
      <div className="sec-eyebrow">Salesforce Export</div>
      <h2 className="sec-h">Exporting Files from Salesforce</h2>
      <p className="sec-lead">
        The extension works from a standard Salesforce SOQL query export. Use
        Workbench, Data Loader, or any tool that exports results to Excel (.xlsx).
      </p>

      <h3 className="sub-heading">Required SOQL Query</h3>
      <div className="code-wrap reveal">
        <div className="code-head">
          <span className="fname">workbench-export.soql</span>
        </div>
        <pre>
{`SELECT
  `}<span className="fn">Id</span>{`,
  `}<span className="fn">Title</span>{`,
  `}<span className="fn">FileExtension</span>{`,
  `}<span className="fn">ContentDocumentId</span>{`,
  `}<span className="fn">VersionData</span>{`
FROM `}<span className="str">ContentVersion</span>{`
WHERE IsLatest = `}<span className="str">true</span>{`

`}<span className="cm">-- Optional: filter by parent record</span>{`
`}<span className="kw">AND</span>{`  FirstPublishLocationId = `}<span className="str">'001XXXXXXXXXXXXXXX'</span>
        </pre>
      </div>

      <h3 className="sub-heading" style={{ marginTop: "2rem" }}>
        Required Excel Columns
      </h3>
      <table className="data-table reveal">
        <thead>
          <tr>
            <th>Column</th>
            <th>Example</th>
            <th>Required?</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["Title",             "Q4 Invoice",                              "Yes"],
            ["FileExtension",     "pdf",                                     "Yes"],
            ["VersionData",       "/services/data/v65.0/sobjects/ContentVersion/.../VersionData", "Yes"],
            ["Id",                "068XXXXXXXXXXXXXXX",                      "Recommended"],
            ["ContentDocumentId", "069XXXXXXXXXXXXXXX",                      "Recommended"],
          ].map(([c, e, r]) => (
            <tr key={c}>
              <td>
                <code className="mono" style={{ fontSize: "0.78rem" }}>{c}</code>
              </td>
              <td style={{ color: "var(--ink3)", fontSize: "0.82rem" }}>{e}</td>
              <td className={r === "Yes" ? "tag-orange" : "tag-blue"}>{r}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="callout reveal" style={{ marginTop: "1.5rem" }}>
        <strong>Tip:</strong> Column headers are case-sensitive. If your export
        uses different names, use the optional AI assistant to auto-map them.
      </div>
    </>
  );
}

/* ── Running Downloads ────────────────────────────────────────────────── */
function DocDownload() {
  useReveal();
  return (
    <>
      <div className="sec-eyebrow">Running Downloads</div>
      <h2 className="sec-h">Starting a Bulk Download</h2>
      <p className="sec-lead">
        Once installed and connected to a Salesforce session, a bulk download
        takes four steps.
      </p>

      <div className="steps-list">
        {[
          {
            n: "1",
            title: "Open the Extension",
            body: "Click the SF File Downloader icon in your Chrome toolbar. It opens as a full tab for a better workspace.",
          },
          {
            n: "2",
            title: "Verify Your Session",
            body: "Your Salesforce org URL and username appear automatically. If not, click ↻ Refresh or use the SOAP login form for manual authentication.",
          },
          {
            n: "3",
            title: "Upload Your Excel File",
            body: "Drag and drop your exported .xlsx file. The extension validates the column structure and shows a row count.",
          },
          {
            n: "4",
            title: "Configure & Start",
            body: "Set concurrency (1–10), toggle skip-existing if partially downloaded before, then click START DOWNLOAD.",
          },
        ].map((s) => (
          <div className="step-list-item reveal" key={s.n}>
            <div className="step-n">{s.n}</div>
            <div className="step-body">
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="sub-heading" style={{ marginTop: "2rem" }}>
        Download Settings
      </h3>
      <table className="data-table reveal">
        <thead>
          <tr>
            <th>Setting</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["Concurrency",   "3",              "Number of files downloaded simultaneously (1–10)"],
            ["Skip Existing", "On",             "Files already in sf_downloads/ are skipped"],
            ["Save Path",     "sf_downloads/",  "Subfolder inside your Chrome Downloads directory"],
          ].map(([s, d, desc]) => (
            <tr key={s}>
              <td><strong>{s}</strong></td>
              <td>
                <code className="mono" style={{ fontSize: "0.78rem" }}>{d}</code>
              </td>
              <td style={{ color: "var(--ink2)" }}>{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

/* ── AI Assistant ─────────────────────────────────────────────────────── */
function DocAI() {
  useReveal();
  return (
    <>
      <div className="sec-eyebrow">AI Assistant</div>
      <h2 className="sec-h">Claude AI Integration</h2>
      <p className="sec-lead">
        An optional AI assistant powered by Claude (Anthropic) helps map
        non-standard column names, troubleshoot errors, and answer process
        questions.
      </p>

      <div className="callout reveal">
        <strong>Entirely Optional.</strong> Disabled by default. You must supply
        your own Anthropic API key to activate it. Standard Anthropic pricing
        applies to your key.
      </div>

      <div className="steps-list">
        {[
          {
            n: "1",
            title: "Get an Anthropic API Key",
            body: (
              <>
                Visit{" "}
                <a href="https://console.anthropic.com" target="_blank" rel="noreferrer">
                  console.anthropic.com
                </a>{" "}
                and create an API key under your account settings.
              </>
            ),
          },
          {
            n: "2",
            title: "Enter the Key in Settings",
            body: "Open the extension, click ⚙ Settings, and paste your key into the Anthropic API Key field.",
          },
          {
            n: "3",
            title: "Use the Assistant",
            body: "The assistant button becomes active. Ask it to map columns, explain errors, or suggest SOQL fixes.",
          },
        ].map((s) => (
          <div className="step-list-item reveal" key={s.n}>
            <div className="step-n">{s.n}</div>
            <div className="step-body">
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="callout callout-blue reveal">
        <strong>Privacy:</strong> Your API key is stored in Chrome local storage
        only. It is sent exclusively to{" "}
        <code className="mono" style={{ fontSize: "0.8rem" }}>api.anthropic.com</code>{" "}
        when you explicitly trigger an AI request. No key data is ever sent to
        any other server.
      </div>
    </>
  );
}

/* ── S3 / NEILON ──────────────────────────────────────────────────────── */
function DocS3() {
  useReveal();
  return (
    <>
      <div className="sec-eyebrow">S3 / NEILON Files</div>
      <h2 className="sec-h">S3 Presigned URL Support</h2>
      <p className="sec-lead">
        The extension supports Salesforce-native file paths and NEILON S3
        presigned URLs. The format is detected automatically — no configuration
        required.
      </p>

      <table className="data-table reveal">
        <thead>
          <tr>
            <th>File Type</th>
            <th>VersionData Format</th>
            <th>Auth Method</th>
          </tr>
        </thead>
        <tbody>
          {[
            [
              "Salesforce Native",
              "/services/data/v65.0/sobjects/ContentVersion/.../VersionData",
              "Bearer token (your sid)",
            ],
            [
              "NEILON S3",
              "https://bucket.s3.amazonaws.com/...?X-Amz-Signature=...",
              "No auth (presigned URL contains embedded credentials)",
            ],
          ].map(([t, f, a]) => (
            <tr key={t}>
              <td><strong>{t}</strong></td>
              <td style={{ fontFamily: "DM Mono", fontSize: "0.75rem", color: "var(--ink3)", wordBreak: "break-all" }}>
                {f}
              </td>
              <td>{a}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="callout callout-green reveal" style={{ marginTop: "1.5rem" }}>
        <strong>Mixed files:</strong> Your Excel can contain both Salesforce-native
        and S3 URLs in the same sheet. Each row is handled correctly based on its
        URL pattern.
      </div>
    </>
  );
}

/* ── Troubleshooting / FAQ ────────────────────────────────────────────── */
function DocFAQ() {
  useReveal();

  const FAQS = [
    {
      q: "Session not detected automatically",
      a: "Ensure you have an active Salesforce tab open before clicking the extension icon. If the tab was open before installation, refresh the Salesforce tab and click ↻ Refresh in the extension.",
    },
    {
      q: "HTTP 401 / Unauthorized errors",
      a: "Your Salesforce session may have expired. Refresh your Salesforce tab to renew the sid cookie, then click ↻ Refresh in the extension.",
    },
    {
      q: "Files download with wrong or missing extension",
      a: "Verify that the FileExtension column in your Excel is populated correctly. Values like 'pdf' or 'docx' without dots are expected.",
    },
    {
      q: "Downloads are very slow",
      a: "Increase the concurrency setting (up to 10). Note that very high concurrency may approach Salesforce API governor limits for some orgs.",
    },
    {
      q: "Extension shows wrong org URL",
      a: "If multiple Salesforce tabs are open, close all but the correct one and click ↻ Refresh. The extension uses the first matching tab it finds.",
    },
    {
      q: "AI assistant not responding",
      a: "Verify your Anthropic API key is correct and has available balance. Open the browser console (F12) for specific API error messages.",
    },
  ];

  return (
    <>
      <div className="sec-eyebrow">Troubleshooting</div>
      <h2 className="sec-h">Common Issues</h2>
      <p className="sec-lead">
        Solutions to the most frequently encountered problems.
      </p>

      {FAQS.map((f, i) => (
        <div className="faq-item reveal" key={i}>
          <h3>
            <span className="faq-num">Q{i + 1}</span>
            {f.q}
          </h3>
          <p>{f.a}</p>
        </div>
      ))}
    </>
  );
}
