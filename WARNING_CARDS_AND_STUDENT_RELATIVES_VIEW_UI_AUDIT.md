# Warning Cards And Student Relatives View UI Audit

## Scope
- Admin Profile warning cards details UI at `/admin/profile`
- Student Relatives view-details UI at `/relatives`
- Frontend-only changes for this task

## What Was Changed
- Replaced the Admin Profile warning-card details UI with a simple table modal.
- Kept the existing real warning summary data source and card counts unchanged.
- Derived the displayed status label inside the modal from the selected card type:
  - `warning-one` => `إنذار أول`
  - `warning-two` => `إنذار ثانٍ`
  - `dismissed` => `مفصول من الدورة`
- Removed unnecessary warning modal details such as:
  - warning count column
  - latest violation
  - latest date
  - large student cards
- Replaced the Student Relatives native browser `alert(...)` view action with a clean project-styled modal.
- Kept the Student Relatives add, edit, delete, search, and table behavior unchanged.

## Files Modified For This Task
- `src/pages/Profile/ProfileAdmin.jsx`
- `src/components/adminProfileComponents/WarningSummaryModal.jsx`
- `src/components/relativeComponents/RelativesTable.jsx`
- `src/components/relativeComponents/RelativeDetailsModal.jsx`

## Admin Profile Warning Modal
The warning-card modal now opens as a compact table UI only.

### Final columns shown
- `اسم الطالب`
- `الرقم العسكري`
- `نوع الحالة / نوع الإنذار`
- `الدرجات المخصومة`

### Notes
- The modal title matches the clicked card title.
- Deducted degrees use real loaded data when available.
- Missing values show `غير متوفر`.
- If the category has no students, the modal shows `لا توجد بيانات`.

## Student Relatives View-Details Modal
The eye icon in the Student Relatives table now opens a modal instead of a browser alert.

### Final fields shown
- `الاسم`
- `صلة القرابة`
- `الرقم القومي`
- `تاريخ الميلاد`
- `الوظيفة`
- `الحالة الاجتماعية`
- `رقم الهاتف`
- `العنوان`
- `ملاحظات`

### Notes
- The modal uses only fields that exist in the student relative add/edit form.
- Relative email is not shown.
- Missing values show `غير متوفر`.

## Testing Performed
- Reviewed the Admin Profile warning modal flow and the loaded warning summary category shape.
- Reviewed the Student Relatives add/edit form to confirm the real relative fields.
- Removed the `alert(...)`-based view logic and replaced it with a modal-based UI.
- Ran `npm run build`.
- Result: frontend build completed successfully with no compilation errors.

## Unrelated Pages
- No unrelated pages were modified for this task.
- There are already other modified/untracked files in the workspace from previous tasks; they were left as-is and not changed as part of this request.

## Remaining Notes
- The warning cards still depend on the existing real warning summary endpoint and business logic.
- The Vite chunk-size warning during build is unrelated to these UI fixes.
