//Declaración de variables
const score = localStorage.getItem("gameScore") || 0;
const totalQuestions = localStorage.getItem("totalQuestions") || 0;

//Llamadas al DOM
const restartButton = document.getElementById("restart-btn");
const finalScore = document.getElementById("final-score");

//Preparación de Event Listeners
restartButton.addEventListener("click", () => {
    localStorage.removeItem("gameScore");
    localStorage.removeItem("totalQuestions");
    window.location.href = "game.html";
});

//Metodos
const initialize = () => {
    finalScore.textContent = score + "/" + totalQuestions;
}

//Inicialización
initialize();