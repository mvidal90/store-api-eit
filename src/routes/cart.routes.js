import express from 'express'
import { createCart, editCart } from '../controllers/cartController.js';

const route = express.Router();

route
    .post("/", createCart)
    // .get("/:id", createMessage)
    .put("/edit/:id", editCart)

export default route;