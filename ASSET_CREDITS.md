# Public asset credits and rights status

This inventory covers files shipped from `public/`. Do not treat a source citation as permission to redistribute a third-party asset. Resolve any entries marked **Unresolved** before publishing a build that includes them; all entries are currently resolved (20 October 2026).

| Asset | Observed provenance | Rights / release status |
| --- | --- | --- |
| `public/pocus-icon.svg` | Simple CritSono icon markup; present in the initial repository commit and later rebranded in-repo. No external source is recorded. | **Resolved (20 October 2026).** Created by the maintainer; covered by the project Apache-2.0 license. |
| `public/images/settings-overscroll-portrait.png` | Portrait photograph taken by the maintainer; added in commit `9613edd` (“Easter Egg”). | **Resolved (20 October 2026).** The maintainer's own photograph; covered by the project Apache-2.0 license with open redistribution rights. |

## Report-form templates

The app can print case data onto the layout of a matching report form. That
feature was built around the official **FUSIC® / Intensive Care Society (ICS)**
report-form templates, which reproduce ICS form layouts and the FUSIC® logo.

### Permission (October 2026)

In October 2026 the ICS, after discussion with the FUSIC® team, confirmed in
writing that **there is no issue with reproducing the content of the logbook
forms within a third-party application**. The conditions and context recorded
from that confirmation:

- The forms have evolved over many years and largely reflect standard approaches
  to ultrasound practice and record-keeping.
- FUSIC® accreditation, competency sign-off, and recognition of module
  completion remain part of the formal FUSIC®/ICS process; competency can only
  be signed off through the established FUSIC® pathway and verified through the
  FUSIC learning portal.
- The application must be clear that it **supports** the accreditation process
  rather than **replaces** it.

The permission email is retained privately by the maintainer and is not
committed to this repository. **Logo/branding: resolved (20 October 2026).** The
example form the maintainer sent to the ICS included the FUSIC® logo artwork,
and their no-concern confirmation covers it; the maintainer is satisfied the
grant extends to the templates as they appear, logo included.

### Template provenance

Templates live in `public/templates/` and ship with the repository. Provenance
of each template:

| Former asset | Observed provenance | Rights / release status |
| --- | --- | --- |
| `public/templates/fusic-heart-report-form-v13.svg` | Added in commit `a9f4ea4` (“ICS Fudge”). Contained the FUSIC® logo and a form based on the FUSIC® Heart Assessment Pack, v13 (2025), published by the Intensive Care Society (ICS). | Covered by the October 2026 ICS permission; logo scope resolved as above. **Re-committed** to `public/templates/`. |
| `public/templates/fusic-lung-report-form-v10.svg` | Added in commit `3cf919d` (“Lung ICS Fudge”). Based on the FUSIC® Lung Assessment Pack, v10 (2025), published by the ICS. | Covered by the October 2026 ICS permission; logo scope resolved as above. **Re-committed** to `public/templates/`. |
| `public/templates/fusic-abdomen-report-form-v1-2025.svg` and `public/templates/fusic-abdomen-report-form-v1-2025-page2.svg` | Added in commit `da523d4` (“Added Abdomen”). Based on the FUSIC Abdomen v1 (2025) Assessment Pack, published by the ICS. | Covered by the October 2026 ICS permission; logo scope resolved as above. **Re-committed** to `public/templates/`. |

## CritSono printouts

The CritSono single-case case report and logbook summary use project-authored
layouts in `src/domain/case-print.ts`, `src/domain/logbook-print.ts`, and
`src/pathways/*/print.ts`. Those source files are covered by the project
Apache-2.0 license. User-entered case content in any generated report remains the
user's content.

If an asset is replaced, update this table with the replacement's creator/source
and license. Keep official source PDFs and assessment packs out of the repository
unless redistribution rights are confirmed.
