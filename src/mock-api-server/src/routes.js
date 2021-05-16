import { Router } from 'express';
import endpoints from './endpoints'

const routes = Router();

/**
 * GET home page
 */
routes.get('/', (req, res) => {
  var keys = Object.keys(endpoints());
  res.render('index', 
    { title: 'API runnning!', endpoints: keys }
  );
});

export default routes;
