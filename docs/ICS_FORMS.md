# ICS / FUSIC report-form printing

This document explains how the **report-form printing** feature works, why it is
disabled in this repository by default, and how to enable it with your own form
templates.

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

## Why it is disabled

The feature is designed around the official **FUSIC® / Intensive Care Society
(ICS)** report-form templates. Those templates reproduce ICS form layouts and the
FUSIC® logo. The ICS holds the rights to that artwork, and this repository does
**not** grant or assume permission to redistribute it.

To keep the source repository open-sourceable, the official templates are **not**
included, and the feature is turned **off** by default. No ICS artwork is
distributed here.

## Enabling the feature

There are two routes: a one-command helper for the common case, or manual steps
if you want to control each part.

### Quick path: the helper script

```sh
npm run enable:ics-forms
```

This script (`scripts/enable-ics-forms.mjs`):

1. Checks for the four template files under `public/templates/`.
2. If any are missing, restores them from the `main` branch in git history
   (where the originals still live). It never overwrites templates that already
   exist. Pass `--no-restore` (`npm run enable:ics-forms -- --no-restore`) to
   skip this and supply your own templates instead.
3. Writes `VITE_ENABLE_ICS_FORMS=true` to `.env.local` so local builds turn the
   feature on.

It is safe to re-run. It does **not** decide whether you are allowed to use a
template — that remains your responsibility. Rebuild with `npm run check` or
`npm run build` afterwards.

### Manual path

#### 1. Provide your own templates

Create `public/templates/` and add template files. Use these filenames, which the
builders expect (or update the filenames in the three `*-ics-form.ts` files to
match whatever you use):

| File | Used by |
| --- | --- |
| `public/templates/fusic-heart-report-form-v13.svg` | Heart (single page) |
| `public/templates/fusic-lung-report-form-v10.svg` | Lung (single page) |
| `public/templates/fusic-abdomen-report-form-v1-2025.svg` | Abdomen (page 1) |
| `public/templates/fusic-abdomen-report-form-v1-2025-page2.svg` | Abdomen (page 2) |

Each template must be an A4-portrait SVG. The overlay assumes the coordinate
space used by the original templates: a `viewBox` of `0 0 1192 1684`. If your
template uses different dimensions, update the `viewBox` in
`createFusicFormSheet()` (`src/domain/fusic-forms.ts`) and the field coordinates
in the `*-ics-form.ts` builders to match.

**You are responsible for ensuring you have the right to use any template you
add.** Do not commit templates whose redistribution is not permitted. If you are
granted permission to use the official ICS forms, keep the source PDFs out of the
repository unless that permission explicitly allows redistribution.

#### 2. Turn the flag on

`ENABLE_ICS_FORMS` is read at build time from `VITE_ENABLE_ICS_FORMS`. Set it to
`true`:

```sh
VITE_ENABLE_ICS_FORMS=true npm run build
```

For a persistent local setting, add a `.env.local` file (git-ignored) with:

```sh
VITE_ENABLE_ICS_FORMS=true
```

`public/templates/` and `.env.local` are both git-ignored, so restored or
custom templates and the local flag are not accidentally committed.

For GitHub Pages, add a repository **Actions variable** named
`VITE_ENABLE_ICS_FORMS` with the value `true`, and pass it in the deploy
workflow's build step (mirroring the existing `VITE_GOOGLE_CLIENT_ID` wiring).

#### 3. Verify

Run `npm run check`, then use the **ICS form** action on a Heart, Lung, or
Abdomen case (or the bulk downloads in Settings) and confirm the printed output
aligns with your template.

## Disabling again

Unset `VITE_ENABLE_ICS_FORMS` (or set it to anything other than `true`) — for
example by deleting the line from `.env.local`. The builders and templates can
stay in place; only the UI actions are hidden.

## Restoring the original templates

The official templates historically shipped in this repository. If you are the
rights holder or have written permission, you can restore the copies that were
removed:

```sh
git checkout main -- public/templates/     # or: npm run enable:ics-forms
```

Confirm your permission covers redistribution before doing so in a repository you
publish.
