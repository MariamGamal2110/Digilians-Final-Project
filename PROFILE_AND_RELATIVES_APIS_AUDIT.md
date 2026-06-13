# Profile And Relatives APIs Audit

## Scope

This audit covers only these frontend pages and the APIs they use:

- `GET /profile` page: `src/pages/Profile/ProfileUser.jsx`
- `GET /admin/profile` page: `src/pages/Profile/ProfileAdmin.jsx`
- `GET /relatives` page: `src/pages/RelativesFamily/RelativesUser.jsx`
- `GET /admin/relatives` page: `src/pages/RelativesFamily/RelativesAdmin.jsx`

No source code behavior was changed for this audit. The only new file created is this report.

## Frontend Route Mapping

- `/profile` -> `src/pages/Profile/ProfileUser.jsx`
- `/admin/profile` -> `src/pages/Profile/ProfileAdmin.jsx`
- `/relatives` -> `src/pages/RelativesFamily/RelativesUser.jsx`
- `/admin/relatives` -> `src/pages/RelativesFamily/RelativesAdmin.jsx`

## Shared API Client

Frontend API base configuration:

- File: `src/api/client.js`
- Base URL: `http://localhost:5000/api`
- Auth header: `Authorization: Bearer <token>` when token exists
- Default content type: `application/json` except for `FormData`
- Local storage keys:
  - token: `digilians_token`
  - user: `digilians_user`
- On `401`, stored auth data is cleared

This means all endpoints listed below are called under:

- `http://localhost:5000/api/...`

## 1. Student Profile Page APIs

### Page

- Frontend page: `src/pages/Profile/ProfileUser.jsx`

### APIs used directly by the page

#### A. Get student profile

- Frontend function: `getStudentProfile`
- Frontend file: `src/api/profile.js`
- Request:
  - Method: `GET`
  - Endpoint: `/profile/student`
- Backend route:
  - File: `Digilians-BackEnd-FinalProject/routes/profile.routes.js`
  - Route: `GET /api/profile/student`
- Backend controller:
  - `getStudentProfileController`
- Backend service:
  - `getStudentProfile(account)`
- Main models/services involved:
  - `User`
  - `PermitStudentDirectory`
  - `Punishment`
  - statement service via `getUserStatementData`
- Response consumed by frontend:
  - `profile.student.name`
  - `profile.student.email`
  - `profile.student.militaryId`
  - `profile.attendance.absenceDays`
  - `profile.grades.behavior`
  - `profile.grades.history`
  - plus extra profile sections returned by backend

#### B. Update student profile

- Frontend function: `updateStudentProfile`
- Frontend file: `src/api/profile.js`
- Request:
  - Method: `PATCH`
  - Endpoint: `/profile/student`
  - Body: JSON payload from edited profile form
- Backend route:
  - `PATCH /api/profile/student`
- Backend controller:
  - `updateStudentProfileController`
- Backend service:
  - `updateStudentProfile(account, payload)`
- Main models involved:
  - `User`
  - `PermitStudentDirectory`
- Response consumed by frontend:
  - updated `profile`

### Message APIs used inside Student Profile page

#### C. Load unread message count

- Frontend function: `getStudentUnreadCount`
- Endpoint: `GET /messages/student/unread-count`
- Backend service: `getStudentUnreadCount(account)`
- Models involved:
  - `Conversation`

#### D. Load inbox conversations

- Frontend function: `getStudentInbox`
- Endpoint: `GET /messages/student/inbox`
- Backend service: `getStudentInbox(account)`
- Models involved:
  - `Conversation`

#### E. Load one conversation

- Frontend function: `getStudentConversation`
- Endpoint: `GET /messages/student/conversation/:conversationId`
- Backend service: `getStudentConversation(account, conversationId)`
- Models involved:
  - `Conversation`
  - `ConversationMessage`

#### F. Reply to a conversation

- Frontend function: `studentReplyToConversation`
- Endpoint: `POST /messages/student/conversation/:conversationId/reply`
- Body:
  - `{ "body": "..." }`
- Backend service: `replyToConversationAsStudent(account, conversationId, payload)`
- Models involved:
  - `Conversation`
  - `ConversationMessage`

### Important page notes

- The page also uses local fallback data from `getSavedUser('user')`.
- `specializationDuration` is hardcoded in the frontend as `4 أشهر`; it is not coming from an API.

