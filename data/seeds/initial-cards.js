/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('cards').truncate()
  await knex('cards').insert([
    {
      card_name: 'Blue-Eyes White Dragon',
      attribute: 'Light',
      level: '8',
      type: 'Dragon',
      description: 'This legendary dragon is a powerful engine of destruction. Virtually invicible, very few have faced this awesome creature and lived to tell the tale',
      attack: '3000',
      defense: '2500',
      quantity: '3'
    },
    {
      card_name: 'Dark Magician',
      attribute: 'Dark',
      level: '7',
      type: 'Spellcaster',
      description: 'The ultimate wizard in terms of attack and defense',
      attack: '2500',
      defense: '2100',
      quantity: '1'
    },
  ]);
};
