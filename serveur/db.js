const knex = require("knex")

const db = knex({
    client : "sqlite3",
    connection: {
        filename: "mandat4.sqlite3",
    },
    useNullAsDefault: true,
})

async function createTable(){
    const exists = await db.schema.hasTable('Users')
    if(!exists){
        await db.schema.createTable('Users', (table)=>{
            table.string("id").primary()
            table.string("name").notNullable();
            table.decimal("prenom").notNullable();
            table.string("email").notNullable();
            table.string("telephone").notNullable;
            table.string("lieu").notNullable;
            table.date("date").notNullable;
            table.string("description").notNullable;
            table.string("mdp").notNullable;
            table.timestamp("created_at").defaultTo(db.fn.now());
        
        });

        console.log("Table 'products' created");
    }

}

module.exports ={db, createTable};
