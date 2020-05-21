import React, { Component } from 'react'
import { withRouter } from 'react-router'
import './NewPost.css'

import UserService from '../../../../service/user.service'
import TagService from '../../../../service/tag.service'
import PostService from '../../../../service/post.service'
import ReactTags from 'react-tag-autocomplete'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';


import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'


class UpdatePost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            post: {},
            id: "",
            title: "",
            owner: "",
            theHook: "",
            realStory: "",
            expandOnThePoint: "",
            closing: "",
            readTime: 0,
            fastReceipe: "",
            photo: "",
            views: 0,
            status: "Publicado",
            tags_id: [],
            tags: [],
            values: [],


            theme1: 'snow',
            theme2: 'bubble'
        }
        this.userService = new UserService()
        this.tagService = new TagService()
        this.postService = new PostService()

    }


    componentDidMount() {
        if (Object.keys(this.props.posts).length > 0) {
            const post = this.props.posts.filter(post => post._id == this.props.match.params.id)[0]
            this.setState({
                id: post._id,
                title: post.title,
                owner: post.owner,
                theHook: post.theHook,
                realStory: post.realStory,
                expandOnThePoint: post.expandOnThePoint,
                closing: post.closing,
                readTime: post.readTime,
                fastReceipe: post.fastReceipe,
                photo: post.photo,
                views: post.views,
                status: this.state.status,
                tags_id: post.tags_id,
                post
            })
        }
        this.getAllTags()
    }

    componentDidUpdate(prevProps) {
        if (Object.keys(prevProps.posts).length <= 0 && Object.keys(this.props.posts).length > 0) {
            const post = this.props.posts.filter(post => post._id == this.props.match.params.id)[0]
            this.setState({
                id: post._id,
                title: post.title,
                owner: post.owner,
                theHook: post.theHook,
                realStory: post.realStory,
                expandOnThePoint: post.expandOnThePoint,
                closing: post.closing,
                readTime: post.readTime,
                fastReceipe: post.fastReceipe,
                photo: post.photo,
                views: post.views,
                status: this.state.status,
                tags_id: post.tags_id,
                post
            })
        }
    }

    handleChangeTitle = (text) => {
        this.setState({ title: text });
        
    }
    handleChangePhoto = (e) => {
        const photo = e.target.files[0]
        this.setState({ photo });
        
    }

    handleChangeTheHook = (text) => {
        this.setState({ theHook: text });
      
    }

    handleChangeRealStory = (text) => {
        this.setState({ realStory: text });
       
    }

    handleChangeExpandOnThePoint = (text) => {
        this.setState({ expandOnThePoint: text });
        
    }

    handleChangeClosing = (text) => {
        this.setState({ closing: text });
       
    }

    handleChangeFastReceipe = (text) => {
        this.setState({ fastReceipe: text });
       
    }

    updatePost = (e, status) => {
        e.preventDefault()
        const tagsId = this.state.values.map(tag => tag._id)
        const uploadData = new FormData()
        uploadData.append("photo", this.state.photo)
        uploadData.append("owner", this.props.loggedInUser._id)
        uploadData.append("title", this.state.title)
        uploadData.append("theHook", this.state.theHook)
        uploadData.append("realStory", this.state.realStory)
        uploadData.append("expandOnThePoint", this.state.expandOnThePoint)
        uploadData.append("closing", this.state.closing)
        uploadData.append("readTime", this.state.readTime)
        uploadData.append("fastReceipe", this.state.fastReceipe)
        uploadData.append("views", this.state.views)
        uploadData.append("status", status || this.state.status)
        uploadData.append("tags_id", tagsId)
        this.postService.updatePost(this.state.id, uploadData)
            .then((response) => {
                this.props.updatePost(response.data)
                this.props.history.push('/post/me')
            })
            .catch(err => console.log(err))
    }

    scheduleForLater = e => {
        this.updatePost(e, "Borrador")
    }

    getAllTags = () => {
        this.tagService.getAllTags()
            .then(response => {
                const tags = response.data.map(tag => ({ ...tag, id: tag._id }))
                this.setState({ tags })
            })
            .catch(err => console.log(err))
    }

    handleInputTag = e => {
        const value = e.target.value
        this.setState({ value })
    }

    handleDelete = (i) => {
        const values = this.state.values.slice(0)
        values.splice(i, 1)
        this.setState({ values })
    }

    handleAddition = (tag) => {
        const values = [].concat(this.state.values, tag)
        this.setState({ values })
    }

    render() {
        return (
            <div >
                <Container fluid="md" as="section" className="newPost">

                    <div id="title" className="block">
                        <div className="note" >
                            <img src="/img/undraw_wall_post_83ul.svg" className="picture" />
                            <p>Para empezar,escribe un título. </p>
                        </div>
                        <div className="titleEditor" style={{ marginBottom: "20px", height: "100%" }}>
                            <ReactQuill
                                theme={this.state.theme2}
                                onChange={this.handleChangeTitle}
                                value={this.state.title || ''}
                                modules={UpdatePost.modules}
                                formats={UpdatePost.formats}
                                bounds={'.app'}
                                placeholder={"Titulo..."}
                                style={{ height: "100px", width: "700px" }}
                            />
                        </div>
                    </div>

                    <div id="theHook" className="block" >
                        <div className="note">
                            <img src="/img/undraw_body_text_l3ld.svg" className="picture" />
                            <p><strong>El gancho:</strong> Punto(s) principal(es) de la publicación,improvisa alguna historia y, si te ves suelto, dale un toque ‘viral’ generando algo de curiosidad.</p>
                        </div>
                        <div className="theHookEditor" style={{ marginBottom: "20px", height: "100%" }}>
                            <ReactQuill
                                theme={this.state.theme2}
                                onChange={this.handleChangeTheHook}
                                value={this.state.theHook || ''}
                                modules={UpdatePost.modules}
                                formats={UpdatePost.formats}
                                bounds={'.app'}
                                placeholder={"Subtítulo o entradilla..."}
                                style={{ height: "100px", width: "700px" }}
                            />
                        </div>
                    </div>

                    <div id="photo" className="block">
                        <div className="notePicture">
                            <img src="/img/undraw_image_post_24iy.svg" className="picture" />
                            <p>Las imágenes de cabecera son opcionales, pero aportan un impacto visual tremendo, por lo que su utilización es más que recomendable. Para añadir una, haz click en el icono situado sobre el titular y selecciónala de entre los archivos de tu disco duro.</p>
                        </div>
                        <label id="largeFile" for="file">
                            <input type="file" id="file" name="photo" onChange={this.handleChangePhoto} />
                        </label>
                    </div>

                    
                    <div id="realStory" className="block">
                        <div className="note">
                            <img src="/img/undraw_researching_22gp.svg" className="picture" />
                            <p>Con tu espectacular cabecera ya en su sitio, es hora de ponerse manos a la obra con el texto propiamente dicho</p>
                        </div>
                        <div className="realStoryEditor" style={{ marginBottom: "20px" }}>
                            <ReactQuill
                                theme={this.state.theme2}
                                onChange={this.handleChangeRealStory}
                                value={this.state.realStory || ''}
                                modules={UpdatePost.modules}
                                formats={UpdatePost.formats}
                                bounds={'.app'}
                                placeholder={"Cuentanos tu historia..."}
                                style={{ height: "300px", width: "700px" }}
                            />
                        </div>
                    </div>

                    <div id="realStory" className="block">
                        <div className="note">
                            <img src="/img/undraw_ideas_s70l.svg" className="picture" />
                            <p><strong>Ampliar la idea: </strong>En caso de que desees profundizar podrías utilizar fuentes de apoyo (como otros artículos, recursos o citas)</p>
                        </div>
                        <div className="expandOnThePointEditor" style={{ marginBottom: "20px" }}>
                            <ReactQuill
                                theme={this.state.theme2}
                                onChange={this.handleChangeExpandOnThePoint}
                                value={this.state.expandOnThePoint || ''}
                                modules={UpdatePost.modules}
                                formats={UpdatePost.formats}
                                bounds={'.app'}
                                placeholder={"...Y en caso de que desearas profundizar acerca del tema a tratar..."}
                                style={{ height: "300px", width: "700px" }}
                            />
                        </div>
                    </div>

                    <div id="closing" className="block">
                        <div className="note">
                            <img src="/img/undraw_done_a34vs.svg" className="picture" />
                            <p><strong>Cierre: </strong>a medida que terminas los puntos de la historia, querrás concluir todo con otra conexión que se vincula con el gancho, la historia y luego llevarlo a una llamada a la acción. El llamado a la acción suele ser el aspecto final del artículo y, por lo general, es el mejor momento para lograr que un lector tome lo mejor de tu experiencia.</p>
                        </div>
                        <div className="closingEditor" style={{ marginBottom: "20px" }}>
                            <ReactQuill
                                theme={this.state.theme2}
                                onChange={this.handleChangeClosing}
                                value={this.state.closing || ''}
                                modules={UpdatePost.modules}
                                formats={UpdatePost.formats}
                                bounds={'.app'}
                                placeholder={"¡Enhorabuena  has terminado tu post."}
                                style={{ height: "300px", width: "700px" }}
                            />
                        </div>
                    </div>

                    <div id="fastReceipe" className="block">
                        <div className="note">
                            <img src="/img/undraw_diet_ghvw.svg" className="picture" />
                            <p></p>
                        </div>
                        <div className="fastReceipeEditor" style={{ marginBottom: "20px" }}>
                            <ReactQuill
                                theme={this.state.theme2}
                                onChange={this.handleChangeFastReceipe}
                                value={this.state.fastReceipe || ''}
                                modules={UpdatePost.modules}
                                formats={UpdatePost.formats}
                                bounds={'.app'}
                                placeholder={"¿Alguna receta rápida para compartir?"}
                                style={{ height: "300px", width: "700px" }}
                            />
                        </div>
                    </div>
                    <div >
                        <ReactTags
                            tags={this.state.values}
                            suggestions={this.state.tags}
                            handleDelete={this.handleDelete}
                            handleAddition={this.handleAddition}
                            placeholder="No olvides Agregar tags para que los lectores sepan de qué trata tu post."
                        />
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-end", margin: "40px 0px" }}>
                        <Button style={{ marginRight: "20px" }} variant="info" onClick={this.updatePost}>Publicar</Button>
                        <Button variant="info" onClick={this.scheduleForLater}>Guardar para despues</Button>
                    </div>

                    <footer>
                        <h2>Autor: {this.props.loggedInUser ? this.props.loggedInUser.username : ""}</h2>

                    </footer>
                </Container>
            </div>
        )
    }
}

UpdatePost.modules = {
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
UpdatePost.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
]

export default withRouter(UpdatePost)