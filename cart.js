document.addEventListener('DOMContentLoaded', () => {
    // Inject Cart HTML into the body
    const cartHTML = `
        <div id="cart-drawer-overlay" class="cart-overlay"></div>
        <div id="cart-drawer" class="cart-drawer">
            <div class="cart-header">
                <h2>Your Cart</h2>
                <button id="close-cart-btn" class="close-btn"><span class="material-symbols-outlined">close</span></button>
            </div>
            <div id="cart-items-container" class="cart-items">
                <!-- Items will be injected here -->
            </div>
            <div class="cart-footer">
                <div class="cart-total">
                    <span>Subtotal</span>
                    <span id="cart-subtotal">$0.00</span>
                </div>
                <button id="checkout-btn" class="checkout-btn">CHECKOUT</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', cartHTML);

    // Elements
    const cartIconBtn = document.getElementById('cart-icon-btn');
    const cartOverlay = document.getElementById('cart-drawer-overlay');
    const cartDrawer = document.getElementById('cart-drawer');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const checkoutBtn = document.getElementById('checkout-btn');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartBadge = document.getElementById('cart-badge');
    const cartSubtotal = document.getElementById('cart-subtotal');

    // State
    let cart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');

    // UI Logic
    function openCart() {
        cartDrawer.classList.add('open');
        cartOverlay.classList.add('open');
        renderCart();
    }

    function closeCart() {
        cartDrawer.classList.remove('open');
        cartOverlay.classList.remove('open');
    }

    if (cartIconBtn) {
        cartIconBtn.addEventListener('click', openCart);
    }
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    checkoutBtn.addEventListener('click', () => {
        alert('Checkout not implemented yet!');
    });

    // Cart Logic
    function saveCart() {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        updateBadge();
        renderCart();
    }

    function updateBadge() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartBadge) {
            cartBadge.textContent = totalItems;
            cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }

    function renderCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart">Your cart is empty.</div>';
        } else {
            cart.forEach((item, index) => {
                const itemPrice = parseFloat(item.price.replace(/[^0-9.]/g, ''));
                total += itemPrice * item.quantity;

                // Format options string
                let optionsHtml = '';
                if (item.options && Object.keys(item.options).length > 0) {
                    const opts = Object.entries(item.options).map(([k, v]) => `${k}: ${v}`).join(', ');
                    optionsHtml = `<div class="cart-item-options">${opts}</div>`;
                }

                const itemHtml = `
                    <div class="cart-item">
                        <img src="${item.img}" alt="${item.name}" class="cart-item-img">
                        <div class="cart-item-details">
                            <h4>${item.name}</h4>
                            <div class="cart-item-price">${item.price}</div>
                            ${optionsHtml}
                            <div class="cart-item-controls">
                                <button class="qty-btn" onclick="updateCartQuantity(${index}, -1)">-</button>
                                <span>${item.quantity}</span>
                                <button class="qty-btn" onclick="updateCartQuantity(${index}, 1)">+</button>
                                <button class="remove-btn" onclick="removeFromCart(${index})"><span class="material-symbols-outlined">delete</span></button>
                            </div>
                        </div>
                    </div>
                `;
                cartItemsContainer.insertAdjacentHTML('beforeend', itemHtml);
            });
        }
        cartSubtotal.textContent = '$' + total.toFixed(2);
    }

    // Expose functions globally so product.html and inline onclicks can use them
    window.updateCartQuantity = function(index, change) {
        if (cart[index]) {
            cart[index].quantity += change;
            if (cart[index].quantity <= 0) {
                cart.splice(index, 1);
            }
            saveCart();
        }
    };

    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        saveCart();
    };

    window.addToCart = function(productDetails) {
        // Create a unique hash based on name and selected options
        const optionsStr = productDetails.options ? JSON.stringify(productDetails.options) : '';
        const itemIdentifier = productDetails.name + optionsStr;

        const existingItemIndex = cart.findIndex(item => {
            const existingOptionsStr = item.options ? JSON.stringify(item.options) : '';
            return (item.name + existingOptionsStr) === itemIdentifier;
        });

        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({
                ...productDetails,
                quantity: 1
            });
        }
        saveCart();
        openCart();
    };

    // Hamburger Menu Logic
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Initial render
    updateBadge();
});
