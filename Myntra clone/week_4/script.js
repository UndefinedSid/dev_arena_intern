// Product Images (hosted, realistic photos)
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80";

const imagePools = {
    men: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ac?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ae?auto=format&fit=crop&w=800&q=80"
    ],
    women: [
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ad?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80"
    ],
    kids: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1470163383681-1f41e1c9a7f4?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1504198266285-165a04f027c1?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1504198458649-3128b932f49b?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80"
    ],
    home: [
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1505691938895-1758d7feb500?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1505691938895-1758d7feb512?auto=format&fit=crop&w=800&q=80"
    ],
    beauty: [
        "https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1522336572468-97b06e8ef143?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc0?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1506617420156-8e4536971651?auto=format&fit=crop&w=800&q=80"
    ]
};

// Helper function to get sizes based on category
function getSizesForCategory(category) {
    if (category === "kids") {
        return ["XS", "S", "M", "L"];
    }
    return ["S", "M", "L", "XL", "XXL"];
}

// Helper function to get colors
function getColorsForProduct(category, type) {
    const commonColors = ["Black", "White", "Navy Blue", "Gray", "Red"];
    const fashionColors = ["Black", "White", "Pink", "Blue", "Red", "Green", "Yellow"];
    if (category === "men") return commonColors;
    if (category === "women") return fashionColors;
    if (category === "kids") return ["Red", "Blue", "Pink", "Yellow", "Green"];
    return ["Black", "White", "Gray"];
}

