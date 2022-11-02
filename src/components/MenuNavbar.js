import React, { Component } from 'react'
import imagenST from '../assets/images/imagenST.png'
import Global from './../Global'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

export default class MenuNavbar extends Component {

    state = {
        series: [],
        status: false
    }

    mostrarSeries = () => {
        var request = "/api/Series"
        var url = Global.url + request;

        axios.get(url).then(response => {
            this.setState({
                series: response.data,
                status: true
            })
        });
    }

    componentDidMount = () => {
        this.mostrarSeries();
    }

  render() {
    return (
        <nav className="navbar navbar-expand-lg bg-info">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/"><img src={imagenST} style={{width:"125px"}}/></NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/nuevoPersonaje">Nuevo Personaje</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={"/modificarPersonaje"}>Modificar Personajes</NavLink>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Series
                </a>
                <ul className="dropdown-menu">
                    {
                        this.state.status == true &&
                        (
                            this.state.series.map((serie, index) => {
                                return(
                                    <li style={{width:"250px"}} key={serie.idSerie}>
                                        <NavLink to={"/detalles/" + serie.idSerie} className="dropdown-item">
                                            {serie.nombre}
                                        </NavLink>
                                    </li>
                                );
                            })
                        )
                    }
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}
