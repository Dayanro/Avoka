require("dotenv").config()

const mongoose = require("mongoose");
const User = require("../models/user.model")
const Tag = require("../models/tag.model")
const Post = require("../models/post.model")

const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const salt = bcrypt.genSaltSync(bcryptSalt)

mongoose.connect(`mongodb://localhost:27017/${process.env.DB}`, { useNewUrlParser: true, useUnifiedTopology: true })

console.log('Primero')

User.collection.drop();
Tag.collection.drop();
Post.collection.drop();

const user = [
    {
        avatar: "https://res.cloudinary.com/dw3tnxljg/image/upload/v1589557252/Avoka/undraw_female_avatar_w3jk_xivrbo.png",
        shortBio: "To cure disease after it has appeared is like digging a well when one feels thirsty, ― David Perlmutter",
        username: "Admin",
        email: "dayanrojas48@gmail.com",
        password: bcrypt.hashSync("admin", salt),
        status: "Active",
        confirmationCode: "0CtMvMdymReBHnitdbrXttecU",
        interest: [],
        role: "Admin",
        following: []
    },
    {
        avatar: "https://res.cloudinary.com/dw3tnxljg/image/upload/v1589557308/Avoka/undraw_male_avatar_323b_wtu2gq.png",
        shortBio: "The simple act of moving your body will do more for your brain than any riddle, math equation, mystery book, or even thinking itself. ― David Perlmutter",
        username: "Juan_ro",
        email: "dayanrojas48@gmail.com",
        password: bcrypt.hashSync("juan", salt),
        status: "Active",
        confirmationCode: "0CtMvMdomReBHnitdbrXtwertU",
        interest: [],
        role: "Editor",
        following: []
    }
]

const tag = [
    {
        name: "Dieta cetogénica",
        photo: "https://res.cloudinary.com/dw3tnxljg/image/upload/v1589429849/Avoka/images.jpeg.jpg",
        definition: "se deriva del hecho de que permite al cuerpo producir pequeñas moléculas de combustible llamadas “cetonas”.Es una fuente alternativa de combustible para el cuerpo, que este usa cuando el azúcar en sangre (glucosa) escasea."
    },
    {
        name: "Dieta mediterránea",
        photo: "https://res.cloudinary.com/dw3tnxljg/image/upload/v1589430581/Avoka/dieta-mediterranea-lo-nuestro.jpg.jpg",
        definition: "Entre las muchas propiedades beneficiosas para la salud de este patrón alimentario se puede destacar el tipo de grasa que lo caracteriza (aceite de oliva, pescado y frutos secos), las proporciones en los nutrientes principales que guardan sus recetas (cereales y vegetales como base de los platos y carnes o similares como “guarnición”) y la riqueza en micronutrientes que contiene, fruto de la utilización de verduras de temporada, hierbas aromáticas y condimentos."
    },
    {
        name: "Dieta paleo",
        photo: "https://res.cloudinary.com/dw3tnxljg/image/upload/v1589430134/Avoka/clean-eating-vs-paleo-1.jpg.jpg",
        definition: "Una dieta paleo suele contener carne de res magra, pescado, frutas, vegetales, frutos secos y semillas: alimentos que se podían obtener de la caza y la recolección en el pasado."
    },
    {
        name: "Dieta Carnívora",
        photo: "https://res.cloudinary.com/dw3tnxljg/image/upload/v1589440768/Avoka/cooking-beef-steak-fillets-royalty-free-image-849360782-1541014774.jpg.jpg",
        definition: "La Dieta Carnívora consiste enteramente en carne y productos animales, excluyendo todos los otros alimentos. La dieta es extremadamente restrictiva y probablemente poco saludable a largo plazo. Además, ninguna investigación respalda sus supuestos beneficios."
    },
    {
        name: "Estilos de vida",
        photo: "https://res.cloudinary.com/dw3tnxljg/image/upload/v1589578601/Avoka/estetoscopio-medico-manzana-sobre-fondo-madera-imagen-concepto-estilo-vida-saludable_1205-1295_cz9jfg.jpg",
        definition: "Aquellos hábitos de nuestra vida diaria que nos ayudan a mantenernos más sanos y con menos limitaciones funcionales."
    }
]

