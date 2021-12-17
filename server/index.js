const express = require('express')
const conectarDB = require('./config/db')
const cors = require('cors')
var morgan = require('morgan')
const fileUpload = require('express-fileupload')
//crear servidor 
const app = express();
// Morgan
const initMorgan = morgan()
// conectar la db
conectarDB()
// habilitar cors
app.use(cors())
// habilitar file uploads
app.use(fileUpload({
    tempFileDir: '/temp'
}))
// habilitar expres.json
app.use(express.json({ extended: true }))
// puerto de la app
const port = process.env.PORT || 4000;

// Importar Rutas
app.use('/users', require('./routes/usersRoutes'))
app.use('/auth', require('./routes/authRoutes'))
app.use('/pets', require('./routes/petsRoutes'))
app.use('/aws', require('./routes/awsRoutes'))

// DEFINIR PAGINA PRINCIPAL
app.get('/', (req, res) => {
    res.send('Hola Mundo')
}) 
  
app.listen(port, '0.0.0.0', ()=>{console.log(`Server running in port ${port}`);});