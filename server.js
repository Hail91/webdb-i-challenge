const express = require('express');

const knex = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

// Return a list of accounts from the database

server.get('/api/accounts', (req, res) => {
    knex.select('*').from('accounts').then(accounts => {
        res.status(200).json(accounts);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            errorMessage: 'Error retrieving the accounts'
        })
    });
});

// GET -- Get a specific account from the database by ID

server.get('/api/accounts/:id', (req, res) => {
    knex.select('*').from('accounts').where({ id: req.params.id }).then(account => {
        res.status(200).json(account);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            errorMessage: 'Error retrieving that account from the database'
        })
    });
});



module.exports = server;