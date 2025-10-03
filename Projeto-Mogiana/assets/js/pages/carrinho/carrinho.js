document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    let cart = [];

    // Função para carregar o carrinho do localStorage
    function loadCart() {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            cart = JSON.parse(storedCart);
        }
        renderCart();
    }

    // Função para salvar o carrinho no localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Função para renderizar os itens do carrinho na página
    function renderCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
        } else {
            cart.forEach(item => {
                const cartItemElement = document.createElement('div');
                cartItemElement.classList.add('cart-item');
                cartItemElement.innerHTML = `
                    <span>${item.name} - R$ ${item.price.toFixed(2)} x ${item.quantity}</span>
                    <button class="remove-item" data-id="${item.id}">Remover</button>
                `;
                cartItemsContainer.appendChild(cartItemElement);
                total += item.price * item.quantity;
            });
        }
        cartTotalElement.textContent = total.toFixed(2);

        // Adicionar event listeners para os botões de remover
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (event) => {
                const itemId = event.target.dataset.id;
                removeItemFromCart(itemId);
            });
        });
    }

    // Função para adicionar item ao carrinho
    window.addItemToCart = (item) => {
        const existingItem = cart.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...item, quantity: 1 });
        }
        saveCart();
        renderCart();
    };

    // Função para remover item do carrinho
    function removeItemFromCart(itemId) {
        cart = cart.filter(item => item.id !== itemId);
        saveCart();
        renderCart();
    }

    // Carregar o carrinho quando a página for carregada
    loadCart();
});
