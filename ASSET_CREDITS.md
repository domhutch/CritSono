# Public asset credits and rights status

This inventory covers files shipped from `public/`. Do not treat a source citation as permission to redistribute a third-party asset. Resolve entries marked **Unresolved** before publishing a build that includes them.

| Asset | Observed provenance | Rights / release status |
| --- | --- | --- |
| `public/pocus-icon.svg` | Simple SonoCrit icon markup; present in the initial repository commit and later rebranded in-repo. No external source is recorded. | Appears project-created. Confirm the creator and that it is covered by the project Apache-2.0 license. |
| `public/images/settings-overscroll-portrait.png` | Portrait illustration; added in commit `9613edd` (“Easter Egg”). The repository records no creator, generation/source tool, source prompt, or license. | **Unresolved.** Confirm who created it, the applicable usage terms, and any likeness permission needed; otherwise remove or replace it before public distribution. |

## Report-form templates (not shipped)

The app can print case data onto the layout of a matching report form. That
feature was built around the official **FUSIC® / Intensive Care Society (ICS)**
report-form templates, which reproduce ICS form layouts and the FUSIC® logo. The
ICS holds the rights to that artwork, and this repository does not grant or assume
permission to redistribute it.

To keep the repository open-sourceable, those templates are **no longer shipped**
and the feature is **disabled by default**. No ICS artwork is distributed here.
The feature, its flag, and how to supply your own templates are documented in
[`docs/ICS_FORMS.md`](./docs/ICS_FORMS.md).

Previously shipped (now removed) templates and their sources, retained for
provenance:

| Former asset | Observed provenance | Rights / release status |
| --- | --- | --- |
| `public/templates/fusic-heart-report-form-v13.svg` | Added in commit `a9f4ea4` (“ICS Fudge”). Contained the FUSIC® logo and a form based on the FUSIC® Heart Assessment Pack, v13 (2025), published by the Intensive Care Society (ICS). | Redistribution rights unconfirmed. **Removed from the repository.** |
| `public/templates/fusic-lung-report-form-v10.svg` | Added in commit `3cf919d` (“Lung ICS Fudge”). Based on the FUSIC® Lung Assessment Pack, v10 (2025), published by the ICS. | Redistribution rights unconfirmed. **Removed from the repository.** |
| `public/templates/fusic-abdomen-report-form-v1-2025.svg` and `public/templates/fusic-abdomen-report-form-v1-2025-page2.svg` | Added in commit `da523d4` (“Added Abdomen”). Based on the FUSIC Abdomen v1 (2025) Assessment Pack, published by the ICS. | Redistribution rights unconfirmed. **Removed from the repository.** |

## SonoCrit printouts

The SonoCrit single-case case report and logbook summary use project-authored
layouts in `src/domain/case-print.ts`, `src/domain/logbook-print.ts`, and
`src/pathways/*/print.ts`. Those source files are covered by the project
Apache-2.0 license. User-entered case content in any generated report remains the
user's content.

If an asset is replaced, update this table with the replacement's creator/source
and license. Keep official source PDFs and assessment packs out of the repository
unless redistribution rights are confirmed.
