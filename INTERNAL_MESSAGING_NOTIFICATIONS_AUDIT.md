# INTERNAL_MESSAGING_NOTIFICATIONS_AUDIT

## Summary of What Was Implemented
Implemented a focused internal messaging and notification system between Admin Profile and Student Profile only.

Implemented behavior:
- Admin can send an internal message to a student from `التواصل بالطالب`.
- Message is stored in MongoDB using Conversation + ConversationMessage models.
- Student sees unread count on the Student Profile notification bell.
- Student can open the inbox, read the message, and reply.
- Student reply is stored in MongoDB.
- Admin sees unread count on the Admin Profile notification bell.
- Admin can open the inbox, read student replies, and reply again if needed.
- Read/unread behavior is tracked separately for admin and student.
- Access to conversations is protected by role and ownership checks.

## Backend Files Created / Modified
Created:
- `../Digilians-BackEnd-FinalProject/models/Conversation.js`
- `../Digilians-BackEnd-FinalProject/models/ConversationMessage.js`
- `../Digilians-BackEnd-FinalProject/services/message.service.js`
- `../Digilians-BackEnd-FinalProject/controllers/message.controller.js`
- `../Digilians-BackEnd-FinalProject/routes/message.routes.js`

Modified:
- `../Digilians-BackEnd-FinalProject/server.js`

## Frontend Files Created / Modified
Created:
- `src/api/messages.js`
- `src/components/profileComponents/MessagesCenterModal.jsx`
- `src/components/adminProfileComponents/SendStudentMessageModal.jsx`

Modified:
- `src/pages/Profile/ProfileAdmin.jsx`
- `src/pages/Profile/ProfileUser.jsx`
- `src/components/adminProfileComponents/AdminProfileTopBar.jsx`
- `src/components/adminProfileComponents/AdminInfoHeader.jsx`

## Backend Endpoint Documentation
### Admin endpoints
- `POST /api/messages/admin/send`
  - auth required
  - admin required
  - body:
    - `studentEmail`
    - `subject`
    - `body`
  - creates a new conversation and first message

- `GET /api/messages/admin/inbox`
  - auth required
  - admin required
  - returns current admin conversations sorted newest first

- `GET /api/messages/admin/unread-count`
  - auth required
  - admin required
  - returns unread message count for current admin

- `GET /api/messages/admin/conversation/:conversationId`
  - auth required
  - admin required
  - returns full conversation
  - marks admin-side unread messages as read

- `POST /api/messages/admin/conversation/:conversationId/reply`
  - auth required
  - admin required
  - body:
    - `body`
  - replies inside existing conversation
  - increments unread count for student

### Student endpoints
- `GET /api/messages/student/inbox`
  - auth required
  - student-only enforced in service
  - returns current student conversations sorted newest first

- `GET /api/messages/student/unread-count`
  - auth required
  - student-only enforced in service
  - returns unread message count for current student

- `GET /api/messages/student/conversation/:conversationId`
  - auth required
  - student-only enforced in service
  - returns full conversation
  - marks student-side unread messages as read

- `POST /api/messages/student/conversation/:conversationId/reply`
  - auth required
  - student-only enforced in service
  - body:
    - `body`
  - replies inside existing conversation
  - increments unread count for admin

## Database Models and Relationships
### Conversation
Stores the thread-level relationship between admin and student.

Fields:
- `admin` -> `Admin`
- `student` -> `PermitStudentDirectory`
- `studentUser` -> `User` optional
- `subject`
- `lastMessage`
- `lastMessageAt`
- `unreadForAdmin`
- `unreadForStudent`
- `status`
- timestamps

### ConversationMessage
Stores each message inside a conversation.

Fields:
- `conversation` -> `Conversation`
- `senderType` -> `admin | student`
- `senderAdmin` -> `Admin` optional
- `senderUser` -> `User` optional
- `body`
- `readByAdmin`
- `readByStudent`
- timestamps

