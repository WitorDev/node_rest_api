const express = require("express");
const app = express();

const methodOverride = require("method-override");

const PORT = 3000;

let products = [
  {
    name: "Banana",
    price: 200,
    id: 1,
  },
  {
    name: "Chinelo",
    price: 2,
    id: 2,
  },
  {
    name: "Cachorro dos Himalaias",
    price: 120,
    id: 3,
  },
  {
    name: "Ônibus Federal do Maranhão",
    price: 15460,
    id: 4,
  },
];

// middleware
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/products", (req, res) => {
  res.render("products", { products });
});

app.get("/produto/:id", (req, res) => {
  let product = products.find((p) => p.id == req.params.id);
  res.render("product", { product });
});

app.post("/produto", (req, res) => {
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

app.delete("/produto/:id", (req, res) => {
  const { id } = req.params;

  products = products.filter((product) => product.id != id);

  res.render("products", { products });
});

app.listen(PORT, () => {
  console.log("Running server in port " + PORT + ".");
  console.log("Link: http://localhost:" + PORT);
});
