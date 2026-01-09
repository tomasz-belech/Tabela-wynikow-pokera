document.addEventListener("DOMContentLoaded", () => {

  const players = ["Chudy", "dasher", "aurinek", "titiuf", "mlody"];
  const tbody = document.getElementById("players");
  const resetBtn = document.getElementById("reset");

  function loadScores() {
    return JSON.parse(localStorage.getItem("pokerScores")) || {};
  }

  function saveScores(scores) {
    localStorage.setItem("pokerScores", JSON.stringify(scores));
  }

  function changeScore(player, value) {
    const scores = loadScores();
    scores[player] = (scores[player] || 0) + value;
    saveScores(scores);
    render();
  }

  function render() {
    const scores = loadScores();
    tbody.innerHTML = "";

    players.forEach(player => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${player}</td>
        <td>${scores[player] || 0}</td>
        <td class="actions">
          <button class="plus">+10</button>
          <button class="minus">-10</button>
        </td>
      `;

      tr.querySelector(".plus").onclick = () => changeScore(player, 10);
      tr.querySelector(".minus").onclick = () => changeScore(player, -10);

      tbody.appendChild(tr);
    });
  }

  resetBtn.addEventListener("click", () => {
    if (confirm("Zresetować wszystkie punkty?")) {
      localStorage.removeItem("pokerScores");
      render();
    }
  });

  render();
});
