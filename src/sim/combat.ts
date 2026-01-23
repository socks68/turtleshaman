// src/sim/combat.ts
import type { RNG } from './rng';
import { randRange } from './rng';

export type Weapon = {
  id: string;
  name: string;
  hand: '1h' | '2h';
  speed: number;
  minDamage: number;
  maxDamage: number;
  stats?: Record<string, number>;
};

export function rollHit(rng: RNG, weapon: Weapon) {
  const base = randRange(rng, weapon.minDamage, weapon.maxDamage);
  const crit = rng() < 0.25; // placeholder (we’ll replace in Phase C)
  return {
    damage: crit ? base * 2 : base,
    crit,
  };
}
