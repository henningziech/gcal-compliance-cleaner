# Google Calendar GDPR Cleanup Script

Ein Google Apps Script zur automatischen Bereinigung alter Kalendereinträge für GDPR-Compliance und Datenhygiene.

## 📋 Übersicht

Dieses Script löscht automatisch Kalendereinträge, die älter als eine konfigurierbare Anzahl von Monaten sind. Es ist besonders nützlich für:

- **GDPR-Compliance**: Automatische Löschung alter personenbezogener Daten
- **Datenhygiene**: Bereinigung von veralteten Kalendereinträgen
- **Speicherplatz-Optimierung**: Reduzierung der Kalenderdatenmenge
- **Organisatorische Bereinigung**: Entfernung von alten Terminen und Events

## ⚠️ Wichtige Voraussetzungen

**Dieses Script benötigt spezielle Berechtigungen:**

1. **Google Workspace Admin-Account** mit Kalender-Admin-Rechten ODER
2. **Account mit Edit-Rechten** für alle zu bereinigenden Kalender

**Ohne diese Berechtigungen kann das Script nicht auf die Kalender zugreifen!**

## 🚀 Installation und Setup

### 1. Google Apps Script erstellen

1. Gehen Sie zu [script.google.com](https://script.google.com)
2. Klicken Sie auf "Neues Projekt"
3. Kopieren Sie den Inhalt von `main.gs` in den Editor
4. Speichern Sie das Projekt (Strg+S)

### 2. Kalender-IDs konfigurieren

1. Öffnen Sie Google Calendar
2. Gehen Sie zu den Kalender-Einstellungen
3. Klicken Sie auf den gewünschten Kalender
4. Scrollen Sie zu "Kalender-ID" und kopieren Sie diese
5. Ersetzen Sie die Platzhalter in `main.gs`:

```javascript
var calendarIds = [
  "ihre-kalender-id-1@resource.calendar.google.com",
  "ihre-kalender-id-2@group.calendar.google.com",
  "ihre-kalender-id-3@resource.calendar.google.com"
];
```

### 3. Berechtigungen erteilen

1. Führen Sie das Script zum ersten Mal aus
2. Google wird nach Berechtigungen fragen
3. Klicken Sie auf "Berechtigungen überprüfen"
4. Wählen Sie Ihr Google-Konto aus
5. Klicken Sie auf "Erweitert" → "Zu [Projektname] wechseln (nicht sicher)"
6. Klicken Sie auf "Zulassen"

## 🔧 Konfiguration

### Sicherheitseinstellungen

```javascript
var deleteEvents = false; // Setzen Sie auf true für echte Löschung
var monthsBack = 6;       // Anzahl der Monate zurück
```

**WICHTIG**: 
- `deleteEvents = false`: Testmodus (zeigt nur an, was gelöscht würde)
- `deleteEvents = true`: Echte Löschung (VORSICHT!)

### Empfohlener Workflow

1. **Testlauf**: `deleteEvents = false` → Script ausführen → Logs prüfen
2. **Echte Ausführung**: `deleteEvents = true` → Script ausführen

## 📖 Verwendung

### Hauptfunktion: `cleanOldEvents()`

Führt die Bereinigung aller konfigurierten Kalender durch.

```javascript
function cleanOldEvents() {
  // Bereinigt alle Kalender
}
```

### Testfunktion: `testCalendarAccess()`

Testet den Zugriff auf alle konfigurierten Kalender.

```javascript
function testCalendarAccess() {
  // Prüft Kalender-Zugriff
}
```

### Ausführung

1. **Manuell**: Wählen Sie die Funktion aus dem Dropdown und klicken Sie "Ausführen"
2. **Automatisch**: Richten Sie einen Trigger ein (Erweitert → Trigger)

## 📊 Logs und Monitoring

Das Script erstellt detaillierte Logs:

```
=== GDPR Calendar Cleanup gestartet ===
Cutoff-Datum: 15.06.2024
Lösche Events älter als 6 Monate
Löschmodus: TEST (nur Anzeige)
=====================================
Prüfe Kalender: Meeting Room A (c_xxx@resource.calendar.google.com)
Gefundene alte Events: 15
WÜRDE löschen: Team Meeting | 10.01.2024
WÜRDE löschen: Projekt Review | 15.02.2024
...
```

**Logs anzeigen**: Ansicht → Protokoll

## 🔄 Automatisierung

### Trigger einrichten

1. Klicken Sie auf "Erweitert" → "Trigger"
2. Klicken Sie auf "Trigger hinzufügen"
3. Konfigurieren Sie:
   - **Funktion**: `cleanOldEvents`
   - **Ereignisquelle**: Zeitgesteuert
   - **Zeitbasierter Trigger**: Monatlich am 1.
   - **Uhrzeit**: 02:00 - 03:00

### Empfohlene Häufigkeit

- **Wöchentlich**: Für aktive Organisationen
- **Monatlich**: Für Standard-Betrieb
- **Vierteljährlich**: Für minimale Bereinigung

## 🛡️ Sicherheitshinweise

### Vor der ersten Ausführung

1. **Backup erstellen**: Exportieren Sie wichtige Kalender
2. **Testmodus verwenden**: `deleteEvents = false`
3. **Logs prüfen**: Überprüfen Sie alle zu löschenden Events
4. **Berechtigungen testen**: Führen Sie `testCalendarAccess()` aus

### Best Practices

- **Regelmäßige Tests**: Führen Sie regelmäßig Testläufe durch
- **Monitoring**: Überwachen Sie die Logs nach jeder Ausführung
- **Backup-Strategie**: Erstellen Sie regelmäßige Kalender-Backups
- **Schrittweise Einführung**: Beginnen Sie mit weniger kritischen Kalendern

## 🚨 Fehlerbehebung

### Häufige Probleme

**"Kalender nicht gefunden"**
- Prüfen Sie die Kalender-ID
- Überprüfen Sie die Berechtigungen
- Stellen Sie sicher, dass der Kalender existiert

**"Keine Berechtigung"**
- Verwenden Sie einen Admin-Account
- Oder gewähren Sie Edit-Rechte für den Kalender
- Prüfen Sie die Google Workspace-Berechtigungen

**"Script läuft nicht"**
- Überprüfen Sie die Trigger-Konfiguration
- Prüfen Sie die Logs auf Fehlermeldungen
- Testen Sie die Funktion manuell

### Debug-Tipps

1. Verwenden Sie `testCalendarAccess()` zum Testen
2. Prüfen Sie die Logs in "Ansicht → Protokoll"
3. Führen Sie das Script manuell aus
4. Überprüfen Sie die Kalender-IDs

## 📝 Lizenz

Dieses Projekt steht unter der MIT-Lizenz. Siehe [LICENSE](LICENSE) für Details.

## 🤝 Beitragen

Beiträge sind willkommen! Bitte:

1. Forken Sie das Repository
2. Erstellen Sie einen Feature-Branch
3. Committen Sie Ihre Änderungen
4. Erstellen Sie einen Pull Request

## 🔄 Changelog

### Version 1.0
- Initiale Version
- Automatische Bereinigung alter Kalendereinträge
- Testmodus für sichere Ausführung
- Detaillierte Logging-Funktionalität
- Hilfsfunktion für Kalender-Zugriffstests

---

**⚠️ Haftungsausschluss**: Dieses Script löscht Daten dauerhaft. Verwenden Sie es mit Vorsicht und testen Sie es gründlich vor der produktiven Nutzung.
