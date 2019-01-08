// Modules:

const express = require('express');
const ejs = require('ejs');
const app = express();
const port = 3000;
const { Pool, Client } = require('pg');
const connectionString = 'postgresql://postgres:14061990@localhost:5433/postgres';
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

app.set('view engine', 'ejs');

//Show messages from database:

app.get('/',(req,res) => { 
const client = new Client({
        connectionString: connectionString,
    })
    client.connect()
    .then(() => {
        return client.query(`SELECT * FROM messages`)
    })
    .then((result) => {
        console.log(result);
        return res.render('messageBoard', {result})
    })
    .catch((error) => {
        console.log(error);
    })
});

// Port:

app.listen(port, () => console.log(`App listening on Port: ${port}!`))