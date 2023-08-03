const express = require("express");
const router = express.Router();
const Card = require('./cardsModel');
const db = require('../data/db-config')

router.get('/', async (req, res) => {
    return db('cards')
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const delCard = await Card.deleteCard(id)
    res.status(200).json(delCard)
})

module.exports = router