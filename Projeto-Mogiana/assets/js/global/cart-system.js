// Sistema de Carrinho de Compras com Integração de Login
class CartSystem {
    constructor() {
        this.cart = [];
        this.currentUser = null;
        this.eventListeners = [];
        this.init();
    }

    init() {
        this.loadUserSession();
        this.loadCart();
        this.updateCartDisplay();
        
        // Aguardar o DOM estar carregado para atualizar a interface
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.updateUserDisplay();
                this.setupStorageListener();
            });
        } else {
            this.updateUserDisplay();
            this.setupStorageListener();
        }
    }

    // Configurar listener para mudanças no localStorage entre abas/páginas
    setupStorageListener() {
        window.addEventListener('storage', (e) => {
            if (e.key === 'guestCart' || e.key?.startsWith('userCart_')) {
                console.log('Mudança detectada no carrinho via storage event');
                this.loadCart();
                this.updateCartDisplay();
            }
        });

        // Listener personalizado para mudanças na mesma aba
        window.addEventListener('cartUpdated', () => {
            console.log('Evento cartUpdated recebido');
            this.loadCart();
            this.updateCartDisplay();
        });
    }

    // Disparar evento personalizado para notificar outras partes da aplicação
    dispatchCartUpdateEvent() {
        const event = new CustomEvent('cartUpdated', {
            detail: {
                cart: this.cart,
                itemCount: this.getCartItemCount(),
                total: this.getCartTotal()
            }
        });
        window.dispatchEvent(event);
    }

    // Gerenciamento de Sessão de Usuário
    loadUserSession() {
        const userData = localStorage.getItem('currentUser');
        if (userData) {
            try {
                this.currentUser = JSON.parse(userData);
                console.log('Usuário carregado do localStorage:', this.currentUser);
            } catch (e) {
                console.error('Erro ao carregar dados do usuário:', e);
                localStorage.removeItem('currentUser');
            }
        }
    }

    setCurrentUser(user) {
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        console.log('Usuário definido:', user);
        this.mergeGuestCartWithUserCart();
        this.updateUserDisplay();
    }

    logout() {
        console.log('Fazendo logout...');
        
        // Salvar carrinho do usuário antes de fazer logout
        if (this.currentUser) {
            this.saveUserCart();
        }
        
        // Limpar sessão do usuário
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        
        // Carregar carrinho de visitante (se existir)
        this.loadGuestCart();
        this.updateCartDisplay();
        this.updateUserDisplay();
        this.dispatchCartUpdateEvent();
    }

    // Gerenciamento do Carrinho
    loadCart() {
        if (this.currentUser) {
            this.loadUserCart();
        } else {
            this.loadGuestCart();
        }
    }

    loadGuestCart() {
        const guestCart = localStorage.getItem('guestCart');
        this.cart = guestCart ? JSON.parse(guestCart) : [];
        console.log('Carrinho de visitante carregado:', this.cart);
    }

    loadUserCart() {
        if (!this.currentUser) return;
        
        const userCartKey = `userCart_${this.currentUser.email}`;
        const userCart = localStorage.getItem(userCartKey);
        this.cart = userCart ? JSON.parse(userCart) : [];
        console.log('Carrinho do usuário carregado:', this.cart);
    }

    saveCart() {
        if (this.currentUser) {
            this.saveUserCart();
        } else {
            this.saveGuestCart();
        }
        this.dispatchCartUpdateEvent();
    }

    saveGuestCart() {
        localStorage.setItem('guestCart', JSON.stringify(this.cart));
        console.log('Carrinho de visitante salvo:', this.cart);
    }

    saveUserCart() {
        if (!this.currentUser) return;
        
        const userCartKey = `userCart_${this.currentUser.email}`;
        localStorage.setItem(userCartKey, JSON.stringify(this.cart));
        console.log('Carrinho do usuário salvo:', this.cart);
    }

    // Mesclagem de Carrinhos
    mergeGuestCartWithUserCart() {
        const guestCart = localStorage.getItem('guestCart');
        if (!guestCart) {
            this.loadUserCart();
            return;
        }

        const guestItems = JSON.parse(guestCart);
        const userCartKey = `userCart_${this.currentUser.email}`;
        const userCart = localStorage.getItem(userCartKey);
        const userItems = userCart ? JSON.parse(userCart) : [];

        console.log('Mesclando carrinhos - Visitante:', guestItems, 'Usuário:', userItems);

        // Mesclar itens: somar quantidades de itens iguais
        const mergedCart = [...userItems];
        
        guestItems.forEach(guestItem => {
            const existingItem = mergedCart.find(item => item.id === guestItem.id);
            if (existingItem) {
                existingItem.quantity += guestItem.quantity;
            } else {
                mergedCart.push(guestItem);
            }
        });

        this.cart = mergedCart;
        this.saveUserCart();
        
        // Limpar carrinho de visitante após mesclagem
        localStorage.removeItem('guestCart');
        console.log('Carrinho mesclado:', this.cart);
        this.updateCartDisplay();
        this.dispatchCartUpdateEvent();
    }

    // Operações do Carrinho
    addItem(item) {
        const existingItem = this.cart.find(cartItem => cartItem.id === item.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ ...item, quantity: 1 });
        }
        
        this.saveCart();
        this.updateCartDisplay();
        this.showAddToCartNotification(item.name);
        console.log('Item adicionado ao carrinho:', item, 'Carrinho atual:', this.cart);
    }

    removeItem(itemId) {
        this.cart = this.cart.filter(item => item.id !== itemId);
        this.saveCart();
        this.updateCartDisplay();
        console.log('Item removido do carrinho:', itemId, 'Carrinho atual:', this.cart);
    }

    updateItemQuantity(itemId, quantity) {
        const item = this.cart.find(cartItem => cartItem.id === itemId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(itemId);
            } else {
                item.quantity = quantity;
                this.saveCart();
                this.updateCartDisplay();
                console.log('Quantidade do item atualizada:', itemId, 'Nova quantidade:', quantity);
            }
        }
    }

    getCartTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getCartItemCount() {
        return this.cart.reduce((count, item) => count + item.quantity, 0);
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartDisplay();
    }

    // Interface do Usuário
    updateCartDisplay() {
        this.updateCartIcon();
        this.updateCartPage();
    }

    updateCartIcon() {
        // Atualizar todos os ícones de carrinho na página
        const cartIcons = document.querySelectorAll('.carrinho, [href="carrinho.html"]');
        const itemCount = this.getCartItemCount();
        
        cartIcons.forEach(cartIcon => {
            if (itemCount > 0) {
                cartIcon.innerHTML = `🛒 (${itemCount})`;
            } else {
                cartIcon.innerHTML = '🛒';
            }
        });

        console.log('Ícone do carrinho atualizado. Contagem:', itemCount);
    }

    updateCartPage() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotalElement = document.getElementById('cart-total');
        
        if (!cartItemsContainer) return;

        cartItemsContainer.innerHTML = '';
        
        if (this.cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
        } else {
            this.cart.forEach(item => {
                const cartItemElement = document.createElement('div');
                cartItemElement.classList.add('cart-item');
                cartItemElement.innerHTML = `
                    <div class="item-info">
                        <img src="${item.image}" alt="${item.name}" class="item-image">
                        <div class="item-details">
                            <h4>${item.name}</h4>
                            <p>R$ ${item.price.toFixed(2)}</p>
                        </div>
                    </div>
                    <div class="item-controls">
                        <button class="quantity-btn" onclick="cartSystem.updateItemQuantity('${item.id}', ${item.quantity - 1})">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="cartSystem.updateItemQuantity('${item.id}', ${item.quantity + 1})">+</button>
                        <button class="remove-btn" onclick="cartSystem.removeItem('${item.id}')">Remover</button>
                    </div>
                    <div class="item-total">
                        R$ ${(item.price * item.quantity).toFixed(2)}
                    </div>
                `;
                cartItemsContainer.appendChild(cartItemElement);
            });
        }
        
        if (cartTotalElement) {
            cartTotalElement.textContent = this.getCartTotal().toFixed(2);
        }
    }

    updateUserDisplay() {
        const authLinks = document.querySelector('.auth-links');
        if (!authLinks) return;

        console.log('Atualizando interface do usuário. Usuário atual:', this.currentUser);

        if (this.currentUser) {
            authLinks.innerHTML = `
                <span>Olá, ${this.currentUser.nome}!</span> | 
                <a href="#" onclick="cartSystem.logout(); return false;">SAIR</a>
                <a href="carrinho.html" class="carrinho">🛒</a>
            `;
        } else {
            authLinks.innerHTML = `
                <a href="cadastro.html">CADASTRE-SE</a> | 
                <a href="login.html">INICIAR SESSÃO</a>
                <a href="carrinho.html" class="carrinho">🛒</a>
            `;
        }
        this.updateCartIcon();
    }

    showAddToCartNotification(itemName) {
        // Remover notificação existente se houver
        const existingNotification = document.querySelector('.cart-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Criar notificação temporária
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `${itemName} adicionado ao carrinho!`;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }

    // Método para sincronizar carrinho entre abas/páginas
    syncCart() {
        this.loadCart();
        this.updateCartDisplay();
    }
}

// Instância global do sistema de carrinho
const cartSystem = new CartSystem();

// Função global para adicionar itens ao carrinho
function addItemToCart(item) {
    cartSystem.addItem(item);
}

// Função para sincronizar carrinho (útil para páginas individuais)
function syncCartDisplay() {
    cartSystem.syncCart();
}

// Listener para sincronizar quando a página ganha foco
window.addEventListener('focus', () => {
    cartSystem.syncCart();
});

// Listener para sincronizar quando a página é carregada
window.addEventListener('load', () => {
    cartSystem.syncCart();
});