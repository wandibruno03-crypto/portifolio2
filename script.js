function redirecionarWhatsApp() {
  if (confirm('Site de demonstração! Entre em contato no WhatsApp do programador para mais informações.')) {
    window.open('https://wa.me/5511962759260?text=' + encodeURIComponent('Olá! Vim pelo portfólio e gostaria de mais informações.'), '_blank');
  }
}

/* Menu mobile */
var menuToggle = document.getElementById('menuToggle');
var navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', function() {
  navLinks.classList.toggle('active');
});
document.querySelectorAll('.nav-links a').forEach(function(link) {
  link.addEventListener('click', function() {
    navLinks.classList.remove('active');
  });
});

/* Animação ao scrollar */
function animarScroll() {
  var cards = document.querySelectorAll('.projeto-card');
  for (var i = 0; i < cards.length; i++) {
    var rect = cards[i].getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      cards[i].style.opacity = '1';
      cards[i].style.transform = 'translateY(0)';
    }
  }
}

document.querySelectorAll('.projeto-card').forEach(function(card) {
  card.style.opacity = '0';
  card.style.transform = 'translateY(40px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', animarScroll);
window.addEventListener('load', animarScroll);

/* Header transparente no topo */
window.addEventListener('scroll', function() {
  var header = document.querySelector('header');
  header.style.background = window.scrollY > 50 ? 'rgba(10,10,26,0.98)' : 'rgba(10,10,26,0.95)';
});