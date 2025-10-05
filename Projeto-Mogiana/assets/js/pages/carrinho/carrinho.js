document.addEventListener('DOMContentLoaded', () => {
    // Aguardar o cartSystem estar disponível
    if (typeof cartSystem === 'undefined') {
        console.error('cartSystem não está disponível');
        return;
    }

    // Adicionar funcionalidade ao botão de finalizar compra
    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            // Obter carrinho do sistema global
            const cart = cartSystem.cart;
            
            if (cart.length === 0) {
                alert('Seu carrinho está vazio!');
                return;
            }
            
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (!currentUser) {
                alert('Você precisa estar logado para finalizar a compra.');
                window.location.href = 'login.html';
                return;
            }
            
            // Calcular total
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            // Finalizar compra usando a função do pedidos.js
            if (window.finalizarCompra && window.finalizarCompra(cart, total)) {
                alert('Compra finalizada com sucesso! Você pode acompanhar seu pedido na página de Pedidos.');
                
                // Limpar carrinho usando o sistema global
                cartSystem.clearCart();
                
                // Redirecionar para página de pedidos
                setTimeout(() => {
                    window.location.href = 'pedidos.html';
                }, 1500);
            }
        });
    }
});