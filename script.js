const projects = {
  pluribus: {
    number: "01",
    name: "Pluribus",
    kind: "Civic data product",
    status: "Live on the App Store",
    headline: "Follow the government decisions that affect you, with a source behind every claim.",
    summary: "Pluribus brings Miami-Dade residents’ representatives, bills, ballots, and elections into one app built on official sources. I designed the product, built the app, and built the data pipelines that pull and reconcile civic data from several providers.",
    ownership: ["Defined the product and chose a deep Florida and Miami-Dade first release over thin national coverage", "Built the React Native (Expo) app and its main flows", "Built GraphQL ingestion of ballot and legislative data and an incremental-sync bill importer as Supabase edge functions", "Took it through App Store review to launch"],
    evidence: ["Live and free on the App Store", "Records keep their source and retrieval date", "Bills sync incrementally from official sources", "Several civic providers reconciled, none treated as the permanent source of truth"],
    stack: ["React Native", "Expo", "Supabase", "Postgres", "PostGIS", "GraphQL", "Edge functions", "iOS"],
    note: "This project pushed me to think about trust at every layer: what the app says, where the information came from, and how clearly it explains what it does not know yet.",
    metrics: [["Live", "on the App Store"], ["3", "government levels"], ["Free", "on iPhone"]],
    caseStudy: "pluribus.html",
    appStore: "https://apps.apple.com/us/app/pluribus-civic-engagement/id6763580814",
    image: "assets/images/pluribus.png",
    imageAlt: "Pluribus mobile home screen showing officials and legislative activity"
  },
  atlas: {
    number: "02",
    name: "Atlas Cowork",
    kind: "Data pipeline with release gates",
    status: "Active private build",
    headline: "A seven-stage production pipeline that refuses to ship bad output.",
    summary: "Atlas runs a science content channel end to end: research, fact and source checks, media, rendering, final-file checks, and scheduling. It is built like a data pipeline: structured handoffs between stages, provenance for every claim and asset, safe retries, and two release gates that stop the line when evidence is missing. I designed the stages, records, and gates, and built it with AI-assisted development.",
    ownership: ["Designed the seven-stage workflow and the records passed between stages", "Built the research, sourcing, rendering, and quality-check steps", "Added failure codes, resumable jobs, and protection against duplicate publishing", "Fed performance data back into topic choices, with a person approving any policy change"],
    evidence: ["A complete daily workflow with a clear pass or fail result", "Source records for factual claims and media", "Checks before production and again on the final file", "Automated tests and safeguards against duplicate work"],
    stack: ["Workflow design", "JSON schemas", "Release gates", "Python (AI-assisted)", "FFmpeg", "Scheduled jobs", "Automated tests"],
    note: "The best automation is not merely fast. It makes failures legible, keeps bad state from moving forward, and gives a person enough evidence to make a confident release decision.",
    metrics: [["7", "production stages"], ["2", "release gates"], ["9", "test modules"]],
    caseStudy: "atlas-cowork.html"
  }
};

const projectIds = Object.keys(projects);

function list(items) {
  return items.map((item) => `<li>${item}</li>`).join("");
}

function metrics(items) {
  return items.map(([value, label]) => `<div><strong>${value}</strong><span>${label}</span></div>`).join("");
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
    <div class="visual-label"><span>PRODUCT VIEW</span><span>${project.number} / ${String(projectIds.length).padStart(2, "0")}</span></div>
    <div class="blueprint-ring" aria-hidden="true"></div>
    <img src="${project.image}" alt="${project.imageAlt}" />
  </div>`;
}

function panelMarkup(id) {
  const project = projects[id];
  const appStore = project.appStore
    ? `<a class="project-link" href="${project.appStore}" target="_blank" rel="noreferrer">Get it on the App Store <span aria-hidden="true">↗</span></a>`
    : "";
  return `<div class="panel-copy">
    <div class="panel-meta"><span>${project.kind}</span><span class="status-pill">${project.status}</span></div>
    <h3>${project.name}</h3><p class="panel-headline">${project.headline}</p><p class="panel-summary">${project.summary}</p>
    <div class="evidence-grid"><div><h4>What I owned</h4><ul>${list(project.ownership)}</ul></div><div><h4>Proof it works</h4><ul>${list(project.evidence)}</ul></div></div>
    <ul class="tags" aria-label="${project.name} technologies">${list(project.stack)}</ul>
    <div class="project-proof" aria-label="${project.name} project facts">${metrics(project.metrics)}</div>
    <div class="takeaway"><span>WHAT THIS PROJECT TAUGHT ME</span><p>${project.note}</p></div>
    <div class="project-links"><a class="project-link" href="${project.caseStudy}">Read the full case study <span aria-hidden="true">→</span></a>${appStore}</div>
  </div>${visual(id, project)}`;
}

if (typeof document !== "undefined") {
  const panel = document.querySelector("#project-panel");
  const tabs = [...document.querySelectorAll("[data-project]")];
  const hashPattern = new RegExp(`^#project-(${projectIds.join("|")})$`);

  function renderProject(id) {
    panel.innerHTML = panelMarkup(id);
    tabs.forEach((tab) => {
      const selected = tab.dataset.project === id;
      tab.classList.toggle("active", selected);
      tab.setAttribute("aria-selected", String(selected));
    });
  }

  function projectFromHash() {
    const match = window.location.hash.match(hashPattern);
    return match ? match[1] : null;
  }

  tabs.forEach((tab) => tab.addEventListener("click", () => {
    const id = tab.dataset.project;
    renderProject(id);
    history.pushState({ project: id }, "", `#project-${id}`);
  }));

  function restoreProjectFromHistory() {
    const id = projectFromHash();
    renderProject(id || "pluribus");
    if (id) document.querySelector("#work").scrollIntoView();
  }

  window.addEventListener("popstate", restoreProjectFromHistory);

  const initialProject = projectFromHash();
  renderProject(initialProject || "pluribus");
  if (initialProject) requestAnimationFrame(() => document.querySelector("#work").scrollIntoView());
}
