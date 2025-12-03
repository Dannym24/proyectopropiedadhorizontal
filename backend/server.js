const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

/* ==========================
   BASE DE DATOS EN MEMORIA
========================== */
let users = [];
let properties = [
  { id: 1, name: "Apartamento A", location: "Ciudad 1" },
  { id: 2, name: "Apartamento B", location: "Ciudad 2" },
];
let solicitudes = [];
let cuotas = [
  { id: 1, propietarioId: 1, mes: "Enero", valor: 120000, pagado: false },
  { id: 2, propietarioId: 1, mes: "Febrero", valor: 120000, pagado: true },
  { id: 3, propietarioId: 2, mes: "Enero", valor: 135000, pagado: true },
];

/* ==========================
   RUTA PRINCIPAL
========================== */
app.get("/", (req, res) => {
  res.send("Backend funcionando");
});

/* ==========================
   USUARIOS
========================== */
// Registrar usuario con rol
app.post("/register", (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role)
    return res.status(400).json({ message: "Faltan datos de usuario" });

  users.push({ username, password, role, id: users.length + 1 });
  res.json({ message: "Usuario registrado correctamente" });
});

// Login con rol y propietarioId
// Login con rol y propietarioId
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    console.log('Login exitoso:', {
      username: user.username,
      role: user.role,
      propietarioId: user.role !== 'admin' ? user.id : null, // No enviar propietarioId si es admin
    });
    res.json({
      message: "Login exitoso",
      username: user.username,
      role: user.role,
      propietarioId: user.role !== 'admin' ? user.id : null, // Solo enviar propietarioId si no es admin
    });
  } else {
    res.status(401).json({ message: "Usuario o contraseña incorrectos" });
  }
});


/* ==========================
   PROPIEDADES
========================== */
app.get("/properties", (req, res) => {
  res.json(properties);
});

app.post("/properties", (req, res) => {
  const { name, location } = req.body;

  if (!name || !location)
    return res.status(400).json({ message: "Faltan datos para la propiedad" });

  const newProperty = { id: properties.length + 1, name, location };
  properties.push(newProperty);
  res.status(201).json(newProperty);
});

/* ==========================
   SOLICITUDES / PQRS
========================== */
// Obtener solicitudes según rol
app.get("/solicitudes/:propietarioId", (req, res) => {
  const { propietarioId } = req.params;

  if (propietarioId) {
    // Filtra las solicitudes según el propietarioId
    const filtered = solicitudes.filter((s) => s.propietarioId == propietarioId);
    res.json(filtered);
  } else {
    // Devuelve todas las solicitudes si no se pasa propietarioId
    res.json(solicitudes);
  }
});

app.post("/solicitudes", (req, res) => {
  const { propietarioId, tipo, mensaje } = req.body;

  if (!propietarioId || !tipo || !mensaje)
    return res.status(400).json({ message: "Faltan datos en la solicitud" });

  const nuevaSolicitud = {
    id: Date.now(),
    propietarioId,
    tipo,
    mensaje,
    fecha: new Date().toISOString(),
    estado: "Pendiente",
  };

  solicitudes.push(nuevaSolicitud);
  res.json({ message: "Solicitud enviada correctamente", solicitud: nuevaSolicitud });
});

/* ==========================
   CUOTAS DE ADMINISTRACIÓN
========================== */
app.get("/cuotas/:propietarioId", (req, res) => {
  const { propietarioId } = req.params;
  console.log("propietarioId recibido:", propietarioId); // Verifica el propietarioId recibido

  if (propietarioId) {
    const cuotasProp = cuotas.filter((c) => c.propietarioId == propietarioId);
    console.log("Cuotas filtradas:", cuotasProp); // Verifica las cuotas filtradas
    res.json(cuotasProp);
  } else {
    res.json(cuotas);
  }
});


/* ==========================
   INICIAR SERVIDOR
========================== */
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
