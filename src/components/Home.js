import React, { Component } from 'react'
import imagenHome from '../assets/images/imagenSeries.jpg'

export default class Home extends Component {
  render() {
    return (
      <div>
        <div style={{marginTop:"40px"}}>
        <h1>PAGINA PRINCIPAL</h1>
        <img src={imagenHome} style={{width:"800px", marginTop:"20px"}}/>
      </div>
      </div>
    )
  }
}
