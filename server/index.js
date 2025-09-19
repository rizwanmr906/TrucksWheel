import express from 'express';
import cors from 'cors';
import pool from './db.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer setup for photo uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// API Routes for Listings

// POST /listings - Add new listing to pending
app.post('/listings', upload.array('photos', 10), async (req, res) => {
  const { vehicle_type, title, description, seller, year, city, kilometers, transmission, brand, fuel_type, car_type, price } = req.body;
  const photos = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];
  try {
    const [result] = await pool.execute(
      'INSERT INTO lightvahical_pending (vehicle_type, title, description, seller, year, city, kilometers, transmission, brand, fuel_type, car_type, photos, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [vehicle_type, title, description, seller, year, city, kilometers, transmission, brand, fuel_type, car_type, JSON.stringify(photos), price]
    );
    res.status(201).json({ id: result.insertId, message: 'Listing added to pending' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add listing' });
  }
});

// GET /listings/pending - Get all pending listings
app.get('/listings/pending', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM lightvahical_pending ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch pending listings' });
  }
});

// GET /heavyvehicle/listings/pending - Get all pending heavy vehicle listings (title and seller only)
app.get('/heavyvehicle/listings/pending', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT id, title, seller FROM heavyvahical_pending ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch heavy vehicle pending listings' });
  }
});

// POST /heavyvehicle/listings/:id/approve - Approve a heavy vehicle listing
app.post('/heavyvehicle/listings/:id/approve', async (req, res) => {
  const { id } = req.params;
  try {
    // Get the listing from heavyvahical_pending
    const [rows] = await pool.execute('SELECT * FROM heavyvahical_pending WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Heavy vehicle listing not found' });
    }
    const listing = rows[0];

    // Insert into heavyvahical_approved
    await pool.execute(
      `INSERT INTO heavyvahical_approved 
      (title, year, city, kilometers, description, photos, price, seller) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [listing.title, listing.year, listing.city, listing.kilometers, listing.description, listing.photos, listing.price, listing.seller]
    );

    // Delete from heavyvahical_pending
    await pool.execute('DELETE FROM heavyvahical_pending WHERE id = ?', [id]);

    res.json({ message: 'Heavy vehicle listing approved' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to approve heavy vehicle listing' });
  }
});

// POST /heavyvehicle/listings/:id/reject - Reject a heavy vehicle listing
app.post('/heavyvehicle/listings/:id/reject', async (req, res) => {
  const { id } = req.params;
  try {
    // Get the listing from heavyvahical_pending
    const [rows] = await pool.execute('SELECT * FROM heavyvahical_pending WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Heavy vehicle listing not found' });
    }
    const listing = rows[0];

    // Insert into heavyvahical_rejected
    await pool.execute(
      `INSERT INTO heavyvahical_rejected 
      (title, year, city, kilometers, description, photos, price, seller) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [listing.title, listing.year, listing.city, listing.kilometers, listing.description, listing.photos, listing.price, listing.seller]
    );

    // Delete from heavyvahical_pending
    await pool.execute('DELETE FROM heavyvahical_pending WHERE id = ?', [id]);

    res.json({ message: 'Heavy vehicle listing rejected' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to reject heavy vehicle listing' });
  }
});

// POST /listings/:id/approve - Approve a listing
app.post('/listings/:id/approve', async (req, res) => {
  const { id } = req.params;
  try {
  // Get the listing from pending
  const [rows] = await pool.execute('SELECT * FROM lightvahical_pending WHERE id = ?', [id]);
  if (rows.length === 0) {
    return res.status(404).json({ error: 'Listing not found' });
  }
  const listing = rows[0];

  // Insert into approved_listings
  await pool.execute(
    'INSERT INTO lightvahical_approved (vehicle_type, title, description, seller, year, city, kilometers, transmission, brand, fuel_type, car_type, photos, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [listing.vehicle_type, listing.title, listing.description, listing.seller, listing.year, listing.city, listing.kilometers, listing.transmission, listing.brand, listing.fuel_type, listing.car_type, listing.photos, listing.price]
  );

  // Delete from pending
  await pool.execute('DELETE FROM lightvahical_pending WHERE id = ?', [id]);

  res.json({ message: 'Listing approved' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to approve listing' });
  }
});

// POST /listings/:id/reject - Reject a listing
app.post('/listings/:id/reject', async (req, res) => {
  const { id } = req.params;
  try {
  // Get the listing from pending
  const [rows] = await pool.execute('SELECT * FROM lightvahical_pending WHERE id = ?', [id]);
  if (rows.length === 0) {
    return res.status(404).json({ error: 'Listing not found' });
  }
  const listing = rows[0];

  // Insert into rejected_listings
  await pool.execute(
    'INSERT INTO lightvahical_rejected (vehicle_type, title, description, seller, year, city, kilometers, transmission, brand, fuel_type, car_type, photos, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [listing.vehicle_type, listing.title, listing.description, listing.seller, listing.year, listing.city, listing.kilometers, listing.transmission, listing.brand, listing.fuel_type, listing.car_type, listing.photos, listing.price]
  );

  // Delete from pending
  await pool.execute('DELETE FROM lightvahical_pending WHERE id = ?', [id]);

  res.json({ message: 'Listing rejected' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to reject listing' });
  }
});

// POST /heavyvehicle/listings - Add new heavy vehicle listing to heavyvahical_pending
app.post('/heavyvehicle/listings', upload.array('photos', 10), async (req, res) => {
  try {
    const { title, year, city, kilometers, description, price, seller } = req.body;
    const photos = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    const [result] = await pool.execute(
      `INSERT INTO heavyvahical_pending 
      (title, year, city, kilometers, description, photos, price, seller) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, year, city, kilometers, description, JSON.stringify(photos), price, seller]
    );

    res.status(201).json({ id: result.insertId, message: 'Heavy vehicle listing added to pending' });
  } catch (error) {
    console.error('Error adding heavy vehicle listing:', error);
    res.status(500).json({ error: 'Failed to add heavy vehicle listing' });
  }
});

// GET /listings/approved - Get all approved listings from both light and heavy tables
app.get('/listings/approved', async (req, res) => {
  try {
    const [lightRows] = await pool.execute('SELECT id, title, price, city, photos, \'light\' as weightClass FROM lightvahical_approved');
    const [heavyRows] = await pool.execute('SELECT id, title, price, city, photos, \'heavy\' as weightClass FROM heavyvahical_approved');
    const combined = [...lightRows, ...heavyRows];
    res.json(combined);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch approved listings' });
  }
});

// Run migrations on startup
(async () => {
  try {
    const migrationPath = path.join(__dirname, 'migrations', 'create_listings_tables.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    // Split SQL into individual statements
    const statements = migrationSQL.split(';').map(stmt => stmt.trim()).filter(stmt => stmt.length > 0);
    for (const statement of statements) {
      if (statement) {
        await pool.execute(statement);
      }
    }
    console.log('Migrations executed successfully');
  } catch (error) {
    console.error('Error running migrations:', error);
  }
})();

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
