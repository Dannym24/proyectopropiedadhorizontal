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

// Ruta para registrar usuario
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Faltan datos de usuario" });
  }
  users.push({ username, password });
  res.json({ message: "Usuario registrado correctamente" });
});

// Ruta para login de usuario
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ message: "Login exitoso" });
  } else {
    res.status(401).json({ message: "Usuario o contraseña incorrectos" });
  }
});

// Ruta para obtener las propiedades
app.get('/properties', (req, res) => {
  res.json(properties);
});

// Ruta para agregar una propiedad
app.post('/properties', (req, res) => {
    console.log('Recibiendo solicitud POST para agregar propiedad');
    const { name, location } = req.body;
    if (!name || !location) {
      return res.status(400).json({ message: "Faltan datos para la propiedad" });
    }
    const newProperty = {
      id: properties.length + 1, // ID autoincremental
      name,
      location
    };
    properties.push(newProperty);
    res.status(201).json(newProperty); // Responde con la nueva propiedad
  });
  
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
