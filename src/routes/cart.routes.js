import express from 'express'
import { createCart } from '../controllers/cartController.js';

const route = express.Router();

route
    .post("/", createCart)
    // .get("/:id", createMessage)
    // .put("/", createMessage)

export default route;