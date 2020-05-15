const express = require("express");
const router = express.Router();
const Post = require("../models/post.model");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

const uploadCloud = require("../configs/cloudinary.config.js");

router.post("/posts", ensureLoggedIn(), uploadCloud.single('photo'), (req, res, next) => {
    const { title,
        theHook,
        realStory,
        expandOnThePoint,
        closing,
        readTime,
        fastReceipe,
        views,
        status,
    } = req.body;
    const filename = req.file ? req.file.url : "";
    
    Post.create({
        title,
        theHook,
        realStory,
        expandOnThePoint,
        closing,
        readTime,
        fastReceipe,
        views,
        status,
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

router.get("/posts/:id ", ensureLoggedIn(), (req, res, next) => {
        Post.findById(req.params.id)
            .then(data => res.status(200).json(data))
            .catch(err => res.status(404).json({ message: 'No se encontró información en la base de datos' }))
})

router.put("/posts/:id ", ensureLoggedIn(), uploadCloud.single('photo'), (req, res, next) => {
    const title = req.body.title;
    const theHook = req.body.theHook;
    const realStory = req.body.realStory;
    const expandOnThePoint = req.body.expandOnThePoint;
    const closing = req.body.closing;
    const readTime = req.body.readTime;
    const fastReceipe = req.body.fastReceipe;
    const views = req.body.views;
    const status = req.body.status;
    const photo = req.file ? req.file.url : req.body.photo;

    Post.findByIdAndUpdate(req.params.id, {
        title: title,
        theHook: theHook,
        realStory: realStory,
        expandOnThePoint: expandOnThePoint,
        closing: closing,
        readTime: readTime,
        fastReceipe: fastReceipe,
        views: views,
        status: status,
        photo: photo
    }, { new: true })
            .then(data => res.status(200).json(data))
            .catch(err => res.status(500).json({ message: 'No fue posible actualizar el post seleccionado' }))
    
})

router.delete("posts/:id", ensureLoggedIn(), (req, res, next) => {
        Post.findByIdAndDelete(req.params.id)
            .then(data => res.status(200).json(data))
            .catch(err => res.status(500).json({ message: 'No fue posible eliminar la información seleccionada' }))
})

module.exports = router;