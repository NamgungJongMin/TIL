const express = require('express');

const app = express();

app.get('/', (req, res) => {});

app.get('/user', (req, res) => {});

app.listen(3000, () => {
  console.log('server running');
});
