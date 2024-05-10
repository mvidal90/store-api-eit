import fs from "fs";

import { Products } from "../models/Products.js"
import { Images } from "../models/Images.js";

export const createProduct = async (req, res) => {
    const {body, file} = req
    try {

        if (!file) {
            return res.status(400)
                .json({
                    ok: false,
                    msg: "La foto es obligatoria."
                })
        }

        const imageBuffer = fs.readFileSync(`./temp/imgs/${file.filename}`)
        
        const image = await Images.create({
            fileName: file.filename,
            img: {
                data: imageBuffer,
                contentType: "image/png"
            }
        })
        
        if (!image) {
            return res.status(400)
                .json({
                    ok: false,
                    msg: "No se pudo guardar correctamente la imagen."
                })
        }

        const product = await Products.create({
            ...body,
            // para el caso que la imagenes queden alojadas permanentemente en nuestro servidor
            // imgUrl: `${process.env.BASE_URL}/public/${file.filename}`
            imgUrl: `${process.env.BASE_URL}/images/${image._id}`
        });

        fs.rm(`./temp/imgs/${file.filename}`, error => {
                if (error) {
                    console.log("Lo sentimos, no hemos podido eliminar el archivo")
                }
                console.log("El archivo se ha eliminado correctamente")
            })

        if (!product) {
            return res.status(400)
                .json({
                    ok: false,
                    msg: "No se pudo crear el producto."
                })
        }

        res.json({
            ok: true,
            product,
            msg: "Se ha creado el producto correctamente."
        })
    } catch (error) {
        console.log("Ha habido un error al crear el producto.", error)
        res.status(500)
            .json({
                ok: false,
                msg: "Ha habido un error con el servidor"
            })
    }
} 

export const getProducts = async (req, res) => {
    try {
        const products = await Products.find()

        res.json({
            ok: true,
            products
        })
    } catch (error) {
        console.log("Ha habido un error al obtener los productos.")
        res.status(500)
            .json({
                ok: false,
                msg: "Ha habido un error con el servidor"
            })
    }
}