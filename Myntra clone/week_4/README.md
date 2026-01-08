# 🛍️ Myntra Clone - E-Commerce Fashion Website

A fully functional e-commerce website clone inspired by Myntra, India's leading fashion and lifestyle platform. This project demonstrates modern web development practices with a complete shopping experience including product browsing, cart management, wishlist functionality, and detailed product pages.

## 🚀 Live Demo

[Insert your deployment link here - GitHub Pages, Netlify, Vercel, etc.]

## ✨ Features

### 🎯 Core Features

- **Product Catalog**
  - 140+ products across multiple categories (Men, Women, Kids, Home & Living, Beauty)
  - Realistic product images using Unsplash API
  - Product cards with brand, name, price, and discount badges
  - Responsive product grid layout

- **Shopping Cart**
  - Add/remove items from cart
  - Quantity management (increase/decrease)
  - Persistent cart using localStorage
  - Cart sidebar with checkout functionality
  - Real-time cart count badge

- **Wishlist**
  - Add/remove products to wishlist
  - Persistent wishlist storage
  - Wishlist count badge
  - Wishlist sidebar with quick actions
  - Add to cart from wishlist

- **Product Details Page**
  - Detailed product information
  - Size selection (S, M, L, XL, XXL for adults; XS, S, M, L for kids)
  - Color selection with visual swatches
  - Product images with thumbnails
  - Product specifications and description
  - Delivery information

- **Search & Filter**
  - Real-time product search
  - Sort by price (Low to High, High to Low)
  - Sort by discount percentage
  - Category filtering

