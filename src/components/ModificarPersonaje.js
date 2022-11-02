import React, { Component } from 'react'
import { Navigate, NavLink } from 'react-router-dom';
import Global from '../Global';
import axios from 'axios';

export default class ModificarPersonaje extends Component {

    cajaIdSerieRef = React.createRef();
    cajaIdPersonajeRef = React.createRef();

    state = {
        series: [],
        statusSeries: false,
        statusPersonaje: false,
        personajes: [],
        status: false
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

    mostrarPersonajes = () => {
        var request = "/api/Personajes"
        var url = Global.url + request;

        axios.get(url).then(response => {
            this.setState({
                personajes: response.data,
                statusPersonaje: true
            })
        });
    }

    componentDidMount = () => {
        this.mostrarSeries();
        this.mostrarPersonajes();
    }

    modificarPersonaje = (e) => {
        e.preventDefault();

        var valIdSerie = parseInt(this.cajaIdSerieRef.current.value);
        var valIdPersonaje = parseInt(this.cajaIdPersonajeRef.current.value);

        var data = {
            idSerie: valIdSerie,
            idPersonaje: valIdPersonaje,

        }

        console.log(data);

        var request = "/api/Personajes/"+valIdPersonaje+"/"+valIdSerie;
        var url = Global.url + request;

        axios.put(url, data).then(response => {
            this.setState({
                status: true
            });
        })
    }

  render() {
    if(this.state.status == true) {
        return(<Navigate to={"/detallesPersonajes/"+parseInt(this.cajaIdSerieRef.current.value)}/>);
    }
    return (
      <div>
        <h1>Modificar Personajes y series</h1>
        <form style={{width:"600px", margin:"0 auto"}}>

            <label>Seleccione una serie:</label><br/>
            <select className='form-control' ref={this.cajaIdSerieRef} onChange={this.mostrarSeriePintado}>
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

            <label>Seleccione un personaje:</label><br/>
            <select className='form-control' ref={this.cajaIdPersonajeRef}>
                {
                    this.state.statusPersonaje == true &&
                    (
                        this.state.personajes.map((personaje, index) => {
                            return(
                                <option key={personaje.idPersonaje} value={personaje.idPersonaje}>
                                        {personaje.nombre}
                                </option>
                            );
                        })
                    )
                }
            </select><br/>

            <button className='btn btn-info' onClick={this.modificarPersonaje}>Guardar Cambios</button>
        </form>
      </div>
    )
  }
}
