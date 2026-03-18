import express from 'express';
import { fruitsService } from '../services/fruit.service.js';
const route = express.Router();

route.get("/", (req, res) =>{
const dado = fruitsService.getAll()
res.json(dado)

} ) 

export default route;