const baseProducts = [
    { id: 1, brand: "H&M", name: "Men's Casual T-Shirt", price: 599, originalPrice: 999, discount: 40, category: "men", sizes: getSizesForCategory("men"), colors: getColorsForProduct("men", "tshirt"), description: "Comfortable cotton t-shirt perfect for casual wear. Made with 100% cotton for breathability and comfort." },
    { id: 2, brand: "Zara", name: "Women's Floral Dress", price: 1299, originalPrice: 1999, discount: 35, category: "women", sizes: getSizesForCategory("women"), colors: getColorsForProduct("women", "dress"), description: "Beautiful floral print dress perfect for summer occasions. Made with premium fabric for comfort and style." },
    { id: 3, brand: "Nike", name: "Men's Sports Shoes", price: 2999, originalPrice: 4999, discount: 40, category: "men", sizes: ["7", "8", "9", "10", "11"], colors: getColorsForProduct("men", "shoes"), description: "High-performance sports shoes with advanced cushioning and breathable design." },
    { id: 4, brand: "H&M", name: "Women's Denim Jeans", price: 1499, originalPrice: 2499, discount: 40, category: "women", sizes: getSizesForCategory("women"), colors: ["Blue", "Black", "Gray"], description: "Classic denim jeans with perfect fit and comfort. Made with premium denim fabric." },
    { id: 5, brand: "Puma", name: "Kids' T-Shirt", price: 399, originalPrice: 699, discount: 43, category: "kids", sizes: getSizesForCategory("kids"), colors: getColorsForProduct("kids", "tshirt"), description: "Comfortable and fun t-shirt for kids. Made with soft cotton fabric." },
    { id: 6, brand: "Levi's", name: "Men's Blue Jeans", price: 1999, originalPrice: 2999, discount: 33, category: "men", sizes: getSizesForCategory("men"), colors: ["Blue", "Black"], description: "Classic Levi's jeans with authentic fit and premium quality denim." },
    { id: 7, brand: "Forever 21", name: "Women's Summer Top", price: 799, originalPrice: 1299, discount: 38, category: "women", sizes: getSizesForCategory("women"), colors: getColorsForProduct("women", "top"), description: "Stylish summer top perfect for casual outings. Lightweight and comfortable." },
    { id: 8, brand: "Adidas", name: "Men's Track Pants", price: 1799, originalPrice: 2499, discount: 28, category: "men", sizes: getSizesForCategory("men"), colors: getColorsForProduct("men", "pants"), description: "Comfortable track pants ideal for workouts and casual wear." },
    { id: 9, brand: "Zara", name: "Women's Handbag", price: 2499, originalPrice: 3999, discount: 38, category: "women", sizes: null, colors: ["Black", "Brown", "Red", "Pink"], description: "Elegant handbag with spacious compartments. Perfect for everyday use." },
    { id: 10, brand: "H&M", name: "Kids' Denim Shorts", price: 599, originalPrice: 999, discount: 40, category: "kids", sizes: getSizesForCategory("kids"), colors: ["Blue", "Black"], description: "Comfortable denim shorts for kids. Perfect for summer activities." },
    { id: 11, brand: "Nike", name: "Women's Sports Shoes", price: 3499, originalPrice: 4999, discount: 30, category: "women", sizes: ["5", "6", "7", "8", "9"], colors: getColorsForProduct("women", "shoes"), description: "Premium sports shoes designed for women with excellent support and comfort." },
    { id: 12, brand: "Puma", name: "Men's Hoodie", price: 1999, originalPrice: 2999, discount: 33, category: "men", sizes: getSizesForCategory("men"), colors: getColorsForProduct("men", "hoodie"), description: "Warm and comfortable hoodie perfect for casual wear. Made with soft fabric." },
    { id: 13, brand: "Allen Solly", name: "Men's Formal Shirt", price: 1299, originalPrice: 1999, discount: 35, category: "men", sizes: getSizesForCategory("men"), colors: ["White", "Blue", "Gray"], description: "Premium formal shirt perfect for office wear. Crisp and professional look." },
    { id: 14, brand: "Van Heusen", name: "Men's Blazer", price: 3999, originalPrice: 5999, discount: 33, category: "men", sizes: getSizesForCategory("men"), colors: ["Black", "Navy Blue", "Gray"], description: "Elegant blazer for formal occasions. Premium quality fabric and perfect fit." },
    { id: 15, brand: "Reebok", name: "Men's Sneakers", price: 2499, originalPrice: 3999, discount: 38, category: "men", sizes: ["7", "8", "9", "10", "11"], colors: getColorsForProduct("men", "shoes"), description: "Stylish sneakers with modern design and comfortable fit." },
    { id: 16, brand: "Mango", name: "Women's Blazer", price: 2999, originalPrice: 4499, discount: 33, category: "women", sizes: getSizesForCategory("women"), colors: ["Black", "Navy Blue", "Pink"], description: "Chic blazer perfect for professional and casual settings." },
    { id: 17, brand: "H&M", name: "Women's Crop Top", price: 699, originalPrice: 1199, discount: 42, category: "women", sizes: getSizesForCategory("women"), colors: getColorsForProduct("women", "top"), description: "Trendy crop top perfect for summer fashion. Comfortable and stylish." },
    { id: 18, brand: "Zara", name: "Women's Leather Jacket", price: 4999, originalPrice: 7999, discount: 38, category: "women", sizes: getSizesForCategory("women"), colors: ["Black", "Brown"], description: "Premium leather jacket with classic design. Timeless style and quality." },
    { id: 19, brand: "Forever 21", name: "Women's Skirt", price: 899, originalPrice: 1499, discount: 40, category: "women", sizes: getSizesForCategory("women"), colors: getColorsForProduct("women", "skirt"), description: "Elegant skirt perfect for various occasions. Comfortable and fashionable." },
    { id: 20, brand: "Mango", name: "Women's Heels", price: 1999, originalPrice: 3499, discount: 43, category: "women", sizes: ["5", "6", "7", "8", "9"], colors: ["Black", "Red", "Nude"], description: "Stylish heels perfect for formal occasions. Comfortable and elegant." },
    { id: 21, brand: "H&M", name: "Women's Sunglasses", price: 799, originalPrice: 1299, discount: 38, category: "women", sizes: null, colors: ["Black", "Brown", "Blue"], description: "Trendy sunglasses with UV protection. Perfect for sunny days." },
    { id: 22, brand: "Carter's", name: "Kids' Dresses", price: 999, originalPrice: 1699, discount: 41, category: "kids", sizes: getSizesForCategory("kids"), colors: getColorsForProduct("kids", "dress"), description: "Adorable dresses for kids. Comfortable and cute designs." },
    { id: 23, brand: "Gap Kids", name: "Kids' Hoodie", price: 1299, originalPrice: 1999, discount: 35, category: "kids", sizes: getSizesForCategory("kids"), colors: getColorsForProduct("kids", "hoodie"), description: "Warm and cozy hoodie for kids. Perfect for winter season." },
    { id: 24, brand: "Disney", name: "Kids' Backpack", price: 599, originalPrice: 999, discount: 40, category: "kids", sizes: null, colors: ["Red", "Blue", "Pink", "Green"], description: "Fun Disney-themed backpack for kids. Spacious and durable." },
    { id: 25, brand: "Nike Kids", name: "Kids' Sports Shoes", price: 1999, originalPrice: 2999, discount: 33, category: "kids", sizes: ["3", "4", "5", "6", "7"], colors: getColorsForProduct("kids", "shoes"), description: "Comfortable sports shoes for kids. Perfect for active play." },
    { id: 26, brand: "H&M Home", name: "Cotton Bed Sheets", price: 1499, originalPrice: 2499, discount: 40, category: "home", sizes: ["Single", "Double", "Queen", "King"], colors: ["White", "Blue", "Gray", "Pink"], description: "Premium cotton bed sheets for ultimate comfort. Soft and breathable." },
    { id: 27, brand: "Home Centre", name: "Decorative Cushions", price: 799, originalPrice: 1299, discount: 38, category: "home", sizes: null, colors: ["Red", "Blue", "Yellow", "Green", "Pink"], description: "Beautiful decorative cushions to enhance your home decor." },
    { id: 28, brand: "IKEA", name: "Table Lamp", price: 999, originalPrice: 1699, discount: 41, category: "home", sizes: null, colors: ["White", "Black", "Wood"], description: "Modern table lamp perfect for reading and ambiance." },
    { id: 29, brand: "Home Centre", name: "Wall Clock", price: 1299, originalPrice: 1999, discount: 35, category: "home", sizes: null, colors: ["Black", "White", "Wood"], description: "Elegant wall clock to add style to your home." },
    { id: 30, brand: "H&M Home", name: "Curtains Set", price: 2499, originalPrice: 3999, discount: 38, category: "home", sizes: ["Small", "Medium", "Large"], colors: ["White", "Beige", "Gray", "Blue"], description: "Beautiful curtains set to transform your living space." },
    { id: 31, brand: "Lakme", name: "Lipstick Set", price: 599, originalPrice: 999, discount: 40, category: "beauty", sizes: null, colors: ["Red", "Pink", "Nude", "Coral"], description: "Premium lipstick set with long-lasting colors and smooth application." },
    { id: 32, brand: "Maybelline", name: "Foundation", price: 499, originalPrice: 799, discount: 38, category: "beauty", sizes: null, colors: ["Light", "Medium", "Dark"], description: "Flawless foundation for natural-looking coverage." },
    { id: 33, brand: "L'Oreal", name: "Hair Serum", price: 399, originalPrice: 699, discount: 43, category: "beauty", sizes: null, colors: null, description: "Nourishing hair serum for smooth and shiny hair." },
    { id: 34, brand: "MAC", name: "Eyeshadow Palette", price: 1999, originalPrice: 2999, discount: 33, category: "beauty", sizes: null, colors: ["Neutral", "Colorful", "Smoky"], description: "Professional eyeshadow palette with vibrant and blendable colors." },
    { id: 35, brand: "Nykaa", name: "Face Mask Set", price: 699, originalPrice: 1199, discount: 42, category: "beauty", sizes: null, colors: null, description: "Rejuvenating face mask set for glowing skin." },
    { id: 36, brand: "Ray-Ban", name: "Men's Sunglasses", price: 2999, originalPrice: 4999, discount: 40, category: "men", sizes: null, colors: ["Black", "Brown", "Blue"], description: "Classic Ray-Ban sunglasses with UV protection and timeless style." },
    { id: 37, brand: "Tommy Hilfiger", name: "Men's Polo T-Shirt", price: 1799, originalPrice: 2799, discount: 36, category: "men", sizes: getSizesForCategory("men"), colors: getColorsForProduct("men", "tshirt"), description: "Premium polo t-shirt with classic Tommy Hilfiger style." },
    { id: 38, brand: "Calvin Klein", name: "Men's Boxer Briefs", price: 999, originalPrice: 1499, discount: 33, category: "men", sizes: ["S", "M", "L", "XL"], colors: ["Black", "White", "Gray"], description: "Comfortable boxer briefs with premium quality fabric." },
    { id: 39, brand: "Mango", name: "Women's Trench Coat", price: 3999, originalPrice: 5999, discount: 33, category: "women", sizes: getSizesForCategory("women"), colors: ["Beige", "Black", "Navy Blue"], description: "Elegant trench coat perfect for all seasons. Classic and timeless." },
    { id: 40, brand: "H&M", name: "Women's Leggings", price: 599, originalPrice: 999, discount: 40, category: "women", sizes: getSizesForCategory("women"), colors: ["Black", "Gray", "Navy Blue"], description: "Comfortable leggings perfect for workouts and casual wear." }
];

