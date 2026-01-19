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

document.addEventListener("DOMContentLoaded", () => {
  // Configurações do observador
  const options = {
    root: null, // observa em relação à viewport
    rootMargin: '0px',
    threshold: 0.3 // A animação dispara quando 20% da imagem estiver visível
  };

  // Função de callback (o que acontece quando vê o elemento)
  const handleIntersect = (entries, observer) => {
    entries.forEach(entry => {
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
  icones.forEach(img => observer.observe(img));
});