import { Router } from 'express';
import knex from '../database/connection';

const postoCombustivelRouter= Router();

postoCombustivelRouter.get('/', async (request, response)=>{

    const combustivel = await knex('postos_combustivel').select('*');

    response.json(combustivel);

});

export default postoCombustivelRouter;