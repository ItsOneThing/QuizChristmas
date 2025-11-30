const questions = [
    {
        question: "南南生日是什么时候？",
        options: ["2006年1月25日", "2005年11月5日", "2006年5月24日", "2007年9月24日"],
        correct: 0
    },
    {
        question: "老张最喜欢玩什么？",
        options: ["鸡蛋", "香肠", "魔方", "辣条"],
        correct: 2
    },
    {
        question: "Leo姓什么？",
        options: ["鱼", "虞", "于", "余"],
        correct: 1
    },
    {
        question: "保罗空闲时间喜欢干什么？",
        options: ["AM", "GAL", "FDI", "都喜欢"],
        correct: 3
    },
    {
        question: "老陈喜欢吃什么？",
        options: ["火锅", "烧烤", "寿司", "面条"],
        correct: 2
    },
    {
        question: "Dario最喜欢什么？",
        options: ["男人", "女人", "Angela", "GAL"],
        correct: 2
    },
    {
        question: "Sandro喜欢干什么？",
        options: ["学习GAL", "学习AM", "学习FDI", "通宵打游戏"],
        correct: 3
    },
    {
        question: "海哥的口头禅是什么？",
        options: ["没事儿", "随便", "卢卢~~", "厉害"],
        correct: 2
    },
    {
        question: "Alessia是哪里人？",
        options: ["Napoli", "Palermo", "Brescia", "Prato"],
        correct: 2
    },
    {
        question: "王鑫是哪个Corso的？",
        options: ["Ingegneria Chimica", "Gestionale", "Ingegneria Informatica", "Ingegneria dei Materiali e delle Nanotecnologie"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let answers = [];

function createSnowflakes() {
    const snowflakesContainer = document.getElementById('snowflakes');
    for (let i = 0; i < 50; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.innerHTML = '❄';
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's';
        snowflake.style.animationDelay = Math.random() * 5 + 's';
        snowflake.style.fontSize = (Math.random() * 10 + 10) + 'px';
        snowflakesContainer.appendChild(snowflake);
    }
}

function startQuiz() {
    document.getElementById('startPage').classList.add('hidden');
    document.getElementById('quizPage').classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestion];
    const container = document.getElementById('questionContainer');
    
    container.innerHTML = `
        <div class="question-card">
            <div class="question-number">问题 ${currentQuestion + 1} / ${questions.length}</div>
            <div class="question-text">${question.question}</div>
            <div class="options">
                ${question.options.map((opt, idx) => `
                    <label class="option">
                        <input type="radio" name="answer" value="${idx}" onchange="selectOption(this)">
                        <span>${opt}</span>
                    </label>
                `).join('')}
            </div>
        </div>
    `;

    updateProgress();
}

function selectOption(radio) {
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
    });
    radio.parentElement.classList.add('selected');
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}

function submitAnswer() {
    const selected = document.querySelector('input[name="answer"]:checked');
    
    if (!selected) {
        alert('请选择一个答案！');
        return;
    }

    answers.push(parseInt(selected.value));

    if (parseInt(selected.value) === questions[currentQuestion].correct) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('quizPage').classList.add('hidden');
    document.getElementById('resultPage').classList.remove('hidden');

    const percentage = (score / questions.length) * 100;
    document.getElementById('scoreDisplay').textContent = Math.round(percentage) + '%';

    let message = '';
    if (percentage >= 80) {
        message = '太棒了！！🎉<br>这是为你准备的特别惊喜！';
        document.getElementById('videoSection').classList.remove('hidden');
        document.getElementById('videoFrame').src = 'https://youtu.be/xPfsyDTFwGQ?si=r3bdk-qLw-iQ6tmT';
    } else if (percentage >= 60) {
        message = '不错哦！还算了解我～😊<br>不过还有提升空间哦！';
    } else {
        message = '哈哈，看来你还需要多了解我一些呢！😄<br>没关系，我们还有很多时间！';
    }

    document.getElementById('resultMessage').innerHTML = message;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    answers = [];
    document.getElementById('resultPage').classList.add('hidden');
    document.getElementById('startPage').classList.remove('hidden');
}

createSnowflakes();
