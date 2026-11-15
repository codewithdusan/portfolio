const words = {
    en: [
        "Junior .NET Developer",
        "C# Developer",
        "Software Developer"
    ],
    sr: [
        "Junior .NET Developer",
        "C# Programer",
        "Programer softvera"
    ]
};

let wordIndex = 0;
let letterIndex = 0;
let deleting = false;

const typing = document.getElementById("typing");

function typeEffect() {
    if (!typing) return;

    const currentWords = words[currentLanguage];
    const word = currentWords[wordIndex];

    if (!deleting) {
        typing.textContent = word.substring(0, letterIndex + 1);
        letterIndex++;

        if (letterIndex >= word.length) {
            deleting = true;
            setTimeout(typeEffect, 1600);
            return;
        }
    } else {
        typing.textContent = word.substring(0, letterIndex - 1);
        letterIndex--;

        if (letterIndex <= 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % currentWords.length;
        }
    }

    setTimeout(typeEffect, deleting ? 40 : 85);
}

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
    // TERMINAL PLACEHOLDER TRANSLATION
    const terminalInput = document.getElementById("terminalInput");

    if (terminalInput) {
        terminalInput.placeholder =
            terminalInput.dataset[language + "Placeholder"];
    }
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
if (typeof updateGithubChartLanguage === "function") {
    updateGithubChartLanguage();
}    
}

languageToggle.addEventListener("click", () => {

    const newLanguage = currentLanguage === "en" ? "sr" : "en";

    changeLanguage(newLanguage);

});

const savedLanguage = localStorage.getItem("siteLanguage");

if (savedLanguage) {
    changeLanguage(savedLanguage);
}

typeEffect();
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

        help: {
            en: `Available commands:
about       - About me
skills      - My technical skills
projects    - My projects
experience  - Work experience
education   - Education
contact     - Contact information
clear       - Clear terminal`,

            sr: `Dostupne komande:
about       - O meni
skills      - Moje veštine
projects    - Moji projekti
experience  - Radno iskustvo
education   - Obrazovanje
contact     - Kontakt informacije
clear       - Obriši terminal`
        },

        about: {
            en: `Name: Dušan Ristić
Role: Junior .NET Developer
Location: Serbia

Passionate about software development,
C#, .NET and continuous learning.`,

            sr: `Ime: Dušan Ristić
Pozicija: Junior .NET Developer
Lokacija: Srbija

Posvećen razvoju softvera,
C#, .NET tehnologijama i kontinuiranom učenju.`
        },

        skills: {
            en: `Technical Skills:
C#              Learning
.NET            Learning
SQL Server      Learning
HTML            Working knowledge
CSS             Working knowledge
JavaScript      Working knowledge
Docker          Currently learning`,

            sr: `Tehničke veštine:
C#              Učenje
.NET            Učenje
SQL Server      Učenje
HTML            Osnovno znanje
CSS             Osnovno znanje
JavaScript      Osnovno znanje
Docker          Trenutno učim`
        },

        projects: {
            en: `My Projects:

1. Car Service Management
   C# | .NET | SQL Server

2. Personal Developer Portfolio
   HTML | CSS | JavaScript`,

            sr: `Moji projekti:

1. Sistem za upravljanje auto-servisom
   C# | .NET | SQL Server

2. Lični developerski portfolio
   HTML | CSS | JavaScript`
        },

        experience: {
            en: `Work Experience:

2019 - 2021
Electrical Installation Worker
Tilburg, Netherlands

2022
Graphic Designer - Inscape
Belgrade

2022
Junior Frontend Developer
MEGA Computer Engineering
Belgrade`,

            sr: `Radno iskustvo:

2019 - 2021
Radnik na elektroinstalacijama
Tilburg, Holandija

2022
Grafički dizajner - Inscape
Beograd

2022
Junior Frontend Developer
MEGA Computer Engineering
Beograd`
        },

        education: {
            en: `Education:

2014 - 2018
Bora Stanković Grammar School

2020
Graphic Design Course - EUDUKA

2022 - Present
Faculty of Electronic Engineering
University of Niš`,

            sr: `Obrazovanje:

2014 - 2018
Gimnazija Bora Stanković

2020
Kurs grafičkog dizajna - EUDUKA

2022 - Danas
Elektronski fakultet
Univerzitet u Nišu`
        },

        contact: {
            en: `Email:
dristic@elfak.rs

GitHub:
github.com/codewithdusan`,

            sr: `E-mail:
dristic@elfak.rs

GitHub:
github.com/codewithdusan`
        }
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

            if (commands[command]) {
                response.textContent = commands[command][currentLanguage];
            }

            else {
                response.textContent = currentLanguage === "sr"
                    ? "Nepoznata komanda. Ukucaj 'help' za dostupne komande."
                    : "Command not found. Type 'help' to see available commands.";
            }

            terminalOutput.appendChild(response);
        }

        terminalInput.value = "";
        terminalOutput.scrollTop = terminalOutput.scrollHeight;

    });

}
// =========================
// SCROLL REVEAL ANIMATION
// =========================

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.05
});

