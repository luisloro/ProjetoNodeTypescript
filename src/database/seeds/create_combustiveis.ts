import { Knex } from 'knex';

export async function seed(knex:Knex){
    knex('combustivel').insert([
        {nome:"Gasolina",dat_cadastro:'2021-11-09 15:37:00.000'},
        {nome:"Alcool",dat_cadastro:'2020-01-02 13:03:00.000'},
        {nome:"Aditivada",dat_cadastro:'2020-01-02 13:03:00.000'}
    ]);        
}