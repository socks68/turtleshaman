import { useMemo, useState } from 'react';
import weapons from './data/weapons.json';
import { runSimulation } from './sim/engine';
import type { Weapon } from './sim/combat';

type WeaponRow = Weapon;

export default function App() {
  const weaponList = weapons as WeaponRow[];

  const [weaponId, setWeaponId] = useState<string>(weaponList[0]?.id ?? '');
  const [duration, setDuration] = useState<number>(180);
  const [iterations, setIterations] = useState<number>(1000);
  const [seed, setSeed] = useState<number>(12345);
  const [windfury, setWindfury] = useState<boolean>(true);

  const selectedWeapon = useMemo(() => {
    return weaponList.find(w => w.id === weaponId) ?? weaponList[0];
  }, [weaponId, weaponList]);

  const [result, setResult] = useState<any>(null);

  function simulate() {
    if (!selectedWeapon) return;

    const res = runSimulation({
      duration: Math.max(1, duration),
      iterations: Math.max(1, iterations),
      weapon: selectedWeapon,
      windfury,
      seed: seed >>> 0,
    });

    setResult({
      config: {
        weapon: selectedWeapon.name,
        duration,
        iterations,
        windfury,
        seed,
      },
      ...res,
    });
  }

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif', maxWidth: 900 }}>
      <h1>Enhancement Shaman DPS Simulator</h1>

      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr' }}>
        <label>
          Weapon
          <br />
          <select
            value={weaponId}
            onChange={(e) => setWeaponId(e.target.value)}
            style={{ width: '100%', padding: 6 }}
          >
            {weaponList.map((w) => (
              <option key={w.id} value={w.id}>
                {w.name} ({w.hand.toUpperCase()}, {w.speed.toFixed(2)}s)
              </option>
            ))}
          </select>
        </label>

        <label>
          Windfury
          <br />
          <input
            type="checkbox"
            checked={windfury}
            onChange={(e) => setWindfury(e.target.checked)}
          />{' '}
          Enabled
        </label>

        <label>
          Fight length (seconds)
          <br />
          <input
            type="number"
            min={1}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            style={{ width: '100%', padding: 6 }}
          />
        </label>

        <label>
          Iterations
          <br />
          <input
            type="number"
            min={1}
            value={iterations}
            onChange={(e) => setIterations(Number(e.target.value))}
            style={{ width: '100%', padding: 6 }}
          />
        </label>

        <label>
          Seed
          <br />
          <input
            type="number"
            value={seed}
            onChange={(e) => setSeed(Number(e.target.value))}
            style={{ width: '100%', padding: 6 }}
          />
        </label>

        <div />
      </div>

      <div style={{ marginTop: 16 }}>
        <button onClick={simulate} style={{ padding: '8px 12px' }}>
          Simulate
        </button>
      </div>

      {selectedWeapon && (
        <div style={{ marginTop: 16 }}>
          <strong>Selected weapon:</strong> {selectedWeapon.name} — {selectedWeapon.minDamage}–
          {selectedWeapon.maxDamage} @ {selectedWeapon.speed}s
        </div>
      )}

      {result && (
        <div style={{ marginTop: 16 }}>
          <h2>Result</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
