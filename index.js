const express = require("express");
const DataStore = require('nedb');
const app = express();

app.listen(3000, () => console.log("listening at 3000"));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

const database = new DataStore('database.db');
database.loadDatabase();

app.get('/api', (request, response) => {
    response.json({ test: 123 });
});


app.post('/api', (request, response) => {
    const data = request.body
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json(data);
});



