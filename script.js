// script.js
document.addEventListener('DOMContentLoaded', function() {
    const inputBusca = document.querySelector('.search-box input');

    if (inputBusca) {
        // Se estivermos no Catálogo.html, faz a busca na hora
        if (window.location.pathname.includes('Cat%C3%A1logo.html') || window.location.pathname.includes('Catálogo.html')) {
            
            // Checa se veio com termo digitado de outra página
            const urlParams = new URLSearchParams(window.location.search);
            const termoUrl = urlParams.get('busca');
            
            if (termoUrl) {
                inputBusca.value = decodeURIComponent(termoUrl);
                filtrarCards(termoUrl);
            }

            inputBusca.addEventListener('input', function() {
                filtrarCards(this.value.trim());
            });

        } else {
            // Se estiver em outra página (Gêneros), redireciona ao apertar Enter
            inputBusca.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const termo = encodeURIComponent(this.value.trim());
                    if (termo !== '') {
                        window.location.href = `Catálogo.html?busca=${termo}`;
                    }
                }
            });
        }
    }
});

function filtrarCards(termo) {
    const cards = document.querySelectorAll('.book-card');
    cards.forEach(card => {
        const texto = card.textContent.toLowerCase();
        card.style.display = texto.includes(termo.toLowerCase()) ? 'block' : 'none';
    });
}