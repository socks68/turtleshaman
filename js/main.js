const $ = (id) => document.getElementById(id);

async function loadScenario() {
  const res = await fetch("./data/scenario_main_manual.json", { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load scenario: ${res.status}`);
  return await res.json();
}

$("run").addEventListener("click", async () => {
  const out = $("out");
  out.textContent = "Loading scenario...";

  try {
    const scenario = await loadScenario();
    out.textContent = JSON.stringify({
      sheet: scenario.sheet,
      inputs: scenario.inputs,
      expected: scenario.outputs
    }, null, 2);
  } catch (e) {
    out.textContent = "ERROR:\n\n" + (e?.stack || String(e));
  }
});

