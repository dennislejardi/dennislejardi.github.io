const projects = {
  pluribus: {
    number: "01",
    name: "Pluribus",
    kind: "Mobile civic product",
    status: "iOS release candidate",
    headline: "A clearer way to follow the government decisions that affect you.",
    summary: "Pluribus is a mobile app that brings your representatives, bills, elections, and official sources into one place. I built it because civic information is public, but it is often scattered across sites that are hard to follow.",
    ownership: ["Worked out the product and mobile experience", "Built the React Native app and its main flows", "Designed a consistent model for several civic data sources", "Prepared the app for App Store review"],
    evidence: ["A working iOS release candidate", "Personalized officials and legislative activity", "Every important claim links back to a source", "Tested screenshots and a complete submission package"],
    stack: ["React Native", "Expo", "Node.js", "PostgreSQL", "Civic APIs", "iOS"],
    note: "This project pushed me to think about trust at every layer: what the app says, where the information came from, and how clearly it explains what it does not know yet.",
    image: "assets/images/pluribus.png",
    imageAlt: "Pluribus mobile home screen showing officials and legislative activity"
  },
  atlas: {
    number: "02",
    name: "Atlas Cowork",
    kind: "Media production system",
    status: "Active private build",
    headline: "The system I use to research, make, check, and schedule videos.",
    summary: "Atlas Cowork helps run a nature, animal, and space content channel. It starts with topic ideas, checks facts and sources, finds usable visuals, builds the video package, checks the finished file, and only then queues it for publishing. If something is missing or wrong, it stops and explains why.",
    ownership: ["Designed the workflow from topic idea to finished video", "Built the research, sourcing, rendering, and quality-check tools", "Added clear failure messages and safe ways to retry work", "Connected performance data back to future topic choices"],
    evidence: ["A complete daily workflow with a clear result", "Source records for factual claims and media", "Checks before production and again on the final video", "Automated tests and safeguards against duplicate work"],
    stack: ["Python", "JSON schemas", "FFmpeg", "Local ML", "Automation", "Testing"],
    note: "This is less about ‘AI making videos’ and more about building a reliable production line around tools and inputs that are not always reliable."
  },
  army: {
    number: "03",
    name: "Army Survivors",
    kind: "Mobile game prototype",
    status: "Validated vertical slice",
    headline: "A mobile action game where your character slowly turns into a squad.",
    summary: "Army Survivors is an eight-minute Unity game built for quick mobile sessions. You move one soldier, fight automatically, rescue teammates, choose upgrades, and grow into a small squad before facing the boss.",
    ownership: ["Designed the core loop and progression", "Built the gameplay systems in Unity", "Created the mobile controls and visual direction", "Set up repeatable build and content checks"],
    evidence: ["A full menu → run → boss → result → retry loop", "Several leaders, weapons, recruits, and upgrades", "A custom check for broken progression content", "Compiled, built, launched, and played on a real build"],
    stack: ["Unity", "C#", "2D physics", "Mobile UX", "Local saves", "Validation tooling"],
    note: "I wanted the game to feel complete in one short run, so I treated the menu, pacing, progression, boss fight, and replay loop as one connected experience.",
    image: "assets/images/army.png",
    imageAlt: "Pixel-art operative from Army Survivors"
  },
  rivet: {
    number: "04",
    name: "Rivet’s Junkyard Flight",
    kind: "Physics game prototype",
    status: "Validated vertical slice",
    headline: "A physics game about launching a raccoon through a junkyard.",
    summary: "Rivet’s Junkyard Flight is a landscape arcade game with a deliberately simple control scheme: tap to launch, then make a few choices in the air. The course changes each run, and better launch machines give you a reason to try again.",
    ownership: ["Designed the launch mechanic and upgrade economy", "Built the physics and randomized course system", "Created the presentation and synthesized the audio", "Added automated edit- and play-mode tests"],
    evidence: ["A complete launch → flight → garage → retry loop", "Random courses that keep the same readable rules", "EditMode tests and a PlayMode smoke test", "A clean, validated standalone build"],
    stack: ["Unity", "C#", "2D physics", "Procedural systems", "EditMode", "PlayMode"],
    note: "The fun came from keeping the controls small and spending the time on feel: launch timing, collisions, readable obstacles, rewards, and the urge to take one more run.",
    image: "assets/images/rivet.png",
    imageAlt: "Rivet, a raccoon wearing an orange crash helmet"
  }
};

const panel = document.querySelector("#project-panel");
const tabs = [...document.querySelectorAll("[data-project]")];

function list(items) {
  return items.map((item) => `<li>${item}</li>`).join("");
}

function visual(id, project) {
  if (id === "atlas") {
    const steps = ["Discover", "Prove", "Prepare", "Gate", "Produce", "Verify", "Learn"];
    return `<div class="atlas-visual" aria-label="Atlas workflow from research to learning">
      <div class="visual-label"><span>SYSTEM MAP</span><span>7 STAGES</span></div>
      <ol>${steps.map((step, index) => `<li class="${step === "Gate" || step === "Verify" ? "is-gate" : ""}"><span>${String(index + 1).padStart(2, "0")}</span><b>${step}</b></li>`).join("")}</ol>
      <div class="system-status"><span>RESULT</span><strong>PASS WITH EVIDENCE</strong></div>
    </div>`;
  }
  return `<div class="project-visual visual-${id}">
    <div class="visual-label"><span>PRODUCT VIEW</span><span>${project.number} / 04</span></div>
    <div class="blueprint-ring" aria-hidden="true"></div>
    <img src="${project.image}" alt="${project.imageAlt}" />
  </div>`;
}

function renderProject(id) {
  const project = projects[id];
  panel.innerHTML = `<div class="panel-copy">
    <div class="panel-meta"><span>${project.kind}</span><span class="status-pill">${project.status}</span></div>
    <h3>${project.name}</h3><p class="panel-headline">${project.headline}</p><p class="panel-summary">${project.summary}</p>
    <div class="evidence-grid"><div><h4>What I owned</h4><ul>${list(project.ownership)}</ul></div><div><h4>Proof it works</h4><ul>${list(project.evidence)}</ul></div></div>
    <ul class="tags" aria-label="${project.name} technologies">${list(project.stack)}</ul>
    <div class="takeaway"><span>WHAT THIS PROJECT TAUGHT ME</span><p>${project.note}</p></div>
  </div>${visual(id, project)}`;

  tabs.forEach((tab) => {
    const selected = tab.dataset.project === id;
    tab.classList.toggle("active", selected);
    tab.setAttribute("aria-selected", String(selected));
  });
}

tabs.forEach((tab) => tab.addEventListener("click", () => renderProject(tab.dataset.project)));
renderProject("pluribus");