document.querySelectorAll(".reveal").forEach(card => {
    revealObserver.observe(card);
});
// =========================
// DARK / LIGHT THEME
// =========================

const themeToggle = document.getElementById("themeToggle");

let currentTheme = localStorage.getItem("siteTheme") || "dark";

function applyTheme(theme) {

    document.documentElement.dataset.theme = theme;

    themeToggle.innerHTML = theme === "dark"
        ? `<svg viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.8"
             stroke-linecap="round" stroke-linejoin="round">
             <path d="M20.5 15.5A8.5 8.5 0 0 1 8.5 3.5
                      8.5 8.5 0 1 0 20.5 15.5Z"/>
           </svg>`
        : `<svg viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.8"
             stroke-linecap="round" stroke-linejoin="round">
             <circle cx="12" cy="12" r="4"/>
             <path d="M12 2v2 M12 20v2 M4.93 4.93l1.42 1.42
                      M17.65 17.65l1.42 1.42 M2 12h2 M20 12h2
                      M4.93 19.07l1.42-1.42
                      M17.65 6.35l1.42-1.42"/>
           </svg>`;

    localStorage.setItem("siteTheme", theme);
}

applyTheme(currentTheme);

themeToggle.addEventListener("click", () => {

    currentTheme = currentTheme === "dark" ? "light" : "dark";

    applyTheme(currentTheme);

});
// PREMEŠTANJE NAVBAR DUGMADI NA MALIM EKRANIMA

const navbar = document.querySelector(".navbar");
const mobileNav = document.querySelector(".mobile-side-nav");
const extraControls = document.querySelector(".nav-extra-controls");
const downloadCV = document.getElementById("downloadCV");

const mobileBreakpoint = window.matchMedia("(max-width: 500px)");

function moveNavbarControls() {

    if (mobileBreakpoint.matches) {

        mobileNav.appendChild(downloadCV);
        mobileNav.appendChild(extraControls);

    } else {

        navbar.appendChild(downloadCV);
        navbar.appendChild(extraControls);

    }
}

moveNavbarControls();

mobileBreakpoint.addEventListener("change", moveNavbarControls);

// FLOATING CHAT WIDGET

document.addEventListener("DOMContentLoaded", function () {

    const chatToggle = document.getElementById("chatToggle");
    const chatWindow = document.getElementById("chatWindow");
    const chatClose = document.getElementById("chatClose");
    const chatForm = document.getElementById("chatForm");
    const chatInput = document.getElementById("chatInput");
    const chatTexts = document.querySelectorAll(".chat-window [data-en]");

    // Provera HTML elemenata
    if (!chatToggle || !chatWindow || !chatClose || !chatForm || !chatInput) {
        console.error("Chat widget: HTML elements not found.");
        return;
    }
    function updateChatLanguage(language) {

    chatTexts.forEach(element => {
        element.textContent = element.dataset[language];
    });

    chatInput.placeholder =
        chatInput.dataset[language + "Placeholder"];

    const sendButton = chatForm.querySelector("button");

    sendButton.setAttribute(
        "aria-label",
        sendButton.dataset[language + "Label"]
    );
    }

// Primeni trenutno izabrani jezik
    updateChatLanguage(currentLanguage);

    // Otvaranje i zatvaranje chata
    chatToggle.addEventListener("click", function () {
        const isOpen = chatWindow.classList.toggle("active");

        chatToggle.classList.toggle("active", isOpen);
    });

    // Zatvaranje preko X dugmeta
    chatClose.addEventListener("click", function () {
        chatWindow.classList.remove("active");
        chatToggle.classList.remove("active");
    });

    // Slanje poruke na WhatsApp
    chatForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const message = chatInput.value.trim();

        if (!message) return;

        const whatsappNumber = "381603530746";

        const whatsappURL =
            "https://wa.me/" + whatsappNumber +
            "?text=" + encodeURIComponent(message);

        window.open(whatsappURL, "_blank");

        chatInput.value = "";
    });

});


