document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.certificacoes-wrapper');
  const lista = document.querySelector('.certificacoes');

  if (!container || !lista) return;

  // Duplica o conteúdo para criar o efeito infinito
  const itens = Array.from(lista.children);
  itens.forEach((item) => {
    const clone = item.cloneNode(true);
    clone.setAttribute('aria-hidden', true);
    lista.appendChild(clone);
  });

  let isDown = false;
  let startX;
  let scrollLeft;
  let animationId;
  let velocity = 1; // Velocidade do auto-play

  // Função de auto-play
  function animate() {
    if (!isDown) {
      container.scrollLeft += velocity;

      // Loop infinito: se chegar na metade (conteúdo original), volta pro zero
      if (container.scrollLeft >= lista.scrollWidth / 2) {
        container.scrollLeft = 0;
      }
    }
    animationId = requestAnimationFrame(animate);
  }

  // Eventos de Mouse
  container.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
    container.style.cursor = 'grabbing';
  });

  container.addEventListener('mouseleave', () => {
    isDown = false;
    container.style.cursor = 'grab';
  });

  container.addEventListener('mouseup', () => {
    isDown = false;
    container.style.cursor = 'grab';
  });

  container.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 2; // O *2 define a sensibilidade
    container.scrollLeft = scrollLeft - walk;

    // Loop infinito no arrasto manual
    if (container.scrollLeft >= lista.scrollWidth / 2) {
      container.scrollLeft = 0;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = 0;
    } else if (container.scrollLeft <= 0) {
      container.scrollLeft = lista.scrollWidth / 2;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = lista.scrollWidth / 2;
    }
  });

  // Suporte para Toque (Mobile)
  container.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });

  container.addEventListener('touchend', () => {
    isDown = false;
  });

  container.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - container.offsetLeft;
    const walk = (x - startX) * 2;
    container.scrollLeft = scrollLeft - walk;

    if (container.scrollLeft >= lista.scrollWidth / 2) {
      container.scrollLeft = 0;
      startX = e.touches[0].pageX - container.offsetLeft;
      scrollLeft = 0;
    } else if (container.scrollLeft <= 0) {
      container.scrollLeft = lista.scrollWidth / 2;
      startX = e.touches[0].pageX - container.offsetLeft;
      scrollLeft = lista.scrollWidth / 2;
    }
  });

  // Inicia a animação automática
  animate();
});

document.addEventListener('DOMContentLoaded', () => {
  // Configurações do observador
  const options = {
    root: null, // observa em relação à viewport
    rootMargin: '0px',
    threshold: 0.3, // A animação dispara quando 20% da imagem estiver visível
  };

  // Função de callback (o que acontece quando vê o elemento)
  const handleIntersect = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Adiciona a classe que ativa o CSS
        entry.target.classList.add('ativo');

        // Para de observar o elemento (para animar apenas uma vez)
        observer.unobserve(entry.target);
      }
    });
  };

  // Cria o observador
  const observer = new IntersectionObserver(handleIntersect, options);

  // Seleciona todas as imagens dentro da classe .icones e manda observar
  const icones = document.querySelectorAll('.icones img');
  icones.forEach((img) => observer.observe(img));
});

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  // Abre/Fecha o menu e anima o ícone
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Fechar o menu ao clicar em qualquer link
document.querySelectorAll('.itensNAV a').forEach((n) =>
  n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  }),
);
