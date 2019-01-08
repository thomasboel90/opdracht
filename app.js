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
});

//Add messages to the board:

app.post('/add',(req,res) => {
    const client = new Client({
            connectionString: connectionString,
        })
        client.connect()
        .then(()=>{
            return client.query(`INSERT INTO messages (title, body) values ($1, $2)`, [req.body.title, req.body.body])
        })
        .then((result) => {
            return res.redirect('/')
        })
});

//Delete messages from board:

app.post('/delete/message/:id',(req,res) => {
    const client = new Client({
        connectionString: connectionString,
    })
    client.connect()
    .then(() => {
        return client.query(`DELETE FROM messages WHERE id=$1`,[req.params.id])
    })
    .then((result) => {
        return res.redirect('/')
    })
});

//Edit messages from board:

app.get('/edit/message/:id',(req,res)=>{
        const client = new Client({
                connectionString: connectionString,
            })
            client.connect()                
            .then(()=>{
                return client.query(`SELECT * FROM messages WHERE id=$1`,[req.params.id])
            })
            .then((result)=>{
                return res.render('edit-message', {result})
            })
        })

app.post('/update',(req,res)=>{
        const client = new Client({
                connectionString: connectionString,
            })
            client.connect()
            .then(()=>{
                return client.query(`UPDATE messages SET title=$1, body=$2 WHERE id=$3`, [req.body.title, req.body.body, req.body.id])
            })
            .then((result)=>{
                return res.redirect('/')
            })
        })   

// Port:

app.listen(port, () => console.log(`App listening on Port: ${port}!`))