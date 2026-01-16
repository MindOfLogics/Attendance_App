# 📊 App Flow & User Journey

Visual guide to understanding how the Attendance Tracker app works.

## 🎯 Main User Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     USER ARRIVES AT APP                      │
│                  http://localhost:3000                       │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
                 ┌─────────────┐
                 │ Has Account?│
                 └──────┬──────┘
                        │
          ┌─────────────┴─────────────┐
          │ NO                     YES│
          ▼                           ▼
    ┌──────────┐              ┌──────────┐
    │ REGISTER │              │  LOGIN   │
    │          │              │          │
    │ • Name   │              │ • Email  │
    │ • Email  │              │ • Pass   │
    │ • Pass   │              │          │
    │ • Min %  │              │          │
    └────┬─────┘              └────┬─────┘
         │                         │
         └──────────┬──────────────┘
                    │
                    ▼
          ┌──────────────────┐
          │    DASHBOARD      │
          │  (Main Screen)    │
          └────────┬──────────┘
                   │
        ┌──────────┼──────────┬──────────┬──────────┐
        │          │          │          │          │
        ▼          ▼          ▼          ▼          ▼
   ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
   │SUBJECTS│ │TIMETABL│ │ CLASS  │ │PROFILE │ │ LOGOUT │
   │        │ │   E    │ │CHANGES │ │        │ │        │
   └────────┘ └────────┘ └────────┘ └────────┘ └────────┘
```

## 📚 Subjects Flow

```
SUBJECTS PAGE
│
├─ Add New Subject
│  │
│  └─> Fill Form
│      ├─ Subject Name ✓
│      ├─ Subject Code
│      ├─ Teacher Name
│      ├─ Pick Color 🎨
│      └─ Credits
│      │
│      └─> Save
│          │
│          └─> Subject Created ✓
│              Appears on Subjects Page
│
├─ View Subject Card
│  │
│  ├─ See Statistics
│  │  ├─ Attendance %
│  │  ├─ Total Classes
│  │  ├─ Attended Count
│  │  └─ Status (🟢 Safe / 🔴 At Risk)
│  │
│  └─ Actions
│     ├─ Edit Subject ✏️
│     ├─ Delete Subject 🗑️
│     └─ Mark Attendance ✓
│         │
│         └─> Attendance Form
│             ├─ Select Date
│             ├─ Status (Present/Absent)
│             └─ Notes (Optional)
│             │
│             └─> Save
│                 │
│                 ├─> Subject Stats Update
│                 ├─> Dashboard Updates
│                 └─> Success Message 🎉
```

## 📊 Dashboard Flow

```
DASHBOARD
│
├─ Overall Stats Cards
│  ├─ Overall Attendance % 
│  │  └─> Color: Green (≥target) / Red (<target)
│  ├─ Total Classes Attended
│  ├─ Total Classes Held
│  └─ Subjects at Risk Count
│
├─ Attendance Status Banner
│  ├─ IF attendance ≥ target:
│  │  └─> "Great! You're meeting your 75% goal"
│  │      "Current: 78%"
│  │
│  └─ IF attendance < target:
│     └─> "You're below your 75% target"
│         "Current: 72%. Attend more classes"
│
├─ Subjects Overview
│  │
│  └─> For Each Subject:
│      ├─ Subject Info
│      │  ├─ Name & Code
│      │  ├─ Color Bar
│      │  └─ Current %
│      │
│      ├─ Statistics
│      │  ├─ Attended / Total
│      │  └─ Progress Bar
│      │
│      └─ Smart Suggestion
│         ├─ IF below target:
│         │  └─> "⚠️ Attend next X classes to reach 75%"
│         │
│         └─ IF above target:
│            └─> "✅ Can miss up to X classes"
│
└─ Upcoming Class Changes
   └─> Recent postponements/cancellations
