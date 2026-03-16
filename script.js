document.addEventListener("DOMContentLoaded", function() {
    // 1. Selecionamos o elemento que queremos animar
    const alvo = document.querySelector('.logoFUNDO');

    // 2. Configuração do observador
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Se o elemento entrou na tela...
        if (entry.isIntersecting) {
          // Adiciona a classe que tem a animação
          alvo.classList.add('visivel');
          
          // (Opcional) Para de observar depois que animou a primeira vez
          // Isso evita que a animação rode de novo se o usuário subir e descer a página
          observer.unobserve(alvo);
        }
      });
    }, {
      threshold: 0.5 // Dispara quando 40% do elemento estiver visível
    });

    // 3. Começa a vigiar o elemento
    observer.observe(alvo);
  });


  document.addEventListener("DOMContentLoaded", () => {
  const lista = document.querySelector(".certificacoes");
  
  // Verificação de segurança
  if (!lista) return;

  // Duplica o conteúdo para criar o efeito infinito
  const itens = Array.from(lista.children);
  
  itens.forEach((item) => {
    const clone = item.cloneNode(true);
    clone.setAttribute("aria-hidden", true); // Bom para acessibilidade
    lista.appendChild(clone);
  });

  // Ativa a animação no CSS
  lista.setAttribute("data-animated", true);
});

const slider = document.querySelector('.fundoParceiros');
let isDown = false;
let startX;
let scrollLeft;

// Configurações
const speed = 1; // Velocidade do auto-play (quanto maior, mais rápido)

// Função de Animação Automática (Loop Infinito)
function autoPlay() {
  if (!isDown) { // Só roda se o usuário NÃO estiver segurando
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







const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  // Abre/Fecha o menu e anima o ícone
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Fechar o menu ao clicar em qualquer link
document.querySelectorAll(".itensNAV a").forEach(n => n.addEventListener("click", () => {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}));