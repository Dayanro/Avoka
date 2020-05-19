const express = require("express");
const router = express.Router();
const Post = require("../models/post.model");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

const uploadCloud = require("../configs/cloudinary.config.js");

router.post("/posts", ensureLoggedIn(), uploadCloud.single('photo'), (req, res, next) => {
    const { owner,
        title,
        theHook,
        realStory,
        expandOnThePoint,
        closing,
        readTime,
        fastReceipe,
        views,
        status,
        tags_id
    } = req.body;

    const filename = req.file ? req.file.url : "";
    const tags = tags_id ? tags_id.split(",") : []
    console.log("ACA ESTA", tags_id)
    Post.create({
        owner,
        title,
        theHook,
        realStory,
        expandOnThePoint,
        closing,
        readTime,
        fastReceipe,
        views,
        status,
        tags_id: tags,
        photo: filename
    })
        .then(data => res.status(200).json(data))
        .catch(err => console.log(err))
})
router.get("/posts", (req, res, next) => {
    if (req.query.tag) {
        return next()
    } else {
        Post.find()
            .then(data => res.status(200).json(data))
            .catch(err => res.status(404).json({ message: 'No se encontró información en la base de datos' }))
    }
})

router.get("/posts", (req, res, next) => {
    Post.find({ tags_id: req.query.tag })
        .then(data => res.status(200).json(data))
        .catch(err => res.status(404).json({ message: 'No se encontró información en la base de datos' }))
})


router.get("/posts/:id", (req, res, next) => {
    Post.findById(req.params.id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(404).json({ message: 'No se encontró información en la base de datos' }))
})

router.put("/posts/:id", ensureLoggedIn(), uploadCloud.single('photo'), (req, res, next) => {
    const { title, owner, theHook, realStory, expandOnThePoint, closing, readTime, fastReceipe, views, status, tags_id } = req.body

    const photo = req.file ? req.file.url : req.body.photo;
    const tags = tags_id ? tags_id.split(",") : []
    Post.findByIdAndUpdate(req.params.id, {
        title,
        owner,
        theHook,
        realStory,
        expandOnThePoint,
        closing,
        readTime,
        fastReceipe,
        views,
        status,
        tags_id: tags,
        photo
    }, { new: true })
        .then(data => res.status(200).json(data))
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'No fue posible actualizar el post seleccionado' })
        })

})

router.delete("/posts/:id", ensureLoggedIn(), (req, res, next) => {
    Post.findByIdAndDelete(req.params.id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json({ message: 'No fue posible eliminar la información seleccionada' }))
})

module.exports = router;