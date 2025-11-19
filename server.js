const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

console.log('=== COFFEE SHOP SERVER ===');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/test', (req, res) => {
    console.log('TEST route accessed');
    res.render('test', { message: 'EJS is working!' });
});

app.get('/', (req, res) => {
    console.log('HOME route accessed');
    res.render('index', { 
        title: 'Coffee House'
    });
});

app.get('/menu/:id', (req, res) => {
    console.log('MENU route accessed for branch:', req.params.id);
    
    const menuItems = [
        { 
            product_name: 'Matcha Latte', 
            description: 'Organic ceremonial matcha with oat milk', 
            current_price: 320, 
            category_name: 'Signature' 
        },
        { 
            product_name: 'Cold Brew', 
            description: "Slow-steeped for 16 hours",
            current_price: 280, 
            category_name: 'Classic' 
        }
    ];
    
    res.render('menu', { 
        branch: { branch_name: 'Branch ' + req.params.id },
        menuItems: menuItems 
    });
});

app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).render('error', {
        title: 'Server Error',
    message: "Internal server error occurred"
    });
});
app.listen(PORT, () => {
    console.log('✅ Test:  http://localhost:' + PORT + '/test');
    console.log('✅ Main:  http://localhost:' + PORT + '/');
    console.log('✅ Menu:  http://localhost:' + PORT + '/menu/1');
    console.log('==============================');
});
