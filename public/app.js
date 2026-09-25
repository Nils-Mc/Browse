const address = document.querySelector("#address");
const openButton = document.querySelector("#open");
const hint = document.querySelector("#hint");
const destination = document.querySelector("#destination");
const viewer = document.querySelector("#viewer");
const external = document.querySelector("#external");

let origins = [];

function showHint(message) {
  hint.textContent = message;
}

function navigate() {
  let target;
  try {
    target = new URL(address.value);
  } catch {
    showHint("Bitte gib eine vollständige HTTPS-Adresse ein.");
    return;
  }

  if (target.protocol !== "https:" || !origins.includes(target.origin)) {
    showHint("Diese Adresse ist nicht freigegeben. Bitte nutze ein erlaubtes Ziel.");
    return;
  }

  viewer.src = target.href;
  destination.textContent = target.origin;
  external.href = target.href;
  showHint("Website wird geladen. Manche Ziele verhindern die Einbettung; nutze dann den neuen Tab.");
}

async function initialize() {
  try {
    const response = await fetch("/api/config", { cache: "no-store" });
    if (!response.ok) throw new Error("Konfiguration konnte nicht geladen werden");
    ({ allowedOrigins: origins } = await response.json());

    if (!origins.length) throw new Error("Keine Ziele freigegeben");
    address.value = origins[0];
    navigate();
  } catch {
    openButton.disabled = true;
    showHint("Die Liste freigegebener Ziele ist derzeit nicht verfügbar.");
    destination.textContent = "Konfiguration nicht verfügbar";
  }
}

openButton.addEventListener("click", navigate);
address.addEventListener("keydown", (event) => {
  if (event.key === "Enter") navigate();
});

initialize();
