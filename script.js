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
setTimeout(function() {
  if (!isCarousel) {
    document.querySelectorAll('.projeto-card').forEach(function(card) {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    });
  }
}, 800);

/* Header */
window.addEventListener('scroll', function() {
  var header = document.querySelector('header');
  header.style.background = window.scrollY > 50 ? 'rgba(10,10,15,0.98)' : 'rgba(10,10,15,0.95)';
});

/* Carrossel Leque - projetos */
var carouselTrack = document.querySelector('.projetos-grid');
var cards = document.querySelectorAll('.projeto-card');
var currentCard = 0;
var isCarousel = false;

function initCarousel() {
  if (window.innerWidth <= 768 || isCarousel) return;
  isCarousel = true;

  carouselTrack.innerHTML = '';
  var wrapper = document.createElement('div');
  wrapper.className = 'leque-wrapper';
  wrapper.style.cssText = 'position:relative;width:100%;height:450px;overflow:hidden;perspective:1000px;cursor:grab;';

  cards.forEach(function(card, i) {
    card.style.opacity = '1';
    card.style.transform = '';
    card.style.transition = 'all 0.6s cubic-bezier(0.25,1,0.5,1)';
    card.style.position = 'absolute';
    card.style.width = '500px';
    card.style.left = '50%';
    card.style.marginLeft = '-250px';
    wrapper.appendChild(card);
  });

  carouselTrack.appendChild(wrapper);

  lequeGoTo(0);
  setInterval(function() { lequeMove(1); }, 3000);

  /* Drag com mouse */
  var dragStart = 0;
  var dragging = false;
  wrapper.addEventListener('mousedown', function(e) {
    dragging = true;
    dragStart = e.clientX;
    wrapper.style.cursor = 'grabbing';
  });
  wrapper.addEventListener('mousemove', function(e) {
    if (!dragging) return;
    e.preventDefault();
  });
  wrapper.addEventListener('mouseup', function(e) {
    if (!dragging) return;
    dragging = false;
    wrapper.style.cursor = 'grab';
    var diff = e.clientX - dragStart;
    if (Math.abs(diff) > 50) {
      lequeMove(diff < 0 ? 1 : -1);
    }
  });
  wrapper.addEventListener('mouseleave', function() {
    dragging = false;
    wrapper.style.cursor = 'grab';
  });

  /* Drag com touch */
  wrapper.addEventListener('touchstart', function(e) {
    dragStart = e.touches[0].clientX;
  }, { passive: true });
  wrapper.addEventListener('touchend', function(e) {
    var diff = e.changedTouches[0].clientX - dragStart;
    if (Math.abs(diff) > 50) {
      lequeMove(diff < 0 ? 1 : -1);
    }
  });
}

function lequeGoTo(index) {
  if (index < 0) index = cards.length - 1;
  if (index >= cards.length) index = 0;
  currentCard = index;

  for (var i = 0; i < cards.length; i++) {
    var diff = i - currentCard;
    if (diff > cards.length / 2) diff -= cards.length;
    if (diff < -cards.length / 2) diff += cards.length;

    var card = cards[i];
    if (diff === 0) {
      card.style.transform = 'translateX(0) scale(1) rotateY(0)';
      card.style.opacity = '1';
      card.style.zIndex = '10';
      card.style.filter = 'none';
    } else if (Math.abs(diff) === 1) {
      card.style.transform = 'translateX(' + (diff * 380) + 'px) scale(0.85) rotateY(' + (diff * -15) + 'deg)';
      card.style.opacity = '0.6';
      card.style.zIndex = '5';
      card.style.filter = 'blur(1px)';
    } else {
      card.style.transform = 'translateX(' + (diff * 280) + 'px) scale(0.7) rotateY(' + (diff * -20) + 'deg)';
      card.style.opacity = '0';
      card.style.zIndex = '1';
      card.style.filter = 'blur(3px)';
    }
  }
}

function lequeMove(dir) {
  lequeGoTo(currentCard + dir);
}

if (window.innerWidth > 768) { initCarousel(); }
window.addEventListener('load', initCarousel);
window.addEventListener('resize', function() {
  if (isCarousel && window.innerWidth > 768) {
    location.reload();
  } else if (window.innerWidth <= 768 && isCarousel) {
    location.reload();
  }
});
