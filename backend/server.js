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
  { id: 4, propietarioId: 2, mes: "Febrero", valor: 135000, pagado: false },
  { id: 5, propietarioId: 3, mes: "Enero", valor: 150000, pagado: true },
  { id: 6, propietarioId: 3, mes: "Febrero", valor: 150000, pagado: true },
  { id: 7, propietarioId: 3, mes: "Marzo", valor: 150000, pagado: false },
  { id: 8, propietarioId: 4, mes: "Enero", valor: 100000, pagado: false },
  { id: 9, propietarioId: 4, mes: "Febrero", valor: 100000, pagado: true },
  { id: 10, propietarioId: 4, mes: "Marzo", valor: 100000, pagado: true },
  { id: 11, propietarioId: 5, mes: "Enero", valor: 130000, pagado: true },
  { id: 12, propietarioId: 5, mes: "Febrero", valor: 130000, pagado: false },
  { id: 13, propietarioId: 5, mes: "Marzo", valor: 130000, pagado: true },
  { id: 14, propietarioId: 6, mes: "Enero", valor: 110000, pagado: false },
  { id: 15, propietarioId: 6, mes: "Febrero", valor: 110000, pagado: true },
  { id: 16, propietarioId: 6, mes: "Marzo", valor: 110000, pagado: false },
  { id: 17, propietarioId: 7, mes: "Enero", valor: 125000, pagado: true },
  { id: 18, propietarioId: 7, mes: "Febrero", valor: 125000, pagado: false },
  { id: 19, propietarioId: 7, mes: "Marzo", valor: 125000, pagado: true },
  { id: 20, propietarioId: 8, mes: "Enero", valor: 140000, pagado: true },
  { id: 21, propietarioId: 8, mes: "Febrero", valor: 140000, pagado: false },
  { id: 22, propietarioId: 8, mes: "Marzo", valor: 140000, pagado: true },
  { id: 23, propietarioId: 9, mes: "Enero", valor: 115000, pagado: true },
  { id: 24, propietarioId: 9, mes: "Febrero", valor: 115000, pagado: true },
  { id: 25, propietarioId: 9, mes: "Marzo", valor: 115000, pagado: false },
  { id: 26, propietarioId: 10, mes: "Enero", valor: 105000, pagado: false },
  { id: 27, propietarioId: 10, mes: "Febrero", valor: 105000, pagado: true },
  { id: 28, propietarioId: 10, mes: "Marzo", valor: 105000, pagado: true },
  { id: 29, propietarioId: 11, mes: "Enero", valor: 120000, pagado: true },
  { id: 30, propietarioId: 11, mes: "Febrero", valor: 120000, pagado: false },
  { id: 31, propietarioId: 11, mes: "Marzo", valor: 120000, pagado: true },
  { id: 32, propietarioId: 12, mes: "Enero", valor: 130000, pagado: false },
  { id: 33, propietarioId: 12, mes: "Febrero", valor: 130000, pagado: true },
  { id: 34, propietarioId: 12, mes: "Marzo", valor: 130000, pagado: false },
  { id: 35, propietarioId: 13, mes: "Enero", valor: 140000, pagado: true },
  { id: 36, propietarioId: 13, mes: "Febrero", valor: 140000, pagado: false },
  { id: 37, propietarioId: 13, mes: "Marzo", valor: 140000, pagado: true },
  { id: 38, propietarioId: 14, mes: "Enero", valor: 150000, pagado: true },
  { id: 39, propietarioId: 14, mes: "Febrero", valor: 150000, pagado: true },
  { id: 40, propietarioId: 14, mes: "Marzo", valor: 150000, pagado: false },
  { id: 41, propietarioId: 15, mes: "Enero", valor: 155000, pagado: false },
  { id: 42, propietarioId: 15, mes: "Febrero", valor: 155000, pagado: true },
  { id: 43, propietarioId: 15, mes: "Marzo", valor: 155000, pagado: true },
  { id: 44, propietarioId: 16, mes: "Enero", valor: 160000, pagado: true },
  { id: 45, propietarioId: 16, mes: "Febrero", valor: 160000, pagado: false },
  { id: 46, propietarioId: 16, mes: "Marzo", valor: 160000, pagado: true },
  { id: 47, propietarioId: 17, mes: "Enero", valor: 170000, pagado: true },
  { id: 48, propietarioId: 17, mes: "Febrero", valor: 170000, pagado: false },
  { id: 49, propietarioId: 17, mes: "Marzo", valor: 170000, pagado: true },
  { id: 50, propietarioId: 18, mes: "Enero", valor: 180000, pagado: false },
  { id: 51, propietarioId: 21, mes: "Enero", valor: 200000, pagado: false },
  { id: 52, propietarioId: 21, mes: "Febrero", valor: 200000, pagado: true }
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
    const cuotasProp = cuotas.filter((c) => Number(c.propietarioId) === Number(propietarioId));
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
