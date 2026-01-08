// Product Detail Page Functionality
let selectedSize = null;
let selectedColor = null;
let currentProduct = null;

// Get product ID from URL
function getProductIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id'));
}

// Load product details
function loadProductDetails() {
    const productId = getProductIdFromURL();
    if (!productId) {
        window.location.href = 'index.html';
        return;
    }

    currentProduct = products.find(p => p.id === productId);
    if (!currentProduct) {
        window.location.href = 'index.html';
        return;
    }

    renderProductDetails();
    updateWishlistButton();
}

// Render product details
function renderProductDetails() {
    if (!currentProduct) return;

    // Set product info
    document.getElementById('product-brand').textContent = currentProduct.brand;
    document.getElementById('product-title').textContent = currentProduct.name;
    document.getElementById('product-price').textContent = `₹${currentProduct.price}`;
    
    if (currentProduct.originalPrice) {
        document.getElementById('product-original-price').textContent = `₹${currentProduct.originalPrice}`;
    } else {
        document.getElementById('product-original-price').style.display = 'none';
    }

    if (currentProduct.discount) {
        document.getElementById('product-discount').textContent = `(${currentProduct.discount}% OFF)`;
    } else {
        document.getElementById('product-discount').style.display = 'none';
    }

    // Set product image
    const mainImage = document.getElementById('product-main-img');
    if (currentProduct.image && currentProduct.image.startsWith('http')) {
        mainImage.src = currentProduct.image;
        mainImage.alt = currentProduct.name;
        mainImage.onerror = function() {
            this.src = FALLBACK_IMAGE;
        };
    } else {
        mainImage.src = FALLBACK_IMAGE;
    }

    // Set thumbnails
    const thumbnailsContainer = document.getElementById('product-thumbnails');
    if (currentProduct.image && currentProduct.image.startsWith('http')) {
        thumbnailsContainer.innerHTML = `
            <div class="thumbnail active" onclick="changeMainImage('${currentProduct.image}')">
                <img src="${currentProduct.image}" alt="Thumbnail">
            </div>
        `;
    }

    // Render sizes
    if (currentProduct.sizes && currentProduct.sizes.length > 0) {
        const sizeSection = document.getElementById('size-section');
        sizeSection.style.display = 'block';
        const sizeOptions = document.getElementById('size-options');
        sizeOptions.innerHTML = currentProduct.sizes.map(size => `
            <button class="size-option" onclick="selectSize('${size}')" data-size="${size}">
                ${size}
            </button>
        `).join('');
    }

    // Render colors
    if (currentProduct.colors && currentProduct.colors.length > 0) {
        const colorSection = document.getElementById('color-section');
        colorSection.style.display = 'block';
        const colorOptions = document.getElementById('color-options');
        colorOptions.innerHTML = currentProduct.colors.map((color, index) => `
            <button class="color-option" onclick="selectColor('${color}')" data-color="${color}" style="background-color: ${getColorHex(color)};" title="${color}">
                ${index === 0 ? '<i class="fas fa-check"></i>' : ''}
            </button>
        `).join('');
        // Select first color by default
        if (currentProduct.colors.length > 0) {
            selectColor(currentProduct.colors[0]);
        }
    }

    // Set product description
    if (currentProduct.description) {
        document.getElementById('product-description').textContent = currentProduct.description;
    }

    // Set specs
    document.getElementById('spec-brand').textContent = currentProduct.brand;
    document.getElementById('spec-category').textContent = currentProduct.category.charAt(0).toUpperCase() + currentProduct.category.slice(1);
}

// Get color hex code
function getColorHex(colorName) {
    const colorMap = {
        'Black': '#000000',
        'White': '#FFFFFF',
        'Navy Blue': '#000080',
        'Gray': '#808080',
        'Red': '#FF0000',
        'Pink': '#FFC0CB',
        'Blue': '#0000FF',
        'Green': '#008000',
        'Yellow': '#FFFF00'
    };
    return colorMap[colorName] || '#CCCCCC';
}

// Select size
function selectSize(size) {
    selectedSize = size;
    
    // Update UI
    document.querySelectorAll('.size-option').forEach(btn => {
        btn.classList.remove('selected');
        if (btn.dataset.size === size) {
            btn.classList.add('selected');
        }
    });

    updateSelectedOptions();
    checkAddToBagEnabled();
}

