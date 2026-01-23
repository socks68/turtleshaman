// src/sim/engine.ts
import { rollHit, type Weapon } from './combat';
import { makeRng } from './rng';

export type SimConfig = {
  duration: number;     // seconds
  iterations: number;
  weapon: Weapon;
  windfury: boolean;
  seed: number;         // NEW
};

export function runSimulation(config: SimConfig) {
  let totalDamage = 0;

  for (let i = 0; i < config.iterations; i++) {
    // derive a unique seed per iteration so each iteration differs
    const rng = makeRng((config.seed + i) >>> 0);

    let time = 0;
    let dmg = 0;

    while (time < config.duration) {
      const hit = rollHit(rng, config.weapon);
      dmg += hit.damage;

      // Windfury placeholder proc model (we’ll replace in Phase C)
      if (config.windfury && rng() < 0.2) {
        dmg += rollHit(rng, config.weapon).damage;
        dmg += rollHit(rng, config.weapon).damage;
      }

      time += config.weapon.speed;
    }

    totalDamage += dmg;
  }

  const avgDamage = totalDamage / config.iterations;
  return {
    seed: config.seed,
    avgDPS: avgDamage / config.duration,
    avgTotalDamage: avgDamage,
  };
}
