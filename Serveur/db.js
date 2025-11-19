const knex = require('knex');

const db = knex({
    client: 'sqlite3',
    connection: { 
       filename: "./BaseDonner.sqlite3",
    },
    useNullAsDefault: true

});

async function createTable(){
    const exists = await db.schema.hasTable("User");
    if(!exists){
       await db.schema.createTable("User", (table)=>{
             table.string("id").primary();
             table.string("N_Utilisateur").notNullable();
             table.string("Password").notNullable();
             table.timestamp("created_at").defaultTo(db.fn.now());
       });
       console.log("Table 'User' creee..");

    }

    const exists2 = await db.schema.hasTable("Post");
    if(!exists2){
       await db.schema.createTable("Post", (table)=>{
             table.string("id").primary();
             table.string("nom_utilisateur").notNullable();
             table.string("Nom_titre").notNullable();
             table.string("Description").notNullable();
             table.string("Image").notNullable();
             table.timestamp("created_at").defaultTo(db.fn.now());
       });
       console.log("Table 'Post' creee..");

    }
}
module.exports = {db, createTable};