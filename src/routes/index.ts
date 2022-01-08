import { Router } from 'express';

import combustivelRouter from './combustivel.routes';
import postosRouter from './postos.routes';
import postoCombustivelRouter from './postos_combustivel.routes';
import abastecimentoRouter from './abastecimento';

const routes = Router();



routes.use('/combustivel',combustivelRouter);
routes.use('/postos',postosRouter);
routes.use('/postos_combustivel',postoCombustivelRouter);
routes.use('/abastecimento',abastecimentoRouter);
routes.get('/',(request, response)=>{
    return response.json({message:'Requisição GET'});
});



export default routes;