## 2. Admin Profile Page APIs

### Page

- Frontend page: `src/pages/Profile/ProfileAdmin.jsx`

### APIs used directly by the page

#### A. Get admin profile

- Frontend function: `getAdminProfile`
- Frontend file: `src/api/profile.js`
- Request:
  - Method: `GET`
  - Endpoint: `/profile/admin`
- Backend route:
  - `GET /api/profile/admin`
- Backend controller:
  - `getAdminProfileController`
- Backend service:
  - `getAdminProfile(account)`
- Main models involved:
  - `Admin`
  - `PermitStudentDirectory`
  - `Punishment`
  - `PermitAdminAddition`
  - `HolidayRequest`
  - `Excuse`
- Response consumed by frontend:
  - `profile.admin`
  - `profile.contacts`
  - `profile.stats`
  - `profile.actions`

#### B. Get warning summary

- Frontend function: `getAdminWarningSummary`
- Frontend file: `src/api/profile.js`
- Request:
  - Method: `GET`
  - Endpoint: `/punishments/admin/warning-summary`
- Backend route:
  - `GET /api/punishments/admin/warning-summary`
- Backend controller:
  - `getAdminWarningSummaryController`
- Backend service:
  - `getAdminWarningSummary()`
- Model involved:
  - `Punishment`
- Response consumed by frontend:
  - `oneWarning`
  - `twoWarnings`
  - `dismissed`

#### C. Search students for admin profile tools

- Frontend function: `searchProfileStudents`
- Frontend file: `src/api/profile.js`
- Request:
  - Method: `GET`
  - Endpoint: `/profile/admin/students/search?search=<text>`
- Backend route:
  - `GET /api/profile/admin/students/search`
- Backend controller:
  - `searchAdminStudentsController`
- Backend service:
  - `searchStudentsForAdmin({ search })`
- Model involved:
  - `PermitStudentDirectory`
- Response consumed by frontend:
  - `students[]`
  - each student includes:
    - `_id`
    - `id`
    - `name`
    - `email`
    - `militaryId`
    - `avatar`
    - `role`

#### D. Get one student summary for admin

- Frontend function: `getAdminStudentSummary`
- Frontend file: `src/api/profile.js`
- Request:
  - Method: `GET`
  - Endpoint: `/profile/admin/students/:studentId/summary`
- Backend route:
  - `GET /api/profile/admin/students/:studentId/summary`
- Backend controller:
  - `getAdminStudentSummaryController`
- Backend service:
  - `getStudentProfileSummaryForAdmin(studentId)`
- Main models/services involved:
  - `PermitStudentDirectory`
  - `Relative`
  - `Punishment`
  - `MedicalRecord`
  - `HolidayRequest`
  - `Excuse`
  - `StudentPayment`
  - statement service via `getUserStatementData`
- Response consumed by frontend:
  - `profileSummary`

### Message APIs used inside Admin Profile page

#### E. Get unread message count

- Frontend function: `getAdminUnreadCount`
- Endpoint: `GET /messages/admin/unread-count`
- Backend service: `getAdminUnreadCount(account)`
- Models involved:
  - `Conversation`

#### F. Get inbox conversations

- Frontend function: `getAdminInbox`
- Endpoint: `GET /messages/admin/inbox`
- Backend service: `getAdminInbox(account)`
- Models involved:
  - `Conversation`

#### G. Get one conversation

- Frontend function: `getAdminConversation`
- Endpoint: `GET /messages/admin/conversation/:conversationId`
- Backend service: `getAdminConversation(account, conversationId)`
- Models involved:
  - `Conversation`
  - `ConversationMessage`

#### H. Reply to a conversation

- Frontend function: `adminReplyToConversation`
- Endpoint: `POST /messages/admin/conversation/:conversationId/reply`
- Body:
  - `{ "body": "..." }`
- Backend service: `replyToConversationAsAdmin(account, conversationId, payload)`
- Models involved:
  - `Conversation`
  - `ConversationMessage`

#### I. Send a new message to a student

- Frontend function: `adminSendMessageToStudent`
- Endpoint: `POST /messages/admin/send`
- Body:
  - `studentEmail`
  - `subject`
  - `body`
