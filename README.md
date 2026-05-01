# Kenyan IT Solutions

A modern e-commerce platform for IT products (laptops and accessories) built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Product Catalog** - Browse laptops and IT products with detailed specifications
- **Advanced Filtering** - Filter by category, brand, price range, and more
- **Search Functionality** - Fast search across product names and descriptions
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Modern UI** - Clean interface with Tailwind CSS and Radix UI components
- **Database Integration** - Neon serverless PostgreSQL for product data

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Database**: Neon (PostgreSQL)
- **Icons**: Lucide React

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/kenyan-it-solutions.git

# Navigate to project directory
cd kenyan-it-solutions

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Neon database connection string

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🔧 Environment Variables

Create a `.env.local` file with:

```env
DATABASE_URL=your_neon_database_url
```

## 📁 Project Structure

```
kenyan-it-solutions/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── products/          # Products page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── ProductCard.tsx
│   ├── Filters.tsx
│   └── ...
├── lib/                   # Utility functions
│   ├── db.ts             # Database connection
│   └── products.ts       # Product data logic
├── data/                  # Static data
│   └── products.json
└── public/               # Static assets

```

## 🚀 Deployment

Deploy easily on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Or use:

```bash
npm run build
npm start
```

## 🎯 Roadmap

- [ ] Shopping cart functionality
- [ ] User authentication
- [ ] Payment integration (M-Pesa)
- [ ] Order management
- [ ] Admin dashboard
- [ ] Product reviews and ratings
- [ ] Wishlist feature

## 📝 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, reach out via GitHub issues.

---

Built with ❤️ in Kenya 🇰🇪
