const db = require('../config/database');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function waitForTable() {
  for (let i = 0; i < 5; i++) {
    try {
      await db.get('SELECT 1 FROM products LIMIT 1');
      return true;
    } catch (error) {
      console.log('Waiting for products table to be ready...');
      await delay(1000);
    }
  }
  return false;
}

async function seedProducts() {
  try {
    // Wait for database initialization
    const isReady = await waitForTable();
    if (!isReady) {
      throw new Error('Products table not available after waiting');
    }

    console.log('Starting to seed products...');

    // Clear existing products
    await db.run('DELETE FROM products');
    
    // Insert lighting products
    await db.run(
      'INSERT INTO products (name, description, category, price, image_url, stock) VALUES (?, ?, ?, ?, ?, ?)',
      [
        'Philips LED Emergency 7.5W',
        'Lampu LED emergency hemat energi dengan baterai cadangan\n- Power: 7.5W\n- Lumens: 750 lm\n- Durasi Emergency: 3 jam',
        'lighting',
        35000,
        '/images/products/led-emergency.jpg',
        20
      ]
    );

    await db.run(
      'INSERT INTO products (name, description, category, price, image_url, stock) VALUES (?, ?, ?, ?, ?, ?)',
      [
        'Philips Strip Lamp',
        'Lampu strip LED fleksibel untuk dekorasi dan pencahayaan ambient\nTersisa 20 pcs',
        'lighting',
        500000,
        '/images/products/strip-lamp.jpg',
        20
      ]
    );

    await db.run(
      'INSERT INTO products (name, description, category, price, image_url, stock) VALUES (?, ?, ?, ?, ?, ?)',
      [
        'Philips Pendant Light',
        'Lampu gantung modern dengan desain elegan\nTersisa 20 pcs',
        'lighting',
        1000000,
        '/images/products/pendant-light.jpg',
        20
      ]
    );

    // Insert furniture products
    await db.run(
      'INSERT INTO products (name, description, category, price, image_url, stock) VALUES (?, ?, ?, ?, ?, ?)',
      [
        'Wasteful fish Marmer',
        'Meja marmer premium dengan desain eksklusif\nTersisa 20 pcs',
        'furniture',
        8700000,
        '/images/products/marble-table.jpg',
        20
      ]
    );

    await db.run(
      'INSERT INTO products (name, description, category, price, image_url, stock) VALUES (?, ?, ?, ?, ?, ?)',
      [
        'Meja Kayu 44x66x66 cm',
        'Meja kayu solid dengan ukuran 44x66x66 cm\nTersisa 20 pcs',
        'furniture',
        450000,
        '/images/products/wooden-table.jpg',
        20
      ]
    );

    console.log('Products seeded successfully');
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

// Run the seed function
seedProducts();
