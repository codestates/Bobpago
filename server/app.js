const PORT = 80;
const express = require('express');
const cors = require('cors');
const app = express();

app.use(
  cors({
    origin: 'http://bobpago.com',
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  }),
);

app.listen(PORT, () => {
  console.log("서버 가동");
})

module.exports = app;