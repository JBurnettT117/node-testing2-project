const db = require('../data/db-config');

async function createCard(card) {
    const [card_id] = await db('cards').insert(card);
    return db("cards").where('card_id', card_id).first()
}

async function deleteCard(id) {
    const card = await db('cards').where('card_id', id).first()
    await db('cards').where('card_id', id).del()
    return card
}

module.exports = {
    createCard,
    deleteCard,
}