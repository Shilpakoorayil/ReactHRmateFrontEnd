# HRMate Advanced (Vite + React)
This is an advanced HRMS frontend scaffold (HRMate Advanced).

## Quick start
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start JSON server (fake backend):
   ```bash
   npm run start:json
   ```
3. Start dev server:
   ```bash
   npm run dev
   ```

Open the dev URL printed by Vite (usually http://localhost:5173).

## Included features
- Login / Register with role selection (admin / manager / employee)
- Role-based protected routes (admin-only payroll, admin/manager employee edit)
- Dashboard with Chart.js charts (placeholders)
- Payroll page (list payroll runs)
- Attendance (check-in)
- Employee profile page
- Settings page (Dark mode toggle)
- JSON-server (db.json) with sample users & data

## Default users
- admin@hrmate.local / admin123 (admin)
- manager@hrmate.local / manager123 (manager)
- john@hrmate.local / john123 (employee)

You can extend components (FullCalendar usage, better charts, payroll details, payslip generation). If you want I will:
1. Replace calendar placeholder with FullCalendar integration and event CRUD.
2. Add payslip generation & PDF export.
3. Add CSV export for attendance & payroll.
4. Polish UI: icons, responsive behavior, animations.

Reply with which features you'd like next and I'll add them into a new ZIP.
