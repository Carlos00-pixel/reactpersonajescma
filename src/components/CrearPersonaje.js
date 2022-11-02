import React, { Component } from 'react'
import Global from '../Global';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default class CrearPersonaje extends Component {

    cajaNombre = React.createRef();
    cajaImagen = React.createRef();
    cajaSelect = React.createRef();

    state = {
        series: [],
        statusSeries: false,
        statusPersonaje: false,
        personajes: []
    }

    mostrarSeries = () => {
        var request = "/api/Series"
        var url = Global.url + request;

        axios.get(url).then(response => {
            this.setState({
                series: response.data,
                statusSeries: true
            })
        });
    }

    componentDidMount = () => {
        this.mostrarSeries();
    }

    insertarPersonaje = (e) => {
        e.preventDefault();

        var request = "/api/Personajes";
        var url = Global.url+ request;

        var nombre = this.cajaNombre.current.value;
        var imagen = this.cajaImagen.current.value;
        var select  = parseInt(this.cajaSelect.current.value);

        var personaje = {
            nombre: nombre,
            imagen: imagen,
            idSerie: select
        }

        console.log(personaje);

        axios.post(url, personaje).then(response => {
            this.setState({
                personajes: response.data,
                statusPersonaje: true
            })
        })
    }


  render() {
    if(this.state.statusSerie == true) {
        return(<Navigate to="/"/>);
    }
    return (
      <div>
        <h1 style={{color: "blue"}}>Nuevo Personaje</h1>
        <form style={{width:"600px", margin:"0 auto"}}>
            <label>Nombre</label><br/>
            <input type="text" className='form-control' ref={this.cajaNombre}/><br/>

            <label>Imagen</label><br/>
            <input type="text" className='form-control' ref={this.cajaImagen}/><br/>

            <label>Serie</label><br/>
            <select className='form-control' ref={this.cajaSelect}>
                {
                    this.state.statusSeries == true &&
                    (
                        this.state.series.map((serie, index) => {
                            return(
                                <option key={serie.idSerie} value={serie.idSerie}>
                                        {serie.nombre}
                                </option>
                            );
                        })
                    )
                }
            </select><br/>

            <button className='btn btn-success' onClick={this.insertarPersonaje}>Insertar Personaje</button>
        </form>
      </div>
    )
  }
}
