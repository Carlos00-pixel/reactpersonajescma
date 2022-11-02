import React, { Component } from 'react'
import axios from 'axios'
import Global from './../Global'
import { NavLink } from 'react-router-dom'

export default class DetallesSeries extends Component {

    state = {
        serie: {},
        status: false
    }

    loadSeries = () => {
        var numeroId = this.props.idSerie;
        var request = "/api/Series/"+numeroId;
        var url = Global.url + request;

        axios.get(url).then(response => {
            this.setState({
                serie: response.data,
                status: true
            })
        });
    }

    componentDidUpdate = (oldProps) => {
        if(oldProps.idSerie != this.props.idSerie){
            this.loadSeries();
        }
    }

    componentDidMount = () => {
        this.loadSeries();
    }

  render() {
    return (
      <div>
        <h1>Detalles Series: {this.props.idSerie}</h1>
        {
            this.state.status == true &&
            (
                <div className="card" style={{width: "18rem", margin:"0 auto"}}>
                    <img src={this.state.serie.imagen} className="card-img-top" />
                    <div className="card-body">
                        <h5 className="card-title">{this.state.serie.nombre}</h5>
                        <p className="card-text">IMDB: {this.state.serie.puntuacion}</p>
                        <NavLink to={"/detallesPersonajes/"+this.state.serie.idSerie} className="btn btn-success">Personajes</NavLink>
                    </div>
                </div>
            )
        }
      </div>
    )
  }
}
