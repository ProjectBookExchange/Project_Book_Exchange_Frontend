// import React from 'react'
// import MangaService from '../services/MangaService'

// class Profile extends React.Component{

//   state = {
//     leidos: [],
//     leidosFull: [],
//     leyendo: [],
//     leyendoFull: [],
//     porLeer: [],
//     porLeerFull: []
//   }

//   service = new MangaService()

//   componentDidMount(){
//     this.service.getUser(this.props.isLogged._id)
//     .then((response)=>{
//       this.setState({leidos: [...response.leidos], leyendo: [...response.leyendo], porLeer: [...response.porLeer]})
//       this.getFullLeidos()
//       this.getFullLeyendo()
//       this.getFullPorLeer()
//     })
//     .catch((err)=>{
//       console.log(err)
//     })
//   }

//   getFullLeidos = ()=>{
//     const prueba = this.state.leidos.map((_id)=>{

//       return fetch(`https://api.jikan.moe/v3/manga/${_id}`)
//       .then((data)=>{
//         return data.json()
//       })
//       .then((dataJSON)=>{
//         return dataJSON
//       })
//     })

//     Promise.all(prueba)
//     .then((result)=>{
//       this.setState({leidosFull : result})
//     })
//   }

//   getFullLeyendo = ()=>{
//     const prueba = this.state.leyendo.map((_id)=>{

//       return fetch(`https://api.jikan.moe/v3/manga/${_id}`)
//       .then((data)=>{
//         return data.json()
//       })
//       .then((dataJSON)=>{
//         return dataJSON
//       })
//     })

//     Promise.all(prueba)
//     .then((result)=>{
//       this.setState({leyendoFull : result})
//     })
//   }

//   getFullPorLeer = ()=>{
//     const prueba = this.state.porLeer.map((_id)=>{

//       return fetch(`https://api.jikan.moe/v3/manga/${_id}`)
//       .then((data)=>{
//         return data.json()
//       })
//       .then((dataJSON)=>{
//         return dataJSON
//       })
//     })

//     Promise.all(prueba)
//     .then((result)=>{
//       this.setState({porLeerFull : result})
//     })
//   }

//   renderLeidos = ()=>{

//     return this.state.leidosFull.map((manga)=>{
//       return <h3>{manga.title_japanese}</h3>
//     })
//   }

//   renderLeyendo = ()=>{

//     return this.state.leyendoFull.map((manga)=>{
//       return <h3>{manga.title_japanese}</h3>
//     })
//   }

//   renderPorLeer = ()=>{

//     return this.state.porLeerFull.map((manga)=>{
//       return <h3>{manga.title_japanese}</h3>
//     })
//   }

//   render(){
//     return(
//       <div>
//         <h2>Welcome, {this.props.isLogged.username}</h2>
//         {this.state.leidosFull.length > 0 && this.renderLeidos()}
//         {this.state.leyendoFull.length > 0 && this.renderLeyendo()}
//         {this.state.porLeerFull.length > 0 && this.renderPorLeer()}
//       </div>
//     )    
//   }
// }

// export default Profile