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



