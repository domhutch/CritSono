# ICS / FUSIC report-form printing

This document explains how the **report-form printing** feature works, the ICS
permission it operates under and the conditions that come with it, and how the
templates and feature flag are configured.

## What the feature does

For Heart, Lung, and Abdomen cases the app can print a report **prefilled from
the saved case data** onto the layout of a matching printed report form. It works
by stacking two layers on one A4 page:

- an `<img>` background: a report-form template (SVG) supplied under
  `public/templates/`, and
- an SVG overlay: the case text and tick-marks, positioned in the template's own
  coordinate space.

Relevant source files:

- `src/domain/fusic-forms.ts` — shared sheet layout, text/mark helpers, and
  `formTemplateUrl()`, which resolves a template filename to a URL under
  `public/templates/`.
- `src/domain/heart-ics-form.ts`, `src/domain/lung-ics-form.ts`,
  `src/domain/abdomen-ics-form.ts` — per-pathway field coordinates and builders.
- `src/hooks/useCasePrinting.ts` — `printHeartIcsForm`, `printLungIcsForm`,
  `printAbdomenIcsForm`, and their bulk variants.
- `src/config/features.ts` — the `ENABLE_ICS_FORMS` flag.

## Permission and conditions

In October 2026 the **Intensive Care Society (ICS)**, after discussion with the
FUSIC® team, confirmed in writing that there is no issue with reproducing the
content of the logbook forms within a third-party application. The permission
email is retained privately by the maintainer; the recorded summary lives in
[`ASSET_CREDITS.md`](../ASSET_CREDITS.md).

The conditions attached to that permission:

- **CritSono supports the FUSIC® accreditation process — it does not replace
  it.** FUSIC® accreditation, competency sign-off, and recognition of module
  completion remain part of the formal FUSIC®/ICS process, and competency can
  only be signed off through the established FUSIC® pathway and verified through
  the FUSIC learning portal.
- The app's generated ICS form documents state this support-not-replace
  relationship on the printed output itself.

The confirmation addresses the content of the forms. **Logo scope: resolved.**
The example form the maintainer sent to the ICS included the FUSIC® logo
artwork, and their no-concern confirmation covers it; the templates ship as
they appear, logo included.

## Templates

The four templates live in `public/templates/`:

| File | Used by |
| --- | --- |
| `public/templates/fusic-heart-report-form-v13.svg` | Heart (single page) |
| `public/templates/fusic-lung-report-form-v10.svg` | Lung (single page) |
| `public/templates/fusic-abdomen-report-form-v1-2025.svg` | Abdomen (page 1) |
| `public/templates/fusic-abdomen-report-form-v1-2025-page2.svg` | Abdomen (page 2) |

Each template must be an A4-portrait SVG. The overlay is drawn in its own
`0 0 1192 1684` coordinate space and stretched to fill the A4 sheet alongside
the background image, so any A4-aspect template works; the field coordinates in
the `*-ics-form.ts` builders are calibrated to the official ICS layouts.

Run `npm run optimize:forms` after changing templates to apply the shared SVGO
config.

Forks and third parties: the recorded ICS permission covers this project. If you
fork CritSono and redistribute it, confirm your own position with the ICS, or
replace the templates with your own A4-portrait layouts and keep the feature
enabled only with your own artwork.

## Feature flag

`ENABLE_ICS_FORMS` is read at build time from `VITE_ENABLE_ICS_FORMS` and is **on
by default**. To hide the ICS form actions, set the variable to anything other
than `true` at build time — for example in `.env.local` (git-ignored):

```sh
VITE_ENABLE_ICS_FORMS=false
```

Rebuild after changing the flag; values are baked into the bundle at build time.

## Verify

Run `npm run check`, then use the **ICS form** action on a Heart, Lung, or
Abdomen case (or the bulk downloads in Settings) and confirm the printed output
aligns with the template and carries the support-not-replace note.
