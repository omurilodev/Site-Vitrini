document.addEventListener('DOMContentLoaded', function () {
  // 1. Selecionamos os elementos que queremos animar
  const alvos = document.querySelectorAll('.logoFUNDO, .icones');

  // 2. Configuração do observador
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Se o elemento entrou na tela...
        if (entry.isIntersecting) {
          // Adiciona a classe que tem a animação
          entry.target.classList.add('visivel');

          // (Opcional) Para de observar depois que animou a primeira vez
          // Isso evita que a animação rode de novo se o usuário subir e descer a página
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3, // Dispara quando 30% do elemento estiver visível
    },
  );

  // 3. Começa a vigiar cada elemento
  alvos.forEach((alvo) => observer.observe(alvo));
});

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

const slider = document.querySelector('.fundoParceiros');
let isDown = false;
let startX;
let scrollLeft;

// Configurações
const speed = 1; // Velocidade do auto-play (quanto maior, mais rápido)

// Função de Animação Automática (Loop Infinito)
function autoPlay() {
  if (!isDown) {
    // Só roda se o usuário NÃO estiver segurando
    slider.scrollLeft += speed;
    checkInfiniteLoop();
  }
  requestAnimationFrame(autoPlay);
}

// Verifica se precisa "teletransportar" para criar o loop
function checkInfiniteLoop() {
  const maxScroll = slider.scrollWidth / 2; // Metade do conteúdo (pois está duplicado)

  // Se chegou no fim da primeira metade, volta para o começo (0)
  if (slider.scrollLeft >= maxScroll) {
    slider.scrollLeft = 0;
  }
  // Se o usuário arrastou para trás do zero, joga para o meio
  else if (slider.scrollLeft <= 0) {
    slider.scrollLeft = maxScroll;
  }
}

// --- Eventos de Mouse (Arrastar) ---

if (slider) {
  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
  });

  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // O *2 define a sensibilidade do arrasto
    slider.scrollLeft = scrollLeft - walk;
    checkInfiniteLoop();
  });

  // Inicia a animação
  autoPlay();
}

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
