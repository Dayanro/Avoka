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
    const tags = tags_id.split(",")
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
router.get("/posts", ensureLoggedIn(), (req, res, next) => {
    Post.find()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(404).json({ message: 'No se encontró información en la base de datos' }))

})

router.get("/posts/:id", ensureLoggedIn(), (req, res, next) => {
    Post.findById(req.params.id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(404).json({ message: 'No se encontró información en la base de datos' }))
})

router.put("/posts/:id", ensureLoggedIn(), uploadCloud.single('photo'), (req, res, next) => {
    const { title, owner, theHook, realStory, expandOnThePoint, closing, readTime, fastReceipe, views, status, tags_id } = req.body

    // const title = req.body.title;
    // const theHook = req.body.theHook;
    // const realStory = req.body.realStory;
    // const expandOnThePoint = req.body.expandOnThePoint;
    // const closing = req.body.closing;
    // const readTime = req.body.readTime;
    // const fastReceipe = req.body.fastReceipe;
    // const views = req.body.views;
    // const status = req.body.status;
    const photo = req.file ? req.file.url : req.body.photo;
    const tags = tags_id ? tags_id.split(","): []
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
        tags_id : tags,
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