// Select color
function selectColor(color) {
    selectedColor = color;
    
    // Update UI
    document.querySelectorAll('.color-option').forEach(btn => {
        btn.innerHTML = '';
        if (btn.dataset.color === color) {
            btn.innerHTML = '<i class="fas fa-check"></i>';
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    });

    updateSelectedOptions();
}

// Update selected options display
function updateSelectedOptions() {
    const selectedOptionsDiv = document.getElementById('selected-options');
    const selectedSizeText = document.getElementById('selected-size-text');
    const selectedColorText = document.getElementById('selected-color-text');

    let hasSelection = false;
    let text = '';

    if (selectedSize) {
        text += `Size: ${selectedSize}`;
        hasSelection = true;
    }

    if (selectedColor) {
        if (text) text += ' | ';
        text += `Color: ${selectedColor}`;
        hasSelection = true;
    }

    if (hasSelection) {
        selectedSizeText.textContent = text;
        selectedOptionsDiv.style.display = 'block';
    } else {
        selectedOptionsDiv.style.display = 'none';
    }
}

// Check if add to bag should be enabled
function checkAddToBagEnabled() {
    const addToBagBtn = document.getElementById('add-to-bag-btn');
    if (currentProduct.sizes && currentProduct.sizes.length > 0 && !selectedSize) {
        addToBagBtn.disabled = true;
        addToBagBtn.textContent = 'SELECT SIZE';
    } else {
        addToBagBtn.disabled = false;
        addToBagBtn.innerHTML = '<i class="fas fa-shopping-bag"></i> ADD TO BAG';
    }
}

// Change main image
function changeMainImage(imageUrl) {
    const mainImage = document.getElementById('product-main-img');
    mainImage.src = imageUrl;
    
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
        if (thumb.querySelector('img').src === imageUrl) {
            thumb.classList.add('active');
        }
    });
}

// Add to bag from detail page
function addToBagFromDetail() {
    if (!currentProduct) return;

    if (currentProduct.sizes && currentProduct.sizes.length > 0 && !selectedSize) {
        alert('Please select a size');
        return;
    }

    const productToAdd = {
        ...currentProduct,
        selectedSize: selectedSize,
        selectedColor: selectedColor
    };

    const existingItem = cart.find(item => 
        item.id === productToAdd.id && 
        item.selectedSize === selectedSize && 
        item.selectedColor === selectedColor
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...productToAdd,
            quantity: 1
        });
    }

    updateCart();
    showNotification(`${currentProduct.brand} ${currentProduct.name} added to bag!`);
}

// Toggle wishlist from detail page
function toggleWishlistFromDetail() {
    if (!currentProduct) return;
    toggleWishlist(currentProduct.id);
    updateWishlistButton();
}

// Update wishlist button state
function updateWishlistButton() {
    if (!currentProduct) return;
    const wishlistBtn = document.getElementById('wishlist-detail-btn');
    const isInWishlist = wishlist.some(item => item.id === currentProduct.id);
    
    if (isInWishlist) {
        wishlistBtn.innerHTML = '<i class="fas fa-heart"></i> WISHLISTED';
        wishlistBtn.classList.add('active');
    } else {
        wishlistBtn.innerHTML = '<i class="far fa-heart"></i> WISHLIST';
        wishlistBtn.classList.remove('active');
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProductDetails();
    updateCartCount();
    updateWishlistCount();
    renderCart();
    renderWishlist();
    checkAddToBagEnabled();

    // Add event listeners
    document.getElementById('add-to-bag-btn').addEventListener('click', addToBagFromDetail);
    document.getElementById('wishlist-detail-btn').addEventListener('click', toggleWishlistFromDetail);

    // Setup cart and wishlist sidebars
    const cartIcon = document.getElementById('cart-icon');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCart = document.getElementById('close-cart');

    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            cartSidebar.classList.add('active');
            cartOverlay.classList.add('active');
        });
    }

    if (closeCart) {
        closeCart.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
            cartOverlay.classList.remove('active');
        });
    }

    if (cartOverlay) {
        cartOverlay.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
            cartOverlay.classList.remove('active');
        });
    }

    const wishlistIcon = document.getElementById('wishlist-icon');
    const wishlistSidebar = document.getElementById('wishlist-sidebar');
    const wishlistOverlay = document.getElementById('wishlist-overlay');
    const closeWishlist = document.getElementById('close-wishlist');

    if (wishlistIcon) {
        wishlistIcon.addEventListener('click', () => {
            wishlistSidebar.classList.add('active');
            wishlistOverlay.classList.add('active');
        });
    }

    if (closeWishlist) {
        closeWishlist.addEventListener('click', () => {
            wishlistSidebar.classList.remove('active');
            wishlistOverlay.classList.remove('active');
        });
    }

    if (wishlistOverlay) {
        wishlistOverlay.addEventListener('click', () => {
            wishlistSidebar.classList.remove('active');
            wishlistOverlay.classList.remove('active');
        });
    }
});