- **User Interface**
  - Myntra-inspired pink color scheme (#ff3f6c)
  - Responsive design (Mobile, Tablet, Desktop)
  - Smooth animations and transitions
  - Interactive hover effects
  - Modern UI/UX design

- **Navigation**
  - Sticky header navigation
  - Category menu (Men, Women, Kids, Home & Living, Beauty)
  - Mobile hamburger menu
  - Profile dropdown menu
  - Shopping cart and wishlist icons

- **Footer**
  - Online shopping links
  - Customer policies
  - Mobile app download badges
  - Social media links
  - Payment method icons
  - Copyright information

## 💻 Tech Stack

- **HTML5**: Semantic markup for accessibility
- **CSS3**: 
  - Custom CSS variables
  - Flexbox and Grid layouts
  - Responsive media queries
  - Animations and transitions
- **JavaScript (Vanilla)**:
  - DOM manipulation
  - Event handling
  - localStorage for data persistence
  - Dynamic content rendering
- **Font Awesome**: Icons for UI elements
- **Unsplash API**: Product images

## 📂 Project Structure

```
week_4/
├── index.html              # Homepage with product catalog
├── product-detail.html     # Individual product detail page
├── about.html              # About page
├── contact.html            # Contact form page
├── style.css               # Main stylesheet (1730+ lines)
├── script.js               # Main JavaScript file (689+ lines)
├── product-detail.js       # Product detail page functionality
├── images/                 # Image assets folder
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A code editor (VS Code, Sublime Text, etc.)
- Basic knowledge of HTML, CSS, and JavaScript

### Installation

1. **Clone the repository** (if applicable)
   ```bash
   git clone https://github.com/UndefinedSid/dev_arena_intern.git
   cd Myntra clone/week_4/
   ```

2. **Open the project**
   - Simply open `index.html` in your web browser
   - Or use a local development server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (http-server)
     npx http-server
     
     # Using VS Code Live Server extension
     # Right-click index.html > Open with Live Server
     ```

3. **Access the website**
   - Open `http://localhost:8000` in your browser
   - Or directly open `index.html` file

## 📱 Usage Guide

### Browsing Products
1. **Homepage**: View all products in a grid layout
2. **Categories**: Click category cards to filter products
3. **Search**: Use the search bar to find specific products
4. **Sort**: Use the dropdown to sort by price or discount

### Product Details
1. Click on any product card to view details
2. Select size (if applicable)
3. Select color (if applicable)
4. Click "ADD TO BAG" to add to cart
5. Click "WISHLIST" to save for later

### Shopping Cart
1. Click the shopping bag icon in the header
2. View all items in the cart sidebar
3. Adjust quantities using +/- buttons
4. Remove items using "Remove" button
5. Click "Checkout" to complete purchase (demo)

### Wishlist
1. Click the heart icon on product cards or detail page
2. View wishlist by clicking the wishlist icon in header
3. Add items to cart directly from wishlist
4. Remove items from wishlist

### Profile Menu(Fix Later)
1. Click the profile icon in the header
2. Access profile options:
   - My Profile
   - Orders
   - Wishlist
   - Sign In / Sign Up

## 🔧 Key Functions

### Cart Management
- `addToCart(productId)` - Add product to cart
- `removeFromCart(productId)` - Remove product from cart
- `updateQuantity(productId, change)` - Update item quantity
- `updateCart()` - Update cart display and localStorage
- `renderCart()` - Render cart items in sidebar

### Wishlist Management
- `toggleWishlist(productId)` - Add/remove from wishlist
- `updateWishlist()` - Update wishlist display and localStorage
- `renderWishlist()` - Render wishlist items in sidebar

### Product Display
- `renderProducts(productsToRender)` - Render product grid
- `handleSearch(e)` - Filter products by search term
- `handleSort(e)` - Sort products by criteria
- `filterByCategory(category)` - Filter by category

### Product Details
- `loadProductDetails()` - Load product from URL parameter
- `selectSize(size)` - Select product size
- `selectColor(color)` - Select product color
- `addToBagFromDetail()` - Add to cart from detail page

## 📊 Product Data Structure

Each product includes:
```javascript
{
    id: Number,
    brand: String,
    name: String,
    price: Number,
    originalPrice: Number,
    discount: Number,
    category: String, // "men", "women", "kids", "home", "beauty"
    image: String, // URL or emoji
    sizes: Array, // ["S", "M", "L", "XL", "XXL"] or null
    colors: Array, // ["Black", "White", "Red"] or null
    description: String
}
```

## 🎯 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## 🔐 Data Storage

The application uses **localStorage** to persist:
- Shopping cart items
- Wishlist items
- User preferences

Data persists across browser sessions until cleared.

## 🐛 Known Issues / Limitations

- Product images are loaded from external URLs (Unsplash)
- Checkout functionality is a demo (no actual payment processing)
- No backend integration (all data stored in localStorage)
- No user authentication system
- Product reviews not implemented

## 🚀 Future Enhancements

- [ ] User authentication and accounts
- [ ] Backend API integration
- [ ] Payment gateway integration
- [ ] Product reviews and ratings
- [ ] Order tracking system
- [ ] Email notifications
- [ ] Advanced filters (price range, brand, etc.)
- [ ] Product comparison feature
- [ ] Recently viewed products
- [ ] Product recommendations
- [ ] Multi-image product galleries
- [ ] Size guide modal
- [ ] Product zoom functionality

## 📝 Development Notes

### Code Organization
- **HTML**: Semantic structure with proper accessibility
- **CSS**: Modular styling with BEM-like naming conventions
- **JavaScript**: Functional programming approach with clear function names

### Performance Optimizations
- Lazy loading for product images
- Efficient DOM manipulation
- localStorage for client-side caching
- Optimized CSS with minimal reflows

## 🤝 Contributing

This is a learning project. Feel free to:
- Fork the repository
- Submit issues
- Suggest improvements
- Create pull requests

## 📄 License

This project is created for educational purposes as part of a learning curriculum.

## 👨‍💻 Author

Created as part of Week 4 project development.

## 🙏 Acknowledgments

- Design inspiration from Myntra.com
- Unsplash for product images
- Font Awesome for icons
- All the developers who contributed to the web technologies used

---

**Note**: This is a frontend-only clone created for educational purposes. It does not include backend functionality, payment processing, or actual e-commerce operations.
