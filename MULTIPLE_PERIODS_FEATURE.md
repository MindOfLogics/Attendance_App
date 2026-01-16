# 🔢 Multiple Periods Per Day - Feature Guide

## ✨ Problem Solved!

**Question:** What if I have the same subject twice in one day?  
**Answer:** Each period is now tracked separately!

---

## 🎯 How It Works

### **Scenario: Math Class Twice a Day**

You have Mathematics:
- **Period 1** - 9:00 AM
- **Period 3** - 11:00 AM

**The app now shows BOTH periods separately:**

```
┌────────────────────────────────────┐
│ Mathematics [Period 1]             │
│ Status: Not marked                 │
│ [✓] [✗] [🚫] [Clear]              │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│ Mathematics [Period 3]             │
│ Status: Not marked                 │
│ [✓] [✗] [🚫] [Clear]              │
└────────────────────────────────────┘
```

You can mark them **independently**!

---

## 📱 Visual Example

### **Daily Attendance Page:**

```
┌──────────────────────────────────────┐
│       Wednesday, Jan 15, 2026        │
├──────────────────────────────────────┤
│                                      │
│ ┌──────────────────────────────────┐ │
│ │ █ Mathematics [Period 1]         │ │
│ │   MATH101                        │ │
│ │   Present                        │ │
│ │   [✓] [✗] [🚫] [✕]             │ │
│ └──────────────────────────────────┘ │
│                                      │
│ ┌──────────────────────────────────┐ │
│ │ █ Physics                        │ │
│ │   PHY101                         │ │
│ │   Absent                         │ │
│ │   [✓] [✗] [🚫] [✕]             │ │
│ └──────────────────────────────────┘ │
│                                      │
│ ┌──────────────────────────────────┐ │
│ │ █ Mathematics [Period 3]         │ │
│ │   MATH101                        │ │
│ │   Not marked                     │ │
│ │   [✓] [✗] [🚫]                  │ │
│ └──────────────────────────────────┘ │
│                                      │
└──────────────────────────────────────┘
```

---

## 🎯 Real-World Examples

### **Example 1: Math Twice Daily**

**Your Schedule:**
- Period 1: Math (9:00-10:00)
- Period 2: Physics (10:00-11:00)
- Period 3: Math (11:00-12:00)

**On Daily Attendance:**
- Math Period 1 - Mark separately
- Physics - Mark normally
- Math Period 3 - Mark separately

**Result:**
- Attended Math P1 ✓
- Missed Physics ✗
- Attended Math P3 ✓

Total: Math counted correctly (2 classes)!

---

### **Example 2: Lab Sessions**

**Your Schedule:**
- Period 1-2: Chemistry Lab (Double period)
- Period 3: Break
- Period 4: Chemistry Lab (Another session)

**On Daily Attendance:**
- Chemistry Lab Period 1
- Chemistry Lab Period 2

Mark each separately based on attendance!

---

### **Example 3: Practical Classes**

**Your Schedule:**
- Morning: Computer Lab (Period 1-2)
- Afternoon: Computer Lab (Period 5-6)

**App Shows:**
- Computer Lab Period 1
- Computer Lab Period 2
- Computer Lab Period 5
- Computer Lab Period 6

Each marked independently!

---

## ✅ Key Features

### **1. Period Badges**
Each occurrence shows a **period badge**:
- `[Period 1]`
- `[Period 2]`
- `[Period 3]`
- etc.

### **2. Independent Marking**
- Mark Period 1 as Present ✓
- Mark Period 3 as Absent ✗
- **Both tracked separately**

### **3. Separate Statistics**
- Each period counts as a class
- Total classes = All periods
- Attended = All periods marked present

### **4. Clear Identification**
- Same color for same subject
- Period badge distinguishes them
- Subject name shows once
- Easy to identify

---

## 📊 How Attendance Counts

### **Example Day:**
```
Math Period 1: Present ✓  → +1 total, +1 attended
Math Period 3: Present ✓  → +1 total, +1 attended

Result: Math = 2/2 = 100%
```

### **Mixed Attendance:**
```
Math Period 1: Present ✓  → +1 total, +1 attended
Math Period 3: Absent ✗   → +1 total, +0 attended

Result: Math = 1/2 = 50%
```