```

## 📅 Timetable Flow

```
TIMETABLE PAGE
│
└─> 7 Days Display
    │
    ├─ Monday
    ├─ Tuesday
    ├─ Wednesday
    ├─ Thursday
    ├─ Friday
    ├─ Saturday
    └─ Sunday
        │
        └─> For Each Day:
            │
            ├─ No Schedule?
            │  └─> Click "Add"
            │      │
            │      └─> Add Period Form
            │          ├─ Select Subject
            │          ├─ Start Time
            │          ├─ End Time
            │          ├─ Room Number
            │          │
            │          ├─ Add More Periods (+)
            │          │
            │          └─> Save
            │              └─> Timetable Created ✓
            │
            └─ Has Schedule?
               ├─> View Periods
               │   └─> Each Period Shows:
               │       ├─ Period Number
               │       ├─ Subject (colored)
               │       ├─ Time Slot
               │       └─ Room
               │
               └─> Actions
                   ├─ Edit Day Schedule
                   └─ Delete Day Schedule
```

## 🔄 Class Changes Flow

```
CLASS CHANGES PAGE
│
├─ Add New Change
│  │
│  └─> Fill Form
│      ├─ Select Subject ▼
│      ├─ Original Date
│      ├─ Original Time
│      │
│      ├─ Change Type:
│      │  ├─ 🟡 Postponed
│      │  ├─ 🔴 Cancelled
│      │  ├─ 🔵 Rescheduled
│      │  └─ 🟢 Extra Class
│      │
│      ├─ New Date (if applicable)
│      ├─ New Time (if applicable)
│      ├─ Reason (optional)
│      │
│      └─> Save
│          └─> Change Recorded ✓
│
├─ View Changes
│  │
│  ├─> UPCOMING CHANGES
│  │   └─> Shows future changes
│  │       ├─ Subject
│  │       ├─ Original date/time
│  │       ├─ New date/time
│  │       ├─ Change type badge
│  │       └─ Reason
│  │
│  └─> PAST CHANGES
│      └─> Shows historical changes
│          (same info, grayed out)
│
└─> Actions per Change
    ├─ View Details
    └─ Delete Change 🗑️
```

## 👤 Profile Flow

```
PROFILE PAGE
│
├─> Personal Information
│   ├─ Name (editable)
│   └─ Email (editable)
│
├─> Attendance Preferences
│   └─ Minimum Attendance % 🎯
│      ├─ Current: 75%
│      ├─ Change to any value (0-100)
│      └─> Affects all calculations
│
├─> Change Password
│   ├─ New Password
│   └─ Confirm Password
│
└─> Save Changes
    └─> Profile Updated ✓
        ├─> Dashboard recalculates
        └─> New target applied
```

## 🔄 Attendance Calculation Flow

```
USER MARKS ATTENDANCE
│
└─> System Flow:
    │
    1. Validate Input
    │  ├─ Check if subject exists
    │  ├─ Check for duplicates
    │  └─ Validate date
    │
    2. Save Attendance Record
    │  └─> Database: attendances collection
    │
    3. Update Subject Statistics
    │  ├─ totalClasses++
    │  └─ IF status = "present":
    │      └─> attendedClasses++
    │
    4. Calculate Percentage
    │  └─> (attendedClasses / totalClasses) × 100
    │
    5. Calculate Smart Suggestions
    │  │
    │  ├─> IF percentage < target:
    │  │   └─> Calculate classes needed
    │  │       Formula: (target×total - 100×attended)/(100-target)
    │  │
    │  └─> IF percentage ≥ target:
    │      └─> Calculate classes can miss
    │          Formula: (100×attended - target×total)/target
    │
    6. Update UI
    │  ├─> Subject card refreshes
    │  ├─> Dashboard updates
    │  └─> Show success message
    │
    └─> Done! ✓
```

## 📈 Real-Time Calculation Example

```
SCENARIO: Math Subject

Initial State:
├─ Total Classes: 40
├─ Attended: 28
├─ Current %: 70%
├─ Target: 75%
└─ Status: 🔴 Below Target

