const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = 80;

// Create router instance
const router = express.Router();

// PostgreSQL database configuration
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "Challenge",
    password: "12345",
    port: 5432,
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Home Route
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Chezal'); 
    res.render('index', { title: 'Home Page', data: result.rows });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
});

// About Route
router.get('/about', (req, res) => {
  res.render('about', { title: 'About Us' });
});

// Contact Route
router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Us' });
});

// Route to serve the /sayHello endpoint
router.get('/sayHello', (req, res) => {
  res.json({ message: 'Hello User' });
});

// Use router for all routes
app.use('/', router);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
