require("dotenv").config()

const mongoose = require("mongoose");
const User = require("../models/user.model")
const Tag = require("../models/tag.model")
const Post = require("../models/post.model")

const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const salt = bcrypt.genSaltSync(bcryptSalt)

mongoose.connect(`mongodb://localhost:27017/${process.env.DB}`, { useNewUrlParser: true, useUnifiedTopology: true })

User.collection.drop();
Tag.collection.drop();
Post.collection.drop();

const user = [
    {
        avatar: "https://res.cloudinary.com/dw3tnxljg/image/upload/v1589557252/Avoka/undraw_female_avatar_w3jk_xivrbo.png",
        shortBio: "Dime qué comes y te diré quién eres. ― Anthelme Brillat-Savarin",
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
    },
    {
        name: "Probando, probando, 1",
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
        closing: "¿Cuáles son las ventajas de la dieta mediterránea? //n En términos generales, no es una dieta, sino un patrón de alimentación.Por eso tú eres quien decide el menú, así como la cantidad de calorías para mantenerte o perder peso por tu cuenta. //n La dieta mediterránea se centra en comer los siguientes productos: frutas, verduras, granos integrales, alubias, frutos secos, legumbres, aceite de oliva, hierbas y especias sabrosas, pescado y mariscos(aproximadamente dos veces a la semana); pequeñas raciones de carne de ave, huevos, queso y yogurt.Los dulces y la carne roja se pueden consumir en ocasiones especiales.La dieta incluye el consumo de una copa de vino al día, pero no es obligatorio, por supuesto. //n Aquí os dejamos una bebida más adecuada para acompañar a esta dieta: el cóctel de Harmonica Linea.¿En qué consiste? Su receta es bastante sencilla: 20 gotas de Harmonica mezcladas con agua, leche o zumo. //n Las notas exóticas de Harmonica Linea combinan a la perfección con el sabor mediterráneo.El sabor de la fruta madura mezclada con la pizca de acidez que tienen las bayas enfatiza la sensación de encontrarse en la soleada costa del mar Mediterráneo. //n Hay quienes dudan de las características dietéticas de la dieta mediterránea, ya que recomienda tomar aceite de oliva, aceitunas, aguacate y algunos quesos ricos en grasas.Seguramente la eficiencia de la dieta dependa de cómo la compares con tu proceso de adelgazamiento.De todos modos, aunque algunos de los productos permitidos contienen grasas, la dieta también aporta una enorme cantidad de aminoácidos y microelementos vitales para mejorar la salud general del organismo. //n La dieta mediterránea también ofrece beneficios esenciales para la salud, tales como mejorar la salud del corazón y el cerebro, evitar el cáncer y prevenir y controlar la diabetes. //n Si decides seguir esta dieta, no olvides realizar actividad moderada.No obstante, no tienen por qué ser ejercicios físicos.Caminar, trabajar en el jardín, hacer las tareas domésticas o practicar Jazzercise es más que suficiente. //n La dieta mediterránea tiene sabores muy diversos.Hay muchas recetas para experimentar combinando los nutritivos productos de la dieta mediterránea.Compleméntalas con la riquísima Harmonica Linea y obtendrás una solución preparada para perder peso de manera saludable y placentera.",
        readTime: 1,
        fastReceipe: "Ingredientes: 6 huevos, 1 pizca, sal 2 cda. (25 g) aceite de coco derretido175 ml leche de coco, 125 ml(60 g) harina de coco, 1 cdta.polvo para hornear,mantequilla o aceite de coco para freír",
        photo: "https://res.cloudinary.com/dw3tnxljg/image/upload/v1589565427/Avoka/tired_gejm7k.jpg",
        tags_id: [],
        views: 0,
        status: "Borrador",
    },
    {
        title: "Dieta mediterránea nutritiva y variada",
        theHook: "La palabra “dieta” se suele asociar con sufrir, ¿no es así? Y es razonable porque se aplican una serie de restricciones comunes que deben seguirse durante un periodo de tiempo largo y agotador…",
        realStory: "Por suerte, hoy en día, existe una amplia gama de dietas sabrosas a la par que saludables, que resultan fáciles de seguir y no te hacen perder el buen humor. //n Hoy nos gustaría presentaros la deliciosa dieta mediterránea, que ha sido clasificada como la número 1 por el U.S. News & World Report en el ranking de Las mejores dietas del mundo. Esta dieta se valoró en base a los datos de expertos de la salud. //n El nombre de la dieta tiene su origen en los países limítrofes con el mar Mediterráneo, donde la gente tiende a consumir menos carne roja, azúcar y grasas saturadas y prefiere alimentos naturales más saludables que le ofrece la región: aceitunas, pescado, frutas, frutos secos, etc.",
        closing: "¿Cuáles son las ventajas de la dieta mediterránea? //n En términos generales, no es una dieta, sino un patrón de alimentación.Por eso tú eres quien decide el menú, así como la cantidad de calorías para mantenerte o perder peso por tu cuenta.//n La dieta mediterránea se centra en comer los siguientes productos: frutas, verduras, granos integrales, alubias, frutos secos, legumbres, aceite de oliva, hierbas y especias sabrosas, pescado y mariscos(aproximadamente dos veces a la semana); pequeñas raciones de carne de ave, huevos, queso y yogurt.Los dulces y la carne roja se pueden consumir en ocasiones especiales.La dieta incluye el consumo de una copa de vino al día, pero no es obligatorio, por supuesto.",
        readTime: 3,
        fastReceipe: "Aquí os dejamos una bebida más adecuada para acompañar a esta dieta: el cóctel de Harmonica Linea.¿En qué consiste? Su receta es bastante sencilla: 20 gotas de Harmonica mezcladas con agua, leche o zumo.//n Las notas exóticas de Harmonica Linea combinan a la perfección con el sabor mediterráneo.El sabor de la fruta madura mezclada con la pizca de acidez que tienen las bayas enfatiza la sensación de encontrarse en la soleada costa del mar Mediterráneo.//n Hay quienes dudan de las características dietéticas de la dieta mediterránea, ya que recomienda tomar aceite de oliva, aceitunas, aguacate y algunos quesos ricos en grasas.Seguramente la eficiencia de la dieta dependa de cómo la compares con tu proceso de adelgazamiento.De todos modos, aunque algunos de los productos permitidos contienen grasas, la dieta también aporta una enorme cantidad de aminoácidos y microelementos vitales para mejorar la salud general del organismo.//n La dieta mediterránea también ofrece beneficios esenciales para la salud, tales como mejorar la salud del corazón y el cerebro, evitar el cáncer y prevenir y controlar la diabetes. //n Si decides seguir esta dieta, no olvides realizar actividad moderada.No obstante, no tienen por qué ser ejercicios físicos.Caminar, trabajar en el jardín, hacer las tareas domésticas o practicar Jazzercise es más que suficiente. //n La dieta mediterránea tiene sabores muy diversos.Hay muchas recetas para experimentar combinando los nutritivos productos de la dieta mediterránea.Compleméntalas con la riquísima Harmonica Linea y obtendrás una solución preparada para perder peso de manera saludable y placentera.",
        photo: "https://res.cloudinary.com/dw3tnxljg/image/upload/v1589565427/Avoka/tired_gejm7k.jpg",
        tags_id: [],
        views: 0,
        status: "Borrador",
    },
    {
        title: "He probado la dieta carnívora y casi acaba conmigo a los 3 días",
        theHook: "Me sentía mareado y con dolor de cabeza",
        realStory: "La dieta carnívora es lo más simple que te puedas imaginar, pero también es horrible. La dieta es así: Tienes que comer carne, nada más.Es algo así como la dieta Keto llevada al extremo y se supone que la dieta carnívora ha ayudado a muchas personas a perder peso y solucionar diversos problemas de salud.Acepté probarla en nombre del periodismo y porque la idea de perder un poco de peso sonaba muy bien.De todas formas, estaba preocupado.Creo firmemente en la necesidad de tomar suplementos de fibra.¿Podría ocurrir que acabara como aquel tío al que tuvieron que operarle para sacarle 5 kg de heces?. La raíz de la dieta de los carnívoros nos lleva a pueblos indígenas como los Inuit, que consiguieron sobrevivir principalmente matando animales y comiéndoselos(según algunos estudios, es posible que sus genes estén particularmente adaptados para ello).Esta dieta consiguió la atención de mucha gente a comienzos de este verano, cuando Jordan Peterson, un conocido pseudo- intelectual, la respaldó en un podcast de Joe Rogan.Peterson y su hija Mikhaila, una bloguera de estilo de vida, apostaron por la dieta basada exclusivamente en carne, que llevan siguiendo desde finales de 2017. El doctor Drew Pinsky también se subió al carro de la dieta carnívora: -Que me parta un rayo si no me he sentido increíble tras tres días de dieta-, comentó al New York Post. //n Yo tenía la información básica sobre la dieta carnívora antes de probarla.Se trata de generar el proceso de cetosis para que tu cuerpo comience a quemar la grasa para conseguir energía, en vez, de los carbohidratos.Se parece a la dieta Keto pero presenta más limitaciones respecto a los alimentos que puedes comer. //n De todas las dietas que he conocido, es la más extrema en lo que respecta a las limitaciones.Nunca había visto otra igual.Esto es lo que me dijo Scott Hemingway, un nutricionista clínico del sistema de salud de la Universidad de Carolina del Norte, después de que yo probara la dieta. //n Es probable que lo suyo hubiera sido llamarle antes de lanzarme a lo loco hacia el país de la carne. //n En cuanto a las normas de la dieta, decidí seguir la versión más permisiva de la dieta que encontré en este blog: comer carne, mantequilla, quesos duros y huevos está permitido.En cuanto a las bebidas, agua o té verde helado. (Yo no bebo café pero también está permitido).Normalmente, esta dieta solo permite utilizar sal rosa del Himalaya, lo cual sonaba como una mentira bien financiada por el lobby de la sal rosa del Himalaya.Juré no cumplir con esa norma y utilicé cualquier condimento seco que quise para ayudarme con el consumo de carne, siempre que no supusieran un aporte nutricional ni energético.",
        closing: "Después de mi dieta carnívora //n Quería entender un poco mejor por qué mi cuerpo había colapsado de tal manera al llevar una dieta carnívora, así que me puse en contacto con Hemingway, el nutricionista. //n Mi primer error fue intentar hacer ejercicio demasiado rápido estando en una dieta cetogénica.Según el tipo de dieta y la rutina de entrenamiento de cada uno, puede llevar desde tres días hasta varias semanas hacer que nuestro cuerpo se adapte a una dieta Keto, me explicó Hemingway. (Sin duda alguna, el mío no se había adaptado a los tres días). //n El letargo de tu cuerpo, que intentaba obtener fuentes de energía, puede explicar perfectamente esos síntomas tan desagradables, me dijo.Y hay una muy buena razón por la que las batatas sirvieron para curarme. //n Básicamente, llevabas tres días privando a tu cerebro de su principal fuente de energía y luego, de repente, le diste lo que estaba deseando, me dijo Hemingway mientras se reía.Esa es la razón por la que te sentiste mejor. // Algunas personas consiguen grandes resultados con la dieta Keto.Pero, ¿realmente merece la pena llevarla más allá y privarnos de alimentos saludables como el brócoli o las zanahorias? //n -Yo, personalmente, no recomendaría a nadie dejar de comer verduras, me dijo Hemingway. No hay mucha evidencia científica, si es que hay alguna, que apoye la idea de que consumir verduras pueda tener efectos negativos sobre nuestra dieta general. Ni tampoco encuentro ninguna razón de peso para dejar de consumir fibra. Normalmente, me quedo con la ciencia, - sentenció Hemingway. -Si hay personas que encuentran opciones que les hacen sentirse mejor o que funciona con ellos, no tengo ningún problema con apoyarles.Pero, realmente no hay evidencia científica que apoye estas afirmaciones actuales y, desde luego, no se ha investigado lo suficiente como para poder determinar los potenciales efectos a largo plazo, tanto si son positivos como negativos, de una dieta milagro como esta. //n Yo no soy nutricionista, pero he probado esta dieta y te puedo decir una cosa: La odio.A lo mejor hay personas a las que les funciona, pero, desde luego, a mi no.Si quieres probar una dieta Keto estándar, no te pierdas nuestros consejos y a lo mejor es buena idea que no pases por el gimnasio durante los primeros tres días. //n Vía: Men's Health. Traducción: blarlo.com",
        readTime: 2,
        fastReceipe: "",
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

Promise.all([createUsers, createTags, createPosts])
    .then((results) => {
        results[0].forEach((user) => theUsers.push(user._id))
        results[1].forEach((tag) => thetags.push(tag._id))
        results[2].forEach((post) => theposts.push(post._id))
    })
    .then(() => User.findByIdAndUpdate(theUsers[0], { interest: [thetags[0], thetags[3], thetags[4]] }, { new: true }))
    .then(() => User.findByIdAndUpdate(theUsers[1], { interest: [thetags[1], thetags[2], thetags[4]] }, { new: true }))

    .then(() => Post.findByIdAndUpdate(theposts[0], { tags_id: [thetags[1], thetags[2], thetags[4]], owner: theUsers[0] }, { new: true }))
    .then(() => Post.findByIdAndUpdate(theposts[1], { tags_id: [thetags[1], thetags[4]], owner: theUsers[1] }, { new: true }))
    .then(() => Post.findByIdAndUpdate(theposts[2], { tags_id: [thetags[3]], owner: theUsers[0] }, { new: true }))

    .then(() => mongoose.connection.close())
    .catch((err) => new Error(err))