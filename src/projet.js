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

