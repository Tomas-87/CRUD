const express = require('express');
const app = express();
const PORT = 3100;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; Charset=utf-8');
  next();
})

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

//todos los usuarios y usuarios por nombre
app.get('/usuarios', (req, res) => {
  const { nombre } = req.query;

  if (!nombre) {
    return res.json(usuarios);
  };
  const usuarioFilter = usuarios.filter(n => n.nombre.toLowerCase() === nombre.toLowerCase());

  if (!usuarioFilter.length) {
    return res.status(404).json('No hay usuarios con ese nombre');
  };
  res.json(usuarioFilter);
});

//añadir usuario
app.post('/usuarios', (req, res) => {
  const { nombre, edad, lugarProcedencia } = req.body;
  
  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre,
    edad,
    lugarProcedencia,
  };
  usuarios.push(nuevoUsuario);
  res.status(201).json({
    Mensaje: 'Usuario creado correctamente',
    Usuario: nuevoUsuario
  });
});

//cambiar algo de un usuario
app.put('/usuarios/:nombre', (req, res) => {
  const index = usuarios.findIndex(u => u.nombre.toLowerCase() === req.params.nombre.toLowerCase());
  
  if (index ===- 1) {
    return res.status(404).json({ ERROR: 'Usuario no encontrado'});
  }
  const { edad, lugarProcedencia } = req.body;
  usuarios[index] = {
    ...usuarios[index],
    ...req.body
  };
  res.json(usuarios[index]);
});

//eliminar usuario
app.delete('/usuarios/:id', (req, res) => {
  const { id } = req.body;
  const idNum = Number(id);

  const existe = usuarios.some(s => s.id === idNum);
  if(!existe) {
    return res.status(401).json('El id no existe');
  };
  usuarios = usuarios.filter(d => d.id !== idNum);
  
  res.json('El usuario fue eliminado correctamente');
});


app.listen(PORT, () => {
  console.log(`El servidor esta escuchando en el puerto ${PORT}`);
});
