const players = ["Chudy", "dasher", "aurinek", "titiuf", "mlody"];

const winnerSelect = document.getElementById("winnerSelect");
const resultsBody = document.getElementById("results");
const addBtn = document.getElementById("addResult");
const resetBtn = document.getElementById("reset");

players.forEach(player => {
  const option = document.createElement("option");
  option.value = player;
  option.textContent = player;
  winnerSelect.appendChild(option);
});

function loadResults() {
  return JSON.parse(localStorage.getItem("pokerResults")) || [];
}

function saveResults(results) {
  localStorage.setItem("pokerResults", JSON.stringify(results));
}

function render() {
  const results = loadResults();
  resultsBody.innerHTML = "";

  results.forEach(entry => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${entry.date}</td>
      <td>${entry.winner}</td>
    `;
    resultsBody.appendChild(tr);
  });
}

addBtn.addEventListener("click", () => {
  const results = loadResults();
  const today = new Date().toLocaleDateString("pl-PL");

  results.push({
    date: today,
    winner: winnerSelect.value
  });

  saveResults(results);
  render();
});

resetBtn.addEventListener("click", () => {
  if (confirm("Usunąć wszystkie wyniki?")) {
    localStorage.removeItem("pokerResults");
    render();
  }
});

render();
