
# Optimisations Update (2026-10-21)

## Completed in this correctness PR

### Correctness and privacy
- [x] **Heart/Lung “Unable to assess” is preserved** — Heart and Lung findings now offer `Unable to assess` as a selectable option (using shared `ASSESSMENT_OPTIONS`). Lung uses a 4-option assessment grid; existing `unable` values are no longer mapped to `not_assessed` on display.
- [x] **Privacy checker covers missing free-text fields** — Now scans abdomen (RUQ/LUQ/kidneys/bladder/free fluid/other comments), DVT `otherComments`, HD question notes/measurements/other comments, and vascular procedure/site/comments.
- [x] **Settings saves are race-safe** — `useSettingsWorkflow` queues the latest snapshot and serializes saves so newer choices are not overwritten by stale in-flight updates; App passes current settings to the workflow.
- [x] **Case list order matches case numbers** — Introduced shared `compareCasesBySequence` / `sortCasesBySequence` in `domain/case-display.ts` and reused them in case numbering and `useCaseList` sorting.
- [x] **Vascular quotas use explicit mapping** — Added `caseCategory` to vascular quotas with a fallback to array order, preventing misalignment if procedure lists are reordered.
- [x] **CSV labels made human-readable** — Common CSV columns now export readable impression/management/image-quality labels.
- [x] **CSS bug fixes** — Fixed `.heart-findings-list .heart-finding-control` selector (was dead `.finding-control`) and aligned lung assessment grid layout.

### Repo hygiene
- [x] **Security reporting URL corrected** — Updated `SECURITY.md` and `.github/ISSUE_TEMPLATE/config.yml` to point to `domhutch/CritSono/security/advisories/new`.

## Outstanding (from optimisations review)

### Correctness and privacy
- [ ] **Google Drive backup is unreachable but advertised** — `uploadBackupToGoogleDrive`/`restoreBackupFromGoogleDrive` exist in `useLogbookBackup` but no UI wires them; README/docs still advertise it. Also `loadGoogleIdentityServices` can hang on retry because failed script remains in DOM. Decide to wire or remove and correct docs.
- [ ] **SettingsPage prop surface large** — 21 props including multiple case collections and nine export callbacks. Extract `BackupExportPanel` or grouped objects.

### Streamlining and modularity
- [ ] **Shared file delivery** — `useCasePrinting` and `useLogbookBackup` duplicate Capacitor/browser download/base64/cancellation logic. Extract `services/file-delivery.ts`.
- [ ] **Shared settings controls** — `TEXT_SIZES` duplicated between `SettingsPage` and `WelcomeScreen`; “last enabled module” logic duplicated. Extract `TextSizePicker` and `ModuleToggleList`.
- [ ] **CSV/assessment helper consolidation** — Five pathway CSV modules duplicate `assessment()`; use shared `ASSESSMENT_LABELS`/helpers more broadly.
- [ ] **Shared defaults** — `useLogbookData` redeclares defaults already present in `logbook-store.ts`. Export a single default settings factory.
- [ ] **Backup validation gap** — Normal export serializes but doesn’t round-trip through `parseBackup` (admin sample does). Centralize “cases → validated serialized backup” in `services/logbook-backup.ts`.
- [ ] **Large modules** — `src/domain/backup.ts` (630 lines) and `src/domain/logbook.ts` (416 lines) could be split along clear responsibilities (table-driven migrations for backup).
- [ ] **CSS cleanup remaining** — Dead selectors remain (`.backup-panel`, `.backup-copy`, `.section-heading`, `.desktop-add`), `!important` at `.test-data-status`, responsive breakpoints could be consolidated, design tokens could be expanded.

### Open-source hardening
- [ ] **Node/support metadata** — Docs say Node 20+, but locked Vitest requires Node 22.12+. Add `engines`, `packageManager`, `.nvmrc`, use `node-version-file` in CI.
- [ ] **Lint/format gate** — Add ESLint (TypeScript, React hooks, jsx-a11y) + Prettier/Biome, scripts, and CI checks.
- [ ] **Automation** — Add grouped Dependabot, dependency-review action, CodeQL workflow.
- [ ] **Release process** — No tags/changelog/app-visible version. Consider tag-based releases and version display in About/Help.
- [ ] **Docs refresh** — Update `ROADMAP.md` (templates no longer pending), `OPEN_SOURCE_REVIEW.md` (counts/claims), `docs/USER_GUIDE.md` (printing location), `ASSET_CREDITS.md` (invalid commit references).
- [ ] **Licensing/provenance** — Add notice beside `public/templates/`, record decisions for three flagged dependency license expressions, provenance note for `src/curricula/fusic/`.
- [ ] **PWA assets** — Add 192/512 and maskable icons, Apple touch icon; compress/exclude 1.5 MB portrait from precache.
- [ ] **Package metadata** — Add `description`, `repository`, `homepage`, `bugs`, `author`; document legacy `pocus-logbook` DB/backup IDs and `org.pocuslogbook.app`.
- [ ] **CI tuning** — Remove duplicate `push: main` from PR workflow or make reusable, add timeouts/path filters/notice freshness check.

## Validation
- `npm run typecheck` ✓
- `npm test` ✓ (11 files, 46 tests)
- `npm run build` ✓
