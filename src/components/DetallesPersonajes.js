import React, { Component } from 'react'
import Global from '../Global'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

export default class DetallesPersonajes extends Component {

    state = {
        personajes: [],
        status: true
    }

    mostrarPersonajes = () => {
        var numero = this.props.idSerie
        var request = "/api/Series/PersonajesSerie/"+numero
        var url = Global.url + request;

        axios.get(url).then(response => {
            this.setState({
                personajes: response.data,
                status: true
            })
        });
    }

    componentDidMount = () => {
        this.mostrarPersonajes();
    }

  render() {
    return (
        <div>
            <h1>Detalles Personajes {this.props.idSerie}</h1>
            <NavLink className="btn btn-danger" to={"/detalles/"+this.props.idSerie}>Volver</NavLink>
            <table className='table table-dark' style={{width:"1100px", margin:"0 auto", marginTop:"10px", textAlign:"center"}}>
                <thead>
                    <tr>
                        <th>PERSONAJE</th>
                        <th>IMAGEN</th>
                    </tr>
                </thead>
                <tbody>
                {
                    this.state.status == true &&
                    (
                        this.state.personajes.map((personaje, index) => {
                            return (
                                <tr>
                                    <td>{personaje.nombre}</td>
                                    <td><img src={personaje.imagen} style={{width:"250px"}}/></td>
                                </tr>
                            )
                        })
                    )

                }
                </tbody>
            </table>
        </div>
    )
  }
}
