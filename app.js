// Modules:

const express = require('express');
const ejs = require('ejs');
const app = express();
const port = 3000;
const { Pool, Client } = require('pg');
const connectionString = 'postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/postgres';

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
        return res.render('noteApp', {result})
    })
});

// Port:

app.listen(port, () => console.log(`App listening on Port: ${port}!`))