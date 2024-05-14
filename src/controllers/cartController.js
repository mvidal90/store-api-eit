import { Cart } from "../models/Cart.js"

export const createCart = async (req, res) => {
    try {
        const newCart = await Cart.create(req.body);

        res.json({
            ok: true,
            cart: newCart
        })

    } catch (error) {
        console.log("Ha habido un error al editar el producto.")
        res.status(500)
            .json({
                ok: false,
                msg: "Ha habido un error con el servidor"
            })
    }
}