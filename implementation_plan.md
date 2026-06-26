# Implementation Plan - A TO Z PLUGINS Frontend Clone

We will clone the frontend of the A TO Z PLUGINS website and rebuild it using React, Vite, and custom CSS. The clone will match the visual appearance, typography, colors, animations, and transitions of the original website with pixel-perfect accuracy.

## Proposed Architecture

Since this is a frontend-only migration, we will build a Single Page Application (SPA) with a custom React router (state-based page navigation) to manage pages smoothly. We will use a global state (React Context) to manage the Shopping Cart, user session state, toast notifications, and support chat.

### Component Structure

```
src/
├── assets/             # Placeholders or downloaded local SVGs/icons
├── components/
│   ├── Announcement.jsx # Announcement banner with countdown timer
│   ├── Header.jsx      # Sticky responsive navigation bar with hamburger menu
│   ├── Footer.jsx      # Footer with logo and copyright info
│   ├── ProductCard.jsx # Reusable product card (glow border, hover effects)
│   ├── RequestModal.jsx# "+ Request Plugin" floating button modal
│   ├── SupportChat.jsx # Floating support chat bubble and widget
│   ├── Toast.jsx       # Alert toasts (Add to cart & WIP toast)
│   └── VideoEmbed.jsx  # Responsive iframe embed for installation guide
├── context/
│   └── AppContext.jsx  # Global state for Cart, User, Active page, Chat, and Modal
├── pages/
│   ├── Home.jsx        # Landing page with hero section & featured products
│   ├── DAW.jsx         # DAW page with Windows/Mac tabs & products
│   ├── VST.jsx         # VST page with Windows/Mac tabs & products
│   ├── Samples.jsx     # Sample packs catalog
│   ├── Courses.jsx     # Music production courses listing
│   ├── Lottery.jsx     # Lottery / giveaway page with progress bar & timer
│   ├── Cart.jsx        # Cart page with item list, coupon banner & checkout transition
│   ├── About.jsx       # About Us details in a glass-card
│   ├── Login.jsx       # Log In form
│   └── Register.jsx    # Sign Up form
├── App.jsx             # Main router and layout orchestrator
├── main.jsx            # React entrypoint
└── index.css           # Styling variables and base styles (exact copy of original CSS)
```

## Proposed Changes

### [NEW] [index.css](file:///d:/Plug-in/src/index.css)
We will replicate the global styles from the original `/css/style.css`.
Key design tokens to maintain:
- Fonts: `DM Sans`
- Colors:
  - `--bg-color`: `#080808`
  - `--surface-color`: `#111111`
  - `--card-color`: `#181818`
  - `--accent-cyan`: `#00F5FF`
  - `--accent-green`: `#39FF14`
  - Glow effects (e.g. `.text-glow`, `.glass-card` hover shadow)

### [NEW] [AppContext.jsx](file:///d:/Plug-in/src/context/AppContext.jsx)
Manages:
- `cart`: Array of items in the cart
- `activePage`: Current page router string (e.g. `'home'`, `'daw'`, `'vst'`, `'samples'`, `'courses'`, `'lottery'`, `'cart'`, `'about'`, `'login'`, `'register'`, `'product/:id'`)
- `requestModalOpen`: Boolean for opening the floating plugin request form
- `chatOpen`: Boolean for opening the support chat window
- `isLoggedIn`: Boolean indicating if user is simulated as logged in
- `reviews`: State containing user reviews per product, allowing users to submit new reviews in the UI.

### [NEW] [App.jsx](file:///d:/Plug-in/src/App.jsx)
Includes:
- Sticky header, announcement bar, request plugin floating button, support chat widget, and WIP toast.
- State-based router switching between page components.

### [NEW] [Home.jsx](file:///d:/Plug-in/src/pages/Home.jsx)
Replicates the home page:
- Radial gradient background for hero section.
- Featured products grid showing FL Studio 25, Ableton Live 12, Logic Pro X, Serum, FabFilter Pro-Q, and sounds of KSHMR VOL 2.

### [NEW] [DAW.jsx](file:///d:/Plug-in/src/pages/DAW.jsx) & [VST.jsx](file:///d:/Plug-in/src/pages/VST.jsx)
Features:
- Windows / Mac selector tabs.
- Warnings for Mac installers.
- Grid of corresponding products.

### [NEW] [Samples.jsx](file:///d:/Plug-in/src/pages/Samples.jsx) & [Courses.jsx](file:///d:/Plug-in/src/pages/Courses.jsx)
Grid layout displaying corresponding packs and mastering courses.

### [NEW] [Lottery.jsx](file:///d:/Plug-in/src/pages/Lottery.jsx)
Recreates:
- AKG K72 headphones giveaway card.
- Live progress bar showing `10 / 1000` members joined.
- Real-time countdown timer.
- Web Share API trigger.

### [NEW] [Cart.jsx](file:///d:/Plug-in/src/pages/Cart.jsx)
Features:
- Bundle Discount Active banner with a 30:00 countdown timer.
- List of items added to cart.
- Dynamic calculation of 30% bundle discount when 4 or more products are in the cart.
- Checkout redirect to a simulated payment/delivery success state.

### [NEW] [Login.jsx](file:///d:/Plug-in/src/pages/Login.jsx) & [Register.jsx](file:///d:/Plug-in/src/pages/Register.jsx)
Clean forms for authentication, simulating logins to unlock chat support and write reviews.

## Verification Plan

### Automated Verification
- Run Vite local development server (`npm run dev`) and ensure it builds correctly without errors.

### Manual Verification
- Test responsive breakpoints (mobile, tablet, desktop) on the local server.
- Test active page routing, tabs, countdown timers, floating request modal, and cart functionality (adding 4+ items and verifying the 30% discount).