function getImageForCategory(category, index = 0) {
    const pool = imagePools[category] || [];
    if (pool.length === 0) return "";
    return pool[index % pool.length];
}

function generateMoreProducts(startId, count) {
    const templates = [
        { brand: "Nike", name: "Air Max Runner", price: 3299, originalPrice: 4999, discount: 34, category: "men", description: "Premium running shoes with advanced cushioning technology." },
        { brand: "Adidas", name: "Ultraboost Sneakers", price: 3599, originalPrice: 5299, discount: 32, category: "men" },
        { brand: "Levi's", name: "Tapered Fit Jeans", price: 2199, originalPrice: 3299, discount: 33, category: "men" },
        { brand: "Puma", name: "Training Joggers", price: 1499, originalPrice: 2399, discount: 38, category: "men" },
        { brand: "Zara", name: "A-Line Midi Dress", price: 2599, originalPrice: 3999, discount: 35, category: "women" },
        { brand: "H&M", name: "Pleated Skirt", price: 1299, originalPrice: 2099, discount: 38, category: "women" },
        { brand: "Mango", name: "Buttoned Blouse", price: 1499, originalPrice: 2399, discount: 37, category: "women" },
        { brand: "Forever 21", name: "Printed Maxi Dress", price: 1799, originalPrice: 2899, discount: 38, category: "women" },
        { brand: "H&M Kids", name: "Graphic Tee", price: 499, originalPrice: 899, discount: 44, category: "kids" },
        { brand: "Carter's", name: "Striped Romper", price: 899, originalPrice: 1499, discount: 40, category: "kids" },
        { brand: "Disney", name: "Character Hoodie", price: 1199, originalPrice: 1899, discount: 37, category: "kids" },
        { brand: "Gap Kids", name: "Denim Jacket", price: 1599, originalPrice: 2499, discount: 36, category: "kids" },
        { brand: "IKEA", name: "Floor Lamp", price: 1899, originalPrice: 2999, discount: 37, category: "home" },
        { brand: "Home Centre", name: "Side Table", price: 2499, originalPrice: 3999, discount: 38, category: "home" },
        { brand: "H&M Home", name: "Duvet Cover Set", price: 1999, originalPrice: 3299, discount: 39, category: "home" },
        { brand: "Urban Ladder", name: "Wall Shelf", price: 1499, originalPrice: 2499, discount: 40, category: "home" },
        { brand: "MAC", name: "Matte Lipstick", price: 999, originalPrice: 1599, discount: 38, category: "beauty" },
        { brand: "L'Oreal", name: "Hydrating Serum", price: 799, originalPrice: 1299, discount: 38, category: "beauty" },
        { brand: "Maybelline", name: "Waterproof Mascara", price: 599, originalPrice: 999, discount: 40, category: "beauty" },
        { brand: "Clinique", name: "Moisture Surge Cream", price: 1499, originalPrice: 2499, discount: 40, category: "beauty" }
    ];

    const generated = [];
    for (let i = 0; i < count; i++) {
        const template = templates[i % templates.length];
        const cycle = Math.floor(i / templates.length);
        const price = template.price + cycle * 80;
        const originalPrice = template.originalPrice + cycle * 120;
        const discount = Math.round(((originalPrice - price) / originalPrice) * 100);
        generated.push({
            id: startId + i,
            brand: template.brand,
            name: template.name,
            price,
            originalPrice,
            discount,
            category: template.category,
            image: getImageForCategory(template.category, i),
            sizes: template.category === "home" || template.category === "beauty" ? null : getSizesForCategory(template.category),
            colors: template.category === "home" ? null : getColorsForProduct(template.category, template.name),
            description: template.description || `${template.brand} ${template.name} - Premium quality product with excellent design and comfort.`
        });
    }
    return generated;
}

