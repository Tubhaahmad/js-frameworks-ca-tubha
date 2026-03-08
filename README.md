# JS Frameworks CA – Online Shop

**Live demo**: [https://js-frameworks-ca-tubha.vercel.app] 

Online shop built with Next.js (App Router) + TypeScript.  
Uses the Noroff Online Shop API to display products, product details, search, cart, checkout success flow, and a validated contact form.

---

## Features

- Product list (grid)
  - Image, title, rating
  - Price with discount handling (original + discounted, strike-through)
  - Discount badge (%) when discounted
- Product details page
  - Fetch by id
  - Tags and reviews when available
  - Add to cart
- Search suggestions on homepage (click to go to product)
- Cart system (persisted)
  - Cart count in header
  - Quantity controls, remove item, total cost
  - Checkout button
- Checkout success page clears cart
- Contact form with TypeScript validation + API route

---

## Tech stack

- React
- Next.js (App Router)
- TypeScript (strict)
- Tailwind CSS
- TanStack Query
- Zustand + persist (localStorage)

---

## Getting started (local)

### 1) Enter the project folder

The Next.js app is inside `js-frameworks-ca/`:

```bash
cd js-frameworks-ca
```

### 2 Install dependencies

```bash
npm install
```

### 3) Run dev server
```bash
npm run dev
```

Open http://localhost:3000 (or the port shown in the terminal).

### Build (production)

```bash
npm run build
```

```bash
npm run start
```

---

### API
Noroff Online Shop API endpoints used:
- GET /online-shop
- GET /online-shop/<id>

---

### AI Usage
- AI usage has been documented in AI_LOG.md according to the assignment rules.

---

### Author
- Tubha Ahmad