- Backend service: `sendAdminMessageToStudent(account, payload)`
- Models involved:
  - `Admin`
  - `PermitStudentDirectory`
  - `User`
  - `Conversation`
  - `ConversationMessage`

### Important page notes

- The page also creates local fallback admin data from `getSavedUser('admin')` or `getSavedUser('user')`.
- Recent actions shown on the page come from `GET /api/profile/admin`; there is no separate actions endpoint for this page.

## 3. Student Relatives Page APIs

### Page

- Frontend page: `src/pages/RelativesFamily/RelativesUser.jsx`

### APIs used directly by the page

#### A. Get current student's relatives

- Frontend function: `getMyRelatives`
- Frontend file: `src/api/relatives.js`
- Request:
  - Method: `GET`
  - Endpoint: `/relatives/me`
- Backend route:
  - `GET /api/relatives/me`
- Backend controller:
  - `listMyRelativesController`
- Backend service:
  - `getMyRelatives(user)`
- Main models involved:
  - `Relative`
  - `PermitStudentDirectory`
- Response consumed by frontend:
  - `records[]`

#### B. Create a relative

- Frontend function: `createRelative`
- Request:
  - Method: `POST`
  - Endpoint: `/relatives`
  - Body: relative form JSON
- Backend route:
  - `POST /api/relatives`
- Backend controller:
  - `createRelativeController`
- Backend service:
  - `createRelativeForStudent(user, payload)`
- Main model involved:
  - `Relative`
- Response consumed by frontend:
  - `record`

#### C. Update a relative

- Frontend function: `updateRelative`
- Request:
  - Method: `PATCH`
  - Endpoint: `/relatives/:id`
  - Body: relative form JSON
- Backend route:
  - `PATCH /api/relatives/:id`
- Backend controller:
  - `updateRelativeController`
- Backend service:
  - `updateRelativeForStudent(user, relativeId, payload)`
- Main model involved:
  - `Relative`
- Response consumed by frontend:
  - `record`

#### D. Delete a relative

- Frontend function: `deleteRelative`
- Request:
  - Method: `DELETE`
  - Endpoint: `/relatives/:id`
- Backend route:
  - `DELETE /api/relatives/:id`
- Backend controller:
  - `deleteRelativeController`
- Backend service:
  - `deleteRelativeForStudent(user, relativeId)`

### Relative object shape returned by backend

The backend formats relative records from `models/Relative.js`. Main fields available:

- `relativeName`
- `relation`
- `nationalId`
- `birthDate`
- `job`
- `socialStatus`
- `phone`
- `address`
- `notes`

### Important page notes

- The student summary card on this page is not loaded from an API.
- It uses local storage only through `getSavedUser('user')` or fallback `getSavedUser('admin')`.

## 4. Admin Relatives Page APIs

### Page

- Frontend page: `src/pages/RelativesFamily/RelativesAdmin.jsx`

### APIs used directly by the page

#### A. Search students

- Frontend function: `searchProfileStudents`
- Frontend file: `src/api/profile.js`
- Request:
  - Method: `GET`
  - Endpoint: `/profile/admin/students/search?search=<text>`
- Backend route:
  - `GET /api/profile/admin/students/search`
- Backend controller:
  - `searchAdminStudentsController`
- Backend service:
  - `searchStudentsForAdmin({ search })`
- Main model involved:
  - `PermitStudentDirectory`
- Response consumed by frontend:
  - `students[]`

#### B. Get relatives for one selected student

- Frontend function: `getStudentRelatives`
- Frontend file: `src/api/relatives.js`
- Request:
  - Method: `GET`
  - Endpoint: `/relatives/admin/student/:studentId`
- Backend route:
  - `GET /api/relatives/admin/student/:studentId`
- Backend controller:
  - `getStudentRelativesController`
- Backend service:
  - `getStudentRelativesForAdmin(studentId)`
- Main models involved:
  - `PermitStudentDirectory`
  - `Relative`
- Response consumed by frontend:
  - `student`
  - `relatives`

### Student object shape returned for selected student

`getStudentRelativesForAdmin(studentId)` returns:

- `student.id`
- `student.name`
- `student.email`
- `student.militaryId`
- `student.relativesCount`

### Relative object shape returned for selected student

Main fields returned from the backend formatter:

- `id`
- `relativeName`
- `relation`
- `nationalId`
- `birthDate`
- `job`
- `socialStatus`
- `phone`
- `address`
- `notes`