const post = [
    {
        title: "Intenté Keto por un mes y esto es lo que sucedió",
        theHook: "La dieta parecía un capricho loco. Entonces funcionó",
        realStory: "El cansancio no era algo nuevo. Pero sucedía con más frecuencia, especialmente después de que comí. Una mañana, estaba tomando mi segunda taza de café, luchando por concentrarme en la pantalla de la computadora cuando me vi obligado a acostarme. Simplemente no pude resistir el impulso de tomar una siesta. Una hora después, me desperté sintiéndome descansado y preocupado....",
        expandOnThePoint: "Siempre pensé que los carbohidratos complejos (pan integral, arroz integral, pasta integral) eran ricos en nutrientes y fibra y, por lo tanto, saludables. Pero son ellos? ¿Reducen los biomarcadores de la enfermedad o su causa, la inflamación?De hecho, hay varios estudios que concluyen que la fibra promueve la pérdida de peso, reduce el riesgo de enfermedades cardiovasculares y diabetes tipo 2, elimina el estreñimiento y mejora la salud intestinal.Esas fueron algunas de las razones por las que decidí experimentar con comer 25 gramos de fibra todos los días durante un mes.De hecho, había continuado esa dieta alta en fibra incluso después de mi experimento.Pero eso fue antes de mi colapso de azúcar.Y no fue la primera vez que tuve un chapuzón de energía después de comer.Luego estaba mi peso.Había estado luchando por perder esas 10 libras extra(realmente 20) durante al menos dos décadas ...",
        closing: "Sin embargo, tengo la esperanza de que las cosas estén cambiando. A medida que más chefs aprendan que la mantequilla, el aceite de coco, el aceite de oliva, la manteca de cerdo y el sebo de res son grasas saludables, quizás veamos opciones de restaurantes más saludables.En cuanto a mí, nunca he esperado más la temporada de trajes de baño.Quizás haya perdido las 10 libras restantes para entonces.Pero incluso si no, me quedo con ceto.Me encanta la calma, la regularidad hormonal, la saciedad, la claridad mental, la disminución de la inflamación y la mayor concentración que obtengo cuando estoy en ceto.Es cierto que vine a ceto para perder peso, pero me quedo por los beneficios para la salud.",
        readTime: 2,
        fastReceipe: "Ingredientes: 6 huevos, 1 pizca, sal 2 cda. (25 g) aceite de coco derretido175 ml leche de coco, 125 ml(60 g) harina de coco, 1 cdta.polvo para hornear,mantequilla o aceite de coco para freír",
        photo: "https://res.cloudinary.com/dw3tnxljg/image/upload/v1589565427/Avoka/tired_gejm7k.jpg",
        tags_id: [],
        views: 0,
        status: "Borrador",
    },
    {
        title: "...",
        theHook: "La dieta parecía un capricho loco. Entonces funcionó",
        realStory: "El cansancio no era algo nuevo. Pero sucedía con más frecuencia, especialmente después de que comí. Una mañana, estaba tomando mi segunda taza de café, luchando por concentrarme en la pantalla de la computadora cuando me vi obligado a acostarme. Simplemente no pude resistir el impulso de tomar una siesta. Una hora después, me desperté sintiéndome descansado y preocupado....",
        expandOnThePoint: "Siempre pensé que los carbohidratos complejos (pan integral, arroz integral, pasta integral) eran ricos en nutrientes y fibra y, por lo tanto, saludables. Pero son ellos? ¿Reducen los biomarcadores de la enfermedad o su causa, la inflamación?De hecho, hay varios estudios que concluyen que la fibra promueve la pérdida de peso, reduce el riesgo de enfermedades cardiovasculares y diabetes tipo 2, elimina el estreñimiento y mejora la salud intestinal.Esas fueron algunas de las razones por las que decidí experimentar con comer 25 gramos de fibra todos los días durante un mes.De hecho, había continuado esa dieta alta en fibra incluso después de mi experimento.Pero eso fue antes de mi colapso de azúcar.Y no fue la primera vez que tuve un chapuzón de energía después de comer.Luego estaba mi peso.Había estado luchando por perder esas 10 libras extra(realmente 20) durante al menos dos décadas ...",
        closing: "Sin embargo, tengo la esperanza de que las cosas estén cambiando. A medida que más chefs aprendan que la mantequilla, el aceite de coco, el aceite de oliva, la manteca de cerdo y el sebo de res son grasas saludables, quizás veamos opciones de restaurantes más saludables.En cuanto a mí, nunca he esperado más la temporada de trajes de baño.Quizás haya perdido las 10 libras restantes para entonces.Pero incluso si no, me quedo con ceto.Me encanta la calma, la regularidad hormonal, la saciedad, la claridad mental, la disminución de la inflamación y la mayor concentración que obtengo cuando estoy en ceto.Es cierto que vine a ceto para perder peso, pero me quedo por los beneficios para la salud.",
        readTime: 2,
        fastReceipe: "Ingredientes: 6 huevos, 1 pizca, sal 2 cda. (25 g) aceite de coco derretido175 ml leche de coco, 125 ml(60 g) harina de coco, 1 cdta.polvo para hornear,mantequilla o aceite de coco para freír",
        photo: "https://res.cloudinary.com/dw3tnxljg/image/upload/v1589565427/Avoka/tired_gejm7k.jpg",
        tags_id: [],
        views: 0,
        status: "Borrador",
    }
]

let theUsers = []
let thetags = []
let theposts = []

let createUsers = User.create(user)
let createTags = Tag.create(tag)
let createPosts = Post.create(post)

console.log('segundo')
Promise.all([createUsers, createTags, createPosts])
    .then((results) => {
        results[0].forEach((user) => theUsers.push(user._id))
        results[1].forEach((tag) => thetags.push(tag._id))
        results[2].forEach((post) => theposts.push(post._id))
    })
    .then(() => User.findByIdAndUpdate(theUsers[0], { interest: [thetags[0], thetags[3], thetags[4]] }, { new: true }))
    .then(() => User.findByIdAndUpdate(theUsers[1], { interest: [thetags[1], thetags[2], thetags[4]] }, { new: true }))

    .then(() => Post.findByIdAndUpdate(theposts[0], { tags_id: [thetags[1], thetags[2], thetags[4]], owner: theUsers[0] }, { new: true }))
    .then(() => Post.findByIdAndUpdate(theposts[1], { tags_id: [thetags[2], thetags[4]], owner: theUsers[1] }, { new: true }))

    .then(() => mongoose.connection.close())
    .catch((err) => new Error(err))