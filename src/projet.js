// Fonction pour afficher la section choisie avec animation
function showTab(tabId) {
  // On cache toutes les sections
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.add('hidden');
    tab.classList.remove('fade-in');
    tab.style.display = 'none';
  });

  // On affiche la bonne
  const tabToShow = document.getElementById(tabId);
  if (tabToShow) {
    tabToShow.classList.remove('hidden');
    tabToShow.classList.add('fade-in');
    tabToShow.style.display = 'block';
  }
}

// Initialisation de la page
function initPage() {
  showTab('cv');
  animateElements();

  // Gestionnaire pour le thème
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('change', function() {
      const theme = this.checked ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', theme);
    });
  }
}

// Animation des éléments au chargement
function animateElements() {
  const elements = document.querySelectorAll('.animate-on-load');
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add('animate__animated', 'animate__fadeInUp');
    }, index * 200);
  });
}

// Fonction pour copier l'email
function copyEmail() {
  const emailText = document.getElementById('email');
  const range = document.createRange();
  range.selectNode(emailText);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand('copy');

  // Notification visuelle
  const button = document.querySelector('.copy-btn');
  const originalText = button.textContent;
  button.textContent = 'Copié !';
  button.classList.add('animate__animated', 'animate__pulse');

  setTimeout(() => {
    button.textContent = originalText;
    button.classList.remove('animate__animated', 'animate__pulse');
  }, 2000);
}

// Fonction de calculatrice
function calculate() {
  const num1 = parseFloat(document.getElementById('num1').value);
  const num2 = parseFloat(document.getElementById('num2').value);
  const operator = document.getElementById('operator').value;
  let result = 0;

  if (isNaN(num1) || isNaN(num2)) {
    showNotification("Veuillez entrer des nombres valides", "error");
    return;
  }

  switch (operator) {
    case '+': result = num1 + num2; break;
    case '-': result = num1 - num2; break;
    case '*': result = num1 * num2; break;
    case '/':
      if (num2 === 0) {
        showNotification("Division par zéro impossible", "error");
        return;
      }
      result = num1 / num2;
      break;
  }

  const resultElement = document.getElementById('result');
  resultElement.textContent = "Résultat : " + result;
  resultElement.classList.add('animate__animated', 'animate__fadeIn');

  setTimeout(() => {
    resultElement.classList.remove('animate__animated', 'animate__fadeIn');
  }, 1000);
}

// Fonction pour soumettre le formulaire de contact
function submitContactForm(event) {
  event.preventDefault();
  showNotification("Merci pour votre message !", "success");
  document.getElementById('contactForm').reset();
}

// Fonction pour vérifier les réponses du quiz
function submitQuiz() {
  const questions = [
    {id: 1, correctAnswer: "b"},
    {id: 2, correctAnswer: "a"},
    {id: 3, correctAnswer: "b"},
    {id: 4, correctAnswer: "b"},
    {id: 5, correctAnswer: "a"},
    {id: 6, correctAnswer: "b"},
    {id: 7, correctAnswer: "a"},
    {id: 8, correctAnswer: "b"},
    {id: 9, correctAnswer: "a"},
    {id: 10, correctAnswer: "a"},
  ];

  let score = 0;
  questions.forEach(question => {
    const answer = document.querySelector(`input[name="q${question.id}"]:checked`);
    if (answer && answer.value === question.correctAnswer) {
      score++;
    }
  });

  // Animation du résultat
  const quizResult = document.getElementById('quizResult');
  quizResult.textContent = `Vous avez obtenu ${score} sur 10.`;
  quizResult.classList.add('animate__animated', 'animate__bounceIn');

  // Confetti pour un bon score
  if (score >= 7) {
    showConfetti();
  }
}

// Fonction pour afficher une notification
function showNotification(message, type = "info") {
  const notification = document.createElement('div');
  notification.className = `fixed top-20 right-5 p-4 rounded-lg shadow-lg animate__animated animate__fadeInRight`;

  // Style selon le type
  if (type === "success") {
    notification.classList.add('bg-green-500', 'text-white');
  } else if (type === "error") {
    notification.classList.add('bg-red-500', 'text-white');
  } else {
    notification.classList.add('bg-blue-500', 'text-white');
  }

  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.remove('animate__fadeInRight');
    notification.classList.add('animate__fadeOutRight');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 500);
  }, 3000);
}

// Fonction pour afficher des confettis
function showConfetti() {
  const confettiCount = 100;
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.pointerEvents = 'none';
  container.style.zIndex = '9999';
  document.body.appendChild(container);

  const colors = ['#f44336', '#e91e63', '#9c27b0', '#3f51b5', '#2196f3', '#00bcd4', '#4CAF50', '#FFEB3B', '#FF9800'];

  for (let i = 0; i < confettiCount; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];

      confetti.style.position = 'absolute';
      confetti.style.width = Math.random() * 10 + 5 + 'px';
      confetti.style.height = Math.random() * 10 + 5 + 'px';
      confetti.style.backgroundColor = color;
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = '-10px';
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';

      container.appendChild(confetti);

      // Animation de chute
      const duration = Math.random() * 3 + 2;
      const xMove = Math.random() * 20 - 10;

      confetti.animate([
        { transform: 'translate(0, 0) rotate(0deg)' },
        { transform: `translate(${xMove}vw, 100vh) rotate(${Math.random() * 360}deg)` }
      ], {
        duration: duration * 1000,
        easing: 'cubic-bezier(0, 0, 0.2, 1)'
      });

      setTimeout(() => {
        container.removeChild(confetti);
      }, duration * 1000);
    }, Math.random() * 500);
  }

  setTimeout(() => {
    document.body.removeChild(container);
  }, 6000);
}

