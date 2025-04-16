const express = require('express')
const path = require('path');
const app = express()
const port = process.env.PORT || 3000
const mysql = require('mysql2');

// Verbindung konfigurieren
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',       // oder dein Benutzername
    password: 'w209.Kompressor',       // dein Passwort, evtl. leer
    database: 'to_dos'
});

// Verbindung herstellen
db.connect((err) => {
    if (err) {
        console.error('DB-Connection failed:', err);
        return;
    }
    console.log('✅ Successfully connected to the database.');
});

module.exports = db;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    db.query('SELECT * FROM tasks', (err, result) => {
        if (err) {
            return res.status(500).send('Error when retrieving the tasks');
        }
        res.render('index', { tasks: result });
    });
});

app.post('/create-task', function (req, res) {
    const { title, description, deadline } = req.body;
    const currentDate = new Date();
    const deadlineDate = new Date(deadline);

    if(currentDate > deadlineDate){
        res.redirect('/');
    } else {
        db.query('INSERT INTO tasks (title, description, deadline) VALUES (?, ?, ?)', [title, description, deadline], (err, result) => {
            if (err) {
                return res.status(500).send('Error while adding the task');
            }
            res.redirect("/");
        });
    }
})

// Route zum Löschen des Tasks
app.post('/delete-task/:id', (req, res) => {
    const taskId = req.params.id;
    db.query('DELETE FROM tasks WHERE id = ?;', [taskId], (err, result) => {
        if (err) {
            return res.status(500).send('Error while deleting the task');
        }
        res.redirect("/");
    });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})