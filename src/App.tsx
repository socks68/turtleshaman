import { useState } from 'react'
import { runSimulation } from './sim/engine'
import weapons from './data/weapons.json'

export default function App() {
  const [result, setResult] = useState<any>(null)

  function simulate() {
    const res = runSimulation({
      duration: 180,
      iterations: 1000,
      weapon: weapons[0],
      windfury: true
    })
    setResult(res)
  }

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>Enhancement Shaman DPS Simulator</h1>
      <button onClick={simulate}>Simulate</button>
      {result && (
        <pre>{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  )
}
