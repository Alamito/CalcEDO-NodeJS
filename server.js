const app = require('./config/express')();
const port = app.get('port');

const cors = require("cors");

app.options("*", cors({ origin: 'http://localhost:8080', optionsSuccessStatus: 200 }));

app.use(cors({ origin: "http://localhost:8080", optionsSuccessStatus: 200 }));

// RODANDO NOSSA APLICAÇÃO NA PORTA SETADA
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
});

