// src/sim/rng.ts
// Fast deterministic RNG (Mulberry32). Good enough for sims.
export type RNG = () => number;

export function makeRng(seed: number): RNG {
  // force uint32
  let t = seed >>> 0;
  return function rng() {
    t += 0x6D2B79F5;
    let x = Math.imul(t ^ (t >>> 15), 1 | t);
    x ^= x + Math.imul(x ^ (x >>> 7), 61 | x);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

export function randRange(rng: RNG, min: number, max: number) {
  return rng() * (max - min) + min;
}
