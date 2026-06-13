# Admin Relatives View Details Audit

## Scope
- Target page only: `/admin/relatives`
- No backend changes
- No unrelated pages or shared layout modules changed

## What Was Changed
- Added local `selectedRelative` state in `src/pages/RelativesFamily/RelativesAdmin.jsx` to track the relative selected from the admin relatives table.
- Connected the eye action in `src/components/adminRelativeComponents/AdminRelativesTable.jsx` so it passes the already-loaded relative object back to the page.
- Added a new admin-only modal component at `src/components/adminRelativeComponents/RelativeDetailsModal.jsx`.
- Rendered the selected student's summary at the top of the modal:
  - اسم الطالب
  - الرقم العسكري
  - البريد الإلكتروني
- Rendered the selected relative's loaded details inside the modal:
  - الاسم
  - صلة القرابة
  - الرقم القومي
  - تاريخ الميلاد
  - الوظيفة
  - الحالة الاجتماعية
  - رقم الهاتف
  - البريد الإلكتروني
  - العنوان
  - ملاحظات
- Added safe fallback rendering so missing values display `غير متوفر`.
- Reset selected relative state when:
  - search results become empty
  - search request fails
  - student selection changes
  - student relatives reload
  - student details request fails

## Behavior Details
- Clicking the eye icon now calls `onSelectRelative(relative)` from the table.
- The page stores that real object in `selectedRelative`.
- The modal opens automatically when `selectedRelative` is not `null`.
- The modal closes when:
  - the close button is clicked
  - the backdrop is clicked
  - the `Escape` key is pressed
- The modal is RTL-friendly, scrollable internally, and constrained to a responsive centered width.

## Data Source Confirmation
- The modal uses the selected relative object already loaded in the Admin Relatives page.
- No mock data was added.
- No fake details were created.
- Student info is read from the current `selectedStudent` state already used by the page.

## Files Modified
- `src/pages/RelativesFamily/RelativesAdmin.jsx`
- `src/components/adminRelativeComponents/AdminRelativesTable.jsx`
- `src/components/adminRelativeComponents/RelativeDetailsModal.jsx`

## Files Not Modified
- Student Relatives page
- Student Profile page
- Admin Profile page
- Holiday pages
- Statement pages
- Payment pages
- Booking pages
- Medical pages
- Punishment pages
- Navbar
- Footer
- Layout
- Routes
- Authentication
- Global CSS

## Validation Performed
- Reviewed the admin relatives route component and its child table component.
- Verified the current relative object shape from existing real page usage before editing.
- Built the frontend with `npm run build`.
- Result: build completed successfully without compilation errors.

## Notes / Assumptions
- The current admin relatives data shape already exposes the table fields and may optionally expose `phone`, `phoneNumber`, `email`, `address`, and `notes`. Missing values are intentionally shown as `غير متوفر`.
- The existing print action was left unchanged.
- A Vite chunk-size warning still appears during build, but it is pre-existing and unrelated to this UI fix.
