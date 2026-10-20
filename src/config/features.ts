/**
 * Build-time feature flags.
 *
 * These are read from Vite environment variables (`VITE_*`) so a build can turn
 * optional features on without changing source. Values are baked into the bundle
 * at build time, so changing a flag requires a rebuild.
 */

/**
 * ICS/FUSIC report-form printing.
 *
 * ON by default. In October 2026 the Intensive Care Society (ICS) confirmed in
 * writing that there is no issue with reproducing the content of the FUSIC®
 * report-form templates within a third-party application, provided it is clear
 * that the application supports the FUSIC® accreditation process rather than
 * replacing it; competency sign-off remains part of the formal FUSIC®/ICS
 * process, verified through the FUSIC learning portal. See `docs/ICS_FORMS.md`
 * and the recorded permission in `ASSET_CREDITS.md`.
 *
 * Set `VITE_ENABLE_ICS_FORMS=false` at build time to hide the ICS form actions.
 */
export const ENABLE_ICS_FORMS = import.meta.env.VITE_ENABLE_ICS_FORMS !== "false";
