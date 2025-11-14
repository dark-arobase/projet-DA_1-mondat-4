

const knex = require('knex');

const db = knex ({
    client: 'sqlite3',
    connection: {
        filename: "./data/database.sqlite3"
    },
    useNullAsDefault: true
});


async function createTable() {
    const exists = await db.schema.hasTable('utilisateurs');
    if (!exists) {
        await db.schema.createTables('utilisateurs', (table) => {
            table.string('id').primary();
            table.string('username').notNullable();
            table.string('password').notNullable();
            table.string('email').notNullable();
            table.timestamp("created_at").defaultTo(db.fn.now());
        });
    console.log("Table 'utilisateurs' créée avec succès.");
    }
}

module.exports = { db, createTable}; 

//Utilisateurs  
// Inscription + Connexion + Déconnexion (sessions ou JWT)