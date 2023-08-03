const request = require("supertest");
const db = require('../data/db-config');
const server = require('../server');
const Card = require('./cardsModel');

const card1 = {
    card_name:"Red-Eyes Black Dragon",
    attribute:"Dark",
    level:"7",
    type:"Dragon",
    description:"A ferocious dragon with a deadly attack.",
    attack:"2400",
    defense:"2100",
    quantity:"1"
}

const card2 = {
    card_name:"Summoned Skull",
    attribute:"Dark",
    level:"",
    type:"Fiend",
    description:"A fiend with dark powers for confusing the enemy. Among the Fiend-Type monsters, this monster boasts considerable force.",
    attack:"2500",
    defense:"1200",
    quantity:"2"
}

const card3 = {
    card_name:"Summoned Skull",
    attribute:"Dark",
    level:"",
    type:"Fiend",
    description:"A fiend with dark powers for confusing the enemy. Among the Fiend-Type monsters, this monster boasts considerable force.",
    attack:"2500",
    defense:"1200"
}

const card4 = {
    card_name:"Red-Eyes Black Dragon",
    attribute:"Dark",
    level:"7",
    type:"Dragon",
    attack:"2400",
    defense:"2100",
    quantity:"1"
}


const card5 = {
    card_name:"Red-Eyes Black Dragon",
    attribute:"Dark",
    level:"7",
    type:"Dragon",
    description:"A ferocious dragon with a deadly attack.",
    defense:"2100",
    quantity:"1"
}

const card6 = {
    card_name:"Summoned Skull",
    attribute:"Dark",
    level:"",
    type:"Fiend",
    description:"A fiend with dark powers for confusing the enemy. Among the Fiend-Type monsters, this monster boasts considerable force.",
    attack:"2500",
    quantity:"2"
}


beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db("cards").truncate()
})

afterAll(async () => {
    await db.destroy()
})

it("has the correct env variable", () => {
    expect(process.env.DB_ENV).toBe("testing")
})

describe("cards model functions", () => {
    describe("create card", () => {
        it("can add a card to the db", async () => {
            let cards
            await Card.createCard(card1)
            cards = await db("cards")
            expect(cards).toHaveLength(1)

            await Card.createCard(card2)
            cards = await db('cards')
            expect(cards).toHaveLength(2)
        })
        it("can add 2 cards to the db", async () => {
            let cards
            await Card.createCard(card1)
            await Card.createCard(card2)
            cards = await db('cards')
            expect(cards).toHaveLength(2)
        })
        it("correctly filled all inputs", async ()=>{
            const card = await Card.createCard(card1)
            expect(card).toMatchObject({card_id:1,...card})
        })
        it("defaults to 1 card if unspecified", async () => {
            let card
            await Card.createCard(card3)
            card = await db('cards')
            expect(card[0].quantity).toBe('1')
        })
        it("defaults to Monster Card card if unspecified", async () => {
            let card
            await Card.createCard(card4)
            card = await db('cards')
            expect(card[0].description).toBe('Monster Card.')
        })
        it("defaults to 0 attack if unspecified", async () => {
            let card
            await Card.createCard(card5)
            card = await db('cards')
            expect(card[0].attack).toBe('0')
        })
        it("defaults to 0 defense if unspecified", async () => {
            let card
            await Card.createCard(card6)
            card = await db('cards')
            expect(card[0].defense).toBe('0')
        })
    })
    describe("[DELETE] / - deletes card", () => {
        it("deletes the card from database", async () => {
            const [card_id] = await db('cards').insert(card1)
            let card = await db('cards').where({card_id}).first()
            expect(card).toBeTruthy()
            await request(server).delete("/cards/"+ card_id)
            card = await db('cards').where({card_id}).first()
            expect(card).toBeFalsy()
        })
        it('responds with the deleted card', async () => {
            await db('cards').insert(card1)
            let card = await request(server).delete('/cards/1')
            expect(card.body).toMatchObject(card1);
        })
    })
})

