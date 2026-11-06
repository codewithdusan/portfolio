
// =========================
// EFEKAT KUCANJA TEKSTA
// =========================

const words = [
    "Junior .NET Developer",
    "C# Developer",
    "Future Software Engineer"
];

let wordIndex = 0;
let letterIndex = 0;
let deleting = false;

const typing = document.getElementById("typing");

function typeEffect() {
    const word = words[wordIndex];

    if (!deleting) {
        typing.textContent = word.substring(0, letterIndex + 1);
        letterIndex++;

        if (letterIndex === word.length) {
            deleting = true;
            setTimeout(typeEffect, 1600);
            return;
        }
    } else {
        typing.textContent = word.substring(0, letterIndex - 1);
        letterIndex--;

        if (letterIndex === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }

    setTimeout(typeEffect, deleting ? 40 : 85);
}

typeEffect();


// =========================
// ANIMACIJA POJAVLJIVANJA
// =========================

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

document.querySelectorAll(".reveal").forEach((card) => {
    observer.observe(card);
});


// =========================
// AUTOMATSKA GODINA
// =========================

document.getElementById("year").textContent =
    new Date().getFullYear();