Relationship flow:
- One admin can own many conversations.
- One student can have many conversations.
- One conversation can contain many messages.

## Unread Notification Count Behavior
Unread logic is separate for both sides:
- When admin sends first message:
  - `unreadForStudent += 1`
  - admin message is marked read for admin
- When student opens the conversation:
  - all admin-sent unread messages are marked `readByStudent = true`
  - `unreadForStudent = 0`
- When student replies:
  - `unreadForAdmin += 1`
  - student reply is marked read for student
- When admin opens the conversation:
  - all student-sent unread messages are marked `readByAdmin = true`
  - `unreadForAdmin = 0`
- Notification badge count is loaded from `/unread-count` endpoints.

## Admin Send-Message Flow
1. Admin opens `/admin/profile`.
2. Admin clicks `التواصل بالطالب`.
3. A send-message modal opens.
4. Admin enters student email, subject, and body.
5. Frontend calls `POST /api/messages/admin/send`.
6. Backend validates:
   - admin auth/role
   - student email exists in PermitStudentDirectory/User
   - subject/body are not empty
7. Conversation + first message are saved in MongoDB.
8. Student unread count increases.
9. Admin inbox can be refreshed immediately.

## Student Reply Flow
1. Student opens `/profile`.
2. Student sees unread badge on bell if there are unread admin messages.
3. Student opens inbox modal from the bell.
4. Student opens a conversation.
5. Backend marks admin message(s) as read for student.
6. Student writes a reply from inside the conversation modal.
7. Frontend calls `POST /api/messages/student/conversation/:conversationId/reply`.
8. Backend validates ownership and saves the reply.
9. Admin unread count increases.
10. Admin sees unread badge when reopening or refreshing the profile.

## UI / Frontend Behavior
### Admin Profile
- Notification bell stays visible and now shows unread badge.
- Clicking bell opens internal inbox modal.
- `التواصل بالطالب` opens a dedicated send-message modal.
- Admin can open a conversation and reply from inbox modal.

### Student Profile
- Notification bell stays visible and now shows unread badge.
- Clicking bell opens internal inbox modal.
- Student can open a conversation and reply from the same modal.

### Modal behavior
- RTL-friendly
- responsive
- internal scrolling for long content
- clear close button
- empty state: `لا توجد رسائل`
- non-blocking loading/error states inside messaging UI only

## Confirmation That Unrelated Pages Were Not Modified
Confirmed:
- Student Relatives page was not modified for this task.
- Admin Relatives page was not modified for this task.
- Holiday / Statement / Payment / Booking / Medical / Punishment page UI files were not modified for this task.
- Navbar / Footer / Layout / auth flow were not changed beyond mounting the new `/api/messages` route in backend server setup.
- The broken Admin recent-actions work was not continued or changed in this task.

## Testing Steps Performed
Backend syntax checks:
- `node --check ..\Digilians-BackEnd-FinalProject\models\Conversation.js`
- `node --check ..\Digilians-BackEnd-FinalProject\models\ConversationMessage.js`
- `node --check ..\Digilians-BackEnd-FinalProject\services\message.service.js`
- `node --check C:\Users\dells\Downloads\Digilians-BackEnd-FinalProject\controllers\message.controller.js`
- `node --check ..\Digilians-BackEnd-FinalProject\routes\message.routes.js`
- `node --check ..\Digilians-BackEnd-FinalProject\server.js`

Frontend build:
- `npm run build`

Results:
- Backend syntax checks passed.
- Frontend production build passed.

## Remaining Assumptions / Issues
- I verified compilation and syntax, but I did not run a full live browser login flow for admin/student inside this turn.
- The send-message modal accepts manual student email entry and also pre-fills with the currently selected student email when available.
- Admin can reply again inside a conversation through inbox modal; this was implemented as a useful extension while keeping the requested flow intact.
- Existing console logging and duplicate booking mounts already present in backend server file were left untouched except for mounting `/api/messages` once.
