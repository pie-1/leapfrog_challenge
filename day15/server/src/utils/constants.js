const FACULTIES = ['BE Computer', 'Architecture', 'Civil', 'BIT'];
const STUDENT_STATUSES = ['current', 'passed_out'];
const ITEM_CATEGORIES = ['books', 'tools', 'games'];
const ITEM_CONDITIONS = ['New', 'Like New', 'Good', 'Fair', 'Poor'];
const BORROW_STATUSES = ['pending', 'accepted', 'declined', 'returned', 'overdue'];
const EVENT_CATEGORIES = ['workshop', 'hackathon', 'seminar', 'social', 'project_showcase', 'other'];
const PROJECT_CATEGORIES = ['academic', 'personal', 'startup', 'research'];
const NOTIFICATION_TYPES = [
  'borrow_request',
  'borrow_accepted',
  'borrow_declined',
  'item_returned',
  'message',
  'event_invite',
  'team_invite',
  'project_like',
  'borrow_overdue',
  'system'
];

module.exports = {
  FACULTIES,
  STUDENT_STATUSES,
  ITEM_CATEGORIES,
  ITEM_CONDITIONS,
  BORROW_STATUSES,
  EVENT_CATEGORIES,
  PROJECT_CATEGORIES,
  NOTIFICATION_TYPES
};