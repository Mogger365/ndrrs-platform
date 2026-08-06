export const mockWeatherAlerts = [
  {
    id: "ALT-HYD-01",
    title: "FLASH FLOOD & HEAVY RAIN RED ALERT",
    region: "Hyderabad & Rangareddy District",
    state: "Telangana",
    severity: "RED", // RED, ORANGE, YELLOW
    issuedBy: "India Meteorological Department (IMD) / Disaster Management Authority",
    issuedTime: "Today 05:30 PM IST",
    expectedTime: "Next 6 Hours (Until 11:30 PM)",
    rainfallMm: "185 mm / hr",
    affectedPop: "2.4 Million",
    advisory: "Evacuate low-lying areas near Musi River & Begumpet drains immediately. Enable Emergency Mode for GPS tracking.",
    active: true
  },
  {
    id: "ALT-WAY-02",
    title: "LANDSLIDE HAZARD RED ALERT",
    region: "Wayanad & Idukki Hill Tracts",
    state: "Kerala",
    severity: "RED",
    issuedBy: "State Disaster Management Authority (SDMA)",
    issuedTime: "Today 02:15 PM IST",
    expectedTime: "Next 24 Hours",
    rainfallMm: "210 mm",
    affectedPop: "180,000",
    advisory: "Move away from hill slopes & riverbeds. NDRF team deployed in Chooralmala & Meppadi.",
    active: true
  },
  {
    id: "ALT-ODI-03",
    title: "CYCLONE 'VAYU' APPROACHING COAST",
    region: "Puri, Jagatsinghpur, Cuttack",
    state: "Odisha",
    severity: "ORANGE",
    issuedBy: "IMD Cyclone Warning Division",
    issuedTime: "Today 11:00 AM IST",
    expectedTime: "Expected Landfall Tomorrow 08:00 AM",
    windSpeedKmph: "135 km/h",
    affectedPop: "1.1 Million",
    advisory: "Fishermen cautioned against going into sea. Relief centers active.",
    active: true
  }
];
