const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../database.sqlite');

const initDatabase = async () => {
  try {
    // Drop existing tables
    console.log('Dropping existing tables...');
    await dbAsync.run('DROP TABLE IF EXISTS order_items');
    await dbAsync.run('DROP TABLE IF EXISTS orders');
    await dbAsync.run('DROP TABLE IF EXISTS cart_items');
    await dbAsync.run('DROP TABLE IF EXISTS products');
    await dbAsync.run('DROP TABLE IF EXISTS services');
    await dbAsync.run('DROP TABLE IF EXISTS users');
      
    console.log('Creating tables...');
    // Create users table if it doesn't exist
    await dbAsync.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        reset_pin TEXT,
        reset_pin_expiry DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
      `);

      // Create services table if it doesn't exist
      await dbAsync.run(`
      CREATE TABLE IF NOT EXISTS services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        price REAL,
        image_url TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
      `);

      // Create products table if it doesn't exist
      await dbAsync.run(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        category TEXT NOT NULL,
        price INTEGER NOT NULL,
        image_url TEXT,
        rating REAL DEFAULT 0,
        rating_count INTEGER DEFAULT 0,
        stock INTEGER DEFAULT 20,
        sold INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
      `);

      // Create cart table
      await dbAsync.run(`
      CREATE TABLE IF NOT EXISTS cart_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
      )
      `);

      // Create orders table
      await dbAsync.run(`
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        total_amount INTEGER NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
      `);

      // Create order items table
      await dbAsync.run(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        price_at_time INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES orders(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
      )
      `);

      // Create product ratings table
      await dbAsync.run(`
      CREATE TABLE IF NOT EXISTS product_ratings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        order_id INTEGER NOT NULL,
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        review TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (product_id) REFERENCES products(id),
        FOREIGN KEY (order_id) REFERENCES orders(id),
        UNIQUE(user_id, product_id, order_id)
      )
      `);

      // Create consultation types table
      await dbAsync.run(`
      CREATE TABLE IF NOT EXISTS consultation_types (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
      `);

      // Create design categories table
      await dbAsync.run(`
      CREATE TABLE IF NOT EXISTS design_categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        image_url TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
      `);

      // Create design styles table
      await dbAsync.run(`
      CREATE TABLE IF NOT EXISTS design_styles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        image_url TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
      `);

      // Create consultations table
      await dbAsync.run(`
      CREATE TABLE IF NOT EXISTS consultations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        service_id INTEGER NOT NULL,
        consultation_type_id INTEGER NOT NULL,
        design_category_id INTEGER NOT NULL,
        design_style_id INTEGER NOT NULL,
        consultation_date DATE NOT NULL,
        consultation_time TIME,
        address TEXT,
        notes TEXT,
        status TEXT NOT NULL DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (service_id) REFERENCES services(id),
        FOREIGN KEY (consultation_type_id) REFERENCES consultation_types(id),
        FOREIGN KEY (design_category_id) REFERENCES design_categories(id),
        FOREIGN KEY (design_style_id) REFERENCES design_styles(id)
      )
      `);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Database connected successfully');
    initDatabase().catch(console.error);
  }
});

// Create async wrapper for database initialization
const initializeDb = () => {
  return new Promise((resolve, reject) => {
    db.on('open', resolve);
    db.on('error', reject);
  });
};

// Promisify database operations
const dbAsync = {
  run: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.run(sql, params, function(err) {
        if (err) reject(err);
        else resolve({ lastID: this.lastID, changes: this.changes });
      });
    });
  },
  get: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },
  all: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
};

module.exports = dbAsync;
