const express = require("express");
const app = express();

const methodOverride = require("method-override");
require("dotenv").config();

let products = require("./data/productsData");

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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
  const { id } = req.params;

  const product = products.find((p) => p.id == id);

  if (!product) {
    return res.status(404).render("message", {
      message: "Produto não encontrado.",
    });
  }

  res.render("product", { product });
});

app.post("/product", (req, res) => {
  const { name, price } = req.body;

  let message = "";
  const formattedPrice = parseFloat(price);

  if (!name || name.trim().length < 1) {
    message = "Nome do produto inválido.";
    return res.status(400).render("message", { message });
  }

  if (isNaN(formattedPrice) || formattedPrice <= 0) {
    message = "Preço deve ser maior que 0.";
    return res.status(400).render("message", { message });
  }

  const newProduct = {
    id: products.length + 1,
    name: name.trim(),
    price: formattedPrice,
  };

  products.push(newProduct);

  return res.status(201).redirect("/products");
});

app.delete("/product/:id", (req, res) => {
  const { id } = req.params;

  const exists = products.some((p) => p.id == id);

  if (!exists) {
    return res.status(404).render("message", {
      message: "Produto não encontrado.",
    });
  }

  products = products.filter((p) => p.id != id);

  res.redirect("/products");
});

app.use((err, req, res, next) => {
  console.error(err.stack);

  if (res.headersSent) return next(err);

  res.status(500).render("message", {
    message: "Erro interno do servidor.",
  });
});

app.listen(PORT, () => {
  console.log(`Running server on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