const products = [
    ...baseProducts.map((product, idx) => ({
        ...product,
        image: getImageForCategory(product.category, idx),
        sizes: product.sizes || (product.category !== "home" && product.category !== "beauty" ? getSizesForCategory(product.category) : null),
        colors: product.colors || (product.category !== "home" ? getColorsForProduct(product.category, product.name) : null),
        description: product.description || `${product.brand} ${product.name} - Premium quality product with excellent design and comfort.`
    })),
    ...generateMoreProducts(baseProducts.length + 1, 100)
];

// Cart State
let cart = JSON.parse(localStorage.getItem('myntraCart')) || [];

// Wishlist State
let wishlist = JSON.parse(localStorage.getItem('myntraWishlist')) || [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartCount();
    updateWishlistCount();
    renderWishlist();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    // Cart toggle
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
        closeCart.addEventListener('click', closeCartSidebar);
    }

    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCartSidebar);
    }

    // Search functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }

    // Sort functionality
    const sortFilter = document.getElementById('sort-filter');
    if (sortFilter) {
        sortFilter.addEventListener('change', handleSort);
    }

    // Category filters
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            filterByCategory(category);
        });
    });

    // Mobile menu
    const hamburger = document.getElementById('hamburger');
    const navCategories = document.getElementById('nav-categories');
    if (hamburger && navCategories) {
        hamburger.addEventListener('click', () => {
            navCategories.classList.toggle('active');
        });
    }

    // Form validation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Wishlist toggle
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
        closeWishlist.addEventListener('click', closeWishlistSidebar);
    }

    if (wishlistOverlay) {
        wishlistOverlay.addEventListener('click', closeWishlistSidebar);
    }

    // Profile menu
    const profileIcon = document.getElementById('profile-icon');
    const profileMenu = document.getElementById('profile-menu');

    if (profileIcon && profileMenu) {
        profileIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            profileMenu.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!profileMenu.contains(e.target) && !profileIcon.contains(e.target)) {
                profileMenu.classList.remove('active');
            }
        });
    }

    // Hero \"Shop Now\" button
    const shopBtn = document.querySelector('.shop-btn');
    if (shopBtn) {
        shopBtn.addEventListener('click', () => {
            const productsSection = document.querySelector('.products-section');
            if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// Render Products
function getProductImageMarkup(product) {
    if (product.image && product.image.startsWith('http')) {
        const safeAlt = product.name || 'Product image';
        // Add onerror fallback to avoid broken images
        return `<img src="${product.image}" alt="${safeAlt}" loading="lazy" onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}';">`;
    }
    return product.image || '🛍️';
}

function renderProducts(productsToRender = products) {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;

    if (productsToRender.length === 0) {
        productsGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--myntra-gray);">No products found</div>';
        return;
    }

    productsGrid.innerHTML = productsToRender.map(product => {
        const isInWishlist = wishlist.some(item => item.id === product.id);
        return `
        <div class="product-card" onclick="window.location.href='product-detail.html?id=${product.id}'">
            ${product.discount > 0 ? `<div class="product-badge">${product.discount}% OFF</div>` : ''}
            <button class="wishlist-btn ${isInWishlist ? 'active' : ''}" onclick="event.stopPropagation(); toggleWishlist(${product.id})" title="${isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}">
                <i class="${isInWishlist ? 'fas' : 'far'} fa-heart"></i>
            </button>
            <div class="product-image">
                ${getProductImageMarkup(product)}
            </div>
            <div class="product-info">
                <div class="product-brand">${product.brand}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-price">
                    <span class="price-current">₹${product.price}</span>
                    ${product.originalPrice ? `<span class="price-original">₹${product.originalPrice}</span>` : ''}
                    ${product.discount > 0 ? `<span class="price-discount">(${product.discount}% OFF)</span>` : ''}
                </div>
                <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${product.id})">
                    Add to Bag
                </button>
            </div>
        </div>
    `;
    }).join('');
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
    showNotification(`${product.brand} ${product.name} added to bag!`);
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Update Quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCart();
    }
}

// Update Cart
function updateCart() {
    localStorage.setItem('myntraCart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

// Update Cart Count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// Render Cart
function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.querySelector('.checkout-btn');

    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-bag"></i>
                <p>Your shopping bag is empty</p>
            </div>
        `;
        if (cartTotal) cartTotal.textContent = '0';
        if (checkoutBtn) checkoutBtn.disabled = true;
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">${getProductImageMarkup(item)}</div>
            <div class="cart-item-info">
                <div class="cart-item-brand">${item.brand}</div>
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price}</div>
                <div class="cart-item-actions">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        </div>
    `).join('');

    if (cartTotal) cartTotal.textContent = total.toLocaleString();
    if (checkoutBtn) checkoutBtn.disabled = false;
}

// Close Cart Sidebar
function closeCartSidebar() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    if (cartSidebar) cartSidebar.classList.remove('active');
    if (cartOverlay) cartOverlay.classList.remove('active');
}

