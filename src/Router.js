import React, { Component } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import MenuNavbar from './components/MenuNavbar'
import Home from './components/Home'
import DetallesSeries from './components/DetallesSeries'
import DetallesPersonajes from './components/DetallesPersonajes'
import CrearPersonaje from './components/CrearPersonaje'
import ModificarPersonaje from './components/ModificarPersonaje'

export default class Router extends Component {
  render() {

    function MostrarSerieElement(){
        var { idSerie } = useParams();

        return (<DetallesSeries idSerie={idSerie} />);
    }

    function MostrarPersonajesElement(){
        var { idSerie } = useParams();

        return (<DetallesPersonajes idSerie={idSerie} />);
    }

    return (
      <BrowserRouter>
        <MenuNavbar />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/detalles/:idSerie' element={<MostrarSerieElement />} />
            <Route path='/detallesPersonajes/:idSerie' element={<MostrarPersonajesElement />} />
            <Route path='/nuevoPersonaje' element={<CrearPersonaje />} />
            <Route path='/modificarPersonaje' element={<ModificarPersonaje />} />
        </Routes>
      </BrowserRouter>
    )
  }
}
