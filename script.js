/* ==========================================
   MENU MOBILE
========================================== */

const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

menuBtn.addEventListener("click", () => {
    navbar.classList.toggle("active");
});


/* ==========================================
   SCROLL REVEAL
========================================== */

const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {

    revealElements.forEach(element => {

        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 120;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add("active");
        }

    });

}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();


/* ==========================================
   BOTÃO VOLTAR AO TOPO
========================================== */

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {
        topBtn.style.display = "flex";
    } else {
        topBtn.style.display = "none";
    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* ==========================================
   CONTADORES ANIMADOS
========================================== */

const counters = document.querySelectorAll(".counter");

let countersStarted = false;

function startCounters() {

    if (countersStarted) return;

    const statsSection = document.querySelector(".stats");

    const sectionTop = statsSection.getBoundingClientRect().top;

    if (sectionTop < window.innerHeight - 100) {

        counters.forEach(counter => {

            const target = +counter.dataset.target;

            let count = 0;

            const increment = target / 120;

            const updateCounter = () => {

                count += increment;

                if (count < target) {

                    counter.innerText = Math.floor(count);

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.innerText = target;

                }

            };

            updateCounter();

        });

        countersStarted = true;
    }
}

window.addEventListener("scroll", startCounters);
startCounters();


/* ==========================================
   GLOSSÁRIO COM BUSCA
========================================== */

const glossarySearch = document.getElementById("searchGlossary");
const glossaryTerms = document.querySelectorAll(".term");

if (glossarySearch) {

    glossarySearch.addEventListener("keyup", () => {

        const value = glossarySearch.value.toLowerCase();

        glossaryTerms.forEach(term => {

            const text = term.textContent.toLowerCase();

            if (text.includes(value)) {

                term.style.display = "block";

            } else {

                term.style.display = "none";

            }

        });

    });

}


/* ==========================================
   QUIZ INTERATIVO
========================================== */

const quizData = [

    {
        question: "O que é bioeconomia?",
        options: [
            "Uso sustentável de recursos biológicos",
            "Extração intensiva de petróleo",
            "Uso exclusivo de fertilizantes químicos",
            "Produção industrial sem inovação"
        ],
        answer: 0
    },

    {
        question: "Qual destes é um bioinsumo?",
        options: [
            "Gasolina",
            "Inseticida sintético",
            "Bactéria benéfica",
            "Carvão mineral"
        ],
        answer: 2
    },

    {
        question: "O que a economia circular busca?",
        options: [
            "Gerar mais resíduos",
            "Reaproveitar recursos",
            "Aumentar desperdícios",
            "Eliminar reciclagem"
        ],
        answer: 1
    },

    {
        question: "A biotecnologia pode contribuir para:",
        options: [
            "Medicamentos",
            "Captura de CO₂",
            "Bioinsumos",
            "Todas as alternativas"
        ],
        answer: 3
    }

];

const quizContainer = document.getElementById("quiz-container");
const nextBtn = document.getElementById("nextBtn");
const result = document.getElementById("result");

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

function loadQuestion() {

    const q = quizData[currentQuestion];

    quizContainer.innerHTML = `
        <h3>${q.question}</h3>
        ${q.options.map((option, index) => `
            <button class="quiz-option" data-index="${index}">
                ${option}
            </button>
        `).join("")}
    `;

    document.querySelectorAll(".quiz-option")
    .forEach(button => {

        button.addEventListener("click", () => {

            document.querySelectorAll(".quiz-option")
            .forEach(btn => btn.style.opacity = "0.7");

            button.style.opacity = "1";

            selectedAnswer = Number(button.dataset.index);

        });

    });

}

loadQuestion();

nextBtn.addEventListener("click", () => {

    if (selectedAnswer === null) {

        alert("Selecione uma resposta.");

        return;
    }

    if (selectedAnswer === quizData[currentQuestion].answer) {

        score++;

    }

    selectedAnswer = null;

    currentQuestion++;

    if (currentQuestion < quizData.length) {

        loadQuestion();

    } else {

        quizContainer.innerHTML = "";

        nextBtn.style.display = "none";

        result.innerHTML = `
            Você acertou <strong>${score}</strong>
            de <strong>${quizData.length}</strong> perguntas!
        `;
    }

});


/* ==========================================
   GRÁFICO DOS BIOINSUMOS
========================================== */

const chartCanvas = document.getElementById("bioChart");

if (chartCanvas) {

    const ctx = chartCanvas.getContext("2d");

    new Chart(ctx, {

        type: "bar",

        data: {

            labels: [
                "Redução Ambiental",
                "Menor Custo",
                "Saúde do Solo",
                "Produtividade"
            ],

            datasets: [

                {
                    label: "Bioinsumos",

                    data: [90, 80, 95, 85],

                    borderWidth: 1
                },

                {
                    label: "Defensivos Químicos",

                    data: [45, 60, 30, 75],

                    borderWidth: 1
                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    labels: {
                        color: "#ffffff"
                    }

                }

            },

            scales: {

                x: {

                    ticks: {
                        color: "#ffffff"
                    }

                },

                y: {

                    beginAtZero: true,

                    ticks: {
                        color: "#ffffff"
                    }

                }

            }

        }

    });

}


/* ==========================================
   ANIMAÇÃO SUAVE NOS LINKS
========================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (target) {

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

        navbar.classList.remove("active");

    });

});


/* ==========================================
   EFEITO PARALLAX NO HERO
========================================== */

const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {

    let offset = window.pageYOffset;

    if (hero) {

        hero.style.backgroundPositionY =
            offset * 0.4 + "px";

    }

});


/* ==========================================
   ANIMAÇÃO DOS CARDS
========================================== */

const cards = document.querySelectorAll(
    ".card, .bio-card, .stat-card"
);

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform =
            "translateY(-10px) scale(1.03)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "translateY(0) scale(1)";

    });

});


/* ==========================================
   ANO AUTOMÁTICO NO RODAPÉ (OPCIONAL)
========================================== */

const copyright =
document.querySelector(".copyright");

if (copyright) {

    const year = new Date().getFullYear();

    copyright.innerHTML =
    `© ${year} AgroVerde - Todos os direitos reservados.`;

}


/* ==========================================
   MENSAGEM DE BOAS-VINDAS
========================================== */

window.addEventListener("load", () => {

    console.log(
        "Portal AgroVerde carregado com sucesso!"
    );

});
