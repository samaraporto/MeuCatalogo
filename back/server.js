const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORTA = process.env.PORTA;

app.use(cors());
app.use(express.json());

//conexão com o mongodb
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado ao MongoDB com sucesso!'))
  .catch((err) => console.error('Falha ao conectar ao MongoDB:', err));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/watchlist', require('./routes/watchlist'));

app.listen(PORTA, () => {
  console.log(`Servidor do backend a rodar em http://localhost:${PORTA}`);
});