Calculation:
Classes Needed = (75×40 - 100×28) / (100-75)
               = (3000 - 2800) / 25
               = 200 / 25
               = 8 classes

Display:
"⚠️ Attend the next 8 classes to reach 75%"

User Marks Present 8 Times:
├─ Total: 48
├─ Attended: 36
├─ New %: 75%
└─ Status: 🟢 Meeting Target

New Calculation:
Classes Can Miss = (100×36 - 75×48) / 75
                 = (3600 - 3600) / 75
                 = 0

Display:
"✅ You're meeting your target!
    Maintain attendance to stay at 75%"

After 2 More Present:
├─ Total: 50
├─ Attended: 38
├─ New %: 76%
└─ Status: 🟢 Above Target

New Calculation:
Classes Can Miss = (100×38 - 75×50) / 75
                 = (3800 - 3750) / 75
                 = 50 / 75
                 = 0.67 ≈ 0

Display:
"✅ You can miss up to 0 classes
    Current buffer is minimal"
```

## 🎨 Color Coding System

```
Subject Status:
├─ 🟢 Green (≥ Target)
│  └─> Safe, on track
│
├─ 🔴 Red (< Target)
│  └─> At risk, needs attention
│
└─ 🟡 Yellow (Near Target)
   └─> Warning, be careful

Change Types:
├─ 🟡 Postponed (Amber)
├─ 🔴 Cancelled (Red)
├─ 🔵 Rescheduled (Blue)
└─ 🟢 Extra Class (Green)

UI Elements:
├─ Primary: #4F46E5 (Indigo)
├─ Success: #10B981 (Green)
├─ Warning: #F59E0B (Amber)
├─ Danger: #EF4444 (Red)
└─ Info: #3B82F6 (Blue)
```

## 🔐 Authentication Flow

```
LOGIN/REGISTER
│
├─> User Submits Credentials
│   │
│   └─> Backend Validates
│       │
│       ├─> IF Valid:
│       │   ├─ Generate JWT Token
│       │   ├─ Send to Frontend
│       │   ├─ Store in localStorage
│       │   └─> Redirect to Dashboard
│       │
│       └─> IF Invalid:
│           └─> Show Error Message
│
├─> All Future Requests
│   └─> Include Token in Header
│       Authorization: Bearer <token>
│
└─> Backend Middleware
    └─> Verify Token
        │
        ├─> IF Valid:
        │   └─> Process Request
        │
        └─> IF Invalid:
            └─> Return 401 Unauthorized
```

## 📱 Responsive Design Flow

```
SCREEN SIZE
│
├─> Desktop (> 1024px)
│   ├─ Sidebar always visible
│   ├─ Wide cards layout
│   └─ Multi-column grids
│
├─> Tablet (768px - 1024px)
│   ├─ Collapsible sidebar
│   ├─ Medium cards
│   └─ 2-column grids
│
└─> Mobile (< 768px)
    ├─ Hidden sidebar (toggle)
    ├─ Full-width cards
    ├─ Single column
    └─ Touch-optimized buttons
```

---

## 🎯 Summary: What Happens When...

### When You Add a Subject:
1. Form submission
2. Saved to database
3. Appears on Subjects page
4. Shows up in Dashboard
5. Available in Timetable dropdown
6. Available in Class Changes dropdown

### When You Mark Attendance:
1. Record saved
2. Subject stats updated
3. Percentage recalculated
4. Smart suggestion updated
5. Dashboard refreshed
6. Success notification

### When You Create Timetable:
1. Periods saved for day
2. Visible on Timetable page
3. Can be edited anytime
4. Helps organize schedule
5. Reference for class times

### When You Add Class Change:
1. Change recorded
2. Shows in Upcoming/Past sections
3. Visible on Dashboard
4. Helps track modifications
5. Can be deleted if needed

---

**Understanding these flows helps you make the most of the app! 📊✨**
