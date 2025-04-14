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
        console.error('DB-Verbindung fehlgeschlagen:', err);
        return;
    }
    console.log('✅ Verbindung zur MySQL-Datenbank erfolgreich');
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
            return res.status(500).send('Fehler beim Abrufen der Aufgaben');
        }
        res.render('index', { tasks: result });
    });
});

app.post('/create-task', function (req, res) {
    const { title, description, deadline } = req.body;
    db.query('INSERT INTO tasks (title, description, deadline) VALUES (?, ?, ?)', [title, description, deadline], (err, result) => {
        if (err) {
            return res.status(500).send('Fehler beim Hinzufügen der Aufgabe');
        }
        res.redirect("/");
    });
})


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})