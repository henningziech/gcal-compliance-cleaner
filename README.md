# Google Calendar GDPR Cleanup Script

A Google Apps Script for automatic cleanup of old calendar events for GDPR compliance and data hygiene.

## Overview

This script automatically deletes calendar events older than a configurable number of months. It is especially useful for:

- **GDPR Compliance**: Automatic deletion of old personal data
- **Data Hygiene**: Cleanup of outdated calendar entries
- **Storage Optimization**: Reducing the amount of calendar data
- **Organizational Cleanup**: Removal of old appointments and events

## Important Prerequisites

**This script requires special permissions:**

1. **Google Workspace Admin account** with calendar admin rights, OR
2. **Account with edit rights** for all calendars to be cleaned

**Without these permissions, the script cannot access the calendars!**

## Installation and Setup

### 1. Create the Google Apps Script project

1. Go to [script.google.com](https://script.google.com)
2. Click "New project"
3. Copy the contents of `main.gs` into the editor
4. Save the project (Ctrl+S)

### 2. Configure calendar IDs

1. Open Google Calendar
2. Go to the calendar settings
3. Click on the desired calendar
4. Scroll to "Calendar ID" and copy it
5. Replace the placeholders in `main.gs`:

```javascript
var calendarIds = [
  "your-calendar-id-1@resource.calendar.google.com",
  "your-calendar-id-2@group.calendar.google.com",
  "your-calendar-id-3@resource.calendar.google.com"
];
```

### 3. Grant permissions

1. Run the script for the first time
2. Google will ask for permissions
3. Click "Review permissions"
4. Select your Google account
5. Click "Advanced" > "Go to [project name] (unsafe)"
6. Click "Allow"

## Configuration

### Safety settings

```javascript
var deleteEvents = false; // Set to true for actual deletion
var monthsBack = 6;       // Number of months to look back
```

**IMPORTANT**:
- `deleteEvents = false`: Test mode (only shows what would be deleted)
- `deleteEvents = true`: Actual deletion (USE WITH CAUTION!)

### Recommended workflow

1. **Test run**: `deleteEvents = false` > Run script > Check logs
2. **Actual execution**: `deleteEvents = true` > Run script

## Usage

### Main function: `cleanOldEvents()`

Performs the cleanup of all configured calendars.

```javascript
function cleanOldEvents() {
  // Cleans all calendars
}
```

### Test function: `testCalendarAccess()`

Tests access to all configured calendars.

```javascript
function testCalendarAccess() {
  // Checks calendar access
}
```

### Execution

1. **Manual**: Select the function from the dropdown and click "Run"
2. **Automatic**: Set up a trigger (Extensions > Triggers)

## Logs and Monitoring

The script creates detailed logs:

```
=== GDPR Calendar Cleanup started ===
Cutoff date: 06/15/2024
Deleting events older than 6 months
Delete mode: TEST (display only)
=====================================
Checking calendar: Meeting Room A (c_xxx@resource.calendar.google.com)
Old events found: 15
WOULD delete: Team Meeting | 01/10/2024
WOULD delete: Project Review | 02/15/2024
...
```

**View logs**: View > Logs

## Automation

### Setting up a trigger

1. Click "Extensions" > "Triggers"
2. Click "Add Trigger"
3. Configure:
   - **Function**: `cleanOldEvents`
   - **Event source**: Time-driven
   - **Time-based trigger**: Monthly on the 1st
   - **Time of day**: 02:00 - 03:00

### Recommended frequency

- **Weekly**: For active organizations
- **Monthly**: For standard operations
- **Quarterly**: For minimal cleanup

## Security Notes

### Before first execution

1. **Create a backup**: Export important calendars
2. **Use test mode**: `deleteEvents = false`
3. **Check logs**: Review all events to be deleted
4. **Test permissions**: Run `testCalendarAccess()`

### Best Practices

- **Regular testing**: Run test passes regularly
- **Monitoring**: Review logs after every execution
- **Backup strategy**: Create regular calendar backups
- **Gradual rollout**: Start with less critical calendars

## Troubleshooting

### Common issues

**"Calendar not found"**
- Check the calendar ID
- Verify permissions
- Make sure the calendar exists

**"No permission"**
- Use an admin account
- Or grant edit rights for the calendar
- Check the Google Workspace permissions

**"Script not running"**
- Check the trigger configuration
- Review the logs for error messages
- Run the function manually

### Debugging tips

1. Use `testCalendarAccess()` for testing
2. Check the logs under View > Logs
3. Run the script manually
4. Verify the calendar IDs

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Create a pull request

## Changelog

### Version 1.0
- Initial release
- Automatic cleanup of old calendar events
- Test mode for safe execution
- Detailed logging functionality
- Helper function for calendar access testing

---

**Disclaimer**: This script permanently deletes data. Use it with caution and test thoroughly before using in production.
