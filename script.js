
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
const languageToggle = document.getElementById("languageToggle");

let currentLanguage = "en";

function changeLanguage(language) {

    document.querySelectorAll("[data-en][data-sr]").forEach(element => {
    element.classList.remove("language-animation");

    void element.offsetWidth;

    element.innerHTML = element.dataset[language];

    element.classList.add("language-animation");
    
});
const downloadCV = document.getElementById("downloadCV");

    if (downloadCV) {
        if (language === "sr") {
            downloadCV.href = "CV/DusanCV-SR.pdf";
            downloadCV.download = "Dusan-Ristic-CV-SR.pdf";
        } else {
            downloadCV.href = "CV/DusanCV-EN.pdf";
            downloadCV.download = "Dusan-Ristic-CV-EN.pdf";
        }
    }

    currentLanguage = language;

    languageToggle.textContent =
        language === "en" ? "ENG" : "SRB";

    document.documentElement.lang = language;

    localStorage.setItem("siteLanguage", language);
}

languageToggle.addEventListener("click", () => {

    const newLanguage = currentLanguage === "en" ? "sr" : "en";

    changeLanguage(newLanguage);

});

const savedLanguage = localStorage.getItem("siteLanguage");

if (savedLanguage) {
    changeLanguage(savedLanguage);
}
/* SCROLL PROGRESS BAR */

const scrollProgress = document.getElementById("scrollProgress");

function updateScrollProgress() {
    const scrollTop = window.scrollY;

    const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress = scrollHeight > 0
        ? (scrollTop / scrollHeight) * 100
        : 0;

    scrollProgress.style.height = progress + "%";
}

window.addEventListener("scroll", updateScrollProgress);
window.addEventListener("resize", updateScrollProgress);

updateScrollProgress();
/* BACK TO TOP */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        backToTop.classList.add("visible");
    } else {
        backToTop.classList.remove("visible");
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
/* ACTIVE NAVIGATION */

const navLinks = document.querySelectorAll(".navbar nav a");

const sections = Array.from(navLinks)
    .map(link => document.querySelector(link.getAttribute("href")))
    .filter(section => section !== null);

function updateActiveNavigation() {

    const marker = window.innerHeight * 0.35;

    const projects = document.querySelector("#projects");
    const education = document.querySelector("#education");

    const projectsRect = projects.getBoundingClientRect();
    const educationRect = education.getBoundingClientRect();

    const sameRow =
        projectsRect.top <= marker &&
        projectsRect.bottom >= marker &&
        educationRect.top <= marker &&
        educationRect.bottom >= marker;

    if (sameRow) {
        navLinks.forEach(link => {
            const href = link.getAttribute("href");

            link.classList.toggle(
                "active",
                href === "#projects" || href === "#education"
            );
        });

        return;
    }

    let activeSection = sections[0];
    let smallestDistance = Infinity;

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();

        const distance = rect.top <= marker && rect.bottom >= marker
            ? 0
            : Math.min(
                Math.abs(rect.top - marker),
                Math.abs(rect.bottom - marker)
            );

        if (distance < smallestDistance) {
            smallestDistance = distance;
            activeSection = section;
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${activeSection.id}`
        );
    });
}

window.addEventListener("scroll", updateActiveNavigation);
window.addEventListener("resize", updateActiveNavigation);
window.addEventListener("load", updateActiveNavigation);

updateActiveNavigation();
/* CUSTOM CURSOR */

document.addEventListener("DOMContentLoaded", () => {

    const customCursor = document.querySelector(".custom-cursor");

    if (!customCursor) {
        console.log("Custom cursor element nije pronađen!");
        return;
    }

    document.addEventListener("mousemove", (event) => {
        customCursor.style.left = event.clientX + "px";
        customCursor.style.top = event.clientY + "px";
    });

});

/* MAGNETIC BUTTONS */

const magneticElements = document.querySelectorAll(
    ".primary-button, .github-project-link, .contact-link, .nav-button"
);

magneticElements.forEach(element => {

    element.addEventListener("mousemove", (event) => {

        const rect = element.getBoundingClientRect();

        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;

        element.style.transform =
            `translate(${x * 0.35}px, ${y * 0.35}px)`;

    });

    element.addEventListener("mouseleave", () => {

        element.style.transform = "";

    });

});
/* =========================
   LOADING SCREEN
========================= */

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.classList.add("loader-hidden");
    }, 1500);
});
// =========================
// INTERACTIVE TERMINAL
// =========================

const terminalInput = document.getElementById("terminalInput");
const terminalOutput = document.getElementById("terminalOutput");

if (terminalInput && terminalOutput) {

    const commands = {

        help: `
Available commands:

about       - About me
skills      - My technical skills
projects    - My projects
experience  - Work experience
education   - Education
contact     - Contact information
clear       - Clear terminal
        `,

        about: `
Name: Dušan Ristić
Role: Junior .NET Developer
Location: Serbia

Passionate about software development,
C#, .NET and continuous learning.
        `,

        skills: `
Technical Skills:

C#              Learning
.NET             Learning
SQL Server       Learning
HTML             Working knowledge
CSS              Working knowledge
JavaScript       Working knowledge
Docker           Currently learning
        `,

        projects: `
My Projects:

1. Car Service Management
   C# | .NET | SQL Server

2. Personal Developer Portfolio
   HTML | CSS | JavaScript
        `,

        experience: `
Work Experience:

2019 - 2021
Electrical Installation Worker
Tilburg, Netherlands

2022
Graphic Designer - Inscape
Belgrade

2022
Junior Frontend Developer
MEGA Computer Engineering
Belgrade
        `,

        education: `
Education:

2014 - 2018
Bora Stanković Grammar School

2020
Graphic Design Course - EUDUKA

2022 - Present
Faculty of Electronic Engineering
University of Niš
        `,

        contact: `
Email:
dristic@elfak.rs

GitHub:
github.com/codewithdusan
        `

    };

    terminalInput.addEventListener("keydown", function(event) {

        if (event.key !== "Enter") return;

        const command = terminalInput.value.trim().toLowerCase();

        if (!command) return;

        const commandLine = document.createElement("p");
        commandLine.className = "terminal-command";
        commandLine.textContent = "visitor@portfolio:~$ " + command;

        terminalOutput.appendChild(commandLine);

        if (command === "clear") {
            terminalOutput.innerHTML = "";
        }

        else {
            const response = document.createElement("p");
            response.className = "terminal-response";

            response.textContent = commands[command] || 
                "Command not found. Type 'help' to see available commands.";

            terminalOutput.appendChild(response);
        }

        terminalInput.value = "";

        terminalOutput.scrollTop = terminalOutput.scrollHeight;

    });

}