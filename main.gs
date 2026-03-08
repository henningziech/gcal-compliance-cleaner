/**
 * Google Calendar GDPR Cleanup Script
 *
 * This script automatically deletes calendar events older than a specified number of months.
 * It is especially useful for GDPR compliance and cleaning up old calendar entries.
 *
 * IMPORTANT: This script requires calendar admin rights or edit rights for all calendars to be cleaned.
 *
 * @author Henning Ziech
 * @version 1.0
 */

function cleanOldEvents() {
  /**
   * CONFIGURATION
   *
   * Enter the calendar IDs of the calendars to be cleaned here.
   * You can find calendar IDs in the calendar settings under "Calendar ID".
   *
   * Example formats:
   * - Resource Calendar: "c_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx@resource.calendar.google.com"
   * - Group Calendar: "c_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx@group.calendar.google.com"
   * - Domain Calendar: "domain.com_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx@resource.calendar.google.com"
   */
  var calendarIds = [
    "YOUR_CALENDAR_ID_1@resource.calendar.google.com",
    "YOUR_CALENDAR_ID_2@group.calendar.google.com",
    "YOUR_CALENDAR_ID_3@resource.calendar.google.com"
    // Add more calendar IDs here
  ];

  /**
   * SAFETY SETTINGS
   *
   * IMPORTANT: Set deleteEvents to false for a test run!
   * The script will then only show which events would be deleted without actually deleting them.
   */
  var deleteEvents = false; // Set to true to actually delete events
  var monthsBack = 6;       // Number of months to look back (events older than X months will be deleted)


  // Calculate the cutoff date (X months back from today)
  var cutoffDate = new Date();
  cutoffDate.setMonth(cutoffDate.getMonth() - monthsBack);

  Logger.log("=== GDPR Calendar Cleanup started ===");
  Logger.log("Cutoff date: " + cutoffDate.toLocaleDateString());
  Logger.log("Deleting events older than " + monthsBack + " months");
  Logger.log("Delete mode: " + (deleteEvents ? "ACTIVE" : "TEST (display only)"));
  Logger.log("=====================================");

  // Iterate through all configured calendars
  for (var c = 0; c < calendarIds.length; c++) {
    var calendarId = calendarIds[c];

    // Try to load the calendar
    var calendar = CalendarApp.getCalendarById(calendarId);
    if (!calendar) {
      Logger.log("ERROR: Calendar not found or no permission: " + calendarId);
      continue;
    }

    Logger.log("Checking calendar: " + calendar.getName() + " (" + calendarId + ")");

    try {
      // Fetch all events from 2000 to the cutoff date
      // Note: getEvents(startDate, endDate) - events between these dates
      var events = calendar.getEvents(new Date(2000, 0, 1), cutoffDate);
      Logger.log("Old events found: " + events.length);

      // Iterate through all found events
      for (var i = 0; i < events.length; i++) {
        var event = events[i];
        var eventInfo = event.getTitle() + " | " + event.getStartTime().toLocaleDateString();

        if (deleteEvents) {
          // Actually delete the event
          event.deleteEvent();
          Logger.log("DELETED: " + eventInfo);
        } else {
          // Only show what would be deleted (test mode)
          Logger.log("WOULD delete: " + eventInfo);
        }
      }

      Logger.log("Calendar '" + calendar.getName() + "' completed.");

    } catch (error) {
      Logger.log("ERROR processing calendar '" + calendar.getName() + "': " + error.toString());
    }
  }

  Logger.log("=== GDPR Calendar Cleanup completed ===");
}

/**
 * Helper function: Tests the connection to all configured calendars.
 * Run this function to verify that all calendar IDs are correct
 * and you have the necessary permissions.
 */
function testCalendarAccess() {
  var calendarIds = [
    "YOUR_CALENDAR_ID_1@resource.calendar.google.com",
    "YOUR_CALENDAR_ID_2@group.calendar.google.com",
    "YOUR_CALENDAR_ID_3@resource.calendar.google.com"
  ];

  Logger.log("=== Calendar access test ===");

  for (var i = 0; i < calendarIds.length; i++) {
    var calendarId = calendarIds[i];
    try {
      var calendar = CalendarApp.getCalendarById(calendarId);
      if (calendar) {
        Logger.log("OK: " + calendar.getName() + " (" + calendarId + ")");
      } else {
        Logger.log("ERROR: Calendar not found: " + calendarId);
      }
    } catch (error) {
      Logger.log("ERROR: " + calendarId + " - " + error.toString());
    }
  }

  Logger.log("=== Test completed ===");
}