// Handle Search
let currentProducts = products;
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        currentProducts = products;
        renderProducts(products);
        return;
    }

    currentProducts = products.filter(product => 
        product.brand.toLowerCase().includes(searchTerm) ||
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );

    renderProducts(currentProducts);
}

// Handle Sort
function handleSort(e) {
    const sortValue = e.target.value;
    let sortedProducts = [...currentProducts];

    switch(sortValue) {
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'discount':
            sortedProducts.sort((a, b) => (b.discount || 0) - (a.discount || 0));
            break;
        default:
            sortedProducts = products;
    }

    renderProducts(sortedProducts);
}

// Filter by Category
function filterByCategory(category) {
    if (category === 'home') {
        currentProducts = products.filter(p => p.category === 'home');
    } else if (category === 'beauty') {
        currentProducts = products.filter(p => p.category === 'beauty');
    } else {
        currentProducts = products.filter(p => p.category === category);
    }
    
    renderProducts(currentProducts);
    
    // Scroll to products section
    const productsSection = document.querySelector('.products-section');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Show Notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: var(--myntra-pink);
        color: white;
        padding: 15px 25px;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        font-weight: 600;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => {
            notification.remove();
            style.remove();
        }, 300);
    }, 2000);
}

// Handle Form Submit
function handleFormSubmit(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
    const name = document.getElementById('name')?.value || '';
    const subject = document.getElementById('subject')?.value || '';

    if (!email || !message || !name || (subject && !subject)) {
        alert('Please fill in all required fields.');
        return;
    }

    alert('Thank you! Your message has been sent. We will get back to you soon.');
    e.target.reset();
}

