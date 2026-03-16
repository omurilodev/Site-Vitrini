document.addEventListener("DOMContentLoaded", function() {
        
        // Configurações do observador
        const observerOptions = {
            root: null, // observa em relação à viewport
            rootMargin: '0px',
            threshold: 0.15 // Dispara quando 15% do elemento estiver visível
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Adiciona a classe que faz a animação
                    entry.target.classList.add('aparecer');
                    
                    // Para de observar o elemento depois que ele já apareceu (performance)
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Seleciona todos os itens do grid para serem observados
        const items = document.querySelectorAll('.grid-item');
        items.forEach(item => {
            observer.observe(item);
        });
    });


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