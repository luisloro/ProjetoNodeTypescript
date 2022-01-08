import { Knex } from 'knex';

export async function up(knex : Knex){
    return knex.schema.createTable('abastecimento', (table)=>{
        table.increments('id').primary();
        table.float('litro').notNullable();
        table.float('valor').notNullable();
        table.datetime('data').notNullable();
        table.string('observacao');
        table.integer('combustivel_id').notNullable().references('id').inTable('combustivel');
        table.integer('postos_id').notNullable().references('id').inTable('postos');

        
    });    
}

export async function down(knex : Knex){
    return knex.schema.dropTable('abastecimento');
}