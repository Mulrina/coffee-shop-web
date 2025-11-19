const express = require("express");
const path = require("path");
require("dotenv").config();
const db = require("./config/database");

const app = express();
const PORT = process.env.PORT || 3000;

console.log("=== COFFEE SHOP SERVER ===");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", async (req, res) => {
    try {
        const branches = await db.query("SELECT * FROM branches");
        res.render("index", { 
            title: "Coffee Shop",
            branches: branches.rows
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Server error: " + err.message);
    }
});

app.get("/menu/:id", async (req, res) => {
    try {
        const branchId = req.params.id;
        const branchResult = await db.query("SELECT * FROM branches WHERE branch_id = $1", [branchId]);
        
        if (branchResult.rows.length === 0) {
            return res.status(404).send("Branch not found");
        }

        const menuResult = await db.query("SELECT * FROM products");
        
        res.render("menu", { 
            branch: branchResult.rows[0],
            menuItems: menuResult.rows,
            title: "Menu"
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Server error: " + err.message);
    }
});
app.get("/api/test", async (req, res) => {
    try {
        const result = await db.query("SELECT NOW() as time");
        res.json({ status: "OK", time: result.rows[0].time });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/api/info", async (req, res) => {
    try {
        const branches = await db.query("SELECT COUNT(*) as count FROM branches");
        const products = await db.query("SELECT COUNT(*) as count FROM products");
        res.json({
            branches: branches.rows[0].count,
            products: products.rows[0].count
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log("Server: http://localhost:" + PORT);
    console.log("Menu: http://localhost:" + PORT + "/menu/1");
    console.log("API: http://localhost:" + PORT + "/api/info");
});