### **One Cancelled:**
```
Math Period 1: Present ✓     → +1 total, +1 attended
Math Period 3: Cancelled 🚫  → +0 total, +0 attended

Result: Math = 1/1 = 100%
(Cancelled doesn't count)
```

---

## 🎯 Usage Guide

### **Step 1: Open Daily Attendance**
Go to Daily Attendance page from sidebar

### **Step 2: Select Date**
Pick the day you want to mark

### **Step 3: See Multiple Periods**
If a subject appears twice, you'll see:
- Subject Name [Period 1]
- Subject Name [Period 3]

### **Step 4: Mark Each Separately**
Click buttons for each period independently

### **Step 5: Done!**
Each period is tracked correctly!

---

## 💡 Pro Tips

### **Tip 1: Different Attendance Per Period**
It's okay if you:
- Attend Period 1 ✓
- Miss Period 3 ✗

App handles it correctly!

### **Tip 2: Cancel Specific Periods**
Teacher cancelled only Period 3?
- Period 1: Present ✓
- Period 3: Cancelled 🚫

Perfect!

### **Tip 3: Review History**
In Subjects → View History:
- See all periods separately
- Each with its date and period number
- Delete specific periods if needed

### **Tip 4: Timetable Integration**
If you've set up timetable:
- App knows which periods exist
- Shows them automatically
- No manual period entry needed

---

## 🔢 Period Numbers

### **How Periods are Numbered:**
- **Period 1** - First occurrence
- **Period 2** - Second occurrence
- **Period 3** - Third occurrence
- etc.

### **Smart Detection:**
App automatically detects:
- Multiple entries of same subject
- Assigns period numbers
- Shows them clearly

---

## 📱 Mobile View

### **On Phone:**
```
┌────────────────────────┐
│ Math [Period 1]        │
│ Present                │
│ [✓][✗][🚫][✕]        │
└────────────────────────┘

┌────────────────────────┐
│ Math [Period 3]        │
│ Not marked             │
│ [✓][✗][🚫]           │
└────────────────────────┘
```

Still clear and easy to use!

---

## ✨ Benefits

### **Accurate Tracking**
✅ Each period counted separately  
✅ No confusion  
✅ Precise attendance percentage  

### **Flexibility**
✅ Attend some periods, miss others  
✅ Mark separately  
✅ Correct statistics  

### **Clear Display**
✅ Period badges  
✅ Visual distinction  
✅ Easy identification  

### **Complete History**
✅ See all periods  
✅ Edit any period  
✅ Delete specific periods  

---

## 🔄 How It Affects Statistics

### **Subject Card Shows:**
```
┌──────────────────────────┐
│ Mathematics              │
│ 15/20 classes = 75%      │
│                          │
│ This includes ALL periods│
│ from all days!           │
└──────────────────────────┘
```

### **Dashboard Suggestions:**
```
Mathematics: 75%
"Attend next 5 classes to reach 80%"

(This counts ALL math periods,
 whether Period 1, 2, or 3!)
```

---

## 📝 Common Questions

### **Q: Do I HAVE to mark both periods?**
A: Yes, each period is a separate class. Mark each one based on your actual attendance.

### **Q: What if I only have one period?**
A: App shows it normally without period badge. Clean and simple!

### **Q: Can I have 3+ periods of same subject?**
A: Yes! App handles any number of periods. Each gets its own badge.

### **Q: What about cancelled periods?**
A: Mark that specific period as cancelled. Others can be present/absent.

### **Q: How to mark past periods?**
A: Use calendar to go to that date, mark each period.

---

## ✅ Summary

### **Problem:**
❌ Can't distinguish between multiple periods of same subject  
❌ Can only mark once per day  
❌ Inaccurate attendance if subject appears twice  

### **Solution:**
✅ Each period shown separately  
✅ Period badges for clarity  
✅ Independent marking  
✅ Accurate statistics  
✅ All periods counted correctly  

---

## 🎯 Quick Reference

| Situation | How It Shows | How to Mark |
|-----------|-------------|-------------|
| **Single period** | Subject Name | Mark normally |
| **Two periods** | Subject [Period 1]<br>Subject [Period 3] | Mark each separately |
| **Three+ periods** | Subject [Period 1]<br>Subject [Period 2]<br>Subject [Period 3] | Mark each separately |

---

**Now you can accurately track attendance even when you have the same subject multiple times per day! 🎉**
