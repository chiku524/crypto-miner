# Windows code signing — remove “Unknown publisher” and SmartScreen warning

When your Windows installer (e.g. `VibeMiner-Setup-1.0.3.exe`) is **unsigned**, Windows Defender SmartScreen shows:

- **“Unknown publisher”**
- **“Microsoft Defender SmartScreen prevented an unrecognized app from starting”**

Users can click “Run anyway,” but it looks unsafe. To show a **verified publisher** (e.g. **nico.builds** or your name) and avoid the warning, you need to **code-sign** the `.exe` with a **code signing certificate**.

---

## What you need

### 1. A code signing certificate

You buy this from a **Certificate Authority (CA)**. Two common types:

| Type | Cost (approx.) | SmartScreen behavior |
|------|-----------------|------------------------|
| **EV (Extended Validation)** | ~$300–500/year | **Immediate trust** — signed builds usually show your name right away and no “Unknown publisher.” |
| **OV (Organization Validation)** | ~$100–300/year | **Reputation over time** — first signed builds may still show a warning until enough users run the app; then it clears. |

**Recommendation:** For the best experience (no warning from day one), use an **EV code signing certificate** if your budget allows. OV is cheaper but may show a warning at first.

**Where to buy (examples):**

- [DigiCert](https://www.digicert.com/signing/code-signing-certificates)
- [Sectigo (Comodo)](https://sectigo.com/ssl-certificates-tls/code-signing)
- [SSL.com](https://www.ssl.com/certificates/code-signing/)

Some CAs sell to **individuals** as well as companies. You’ll need to complete their verification (ID and sometimes business docs).

### 2. Export the certificate to a `.pfx` file

After the CA issues the cert:

1. **Windows:** Use Certificate Manager or the tool the CA provides to export the cert + private key to a **.pfx** (PKCS#12) file. Set a **strong password**.
2. **macOS:** Open Keychain Access, find the cert, export as **.p12** and set a password. You can rename to `.pfx` if needed; electron-builder accepts both.

**Important:** When exporting, **do not** include the full certificate chain in the file if you can avoid it. That keeps the file smaller and under Windows’ 8,192-character env limit if you ever pass it as base64. For our workflow we decode to a file, so a normal export is fine.

### 3. Base64-encode the `.pfx` for GitHub

On **macOS/Linux** (PowerShell on Windows works too):

```bash
base64 -i your-cert.pfx | tr -d '\n' > cert-base64.txt
```

Copy the contents of `cert-base64.txt` (one long line). You’ll paste it into a GitHub secret.

---

## GitHub setup

### 1. Add repository secrets

In your repo: **Settings → Secrets and variables → Actions**. Add:

| Secret name | Value |
|-------------|--------|
| **WIN_CODE_SIGNING_CERT_BASE64** | The full base64 string of your `.pfx` file (from the step above). |
| **WIN_CODE_SIGNING_PASSWORD** | The password you set when exporting the `.pfx`. |

### 2. Workflow and app config (already done in this repo)

- The release workflow (`.github/workflows/release-desktop.yml`) is set up to:
  - Decode the base64 cert to a temporary file on the Windows runner when the secret is present.
  - Set `CSC_LINK` and `CSC_KEY_PASSWORD` so **electron-builder** signs the Windows installer.
- In `apps/desktop/package.json`, **`signAndEditExecutable`** is set to **true** under `build.win` so the built `.exe` is signed.

You don’t need to change code; just add the two secrets.

### 3. Build a new release

After the secrets are set:

1. Create and push a new tag (e.g. `v1.0.4`).
2. The **Release desktop app** workflow will run. The **Windows** job will:
   - Decode your cert,
   - Build the installer,
   - Sign it with your certificate.
3. The new `.exe` in the GitHub Release will show your **publisher name** (e.g. nico.builds or the name on the cert) and SmartScreen will treat it as a known publisher (EV immediately; OV after reputation builds).

---

## Publisher name users see

The **publisher** shown in Windows (e.g. in “Programs and Features” or the UAC/smart screen dialog) comes from the **subject name** of your code signing certificate (e.g. your name or company name). The **publisherName** in `apps/desktop/package.json` (`"nico.builds"`) is used for the installer metadata; the **signed** identity is what Windows trusts and displays. So when you buy the cert, use the name you want users to see (e.g. “Nico Builds” or “nico.builds” if the CA allows it).

---

## Summary

| Step | Action |
|------|--------|
| 1 | Buy an **EV** (recommended) or **OV** code signing certificate from a CA. |
| 2 | Export the cert + private key to a **.pfx** with a strong password. |
| 3 | Base64-encode the `.pfx` and add **WIN_CODE_SIGNING_CERT_BASE64** and **WIN_CODE_SIGNING_PASSWORD** as GitHub Actions secrets. |
| 4 | Push a new release tag; the workflow will sign the Windows installer. |

After that, new Windows installers from your releases will be signed and Windows will no longer show “Unknown publisher” or treat the app as an unrecognized threat (EV from the first signed build; OV after reputation builds).
