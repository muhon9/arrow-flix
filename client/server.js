const express = require('express');
const fallback = require('express-history-api-fallback');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.use(fallback(path.join(__dirname, 'build', 'index.html')));

app.listen(8001, () => {
  console.log(`server started on ${8001}`);
});
