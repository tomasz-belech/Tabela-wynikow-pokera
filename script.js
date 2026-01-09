const players = ["Chudy", "dasher", "aurinek", "titiuf", "mlody"];

const playersBody = document.getElementById("players");
const resetBtn = document.getElementById("resetBtn");

function loadScores() {
  return JSON.parse(localStorage.getItem("pokerScores")) || {};
}

function saveScores(scores) {
  localStorage.setItem("pokerScores", JSON.stringify(scores));
}

function addPoints(name, value) {
  const scores = loadScores();
  scores[name] = (scores[name] || 0) + value;
  saveScores(scores);
  render();
}

function resetScores() {
  if (confirm("Na pewno zresetować wszystkie punkty?")) {
    localStorage.removeItem("pokerScores");
    render();
  }
}

function render() {
  const scores = loadScores();
  playersBody.innerHTML = "";

  players.forEach(player => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${player}</td>
      <td>${scores[player] || 0}</td>
      <td>
        <button onclick="addPoints('${player}', 1)">+1</button>
        <button onclick="addPoints('${player}', 5)">+5</button>
        <button onclick="addPoints('${player}', 10)">+10</button>
        <button class="minus" onclick="addPoints('${player}', -1)">-1</button>
      </td>
    `;

    playersBody.appendChild(tr);
  });
}

resetBtn.addEventListener("click", resetScores);

render();
