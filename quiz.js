// Fruit Personality Quiz
const quizQuestions = [
    {
        question: "How do you usually start your day?",
        options: [
            { text: "With lots of energy", personality: "banana" },
            { text: "Taking it slow and steady", personality: "apple" },
            { text: "With a zesty attitude", personality: "lemon" }
        ]
    },
    {
        question: "What's your ideal weekend activity?",
        options: [
            { text: "Sports and outdoor activities", personality: "banana" },
            { text: "Reading a book in the garden", personality: "apple" },
            { text: "Hosting a party", personality: "lemon" }
        ]
    },
    {
        question: "How would your friends describe you?",
        options: [
            { text: "Energetic and fun", personality: "banana" },
            { text: "Reliable and wise", personality: "apple" },
            { text: "Bold and refreshing", personality: "lemon" }
        ]
    }
];

const fruitPersonalities = {
    banana: {
        name: "Energetic Banana",
        description: "You're full of energy and always ready for adventure! Like a banana, you provide instant vitality and bring joy to those around you.",
        recommendations: ["Healthy Mix Bundle", "Tropical Party Bundle"]
    },
    apple: {
        name: "Wise Apple",
        description: "You're dependable and bring wisdom to every situation. Like an apple, you're a classic choice that never goes out of style.",
        recommendations: ["Healthy Mix Bundle", "Fruit Feast Bundle"]
    },
    lemon: {
        name: "Zesty Lemon",
        description: "You bring a fresh perspective and aren't afraid to stand out! Like a lemon, you add excitement to any situation.",
        recommendations: ["Citrus Lovers Bundle", "Fruit Feast Bundle"]
    }
};

let currentQuestion = 0;
let personalityScores = {
    banana: 0,
    apple: 0,
    lemon: 0
};

function startQuiz() {
    currentQuestion = 0;
    personalityScores = { banana: 0, apple: 0, lemon: 0 };
    displayQuestion();
    document.getElementById('quiz-start').style.display = 'none';
    document.getElementById('quiz-questions').style.display = 'block';
    document.getElementById('quiz-result').style.display = 'none';
}

function displayQuestion() {
    const questionContainer = document.getElementById('quiz-questions');
    const question = quizQuestions[currentQuestion];
    
    questionContainer.innerHTML = `
        <h3>Question ${currentQuestion + 1} of ${quizQuestions.length}</h3>
        <p class="question">${question.question}</p>
        <div class="options">
            ${question.options.map((option, index) => `
                <button onclick="selectOption('${option.personality}')" class="quiz-option">
                    ${option.text}
                </button>
            `).join('')}
        </div>
    `;
}

function selectOption(personality) {
    personalityScores[personality]++;
    
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        displayQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const result = Object.entries(personalityScores)
        .reduce((a, b) => a[1] > b[1] ? a : b)[0];
    
    const personality = fruitPersonalities[result];
    const resultContainer = document.getElementById('quiz-result');
    
    document.getElementById('quiz-questions').style.display = 'none';
    resultContainer.style.display = 'block';
    
    resultContainer.innerHTML = `
        <h2>Your Fruit Personality: ${personality.name}!</h2>
        <p class="personality-description">${personality.description}</p>
        <div class="recommendations">
            <h3>Recommended Bundles for You:</h3>
            <ul>
                ${personality.recommendations.map(bundle => `
                    <li><a href="bundles.html">${bundle}</a></li>
                `).join('')}
            </ul>
        </div>
        <button onclick="startQuiz()" class="retry-button">Take Quiz Again</button>
    `;
} 