import { rollHit } from './combat'

export function runSimulation(config: any) {
  let totalDamage = 0

  for (let i = 0; i < config.iterations; i++) {
    let time = 0
    let dmg = 0

    while (time < config.duration) {
      const result = rollHit(config.weapon)
      dmg += result.damage

      if (config.windfury && Math.random() < 0.2) {
        dmg += rollHit(config.weapon).damage
        dmg += rollHit(config.weapon).damage
      }

      time += config.weapon.speed
    }

    totalDamage += dmg
  }

  const avgDamage = totalDamage / config.iterations
  return {
    avgDPS: avgDamage / config.duration,
    avgTotalDamage: avgDamage
  }
}
