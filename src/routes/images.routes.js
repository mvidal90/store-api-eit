import express from "express";
import { getImage } from "../controllers/ImagesController.js";


const route = express.Router()

route
    .get("/:idImage", getImage)

export default route;