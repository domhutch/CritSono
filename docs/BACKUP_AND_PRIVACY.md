# Storage, backups, and privacy

How CritSono stores data, how backups work, and what to know about patient data.
For feature documentation, see [USER_GUIDE.md](./USER_GUIDE.md).

## Local storage

Cases are stored locally in this browser's IndexedDB; they are not continuously
uploaded or synced. A user can explicitly upload an encrypted backup to Google
Drive from Settings.

Browser storage is isolated by site origin. Cases saved at `localhost` will not
appear automatically at the hosted address (or on another device). Before moving
test data, download a backup from the current site and restore it on the
destination site. Clearing browser site data or removing the app can permanently
remove local cases, so keep a separate copy of the backup somewhere else.

## Encrypted backup and restore

Use **Export encrypted backup** in Settings to save a versioned copy of all cases
and pathway training modes. Choose and confirm a passphrase of at least 14
characters. The app encrypts the backup on this device using PBKDF2-HMAC-SHA-256
and AES-256-GCM before downloading or opening the native share sheet. The
passphrase is never stored by the app; losing it means the backup cannot be
decrypted. Keep the passphrase separately from the backup file.

Use **Restore / merge backup** to merge a copy into this device: new case IDs are
added, existing IDs and local preferences are kept, and repeated restores do not
duplicate cases. Encrypted and older plaintext JSON backups are validated before
saving; plaintext payloads are limited to 10 MB and encrypted files to 15 MB.
Restore does not replace or delete existing cases. The app cannot confirm that a
downloaded or shared file was saved at its destination.

## Google Drive backup

Google Drive backup in the web app is optional and is enabled at build time by
setting `VITE_GOOGLE_CLIENT_ID` to a Google OAuth web client ID. For GitHub
Pages, add it as a repository Actions variable named `VITE_GOOGLE_CLIENT_ID`; it
is a public client ID, not a secret. In Google Cloud, enable the Drive API and
register each deployed app origin as an authorized JavaScript origin. The user
grants only the `drive.appdata` scope.

Uploads are encrypted on-device first and stored as dated files in Drive's hidden
app-specific folder; the app never stores the passphrase. Restore downloads the
newest dated backup and uses the same merge behavior as local restore.

Because the app has no backend, Google Identity Services' browser token flow is
used: access tokens stay in memory and expire, so Google may ask the user to
authorize again after reload or expiry. This static flow does not use PKCE;
Google's authorization code flow with PKCE requires a backend token exchange.
Google backup is disabled in Capacitor native builds until a system-browser OAuth
flow is implemented.

The hidden app folder is tied to this OAuth application and is deleted if the
user removes the app from Google Drive, so keep a separate backup copy. Changing
the OAuth client ID can make previous app-folder backups unavailable. Revoke
access from the user's Google Account security settings when disconnecting.

## Patient data and safety

Encrypted backups conceal their contents from someone who only obtains the backup
file, but they do not encrypt the app's local IndexedDB, CSV exports, or PDF
reports. Google Drive stores only the encrypted backup, but provider
infrastructure still processes connection metadata such as the account used, IP
address, and upload timing.

Do not enter patient names, dates of birth, record numbers, or other identifying
information. The case form warns about common patterns such as email addresses,
phone numbers, labelled record numbers, and labelled dates of birth; it cannot
reliably detect names or unlabelled identifiers. Review notes yourself and remove
any patient-identifying details before saving. This is a personal training and
reflection log, not a clinical record.

When reporting bugs or requesting features, do not include patient data or
logbook exports.

## Hosting notes

A hosted deployment makes the app itself publicly reachable; site access controls
depend on the GitHub plan and repository settings. The app does not sync live
case data. If a user configures Google Drive and uploads a backup, it contains
only an encrypted copy of their logbook. Use only non-identifying test data on a
hosted deployment. Generated backup files are excluded by `.gitignore`; keep
them out of source control.