// =================================
// 3D CUBE - SCROLL ANIMATION
// =================================

document.addEventListener("DOMContentLoaded", function () {

    const techCubes = document.querySelectorAll(".tech-cube");

    if (!techCubes.length) return;

    let rotationX = -25;
    let rotationY = 25;

    let currentBoost = 0;
    let targetBoost = 0;

    let lastScrollY = window.scrollY;
    let lastFrameTime = performance.now();

    // Reagovanje na skrolovanje
    window.addEventListener("scroll", function () {

        const currentScrollY = window.scrollY;
        const scrollDifference = Math.abs(currentScrollY - lastScrollY);

        targetBoost = Math.min(scrollDifference * 0.8, 25);

        lastScrollY = currentScrollY;

    }, { passive: true });


    // Animacija kocke
    function animateCube(timestamp) {

        const deltaTime = Math.min(
            (timestamp - lastFrameTime) / 1000,
            0.05
        );

        lastFrameTime = timestamp;

        // Postepeno ubrzavanje i usporavanje
        currentBoost += (targetBoost - currentBoost) * 0.08;

        targetBoost *= 0.94;

        // Osnovna brzina + dodatna brzina tokom skrolovanja
        const speedX = 12 + currentBoost;
        const speedY = 20 + currentBoost * 1.5;

        rotationX += speedX * deltaTime;
        rotationY += speedY * deltaTime;

        // Rotacija obe kocke u suprotnim smerovima
        techCubes.forEach((techCube, index) => {

            const direction = index === 0 ? 1 : -1;

            techCube.style.transformOrigin = "center center";

            techCube.style.transform =
                `rotateX(${rotationX}deg) rotateY(${rotationY * direction}deg)`;

        });

        requestAnimationFrame(animateCube);
    }

    requestAnimationFrame(animateCube);

});


// =========================================
// GITHUB ACTIVITY - LAST 7 DAYS
// =========================================

