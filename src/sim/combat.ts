export function rollHit(weapon: any) {
  const base = rand(weapon.minDamage, weapon.maxDamage)
  const crit = Math.random() < 0.25
  return {
    damage: crit ? base * 2 : base,
    crit
  }
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}
