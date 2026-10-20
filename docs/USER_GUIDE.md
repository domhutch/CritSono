# CritSono user guide

End-user documentation for the features that live inside the app. For setup and
deployment, see the [README](../README.md). For storage, backups, and patient-data
safety, see [BACKUP_AND_PRIVACY.md](./BACKUP_AND_PRIVACY.md).

## Pages and navigation

Choose one pathway at a time from the **Logbook type** selector. The app has
**Overview**, **Cases**, **Metrics**, and **Settings** pages for pathway progress,
case history, descriptive case patterns, and local preferences. Create or edit a
case on its own screen; saving returns to the Cases page. Logbook print, CSV,
backup, and restore controls are in Settings; individual case PDFs are available
from Cases.

Training targets can be hidden independently for each pathway without changing
its saved cases. Training mode shows total and directly supervised counts; with
training targets hidden, the summary focuses on abnormal impressions and changed
management.

## Metrics

Metrics summarize case activity over a rolling 12-month period or the current
calendar year, along with recorded regions/views, findings marked Yes, image
quality, impression categories, and management-impact markers. Metrics describe
only the data entered and do not assess competence.

## Structured entry

Lung structured entry is organised by finding, with Yes and No choices and a
single-line Not assessed checkbox for each region. New and untouched findings
start as Not assessed; selecting Yes or No clears that checkbox. Existing Unable
to assess (U/A) values remain supported in saved records. Case review and the
printout continue to show results grouped by region.

Heart assessment findings use one-tap Yes, No, and Not assessed buttons. Existing
Unable to assess values are presented as Not assessed in the form and remain
supported in saved records.

Abdomen, Heart, and Lung cases can store optional age, gender, and BMI for review
and report forms. Do not enter patient names, dates of birth, or record numbers.

Cases can optionally be tagged with a normal, abnormal/pathology, or indeterminate
impression and whether the scan changed management. These are personal review
markers, not clinical advice or accreditation claims.

## Case and logbook PDFs

Each case can be opened as a print-ready, single-page A4 report with **PDF** from
the Cases list. The in-app PDF preview can print the report or download a PDF
directly; native iOS and Android builds offer the system share sheet to save it
to Files or another destination. The preview has a close control that returns to
the logbook.

From **Overview**, choose **Print logbook / PDF** for the selected pathway to
create a multi-page training logbook. Its table uses these fields: study number,
date, diagnosis, summary of main findings, and supervisor. It includes blank
numbered rows up to the pathway reference and continues onto extra pages when
there are more cases. The preview provides a close control to return to Overview.
This is a personal report using the fields recorded in the app, not an official
FUSIC form or assessment document.

### Optional report-form printing

For Heart, Lung, and Abdomen cases, the optional report-form printing feature
prefills a printed report-form layout from case data. It is enabled by default
and the FUSIC®/ICS templates ship with the repository, used with the ICS's
written permission (October 2026). The feature supports — it does not replace —
the FUSIC® accreditation process; generated forms state this on the printed
output. See [`docs/ICS_FORMS.md`](./ICS_FORMS.md) for the permission, conditions,
and template setup, and the
[`ROADMAP.md`](../ROADMAP.md#report-form-printing-rights-resolved-artwork-pending-commit)
for the remaining release steps.

## CSV export

Use **Export CSV** to export the currently selected pathway for spreadsheet
review. Web browsers download the file; native iOS and Android builds open the
system share sheet. The export uses stable column names and pathway-specific
findings, numbers cases by scan date, and omits internal IDs and timestamps. CSV
quoting and spreadsheet-formula safeguards are applied. Free-text fields such as
indication, diagnosis, summary, and reflection may still contain information you
entered, so review them and remove patient-identifying details before sharing the
file.

## Sample and admin test data

In development builds, **Preview sample data** displays generated cases in memory
to help evaluate the metrics. Development builds also show **Admin test data**
controls on Overview. On the hosted PWA, add `?admin=1` to the site address to
reveal those controls. This query is only a convenience gate, not authentication.

Admin controls can add a complete synthetic case set for one pathway or download
an importable full sample backup for all six supported pathways. The backup
contains 195 cases with structured fields filled and sample IDs, findings, and
notes clearly marked as synthetic. Restore it through **Settings → Restore /
merge backup**. Populated synthetic cases are stored on this device, included in
backups, and can be removed without deleting real cases. Repeating population does
not duplicate existing sample records.

Use only non-identifying test data on any hosted deployment.
