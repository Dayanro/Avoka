const express = require("express");
const router = express.Router();
const Tag = require("../models/tag.model");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");


const uploadCloud = require("../configs/cloudinary.config.js");

router.post("/tags", ensureLoggedIn(), uploadCloud.single('photo'), (req, res, next) => {
    
    const { name, definition } = req.body;
    const filename = req.file ? req.file.url : "";

    const role = req.user.role
    if (role == "Admin") {
        Tag.create({ name, definition, photo: filename })
            .then(data => res.status(200).json(data))
            .catch(err => console.log(err))

    } else {
        res.status(401).json({ mensaje: "No esta autorizado" })

    }
})

router.get("/tags",  (req, res, next) => {
        Tag.find()
            .then(data => res.status(200).json(data))
            .catch(err => res.status(404).json({ message: 'No se encontró información en la base de datos' }))
})

router.get("/tags/:id",  (req, res, next) => {
        Tag.findById(req.params.id)
            .then(data => res.status(200).json(data))
            .catch(err => res.status(404).json({ message: 'No se encontró información en la base de datos' }))
})

router.put("/tags/:id", ensureLoggedIn(), uploadCloud.single('photo'), (req, res, next) => {
    const name = req.body.name;
    const definition = req.body.definition;
    const photo = req.file ? req.file.url : req.body.photo;

    const role = req.user.role
    if (role == "Admin") {
        Tag.findByIdAndUpdate(req.params.id, { name: name, definition: definition, photo: photo  }, { new: true })
            .then(data => res.status(200).json(data))
            .catch(err => res.status(500).json({ message: 'No fue posible actualizar el tag seleccionado' }))
    } else {
        res.status(401).json({ mensaje: "No esta autorizado" })
    }
})

router.delete("/tags/:id", ensureLoggedIn(), (req, res, next) => {
    const role = req.user.role
    if (role == "Admin") {
        Tag.findByIdAndDelete(req.params.id)
            .then(data => res.status(200).json(data))
            .catch(err => res.status(500).json({ message: 'No fue posible eliminar la información seleccionada' }))
    } else {
        res.status(401).json({ mensaje: "No esta autorizado" })
    }
})

module.exports = router;