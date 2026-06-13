# STUDENT_PROFILE_DURATION_GREEN_FIX_AUDIT

## Summary Of Exactly What Was Changed
- Forced the Student Profile specialization duration to use `4 أشهر` as the active temporary value.
- Ensured that the `4 أشهر` option stays visually selected/highlighted in green.
- Kept all other duration options visible but inactive.
- Did not change the page design beyond preserving the existing active green selected state.

## Files Modified
- `c:\Users\dells\Downloads\Digilians-Final-Project\src\pages\Profile\ProfileUser.jsx`

## Confirmation That No Unrelated Pages Were Changed
- I changed only the Student Profile page for this request.
- No Admin Profile, Relatives, Holiday, Statement, Payment, Booking, Medical, Punishment, routes, authentication, or shared layout files were modified for this task.

## How `4 أشهر` Is Forced As The Active Temporary Duration
- In `ProfileUser.jsx`, the specialization duration value is now explicitly set to:
  - `const specializationDuration = '4 أشهر'`
- A code comment remains beside it to clarify that this is a temporary fallback until the real backend/source field is defined later.
- This value is passed into the duration section, so the selection logic always treats `4 أشهر` as the active option.
- Because the active state already uses the green style in the duration component, `4 أشهر` now always appears highlighted in green.

## Testing Steps Performed
- Ran frontend build:
  - `npm run build`
- Reviewed the duration-related diff to confirm the active value is fixed to `4 أشهر`.

## Remaining Assumptions Or Issues
- This is still a temporary frontend-only default until the real specialization duration source is defined later.
- The other duration options remain visible but are intentionally inactive for now.
