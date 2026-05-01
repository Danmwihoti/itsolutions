const sql = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

// Load products data
const productsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/products.json'), 'utf8')
);

// Neon connection
const db = sql(process.env.DATABASE_URL);

async function seedDatabase() {
  console.log('Starting database seed...');

  // Create schema (run schema.sql first)
  // This script assumes schema already exists

  // Clear existing products (optional, comment out to keep existing)
  // await db`TRUNCATE products CASCADE`;
  // console.log('Cleared existing products');

  // Insert products
  for (const product of productsData) {
    await db`
      INSERT INTO products (slug, name, brand, cpu, ram, storage, graphics, touch, condition, price, in_stock, image, specs)
      VALUES (
        ${product.id},
        ${product.name},
        ${product.brand},
        ${product.cpu},
        ${product.ram},
        ${product.storage},
        ${product.graphics},
        ${product.touch},
        ${product.condition},
        ${product.price},
        ${product.inStock},
        ${product.image},
        ${product.specs}
      )
      ON CONFLICT (slug) DO UPDATE SET
        name = EXCLUDED.name,
        price = EXCLUDED.price,
        in_stock = EXCLUDED.in_stock,
        updated_at = CURRENT_TIMESTAMP
    `;
    console.log(`Inserted: ${product.name}`);
  }

  console.log(`✓ Seeded ${productsData.length} products successfully!`);
  process.exit(0);
}

seedDatabase().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});
