/**
 * Google Calendar GDPR Cleanup Script
 * 
 * Dieses Script löscht automatisch Kalendereinträge, die älter als eine bestimmte Anzahl von Monaten sind.
 * Es ist besonders nützlich für die Einhaltung von GDPR-Richtlinien und zur Bereinigung von alten Kalendereinträgen.
 * 
 * WICHTIG: Dieses Script benötigt Kalender-Admin-Rechte oder Edit-Rechte für alle zu bereinigenden Kalender.
 * 
 * @author Henning Ziech
 * @version 1.0
 */

function cleanOldEvents() {
  /**
   * KONFIGURATION
   * 
   * Hier müssen Sie die Kalender-IDs Ihrer zu bereinigenden Kalender eintragen.
   * Kalender-IDs finden Sie in den Kalender-Einstellungen unter "Kalender-ID".
   * 
   * Beispiel-Formate:
   * - Resource Calendar: "c_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx@resource.calendar.google.com"
   * - Group Calendar: "c_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx@group.calendar.google.com"
   * - Domain Calendar: "domain.com_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx@resource.calendar.google.com"
   */
  var calendarIds = [
    "YOUR_CALENDAR_ID_1@resource.calendar.google.com",
    "YOUR_CALENDAR_ID_2@group.calendar.google.com",
    "YOUR_CALENDAR_ID_3@resource.calendar.google.com"
    // Fügen Sie hier weitere Kalender-IDs hinzu
  ];

  /**
   * SICHERHEITSEINSTELLUNGEN
   * 
   * WICHTIG: Setzen Sie deleteEvents auf false für einen Testlauf!
   * Das Script zeigt dann nur an, welche Events gelöscht würden, ohne sie tatsächlich zu löschen.
   */
  var deleteEvents = false; // Setzen Sie auf true, wenn wirklich gelöscht werden soll
  var monthsBack = 6;       // Anzahl der Monate zurück (Events älter als X Monate werden gelöscht)

 
  // Berechne das Cutoff-Datum (X Monate zurück vom heutigen Datum)
  var cutoffDate = new Date();
  cutoffDate.setMonth(cutoffDate.getMonth() - monthsBack);
  
  Logger.log("=== GDPR Calendar Cleanup gestartet ===");
  Logger.log("Cutoff-Datum: " + cutoffDate.toLocaleDateString());
  Logger.log("Lösche Events älter als " + monthsBack + " Monate");
  Logger.log("Löschmodus: " + (deleteEvents ? "AKTIV" : "TEST (nur Anzeige)"));
  Logger.log("=====================================");

  // Durchlaufe alle konfigurierten Kalender
  for (var c = 0; c < calendarIds.length; c++) {
    var calendarId = calendarIds[c];
    
    // Versuche, den Kalender zu laden
    var calendar = CalendarApp.getCalendarById(calendarId);
    if (!calendar) {
      Logger.log("FEHLER: Kalender nicht gefunden oder keine Berechtigung: " + calendarId);
      continue;
    }
    
    Logger.log("Prüfe Kalender: " + calendar.getName() + " (" + calendarId + ")");
    
    try {
      // Alle Events von 2000 bis zum Cutoff-Datum abrufen
      // Hinweis: getEvents(startDate, endDate) - Events zwischen diesen Daten
      var events = calendar.getEvents(new Date(2000, 0, 1), cutoffDate);
      Logger.log("Gefundene alte Events: " + events.length);
      
      // Durchlaufe alle gefundenen Events
      for (var i = 0; i < events.length; i++) {
        var event = events[i];
        var eventInfo = event.getTitle() + " | " + event.getStartTime().toLocaleDateString();
        
        if (deleteEvents) {
          // Event tatsächlich löschen
          event.deleteEvent();
          Logger.log("GELÖSCHT: " + eventInfo);
        } else {
          // Nur anzeigen, was gelöscht würde (Testmodus)
          Logger.log("WÜRDE löschen: " + eventInfo);
        }
      }
      
      Logger.log("Kalender '" + calendar.getName() + "' abgeschlossen.");
      
    } catch (error) {
      Logger.log("FEHLER beim Verarbeiten von Kalender '" + calendar.getName() + "': " + error.toString());
    }
  }
  
  Logger.log("=== GDPR Calendar Cleanup abgeschlossen ===");
}

/**
 * Hilfsfunktion: Testet die Verbindung zu allen konfigurierten Kalendern
 * Führen Sie diese Funktion aus, um zu prüfen, ob alle Kalender-IDs korrekt sind
 * und Sie die notwendigen Berechtigungen haben.
 */
function testCalendarAccess() {
  var calendarIds = [
    "YOUR_CALENDAR_ID_1@resource.calendar.google.com",
    "YOUR_CALENDAR_ID_2@group.calendar.google.com",
    "YOUR_CALENDAR_ID_3@resource.calendar.google.com"
  ];
  
  Logger.log("=== Kalender-Zugriffstest ===");
  
  for (var i = 0; i < calendarIds.length; i++) {
    var calendarId = calendarIds[i];
    try {
      var calendar = CalendarApp.getCalendarById(calendarId);
      if (calendar) {
        Logger.log("✓ OK: " + calendar.getName() + " (" + calendarId + ")");
      } else {
        Logger.log("✗ FEHLER: Kalender nicht gefunden: " + calendarId);
      }
    } catch (error) {
      Logger.log("✗ FEHLER: " + calendarId + " - " + error.toString());
    }
  }
  
  Logger.log("=== Test abgeschlossen ===");
}