document.addEventListener("DOMContentLoaded", async function () {

    const githubTotal = document.getElementById("githubTotal");
    const githubChart = document.getElementById("githubChart");

    // Provera da li GitHub kartica postoji
    if (!githubTotal || !githubChart) return;

    const username = "codewithdusan";

    try {

        // Preuzimanje GitHub aktivnosti
        const response = await fetch(
            `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
        );

        if (!response.ok) {
            throw new Error("GitHub API error");
        }

        const data = await response.json();

        if (!data.contributions) {
            throw new Error("No contribution data");
        }

        // Čuvanje doprinosa po datumima
        const contributionsMap = new Map(
            data.contributions.map(day => [
                day.date,
                day.count
            ])
        );

        // Poslednjih 7 dana
        const days = [];

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let i = 6; i >= 0; i--) {

            const date = new Date(today);
            date.setDate(today.getDate() - i);

            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");

            const dateKey = `${year}-${month}-${day}`;

            days.push({
                date: dateKey,
                count: contributionsMap.get(dateKey) || 0
            });
        }
        // CURRENT STREAK

function formatDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

let streakDate = new Date(today);

// Ako danas nema doprinosa, proveravamo od juče
if ((contributionsMap.get(formatDateKey(streakDate)) || 0) === 0) {
    streakDate.setDate(streakDate.getDate() - 1);
}

let currentStreak = 0;

while (true) {
    const dateKey = formatDateKey(streakDate);
    const count = contributionsMap.get(dateKey) || 0;

    if (count === 0) break;

    currentStreak++;

    streakDate.setDate(streakDate.getDate() - 1);
}

document.getElementById("githubStreak").textContent = currentStreak;
// LAST UPDATED

// LAST UPDATED

const lastUpdated = new Date();

document.getElementById("githubLastUpdated").textContent =
    lastUpdated.toLocaleString(
        document.documentElement.lang === "sr" ? "sr-RS" : "en-GB",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hourCycle: "h23"
        }
    );
        // Ukupan broj doprinosa
        const total = days.reduce(
            (sum, day) => sum + day.count,
            0
        );

        githubTotal.textContent = total;

        // =========================================
        // DODATNE GITHUB STATISTIKE
        // ========================================
        // Broj aktivnih dana
            const activeDays = days.filter(
                day => day.count > 0
            ).length;

            document.getElementById("githubActiveDays").textContent = activeDays;

            // Najaktivniji dan
            const bestDay = Math.max(
                ...days.map(day => day.count)
            );

            document.getElementById("githubBestDay").textContent = bestDay;

// Dnevni prosek
const average = (total / 7).toFixed(1);

document.getElementById("githubAverage").textContent = average;

        // Kreiranje grafikona
        githubChart.innerHTML = "";

        const maxCount = Math.max(
            ...days.map(day => day.count),
            1
        );

        // Nazivi dana
        const dayNames = [
            "Sun", "Mon", "Tue", "Wed",
            "Thu", "Fri", "Sat"
        ];

        const dayNamesSR = [
            "Ned", "Pon", "Uto", "Sre",
            "Čet", "Pet", "Sub"
        ];

        // Kreiranje stubića
        days.forEach((day, index) => {

            const item = document.createElement("div");
            item.className = "github-bar-item";

            // Čuvamo datum da bismo mogli da menjamo jezik
            item.dataset.date = day.date;

            // Broj doprinosa
            const count = document.createElement("span");
            count.className = "github-bar-count";
            count.textContent = day.count;

            // Stubić
            const bar = document.createElement("div");
            bar.className = "github-bar";

            const height = day.count === 0
                ? 3
                : Math.max(8, (day.count / maxCount) * 100);

            bar.style.height = `${height}px`;
            bar.style.animation = "githubFadeIn 0.5s ease both";
            bar.style.animationDelay = `${index * 80}ms`;

            // Naziv dana
            const dateLabel = document.createElement("span");
            dateLabel.className = "github-bar-date";

            const weekday = new Date(
                day.date + "T12:00:00"
            ).getDay();

           const jezik = document.documentElement.lang;

                dateLabel.textContent =
                    jezik === "sr"
                    ? dayNamesSR[weekday]
                    : dayNames[weekday];
      // Tooltip
                const tooltip = document.createElement("div");
                tooltip.className = "github-tooltip";

                const formattedDate = new Date(
                        day.date + "T12:00:00"
                    ).toLocaleDateString(
            currentLanguage === "sr" ? "sr-RS" : "en-US",
                    {
                        day: "numeric",
                        month: "short"
                    }
);

tooltip.textContent =
    `${formattedDate} · ${day.count} ` +
    (currentLanguage === "sr" ? "doprinosa" : "contributions");

item.appendChild(tooltip);
            // Dodavanje elemenata
            item.appendChild(count);
            item.appendChild(bar);
            item.appendChild(dateLabel);

            githubChart.appendChild(item);
        });

    } catch (error) {

        console.error("GitHub activity error:", error);

        githubTotal.textContent = "—";

        githubChart.textContent =
            "GitHub activity is currently unavailable.";
    }

});

// =========================================
// GITHUB CHART LANGUAGE
// =========================================

function updateGithubChartLanguage() {

    const days = document.querySelectorAll(".github-bar-item");

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayNamesSR = ["Ned", "Pon", "Uto", "Sre", "Čet", "Pet", "Sub"];

    days.forEach(item => {

        const dateLabel = item.querySelector(".github-bar-date");

        if (!dateLabel) return;

        const date = item.dataset.date;

        if (!date) return;

        const weekday = new Date(date + "T12:00:00").getDay();

        dateLabel.textContent =
            currentLanguage === "sr"
                ? dayNamesSR[weekday]
                : dayNames[weekday];
        const tooltip = item.querySelector(".github-tooltip");

if (tooltip) {
    const formattedDate = new Date(
        date + "T12:00:00"
    ).toLocaleDateString(
        currentLanguage === "sr" ? "sr-RS" : "en-US",
        {
            day: "numeric",
            month: "short"
        }
    );

    const count = item.querySelector(".github-bar-count").textContent;

    tooltip.textContent =
        `${formattedDate} · ${count} ` +
        (currentLanguage === "sr" ? "doprinosa" : "contributions");
}        

    });
}
