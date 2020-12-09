const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const pool = require('./database');

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

const app = express();

// middleware
app.use(express.json()); // gives access to req.body
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

if (ENV === 'production') {
    app.use(express.static(path.join(__dirname, './client/build')));
    app.use ((req, res) => {
        res.sendFile(path.join(__dirname, './client/build/index.html'));
    });
}

// CHURCHES ROUTES //
// get all churches
app.get('/churches', async(req, res) => {
    try {
        const allChurches = await pool.query('SELECT * FROM churches');

        res.json(allChurches.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// get a church
app.get('/churches/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const church = await pool.query('SELECT * FROM churches WHERE church_id = $1', [id]);

        res.json(church.rows[0]);
    } catch (err) {
        console.error(err.message);

    }
});

// create a church
app.post('/churches', async(req, res) => {
    try {
        const { name, description, mailing_one, mailing_two, city, state, postal_code, denomination, web_url, latitude, longitude } = req.body;
        const newChurch = await pool.query('INSERT INTO churches (name, description, mailing_one, mailing_two, city, state, postal_code, denomination, web_url, latitude, longitude) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
        [name, description, mailing_one, mailing_two, city, state, postal_code, denomination, web_url, latitude, longitude]);

        res.json(newChurch.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// update a church
app.put('/churches/:id', async(req, res) => {
    try {
        const { id } = req.params; //WHERE
        const { name, description, mailing_one, mailing_two, city, state, postal_code, denomination, web_url, latitude, longitude } = req.body; //SET

        const updateChurch = await pool.query('UPDATE churches SET name = $1, description = $2, mailing_one = $3, mailing_two = $4, city = $5, state = $6, postal_code = $7, denomination = $8, web_url = $9, latitude = $10, longitude = $11  WHERE church_id = $12',
        [name, description, mailing_one, mailing_two, city, state, postal_code, denomination, web_url, latitude, longitude, id]);

        res.json('Church was updated!');
    } catch (err) {
        console.error(err.message);
    }
});

// delete a church
app.delete('/churches/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const deleteChurch = await pool.query('DELETE FROM churches WHERE church_id = $1', [id]);

        res.json('Church was successfully deleted!');
    } catch (err) {
        console.error(err.message);
    }
});

// USERS ROUTES //
// User sign up
// app.post('./users', async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const newUser = await pool.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *' [email, password]);

//         res.json('You successfully signed up!');
//     } catch (err) {
//         console.error(err.message);
//     }
// });
// User secure login

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});

module.exports = app;
