export function calculatePriorityScore(victim) {
  let score = 0;

  // 1. Age & Vulnerability
  if (victim.age <= 10 || victim.age >= 65) {
    score += 35;
  } else if (victim.age <= 16 || victim.age >= 55) {
    score += 15;
  }

  if (victim.isPregnant) score += 30;
  if (victim.isDisabled) score += 35;
  if (victim.isChild) score += 20;
  if (victim.isSenior) score += 20;

  // 2. Medical Condition
  if (victim.medicalConditions && victim.medicalConditions !== "None") {
    score += 30;
  }

  // 3. Flood Depth / Hazard Severity
  const depth = parseFloat(victim.waterDepthMeters || 0);
  score += Math.min(depth * 15, 45); // Max 45 pts from depth

  // 4. Waiting Time
  const waitMinutes = parseInt(victim.waitTimeMinutes || 0);
  score += Math.min(waitMinutes * 0.35, 30); // Max 30 pts

  // 5. Battery Level (Critical low battery gets higher priority to locate before device dies!)
  const bat = parseInt(victim.battery || 100);
  if (bat <= 15) {
    score += 25;
  } else if (bat <= 30) {
    score += 12;
  }

  // 6. Movement / Trapped indicator
  if (!victim.movementDetected) {
    score += 15;
  }

  return Math.round(score);
}

export function sortVictimsByAIPriority(victimsList) {
  return [...victimsList].map(v => ({
    ...v,
    aiScore: calculatePriorityScore(v)
  })).sort((a, b) => b.aiScore - a.aiScore);
}
