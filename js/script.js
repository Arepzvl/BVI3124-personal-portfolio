/*
 * Client-side script for BVI3124 Personal Portfolio Website.
 * Handles mobile navigation, greeting/year updates, typing animation,
 * expandable bio section, skill tabs/progress bars, project filter,
 * and contact form validation with mailto: launch.
 */

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initGreetingAndYear();
  initTypingEffect();
  initReadMore();
  initSkillTabsAndBars();
  initProjectFilter();
  initContactFormValidation();
});

function initMobileMenu() {
  const toggleBtn = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
  });
}

function initGreetingAndYear() {
  const greetingEl = document.getElementById("greeting");
  if (greetingEl) {
    const hour = new Date().getHours();
    let greetingText = "Hello there";

    if (hour < 12) {
      greetingText = "Good morning";
    } else if (hour < 18) {
      greetingText = "Good afternoon";
    } else {
      greetingText = "Good evening";
    }

    greetingEl.textContent = `${greetingText}, welcome to my portfolio`;
  }

  const yearEls = document.querySelectorAll("#year");
  const currentYear = new Date().getFullYear();
  yearEls.forEach((el) => {
    el.textContent = String(currentYear);
  });
}

function initTypingEffect() {
  const typingEl = document.getElementById("typing-text");
  if (!typingEl) return;

  const roles = [
    "Industrial Electronics Technologist",
    "Automation & Embedded Systems Enthusiast",
    "Web & System Developer"
  ];

  let roleIndex = 0;
  let charIndex = roles[0].length;
  let isDeleting = false;

  setInterval(() => {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      charIndex++;
      typingEl.textContent = currentRole.slice(0, charIndex);
      if (charIndex === currentRole.length) {
        isDeleting = true;
      }
    } else {
      charIndex--;
      typingEl.textContent = currentRole.slice(0, charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
  }, 95);
}

function initReadMore() {
  const readMoreBtn = document.getElementById("read-more-btn");
  const moreAboutBox = document.getElementById("more-about");

  if (!readMoreBtn || !moreAboutBox) return;

  readMoreBtn.addEventListener("click", () => {
    const isHidden = moreAboutBox.hasAttribute("hidden");
    if (isHidden) {
      moreAboutBox.removeAttribute("hidden");
      readMoreBtn.textContent = "Show Less";
      readMoreBtn.setAttribute("aria-expanded", "true");
    } else {
      moreAboutBox.setAttribute("hidden", "");
      readMoreBtn.textContent = "Read More";
      readMoreBtn.setAttribute("aria-expanded", "false");
    }
  });
}

function animateProgressBars(container) {
  const bars = container.querySelectorAll(".progress-fill");
  bars.forEach((bar) => {
    const targetWidth = bar.getAttribute("data-width") || "0%";
    bar.style.width = "0%";
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        bar.style.width = targetWidth;
      });
    });
  });
}

function initSkillTabsAndBars() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");
  const activePanel = document.querySelector(".tab-panel.active");

  if (activePanel) {
    animateProgressBars(activePanel);
  }

  if (tabButtons.length === 0 || tabPanels.length === 0) return;

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-tab");

      tabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      tabPanels.forEach((panel) => {
        const isMatch = panel.id === targetId;
        panel.classList.toggle("active", isMatch);
        if (isMatch) {
          animateProgressBars(panel);
        }
      });
    });
  });
}

function initProjectFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  if (filterButtons.length === 0 || projectCards.length === 0) return;

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const selectedCategory = btn.getAttribute("data-filter");

      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      projectCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");
        const shouldShow = selectedCategory === "all" || cardCategory === selectedCategory;
        card.style.display = shouldShow ? "flex" : "none";
      });
    });
  });
}

function initContactFormValidation() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");

  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const subjectError = document.getElementById("subject-error");
  const messageError = document.getElementById("message-error");
  const statusEl = document.getElementById("form-status");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let isValid = true;
    nameError.textContent = "";
    emailError.textContent = "";
    subjectError.textContent = "";
    messageError.textContent = "";
    statusEl.textContent = "";
    statusEl.className = "form-status";

    const nameVal = nameInput.value.trim();
    const emailVal = emailInput.value.trim();
    const subjectVal = subjectInput.value.trim();
    const messageVal = messageInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (nameVal.length < 2) {
      nameError.textContent = "Please enter your full name (at least 2 characters).";
      isValid = false;
    }

    if (!emailPattern.test(emailVal)) {
      emailError.textContent = "Please enter a valid email address.";
      isValid = false;
    }

    if (subjectVal.length < 3) {
      subjectError.textContent = "Please enter a subject.";
      isValid = false;
    }

    if (messageVal.length < 10) {
      messageError.textContent = "Please enter a message (at least 10 characters).";
      isValid = false;
    }

    if (!isValid) {
      statusEl.textContent = "Please fix the highlighted fields above.";
      statusEl.classList.add("error");
      return;
    }

    // Validate inputs, then open default email client via mailto: link
    const recipient = "Arifakmal512@outlook.com";
    const mailSubject = encodeURIComponent(subjectVal);
    const mailBody = encodeURIComponent(
      `Name: ${nameVal}\nEmail: ${emailVal}\n\nMessage:\n${messageVal}`
    );

    statusEl.textContent = "Opening your email client...";
    statusEl.classList.add("success");
    form.reset();
    window.location.href = `mailto:${recipient}?subject=${mailSubject}&body=${mailBody}`;
  });
}