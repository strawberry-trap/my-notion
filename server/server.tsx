const express = require('express');
const app = express();
const PORT = 3002; // 3000 is used by REACT

// router seperation from server.tsx code
const route = require('./routes/index.tsx');
app.use('/', route);

app.listen(PORT, ()=> {
    console.log(`Example app listening at http://localhost:${PORT}`);
});