### Important page notes

- The current Admin Relatives page uses `searchProfileStudents`, not `searchStudentsRelatives`.
- The page then uses `getStudentRelatives(selectedStudentId)` to fetch full selected student + relatives data.
- Printing and the selected student cards rely on already loaded page data; no extra print API was found.

## Message Data Model Used By Profile Pages

These message APIs support both profile pages:

- Model: `Conversation`
  - collection: `conversations`
  - key fields:
    - `admin`
    - `student`
    - `studentUser`
    - `subject`
    - `lastMessage`
    - `lastMessageAt`
    - `unreadForAdmin`
    - `unreadForStudent`
    - `status`

- Model: `ConversationMessage`
  - collection: `conversation_messages`
  - key fields:
    - `conversation`
    - `senderType`
    - `senderAdmin`
    - `senderUser`
    - `body`
    - `readByAdmin`
    - `readByStudent`

## Biggest Issues Found

### 1. Admin Relatives search count is not backed by the search API

- `RelativesAdmin.jsx` maps `student.relativesCount ?? 0`
- But `searchProfileStudents()` backend response does not actually include `relativesCount`
- Result:
  - the search list can show `0` even when the selected student does have relatives
  - the accurate count only appears after `getStudentRelatives(studentId)` finishes

### 2. There are two different student-search APIs with overlapping purpose

- Existing relative API helper:
  - `searchStudentsRelatives()` -> `GET /api/relatives/admin/search`
- Current Admin Relatives page actually uses:
  - `searchProfileStudents()` -> `GET /api/profile/admin/students/search`
- This is not a runtime error by itself, but it creates API overlap and increases maintenance confusion.

### 3. Student-facing display on Relatives User page is partially local, not API-driven

- The student info shown on `/relatives` comes from local storage fallback, not a dedicated student summary API for that page.
- If local storage is stale, the display can be stale even when relatives data is current.

### 4. Student Profile has a hardcoded duration value

- `specializationDuration` is hardcoded in the frontend as `4 أشهر`
- That value is not coming from the backend profile API

## APIs Present In Backend But Not Used By The Audited Pages

- `GET /api/profile/me`
- `GET /api/profile/students`
- `GET /api/profile/summary/student/:studentId`
- `GET /api/relatives/admin`
- `GET /api/relatives/admin/search`
  - helper exists in frontend API layer, but current `RelativesAdmin.jsx` does not use it

## Files Inspected

Frontend:

- `src/App.jsx`
- `src/api/client.js`
- `src/api/profile.js`
- `src/api/relatives.js`
- `src/api/messages.js`
- `src/pages/Profile/ProfileUser.jsx`
- `src/pages/Profile/ProfileAdmin.jsx`
- `src/pages/RelativesFamily/RelativesUser.jsx`
- `src/pages/RelativesFamily/RelativesAdmin.jsx`

Backend:

- `Digilians-BackEnd-FinalProject/server.js`
- `Digilians-BackEnd-FinalProject/routes/profile.routes.js`
- `Digilians-BackEnd-FinalProject/controllers/profile.controller.js`
- `Digilians-BackEnd-FinalProject/services/profile.service.js`
- `Digilians-BackEnd-FinalProject/routes/relative.routes.js`
- `Digilians-BackEnd-FinalProject/controllers/relative.controller.js`
- `Digilians-BackEnd-FinalProject/services/relative.service.js`
- `Digilians-BackEnd-FinalProject/models/Relative.js`
- `Digilians-BackEnd-FinalProject/routes/message.routes.js`
- `Digilians-BackEnd-FinalProject/controllers/message.controller.js`
- `Digilians-BackEnd-FinalProject/services/message.service.js`
- `Digilians-BackEnd-FinalProject/models/Conversation.js`
- `Digilians-BackEnd-FinalProject/models/ConversationMessage.js`
- `Digilians-BackEnd-FinalProject/routes/punishment.routes.js`
- `Digilians-BackEnd-FinalProject/controllers/punishment.controller.js`
- `Digilians-BackEnd-FinalProject/services/punishment.service.js`
- `Digilians-BackEnd-FinalProject/models/Punishment.model.js`

## Final Confirmation

- No frontend source code was changed
- No backend source code was changed
- No unrelated pages were modified
- Only this audit file was added to the frontend project root
