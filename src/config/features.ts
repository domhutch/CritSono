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
 * OFF by default. The official FUSIC®/Intensive Care Society (ICS) report-form
 * templates that this feature overlays case data onto are **not** distributed
 * with this open-source repository, because their redistribution rights are held
 * by the ICS and are not granted here. See `docs/ICS_FORMS.md` for how to enable
 * the feature and supply your own templates.
 *
 * Set `VITE_ENABLE_ICS_FORMS=true` at build time to reveal the ICS form actions.
 */
export const ENABLE_ICS_FORMS = import.meta.env.VITE_ENABLE_ICS_FORMS === "true";
