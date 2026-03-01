import React from "react";
import useReveal from "../../hooks/useReveal";
import "./PrivacyPolicy.css";

export default function PrivacyPolicy() {
  useReveal();

  return (
    <main>
      <div className="page-wrap">
        <div className="sec-eyebrow">Legal</div>
        <h2 className="sec-h">Privacy Policy</h2>
        <p className="policy-intro">
          This Privacy Policy describes how <strong>SF File Downloader</strong>{" "}
          ("the Extension", "we", "our") handles information when you install
          and use our Chrome Extension. We are committed to full transparency
          and minimal data collection. This policy is written to comply with
          the{" "}
          <a
            href="https://developer.chrome.com/docs/webstore/program-policies/user-data-faq"
            target="_blank"
            rel="noreferrer"
          >
            Chrome Web Store User Data Privacy Policy requirements
          </a>
          .
        </p>

        <div className="policy-meta reveal">
          <div className="meta-item">
            <label>Effective Date</label>
            <span>June 1, 2025</span>
          </div>
          <div className="meta-item">
            <label>Last Updated</label>
            <span>June 1, 2025</span>
          </div>
          <div className="meta-item">
            <label>Extension Version</label>
            <span>v1.0.0</span>
          </div>
        </div>

        {/* 01 */}
        <PolicySection num="01" title="Who We Are">
          <p>
            SF File Downloader is a Chrome Extension published on the Google
            Chrome Web Store. It is developed independently and is not
            affiliated with Salesforce, Inc. or Anthropic, PBC.
          </p>
          <p>
            <strong>Developer Contact:</strong> For all privacy-related
            inquiries, please use the <strong>Support</strong> link on the
            Extension's Chrome Web Store listing page. We will respond within a
            reasonable timeframe.
          </p>
        </PolicySection>

        {/* 02 */}
        <PolicySection num="02" title="Single Purpose Statement">
          <p>
            The Extension has a single purpose:{" "}
            <strong>
              to enable Salesforce administrators and developers to
              bulk-download Salesforce ContentVersion files (Notes &amp;
              Attachments) and NEILON S3 presigned URL files using an Excel
              file export.
            </strong>{" "}
            All permissions requested are necessary solely for this purpose.
          </p>
        </PolicySection>

        {/* 03 */}
        <PolicySection num="03" title="Data Accessed — Complete Inventory">
          <p>
            The following table is a complete inventory of every category of
            data this Extension accesses.
          </p>
          <table className="data-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Specific Value</th>
                <th>Purpose</th>
                <th>Where Stored</th>
                <th>Transmitted To</th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "Salesforce Session Cookie",
                  "sid cookie value",
                  "Authenticate Salesforce REST API calls",
                  "chrome.storage.local (device only)",
                  "Your Salesforce org only",
                ],
                [
                  "Salesforce Instance URL",
                  "Org hostname",
                  "Construct API endpoint URLs",
                  "chrome.storage.local (device only)",
                  "Never",
                ],
                [
                  "Salesforce Username",
                  "Email/username from userinfo endpoint",
                  "Display in UI for identity confirmation",
                  "chrome.storage.local (device only)",
                  "Never",
                ],
                [
                  "Uploaded Excel File",
                  "User-selected .xlsx file",
                  "Parse the list of files to download",
                  "In-memory only — never written to disk",
                  "Never",
                ],
                [
                  "Downloaded File Content",
                  "Raw bytes from Salesforce or S3",
                  "Written to user's local Downloads folder",
                  "User's local Downloads folder only",
                  "Never (written locally)",
                ],
                [
                  "Anthropic API Key (optional)",
                  "User-provided key string",
                  "Call api.anthropic.com for AI assistant",
                  "chrome.storage.local (device only)",
                  "api.anthropic.com only, user-initiated",
                ],
              ].map(([d, v, p, s, t]) => (
                <tr key={d}>
                  <td>
                    <strong>{d}</strong>
                  </td>
                  <td style={{ fontSize: "0.8rem", color: "var(--ink3)" }}>{v}</td>
                  <td style={{ fontSize: "0.82rem" }}>{p}</td>
                  <td style={{ fontFamily: "DM Mono", fontSize: "0.75rem", color: "var(--ink3)" }}>
                    {s}
                  </td>
                  <td className={t === "Never" ? "tag-green" : "tag-orange"} style={{ fontSize: "0.82rem" }}>
                    {t}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </PolicySection>

        {/* 04 */}
        <PolicySection num="04" title="Data We Do NOT Collect">
          <p>
            The Extension does <strong>not</strong> collect, process, or
            transmit:
          </p>
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
            <strong>No backend servers.</strong> SF File Downloader operates no
            servers, databases, or analytics infrastructure. All processing
            happens locally in your browser.
          </div>
        </PolicySection>

        {/* 05 */}
        <PolicySection num="05" title="Chrome Permissions — Justified Use">
          <p>
            Each Chrome permission requested by this Extension is necessary for
            core functionality and is used for no other purpose. The Chrome Web
            Store requires Extensions to justify each sensitive permission.
          </p>
          <table className="data-table">
            <thead>
              <tr>
                <th>Permission</th>
                <th>Necessity Justification</th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "downloads",
                  "Necessary to write fetched file bytes to the user's local Downloads folder using chrome.downloads.download(). Without this, files cannot be saved.",
                ],
                [
                  "storage",
                  "Necessary to persist the Salesforce session token, instance URL, and username in chrome.storage.local so users do not need to re-authenticate each time the extension opens. Data is device-local and never synced to Chrome Sync.",
                ],
                [
                  "tabs",
                  "Necessary to query open Chrome tabs in order to identify which Salesforce org the user is currently logged into, enabling automatic session detection without requiring manual credential entry.",
                ],
                [
                  "cookies",
                  "Necessary to read the Salesforce sid session cookie from the active org tab. This cookie is the authentication credential used for all Salesforce REST API calls within the extension.",
                ],
                [
                  "scripting",
                  "Necessary to inject content.js into Salesforce-domain pages to capture the normalized org hostname (handling Lightning and sandbox URL variants) and pass it to the background service worker for session detection.",
                ],
              ].map(([p, j]) => (
                <tr key={p}>
                  <td>
                    <code
                      className="mono"
                      style={{ fontSize: "0.78rem", color: "var(--accent)" }}
                    >
                      {p}
                    </code>
                  </td>
                  <td style={{ fontSize: "0.83rem", color: "var(--ink2)", lineHeight: 1.65 }}>
                    {j}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </PolicySection>

        {/* 06 */}
        <PolicySection num="06" title="Third-Party Services & Network Requests">
          <p>
            The Extension contacts only the following external services. No
            other domains are contacted.
          </p>
          <table className="data-table">
            <thead>
              <tr>
                <th>Domain</th>
                <th>When</th>
                <th>What Is Sent</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "*.salesforce.com, *.force.com, *.lightning.force.com (your org)",
                  "Every download session",
                  "Salesforce sid token as Bearer header",
                  "Authenticate and fetch file content the user requested",
                ],
                [
                  "login.salesforce.com / test.salesforce.com",
                  "Only on explicit manual login",
                  "Username + password entered by the user",
                  "SOAP login to obtain a session token",
                ],
                [
                  "*.amazonaws.com",
                  "Only for NEILON S3 presigned URL files",
                  "No credentials — presigned URL contains embedded auth",
                  "Download files stored in AWS S3 via time-limited signed URLs",
                ],
                [
                  "api.anthropic.com",
                  "Only when user explicitly triggers AI assistant",
                  "User-provided API key + user-typed message",
                  "Power the optional AI field-mapping and troubleshooting assistant",
                ],
              ].map(([d, w, s, p]) => (
                <tr key={d}>
                  <td style={{ fontFamily: "DM Mono", fontSize: "0.75rem", wordBreak: "break-word" }}>
                    {d}
                  </td>
                  <td style={{ fontSize: "0.8rem", color: "var(--ink3)" }}>{w}</td>
                  <td style={{ fontSize: "0.8rem", color: "var(--ink3)" }}>{s}</td>
                  <td style={{ fontSize: "0.82rem" }}>{p}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </PolicySection>

        {/* 07 */}
        <PolicySection num="07" title="Data Storage & Retention">
          <p>
            <strong>Session data</strong> (session ID, instance URL, username)
            is stored in{" "}
            <code className="mono" style={{ fontSize: "0.82rem" }}>
              chrome.storage.local
            </code>{" "}
            on the user's device only. It is never synced via Chrome Sync or
            transmitted to any server operated by this Extension. It is deleted
            when the user clicks <em>Log Out</em>, uninstalls the Extension, or
            clears Chrome storage.
          </p>
          <p>
            <strong>Anthropic API key</strong> (if provided) is stored in{" "}
            <code className="mono" style={{ fontSize: "0.82rem" }}>
              chrome.storage.local
            </code>{" "}
            on the user's device. It is only sent to{" "}
            <code className="mono" style={{ fontSize: "0.82rem" }}>
              api.anthropic.com
            </code>{" "}
            upon explicit user action. It can be deleted at any time from
            Settings.
          </p>
          <p>
            <strong>Uploaded Excel files</strong> are parsed in browser RAM
            only. They are never written to disk by the Extension, never
            transmitted externally, and are discarded when the extension tab is
            closed.
          </p>
          <p>
            <strong>Downloaded files</strong> are written directly to the
            user's local Downloads folder via the Chrome Downloads API. The
            Extension retains no copy.
          </p>
        </PolicySection>

        {/* 08 */}
        <PolicySection num="08" title="User Control & Data Deletion">
          <ul>
            <li>
              Click <strong>Log Out</strong> in the extension to immediately
              remove all stored session data.
            </li>
            <li>
              Remove your Anthropic API key from Settings at any time to
              disable AI features.
            </li>
            <li>
              Uninstalling the Extension from Chrome automatically deletes all
              associated local storage data.
            </li>
            <li>
              Files downloaded to your Downloads folder are under your full
              control and can be deleted at any time.
            </li>
          </ul>
        </PolicySection>

        {/* 09 */}
        <PolicySection num="09" title="Data Sharing & Sale">
          <p>
            We do <strong>not</strong> sell, rent, share, or trade user data
            with any third party, advertiser, data broker, or analytics
            service. Data is only transmitted to the external services listed
            in Section 06, and only to fulfill the explicit action initiated by
            the user.
          </p>
          <p>
            We do not use user data to build advertising profiles, serve
            targeted ads, or train machine learning models.
          </p>
        </PolicySection>

        {/* 10 */}
        <PolicySection num="10" title="Security">
          <p>
            All network communication with Salesforce, AWS S3, and Anthropic
            is made exclusively over HTTPS (TLS). Session credentials are never
            logged, never transmitted to Extension-operated servers, and are
            stored in Chrome's isolated, sandboxed extension storage.
          </p>
          <p>
            The Extension does not execute any remotely-hosted code. All
            extension code is bundled locally, reviewed, and published through
            the Chrome Web Store review process in compliance with Chrome's
            Content Security Policy requirements.
          </p>
        </PolicySection>

        {/* 11 */}
        <PolicySection num="11" title="Children's Privacy">
          <p>
            This Extension is intended for Salesforce administrators and
            developers (adults in a professional context). It is not directed
            at children under the age of 13. We do not knowingly collect
            personal information from children. If you believe a child has
            used this Extension and information was collected, please contact
            us immediately via the Chrome Web Store support link.
          </p>
        </PolicySection>

        {/* 12 */}
        <PolicySection num="12" title="Changes to This Policy">
          <p>
            We may update this Privacy Policy when we add new features or when
            required by Chrome Web Store policy changes. When we do:
          </p>
          <ul>
            <li>
              The <strong>Last Updated</strong> date at the top of this page
              will be revised.
            </li>
            <li>
              Material changes will be described in the Extension's Release
              Notes on the Chrome Web Store listing.
            </li>
            <li>
              Continued use of the Extension after a policy update constitutes
              acceptance of the revised policy.
            </li>
          </ul>
        </PolicySection>

        {/* 13 */}
        <PolicySection num="13" title="Contact Us">
          <p>
            For questions, concerns, or data deletion requests related to this
            Privacy Policy, please use the <strong>Support</strong> link on the
            Extension's Chrome Web Store listing page. We aim to respond to all
            privacy inquiries within 7 business days.
          </p>
        </PolicySection>

        <div className="callout callout-blue reveal">
          <strong>Chrome Web Store Compliance Notice:</strong> This policy is
          structured to satisfy the{" "}
          <a
            href="https://developer.chrome.com/docs/webstore/program-policies/"
            target="_blank"
            rel="noreferrer"
          >
            Chrome Web Store Developer Program Policies
          </a>
          , including Section 4 (User Data Privacy), the Prominent Disclosure
          requirement, and the requirement to justify each sensitive permission
          with a clear statement of necessity.
        </div>
      </div>
    </main>
  );
}

/* ── Reusable section wrapper ── */
function PolicySection({ num, title, children }) {
  return (
    <div className="policy-section reveal">
      <h3>
        <span className="sec-num">{num}</span>
        {title}
      </h3>
      {children}
    </div>
  );
}
