const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const PRODUCTS_FILE = path.join(__dirname, 'products.json');

app.use(cors());
app.use(bodyParser.json());

// Helper to read products
const readProducts = () => {
    try {
        const data = fs.readFileSync(PRODUCTS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading products file:', err);
        return {};
    }
};

// Helper to write products
const writeProducts = (products) => {
    try {
        fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf8');
    } catch (err) {
        console.error('Error writing products file:', err);
    }
};

// GET all products
app.get('/api/products', (req, res) => {
    const products = readProducts();
    res.json(products);
});

// POST a new product
app.post('/api/products', (req, res) => {
    const { category, product } = req.body;
    if (!category || !product) {
        return res.status(400).json({ error: 'Category and product data are required' });
    }

    const products = readProducts();
    if (!products[category]) {
        products[category] = [];
    }

    // Assign a new ID
    const allProducts = Object.values(products).flat();
    const maxId = allProducts.reduce((max, p) => Math.max(max, p.id || 0), 0);
    product.id = maxId + 1;

    products[category].push(product);
    writeProducts(products);
    res.status(201).json(product);
});

// DELETE a product
app.delete('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const products = readProducts();
    let found = false;

    for (const category in products) {
        const initialLength = products[category].length;
        products[category] = products[category].filter(p => p.id !== id);
        if (products[category].length !== initialLength) {
            found = true;
        }
    }

    if (found) {
        writeProducts(products);
        res.json({ message: 'Product deleted successfully' });
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
