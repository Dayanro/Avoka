# Avoka

BACK ROUTES

|Id | Method  |  Path             | Description                                      | Querys         |
|---|:-------:|:-----------------:|:------------------------------------------------:|---------------:|
| 1 |post     |/api/users         |Crea un usuario                                   |                |
| 2 |get      |/api/users         |Obtiene los usuarios                              |                |
| 3 |get      |/api/users/:id     |Obtiene el usuario con el id especificado         |                |
| 4 |put      |/api/users/:id     |Actualiza el usuario con el id especificado       |                |
| 5 |delete   |/api/users/:id     |Elimina el usuario con el id especificado         |                |
| 6 |post     |/api/posts         |Crea un post                                      |                |
| 7 |get      |/api/posts         |Obtiene los posts                                 |?tags&keyphrase |
| 8 |get      |/api/posts/:id     |Obtiene el post con el id especificado            |                |
| 9 |put      |/api/posts/:id     |Actualiza el post con el id especificado          |                |
| 10|delete   |/api/posts/:id     |Elimina el post con el id especificado            |                |
| 11|post     |/api/tags          |Crea un tag                                       |                |
| 12|get      |/api/tags          |Obtiene los tags                                  |                |
| 13|get      |/api/tags/:id      |Obtiene el tag con el id especificado             |                |
| 14|put      |/api/tags/:id      |Actualiza el tag con el id especificado           |                |
| 15|delete   |/api/tags/:id      |Elimina el tag con el id especificado             |                |
| 16|post     |/api/session       |Autentica al usuario y crea una sesion            |                |
| 17|delete   |/api/session       |La sesion es cerrada                              |                |

FRONT ROUTES

|Id | Path          |  Component        | Description                                    | Querys         |
|---|:-------------:|:-----------------:|:----------------------------------------------:|---------------:|
| 1 |/              |Index              |Vista principal de la aplicacion                |                |
| 2 |/login         |LogIn              |Vista Inicio de sesion                          |                |
| 3 |/signup        |SignUp             |Vista de Registro                               |                |
| 4 |/profile       |Profile            |Vista del Perfil                                |                |
| 5 |/newpost       |NewPost            |Vista Creacion de un nuevo post                 |                |
| 6 |/myposts       |MyPost             |Vista del listado de posts                      |                |
| 7 |/readinglist   |ReadingList        |Vista del listado de lecturas                   |                |
| 8 |/interests     |Interests          |Vista de Intereses                              |                |
| 9 |/post/:_id     |PostDetails        |Vista del post con el id especificado           |                |
|10 |/popularposts  |popularPosts       |Vista los 3  posts con mayores visitas          |                |
|11 |/allposts      |allposts           |Vista del listado de posts                      |                |
|12 |/tag           |tag               |Vista del listado de tags                       |                |