// Wishlist Functions
function toggleWishlist(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = wishlist.findIndex(item => item.id === productId);
    
    if (existingIndex >= 0) {
        wishlist.splice(existingIndex, 1);
        showNotification(`${product.brand} ${product.name} removed from wishlist`);
        } else {
        wishlist.push({
            ...product,
            addedAt: new Date().toISOString()
        });
        showNotification(`${product.brand} ${product.name} added to wishlist`);
    }

    updateWishlist();
    renderProducts(currentProducts || products);
}

function updateWishlist() {
    localStorage.setItem('myntraWishlist', JSON.stringify(wishlist));
    updateWishlistCount();
    renderWishlist();
}

function updateWishlistCount() {
    const wishlistCount = document.getElementById('wishlist-count');
    if (wishlistCount) {
        const totalItems = wishlist.length;
        wishlistCount.textContent = totalItems;
        wishlistCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function renderWishlist() {
    const wishlistItems = document.getElementById('wishlist-items');
    if (!wishlistItems) return;

    if (wishlist.length === 0) {
        wishlistItems.innerHTML = `
            <div class="empty-wishlist">
                <i class="far fa-heart"></i>
                <p>Your wishlist is empty</p>
            </div>
        `;
        return;
    }

    wishlistItems.innerHTML = wishlist.map(item => `
        <div class="wishlist-item">
            <div class="wishlist-item-image">
                ${getProductImageMarkup(item)}
            </div>
            <div class="wishlist-item-info">
                <div class="wishlist-item-brand">${item.brand}</div>
                <div class="wishlist-item-name">${item.name}</div>
                <div class="wishlist-item-price">₹${item.price}</div>
                <div class="wishlist-item-actions">
                    <button class="add-to-cart-from-wishlist" onclick="addToCartFromWishlist(${item.id})">
                        <i class="fas fa-shopping-bag"></i> Add to Bag
                    </button>
                    <button class="remove-from-wishlist" onclick="removeFromWishlist(${item.id})">
                        <i class="far fa-trash-alt"></i> Remove
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function addToCartFromWishlist(productId) {
    addToCart(productId);
    showNotification('Item added to bag from wishlist!');
}

function removeFromWishlist(productId) {
    const product = wishlist.find(item => item.id === productId);
    if (product) {
        wishlist = wishlist.filter(item => item.id !== productId);
        updateWishlist();
        renderProducts(currentProducts || products);
        showNotification(`${product.brand} ${product.name} removed from wishlist`);
    }
}

function closeWishlistSidebar() {
    const wishlistSidebar = document.getElementById('wishlist-sidebar');
    const wishlistOverlay = document.getElementById('wishlist-overlay');
    if (wishlistSidebar) wishlistSidebar.classList.remove('active');
    if (wishlistOverlay) wishlistOverlay.classList.remove('active');
}

// Checkout
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('checkout-btn')) {
        if (cart.length === 0) {
            alert('Your bag is empty!');
            return;
        }
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        alert(`Order placed successfully! Total: ₹${total.toLocaleString()}\n\nThank you for shopping with Myntra!`);
        
        cart = [];
        updateCart();
        closeCartSidebar();
    }
});

// Initialize cart display
if (document.getElementById('cart-items')) {
    renderCart();
}
