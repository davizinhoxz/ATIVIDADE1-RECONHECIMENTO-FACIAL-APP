require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.static('public'));

app.listen(3000, () => console.log('Servidor a correr na porta 3000'));