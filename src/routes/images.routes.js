import express from "express";
import { getImage } from "../controllers/imagesController.js";


const route = express.Router()

route
    .get("/:idImage", getImage)

export default route;