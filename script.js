document.addEventListener("DOMContentLoaded", () => {

  const players = ["Chudy", "dasher", "aurinek", "titiuf", "mlody"];

  const winnerSelect = document.getElementById("winnerSelect");
  const resultsBody = document.getElementById("results");
  const scoresBody = document.getElementById("scores");
  const addBtn = document.getElementById("addResult");
  const resetBtn = document.getElementById("reset");

  players.forEach(player => {
    const option = document.createElement("option");
    option.value = player;
    option.textContent = player;
    winnerSelect.appendChild(option);
  });

  function loadData() {
    return JSON.parse(localStorage.getItem("pokerData")) || {
      history: [],
      scores: Object.fromEntries(players.map(p => [p, 0]))
    };
  }

  function saveData(data) {
    localStorage.setItem("pokerData", JSON.stringify(data));
  }

  function render() {
    const data = loadData();

    scoresBody.innerHTML = "";
    players.forEach(p => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${p}</td>
        <td>${data.scores[p] >= 0 ? "+" : ""}${data.scores[p]}</td>
      `;
      scoresBody.appendChild(tr);
    });

    resultsBody.innerHTML = "";
    data.history.forEach(h => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${h.date}</td>
        <td>${h.winner}</td>
      `;
      resultsBody.appendChild(tr);
    });
  }

  addBtn.addEventListener("click", () => {
    const data = loadData();
    const winner = winnerSelect.value;
    const date = new Date().toLocaleDateString("pl-PL");

    players.forEach(p => {
      data.scores[p] += (p === winner ? 10 : -10);
    });

    data.history.push({ date, winner });
    saveData(data);
    render();
  });

  resetBtn.addEventListener("click", () => {
    if (confirm("Na pewno usunąć wszystkie dane?")) {
      localStorage.removeItem("pokerData");
      render();
    }
  });

  render();
});

