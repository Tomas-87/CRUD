const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];
 //todos los usuarios
app.get('/', (req, res) => {
    res.json(usuarios);
});

//usuario por nombre
app.get('/usuarios/:nombre', (req, res) => {
  const usuario = usuarios.find(usu => usu.nombre.toLowerCase() === req.params.nombre.toLowerCase());

  if (!usuario) {
    return res.status(404).json({ ERROR: 'Usuario no encontrado' })
  }
  res.json(usuario);
});


//crear un nuevo usuario
app.post('/usuarios', (req, res) => {
  const { nombre, edad, lugarProcedencia } = req.body;

  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre,
    edad,
    lugarProcedencia,
  };
  usuarios.push(nuevoUsuario);
  res.status(201).json(nuevoUsuario);
});

//actualizar un usuario por nombre
app.put('/usuarios/:nombre', (req, res) => {
  const index = usuarios.findIndex(usu => usu.nombre.toLowerCase() === req.params.nombre.toLowerCase());

  if (index === -1) {
    return res.status(404).json({ ERROR: 'No pudimos encontrar al Usuario'});
    }

    usuarios[index] = {
      ...usuarios[index],
      ...req.body,
    };
    res.json(usuarios[index]);
});

//eliminar usuarios por nombre
app.delete('/usuarios/:nombre', (req, res) => {
  const existe = usuarios.some(usu => usu.nombre.toLowerCase() === req.params.nombre.toLowerCase());

  if (!existe) {
    return res.status(404).json({ ERROR: 'El Usuario no Existe' });
  };

  usuarios = usuarios.filter(usu => usu.nombre.toLowerCase() !== req.params.nombre.toLowerCase());

  res.json({ MENSAJE: 'Se ha Eliminado al Usuario correctamente' });
});

app.listen(PORT, () => {
    console.log(`El servidor escucha en el puerto http://localhost:${PORT}`)
});