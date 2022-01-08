import { Knex } from 'knex';

export async function up(knex : Knex){
    return knex.schema.createTable('combustivel', (table)=>{
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.datetime('dat_cadastro').notNullable();
    });    
}

export async function down(knex : Knex){
    return knex.schema.dropTable('combustivel');
}