const express = require ('express');
const bodyParser = require ('body-parser');
const cors = require ('cors');
const authRoutes = require('./routes/auth.js');

const app = express ();
app.use(cors ());
app.use (bodyParser.json ());

app.use ('/api/auth', authRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log (`Server is running on http:localhost:${PORT}`);
});