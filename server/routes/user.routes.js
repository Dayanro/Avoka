const express = require("express");
const router = express.Router();
const passport = require("passport");
const mailer = require("../configs/nodemailer.config");
const template = require("../templates/template");

const User = require("../models/user.model");

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const uploadCloud = require("../configs/cloudinary.config.js");

router.post("/users", (req, res, next) => {

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    if (!username || !password) {
        res.status(400).json({ message: 'Por favor ingrese email y contraseña' });
        return;
    }
    // if (password.length < 6) {
    //     res.status(400).json({ message: 'Elige una contraseña nueva. Recuerda que la contraseña debe tener 6 caracteres como minimo' });
    //     return;
    // }

    User.findOne({ username }, (err, foundUser) => {

        if (err) {
            res.status(500).json({ message: 'Falló la verificación del nombre de usuario.' });
            return;
        }

        if (foundUser) {
            res.status(400).json({ message: 'Ya existe un usuario o alias con el nombre seleccionado.' });
            return;
        }

        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);

        const characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let token = "";
        for (let i = 0; i < 25; i++) {
            token += characters[Math.floor(Math.random() * characters.length)];
        }
        let confirmationCode = token;

        const aNewUser = new User({
            username: username,
            password: hashPass,
            email,
            confirmationCode
        });

        aNewUser.save(err => {
            if (err) {
                console.log('error', err)
                res.status(400).json({ message: 'Falló la creacion del usuario en la base de datos' });
                return;
            }
            let message = "test message";
            mailer.sendMail({
                from: "<testfordev2@gmail.com>",
                to: email,
                subject: "Confirmation Email",
                text: message,
                html: template.template(confirmationCode)
            })
            req.login(aNewUser, (err) => {

                if (err) {
                    res.status(500).json({ message: 'Falló inicio de sesión' });
                    return;
                }
                res.status(200).json(aNewUser);
            });
        });
    });
})
router.get("/users", (req, res, next) => {
    User.find()

        .then(data => res.status(200).json(data))
        .catch(err => res.status(404).json({ message: 'No se encontró información en la base de datos' }))
})


router.get("/users/:id", (req, res, next) => {
    User.findById(req.params.id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(404).json({ message: 'No se encontró información en la base de datos' }))
})


router.put("/users/:id", uploadCloud.single('photo'), (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const shortBio = req.body.shortBio;

    const tempUsername = username || req.user.username;
    const tempEmail = email || req.user.email;
    const tempShortBio = shortBio || req.user.shortBio;
    const tempAvatar = req.file ? req.file.url : req.user.avatar;

    User.findByIdAndUpdate(req.params.id, { username: tempUsername, email: tempEmail, shortBio: tempShortBio, avatar: tempAvatar }, { new: true })
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json({ message: 'No fue posible actualizar' }))
})


router.delete("/users/:id", (req, res, next) => {
    User.findByIdAndDelete(req.params.id)
        .then(data => res.status(204))
        .catch(err => res.status(500).json({ message: 'No fue posible eliminar la información seleccionada' }))
})


module.exports = router;