const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let users = [];
let properties = [
  { id: 1, name: "Apartamento A", location: "Ciudad 1" },
  { id: 2, name: "Apartamento B", location: "Ciudad 2" }
];

app.get('/', (req, res) => {
  res.send('Backend funcionando');
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  users.push({ username, password });
  res.json({ message: "Usuario registrado correctamente" });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if(user) {
    res.json({ message: "Login exitoso" });
  } else {
    res.status(401).json({ message: "Usuario o contraseña incorrectos" });
  }
});

app.get('/properties', (req, res) => {
  res.json(properties);
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
