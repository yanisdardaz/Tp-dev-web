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