// Brute force quiz
function bruteForceQuiz() {
  // Créer un élément de terminal
  const terminal = document.createElement('div');
  terminal.className = 'fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex flex-col items-center justify-center z-50 p-4';
  document.body.appendChild(terminal);

  // Ajouter un conteneur pour le texte
  const terminalText = document.createElement('div');
  terminalText.className = 'font-mono text-green-500 text-lg max-w-3xl w-full h-64 overflow-auto p-4 bg-black border-2 border-green-500 rounded';
  terminal.appendChild(terminalText);

  // Fonction pour ajouter du texte au terminal
  function addTerminalText(text) {
    const line = document.createElement('div');
    line.className = 'hacking-animation';
    line.textContent = text;
    terminalText.appendChild(line);
    terminalText.scrollTop = terminalText.scrollHeight;

    // Après un moment, arrêter l'animation
    setTimeout(() => {
      line.className = '';
      line.style.color = '#00ff00';
    }, 2000);
  }

  // Réponses correctes du quiz
  const correctAnswers = {
    q1: "b", q2: "a", q3: "b", q4: "b", q5: "a",
    q6: "b", q7: "a", q8: "b", q9: "a", q10: "a"
  };

  // Simuler le brute force
  addTerminalText("INITIALISATION DE L'ATTAQUE BRUTE FORCE...");

  setTimeout(() => {
    addTerminalText("ANALYSE DE LA STRUCTURE DU QUIZ...");
  }, 800);

  setTimeout(() => {
    addTerminalText("DÉTECTION DE 10 QUESTIONS...");
  }, 1600);

  setTimeout(() => {
    addTerminalText("DÉMARRAGE DE L'ATTAQUE...");
  }, 2400);

  // Marquer progressivement les bonnes réponses
  let questionIndex = 1;
  const attackInterval = setInterval(() => {
    if (questionIndex <= 10) {
      const correctAnswer = correctAnswers[`q${questionIndex}`];
      const radioBtn = document.querySelector(`input[name="q${questionIndex}"][value="${correctAnswer}"]`);

      if (radioBtn) {
        radioBtn.checked = true;
        radioBtn.parentNode.style.backgroundColor = 'rgba(0, 255, 0, 0.2)';
        addTerminalText(`QUESTION ${questionIndex} CRACKÉE: RÉPONSE = ${correctAnswer}`);
      }

      questionIndex++;
    } else {
      clearInterval(attackInterval);

      addTerminalText("TOUTES LES RÉPONSES ONT ÉTÉ TROUVÉES!");
      addTerminalText("SCORE FORCÉ: 10/10");

      setTimeout(() => {
        addTerminalText("REDIRECTION VERS LA PAGE DE CONTACT...");
      }, 1000);

      // Afficher un bouton pour fermer le terminal et rediriger
      const closeButton = document.createElement('button');
      closeButton.className = 'btn btn-error mt-4 animate__animated animate__pulse animate__infinite';
      closeButton.textContent = 'TERMINER HACK & REDIRIGER';
      closeButton.onclick = function() {
        document.body.removeChild(terminal);
        showTab('contact');
        showConfetti();
        showNotification("Hack réussi! Toutes les réponses ont été trouvées.", "success");
      };
      terminal.appendChild(closeButton);
    }
  }, 600);
}

// S'assurer que le DOM est chargé avant d'initialiser
document.addEventListener('DOMContentLoaded', initPage);
// Génère des pétales de fleur de cerisier (sakura)
const petalColors = [
  "rgba(255,182,193,0.85)",
  "rgba(255,192,203,0.85)",
  "rgba(255,240,245,0.8)"
];
function createPetal() {
  const petal = document.createElement("div");
  petal.className = "petal";
  const size = Math.random() * 12 + 24;
  petal.style.width = size + "px";
  petal.style.height = size + "px";
  petal.style.left = Math.random() * 100 + "vw";
  petal.style.animationDuration = (Math.random() * 3 + 5) + "s";
  petal.style.opacity = Math.random() * 0.5 + 0.5;
  // Forme du pétale en SVG
  petal.innerHTML = `<svg viewBox="0 0 36 36" fill="none"><path d="M18 3 C12 11, 3 16, 18 33 C33 16, 24 11, 18 3 Z" fill="${petalColors[Math.floor(Math.random()*petalColors.length)]}" /></svg>`;
  document.body.appendChild(petal);
  setTimeout(() => petal.remove(), 9000);
}
setInterval(createPetal, 400);
// En créer quelques-uns au départ
for (let i = 0; i < 10; i++) setTimeout(createPetal, i*300);

