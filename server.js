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

// POST - Add an account to the database

server.post('/api/accounts', (req, res) => {
    const accountData = req.body;
    // const { id } = req.params.id
    knex.insert(accountData, 'id')
    .into('accounts')
    .then(acc => {
        res.status(201).json(acc);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            errorMessage: 'Error adding an account to the database'
        })
    });
});

//  PUT - Update an existing account by ID

server.put('/api/accounts/:id', (req, res) => { // ALWAYS ADD WHERE ON UPDATES AND DELETES!
    const { id } = req.params;
    const updatedAccount = req.body;
    knex('accounts').where({ id }).update(updatedAccount).then(count => {
        res.status(200).json({ message: `${count} record(s) updated!`})
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            errorMessage: 'Error updating that account'
        })
    });
});

// DELETE - Delete an account by passing in a specific ID

server.delete('/api/accounts/:id', (req, res) => {
    knex('accounts')
        .where({ id: req.params.id })
        .del()
        .then(count => {
            res.status(204).json({ message: `${count} record(s) deleted!`})
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                errorMessage: 'Error removing that account!'
            });
        });
});

module.exports = server;