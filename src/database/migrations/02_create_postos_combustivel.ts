import { Knex } from 'knex';


export async function up(knex : Knex){
    return knex.schema.createTable('postos_combustivel', (table)=>{
        table.integer('combustivel_id')
            .notNullable()
            .references('id')
            .inTable('combustivel');

        table.integer('postos_id')
            .notNullable()
            .references('id')
            .inTable('postos');

        table.primary(['combustivel_id','postos_id']);
    });    
}
export async function down(knex : Knex){
    return knex.schema.dropTable('postos_combustivel');
}