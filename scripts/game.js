// Declaración de variables globales
const optionImagesDirectory = "assets/images/options/";
const questions = [
    {
        questionDescription: "Comenzó como una librería en línea y hoy es una de las mayores empresas tecnológicas del mundo. Además, ofrece servicios de computación en la nube.",
        options: [
            {
                optionImage: optionImagesDirectory + "amazon.png",
                optionText: "Amazon",
                isCorrect: true
            },
            {
                optionImage: optionImagesDirectory + "google.png",
                optionText: "Google",
                isCorrect: false
            },
            {
                optionImage: optionImagesDirectory + "microsoft.png",
                optionText: "Microsoft",
                isCorrect: false
            },
            {
                optionImage: optionImagesDirectory + "oracle.png",
                optionText: "Oracle",
                isCorrect: false
            }
        ]
    },
    {
        questionDescription: "Revolucionó la forma de ver películas y series mediante streaming. Su plataforma utiliza una arquitectura capaz de atender millones de usuarios al mismo tiempo.",
        options: [
            {
                optionImage: optionImagesDirectory + "disney.png",
                optionText: "Disney +",
                isCorrect: false
            },
            {
                optionImage: optionImagesDirectory + "primevideo.png",
                optionText: "Prime Video",
                isCorrect: false
            },
            {
                optionImage: optionImagesDirectory + "netflix.png",
                optionText: "Netflix",
                isCorrect: true
            },
            {
                optionImage: optionImagesDirectory + "spotify.png",
                optionText: "Spotify",
                isCorrect: false
            }
        ]
    },
    {
        questionDescription: "Es una empresa reconocida por desarrollar uno de los sistemas de bases de datos más utilizados en el ámbito empresarial y por ofrecer soluciones para grandes organizaciones.",
        options: [
            {
                optionImage: optionImagesDirectory + "ibm.png",
                optionText: "IBM",
                isCorrect: false
            },
            {
                optionImage: optionImagesDirectory + "microsoft.png",
                optionText: "Microsoft",
                isCorrect: false
            },
            {
                optionImage: optionImagesDirectory + "sap.png",
                optionText: "SAP",
                isCorrect: false
            },
            {
                optionImage: optionImagesDirectory + "oracle.png",
                optionText: "Oracle",
                isCorrect: true
            }
        ]
    },
    {
        questionDescription: "Destaca por integrar hardware y software en un mismo ecosistema. Sus dispositivos y sistema operativo han influido en el desarrollo de aplicaciones móviles.",
        options: [
            {
                optionImage: optionImagesDirectory + "samsung.png",
                optionText: "Samsung",
                isCorrect: false
            },
            {
                optionImage: optionImagesDirectory + "apple.png",
                optionText: "Apple",
                isCorrect: true
            },
            {
                optionImage: optionImagesDirectory + "huawei.png",
                optionText: "Huawei",
                isCorrect: false
            },
            {
                optionImage: optionImagesDirectory + "microsoft.png",
                optionText: "Microsoft",
                isCorrect: false
            }
        ]
    },
    {
        questionDescription: "Desarrolló un sistema operativo de código abierto y posteriormente creó una herramienta de control de versiones utilizada por millones de programadores.",
        options: [
            {
                optionImage: optionImagesDirectory + "dennisritchie.png",
                optionText: "Dennis Ritchie",
                isCorrect: false
            },
            {
                optionImage: optionImagesDirectory + "stevejobs.png",
                optionText: "Steve Jobs",
                isCorrect: false
            },
            {
                optionImage: optionImagesDirectory + "linustorvalds.png",
                optionText: "Linus Torvalds",
                isCorrect: true
            },
            {
                optionImage: optionImagesDirectory + "billgates.png",
                optionText: "Bill Gates",
                isCorrect: false
            }
        ]
    }
];

let currentQuestionIndex = 0;
let gameScore = 0;
let shouldVerify = true;
let selectedOptionIndex = null;

//Llamadas al DOM
const roundTitle = document.getElementById("round-title");
const questionDescriptionElement = document.getElementById("question-description");
const optionButtons = [
    document.getElementById("option-btn-1"),
    document.getElementById("option-btn-2"),
    document.getElementById("option-btn-3"),
    document.getElementById("option-btn-4")
];
const optionImages = [
    document.getElementById("option-img-1"),
    document.getElementById("option-img-2"),
    document.getElementById("option-img-3"),
    document.getElementById("option-img-4")
];
const optionTexts = [
    document.getElementById("option-text-1"),
    document.getElementById("option-text-2"),
    document.getElementById("option-text-3"),
    document.getElementById("option-text-4")
];
const verifyButton = document.getElementById("verify-btn");

//Preparación de Event Listeners
optionButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        selectOption(index);
    });
});

verifyButton.addEventListener("click", () => verifyAnswer());

//Metodos del juego
const initializeGame = () => {
    loadQuestion();
};

const loadQuestion = () => {
    roundTitle.textContent = "Ronda " + (currentQuestionIndex + 1);
    questionDescriptionElement.textContent = questions[currentQuestionIndex].questionDescription;
    questions[currentQuestionIndex].options.forEach((option, index) => {
        optionButtons[index].disabled = false;
        optionImages[index].src = option.optionImage;
        optionTexts[index].textContent = option.optionText;
        optionButtons[index].classList.toggle("btn-success", false);
        optionButtons[index].classList.toggle("btn-danger", false);
        optionButtons[index].classList.toggle("selected", false);
        optionButtons[index].classList.toggle("btn-secondary", true);
    });
    verifyButton.disabled = true;
    selectedOptionIndex = null;
}

const selectOption = (index) => {
    selectedOptionIndex = index;
    verifyButton.disabled = false;
    optionButtons.forEach((button, buttonIndex) => {
        button.classList.toggle("selected", buttonIndex === index);
        button.classList.toggle("btn-secondary", buttonIndex !== index);
        button.classList.toggle("btn-primary", buttonIndex === index);
    });
};

const verifyAnswer = () => {
    if (!shouldVerify) {
        if (currentQuestionIndex >= questions.length) {
            moveToEndscreen();
            return;
        }
        resetVerifyButton();
        loadQuestion();
        return;
    }

    optionButtons.forEach(button => {
        button.disabled = true;
    });
    
    const currentQuestion = questions[currentQuestionIndex];
    const selectedOption = currentQuestion.options[selectedOptionIndex];
    const correctOption = currentQuestion.options.find(option => option.isCorrect);

    const correctOptionButton = optionButtons[currentQuestion.options.indexOf(correctOption)];
    const selectedOptionButton = optionButtons[selectedOptionIndex];

    if (selectedOption.isCorrect) {
        gameScore++;
        selectedOptionButton.classList.toggle("btn-success");
    } else {
        selectedOptionButton.classList.toggle("btn-danger");
        correctOptionButton.classList.toggle("btn-success");
    }

    currentQuestionIndex++;
    changeVerifyButtonToNext();
}

const changeVerifyButtonToNext = () => {
    verifyButton.textContent = "Siguiente";
    shouldVerify = false;
}

const resetVerifyButton = () => {
    verifyButton.textContent = "Verificar";
    shouldVerify = true;
}

const moveToEndscreen = () => {
    localStorage.setItem('gameScore', gameScore);
    localStorage.setItem('totalQuestions', questions.length);
    window.location.href = "endscreen.html";
}

//Inicialización
initializeGame();