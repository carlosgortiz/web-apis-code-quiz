function printHighScores() {
    var highscores = JSON.parse(window.localStorage.getItem("highScores")) || [];

    highscores.sort(function(a, b) {
        return b.score - a.score;
    });

    highscores.forEach(function(score) {
        var liTag = document.createElement("li");
        liTag.textContent = score.initials + " - " +score.score;

        var olEl = document.getElementById("highScores");
        olEl.appendChild(liTag);
    });
}

function clearHighScores() {
    window.localStorage.removeItem("highScores");
    window.location.reload();
}

document.getElementById("clear").onclick = clearHighScores;

printHighScores();