const express = require("express");
const app = express();

const methodOverride = require("method-override");
require("dotenv").config();

// data
let products = require("./data/productsData");

// open port
const PORT = process.env.PORT;

// middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("index", { products, query: "" });
});

app.get("/products", (req, res) => {
  res.render("products", { products });
});

app.get("/products/search", (req, res) => {
  const q = req.query.q;

  if (!q || typeof q !== "string") {
    return res.redirect("/");
  }

  const results = products.filter((p) =>
    p.name.toLowerCase().includes(q.toLowerCase()),
  );

  return res.render("index", { products: results, query: q });
});

app.get("/product/:id", (req, res) => {
  let product = products.find((p) => p.id == req.params.id);
  res.render("product", { product });
});

app.post("/product", (req, res) => {
  const { name, price } = req.body;
  const id = products.length;
  let message = "";

  const formattedPrice = parseFloat(price);

  if (name.length < 1) {
    message = "Favor inserir um nome de produto com mais caracteres do que um.";
    return res.render("message", { message });
  }

  if (formattedPrice < 0 || isNaN(formattedPrice)) {
    message = "Favor inserir um valor de produto maior do que 0.";
    return res.render("message", { message });
  }

  products.push({ name, price: formattedPrice, id });

  res.render("products", { products });
});

app.delete("/product/:id", (req, res) => {
  const { id } = req.params;

  products = products.filter((product) => product.id != id);

  res.render("products", { products });
});

// listen method
app.listen(PORT, () => {
  console.log("Running server in port " + PORT + ".");
  console.log("Link: http://localhost:" + PORT);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  if (res.headersSent) return next(err);
  res.status(500).send("Internal Server Error");
});
