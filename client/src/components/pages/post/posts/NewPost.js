import React, { Component } from 'react'
import './NewPost.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

import Container from 'react-bootstrap/Container'


class NewPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            owner: "",
            theHook: "",
            realStory: "",
            expandOnThePoint: "",
            closing: "",
            readTime: 0,
            fastReceipe: "",
            photo: "",
            editorHtml: "",
            views: 0,
            status: "Borrador",
            tags_id: [],

            theme1: 'snow',
            theme2: 'bubble'
        }

    }

    handleChangeTitle = (text) => {
        this.setState({ title: text });
        console.log(this.state.title)
    }
    handleChangePhoto = (image) => {
        this.setState({ photo: image });
        console.log(this.state.photo)
    }

    handleChangeTheHook = (text) => {
        this.setState({ theHook: text });
        console.log(this.state.theHook)
    }

    handleChangeRealStory = (text) => {
        this.setState({ realStory: text });
        console.log(this.state.realStory)
    }

    handleChangeExpandOnThePoint = (text) => {
        this.setState({ expandOnThePoint: text });
        console.log(this.state.expandOnThePoint)
    }

    handleChangeClosing = (text) => {
        this.setState({ closing: text });
        console.log(this.state.closing)
    }

    handleChangeFastReceipe = (text) => {
        this.setState({ fastReceipe: text });
        console.log(this.state.fastReceipe)
    }

    render() {
        console.log("PROPS-POST", this.props)
        return (
            <div >
                <Container fluid="md" as="section" className="newPost">
                    <div className="title" style={{ display: "flex", height: "20%" }}>
                        <div className="titleDef" style={{ display: "flex", flexDirection: "column", width: "50%", marginRight: "30px" }}>
                            <img src="/img/undraw_wall_post_83ul.svg" style={{ width: "100%", objectFit: "cover" }} />
                            <p>Para empezar, escribe un título. </p>
                        </div>
                        <div className="titleEditor" style={{ backgroundColor: "white", marginBottom: "20px", height: "100%" }}>
                            <ReactQuill
                                theme={this.state.theme2}
                                onChange={this.handleChangeTitle}
                                value={this.state.title}
                                modules={NewPost.modules}
                                formats={NewPost.formats}
                                bounds={'.app'}
                                placeholder={"Titulo..."}
                                style={{ height: "100px", width: "700px" }}
                            />
                        </div>
                    </div>

                    <div className="theHook" style={{ display: "flex", height: "20%" }}>
                        <div className="description" style={{ display: "flex", flexDirection: "column", width: "50%", marginRight: "30px" }}>
                            <img src="/img/undraw_body_text_l3ld.svg" style={{ width: "100%", objectFit: "cover" }} />
                            <p><strong>El gancho:</strong> Punto(s) principal(es) de la publicación,improvisa alguna historia y, si te ves suelto, dale un toque ‘viral’ generando algo de curiosidad.</p>
                        </div>
                        <div className="theHookEditor" style={{ backgroundColor: "white", marginBottom: "20px", height: "100%" }}>
                            <ReactQuill
                                theme={this.state.theme2}
                                onChange={this.handleChangetheHook}
                                value={this.state.theHook}
                                modules={NewPost.modules}
                                formats={NewPost.formats}
                                bounds={'.app'}
                                placeholder={"Subtítulo o entradilla..."}
                                style={{ height: "100px", width: "700px" }}
                            />
                        </div>
                    </div>

                    <div className="photo" style={{ display: "flex", height: "20%" }}>
                        <div className="description" style={{ display: "flex", flexDirection: "column", width: "50%", marginRight: "30px" }}>
                            <img src="/img/undraw_image_post_24iy.svg" style={{ width: "100%", objectFit: "cover" }} />
                            <p>Las imágenes de cabecera son opcionales, pero aportan un impacto visual tremendo, por lo que su utilización es más que recomendable. Para añadir una, haz click en el icono situado sobre el titular y selecciónala de entre los archivos de tu disco duro.</p>
                        </div>
                        <div className="photoEditor" >
                            <ReactQuill
                                theme={this.state.theme2}
                                onChange={this.handleChangephoto}
                                value={this.state.photo}
                                modules={NewPost.modules}
                                formats={NewPost.formats}
                                bounds={'.app'}
                                placeholder={"Selecciona la imagen"}
                                style={{ height: "300px", width: "700px" }}
                            />
                        </div>
                    </div>

                    <div className="realStory" style={{ display: "flex", height: "20%" }}>
                        <div className="description" style={{ display: "flex", flexDirection: "column", width: "50%", marginRight: "30px" }}>
                            <img src="/img/undraw_researching_22gp.svg" style={{ width: "100%", objectFit: "cover" }} />
                            <p>Con tu espectacular cabecera ya en su sitio, es hora de ponerse manos a la obra con el texto propiamente dicho</p>
                        </div>
                        <div className="realStoryEditor" style={{ marginBottom: "20px" }}>
                            <ReactQuill
                                theme={this.state.theme2}
                                onChange={this.handleChangerealStory}
                                value={this.state.realStory}
                                modules={NewPost.modules}
                                formats={NewPost.formats}
                                bounds={'.app'}
                                placeholder={"Cuentanos tu historia..."}
                                style={{ height: "300px", width: "700px" }}
                            />
                        </div>
                    </div>

                    <div className="realStory" style={{ display: "flex", height: "20%" }}>
                        <div className="description" style={{ display: "flex", flexDirection: "column", width: "50%", marginRight: "30px" }}>
                            <img src="/img/undraw_ideas_s70l.svg" style={{ width: "100%", objectFit: "cover" }} />
                            <p><strong>Ampliar la idea: </strong>En caso de que desees profundizar podrías utilizar fuentes de apoyo (como otros artículos, recursos o citas)</p>
                        </div>
                        <div className="expandOnThePointEditor" style={{ marginBottom: "20px" }}>
                            <ReactQuill
                                theme={this.state.theme2}
                                onChange={this.handleChangeExpandOnThePoint}
                                value={this.state.expandOnThePoint}
                                modules={NewPost.modules}
                                formats={NewPost.formats}
                                bounds={'.app'}
                                placeholder={"...Y en caso de que desearas profundizar acerca del tema a tratar..."}
                                style={{ height: "300px", width: "700px" }}
                            />
                        </div>
                    </div>

                    <div className="closing" style={{ display: "flex", height: "20%" }}>
                        <div className="description" style={{ display: "flex", flexDirection: "column", width: "50%", marginRight: "30px" }}>
                            <img src="/img/undraw_done_a34vs.svg" style={{ width: "100%", objectFit: "cover" }} />
                            <p><strong>Cierre: </strong>a medida que terminas los puntos de la historia, querrás concluir todo con otra conexión que se vincula con el gancho, la historia y luego llevarlo a una llamada a la acción. El llamado a la acción suele ser el aspecto final del artículo y, por lo general, es el mejor momento para lograr que un lector tome lo mejor de tu experiencia.</p>
                        </div>
                        <div className="closingEditor" style={{ marginBottom: "20px" }}>
                            <ReactQuill
                                theme={this.state.theme2}
                                onChange={this.handleChangeClosing}
                                value={this.state.closing}
                                modules={NewPost.modules}
                                formats={NewPost.formats}
                                bounds={'.app'}
                                placeholder={"¡Enhorabuena  has terminado tu post."}
                                style={{ height: "300px", width: "700px" }}
                            />
                        </div>
                    </div>


                    <div className="fastReceipe" style={{ display: "flex", height: "20%" }}>
                        <div className="description" style={{ display: "flex", flexDirection: "column", width: "50%", marginRight: "30px" }}>
                            <img src="/img/undraw_diet_ghvw.svg" style={{ width: "100%", objectFit: "cover" }} />
                            <p></p>
                        </div>

                        <div className="fastReceipeEditor" style={{ marginBottom: "20px" }}>
                            <ReactQuill
                                theme={this.state.theme2}
                                onChange={this.handleChangeFastReceipe}
                                value={this.state.fastReceipe}
                                modules={NewPost.modules}
                                formats={NewPost.formats}
                                bounds={'.app'}
                                placeholder={"¿Alguna receta rápida para compartir?"}
                                style={{ height: "300px", width: "700px" }}
                            />
                        </div>
                    </div>
                    <footer>
                        <h2>Autor: {this.props.loggedInUser ? this.props.loggedInUser.username : ""}</h2>
                    </footer>
                </Container>
            </div>
        )
    }
}

NewPost.modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean']
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    }
}
NewPost.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
]

export default NewPost