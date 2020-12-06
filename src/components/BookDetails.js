// import React from 'react'

// import { Link } from 'react-router-dom';

// import BookService from '../services/MangaService';

// class IndividualManga extends React.Component{

//   state = {
//     mangaInfo: {}
//   }

//   service = new MangaService()

//   addToLeidos = ()=>{
//     this.service.leidos(this.props.match.params.id, this.props.isLogged._id)
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   }

//   addToLeyendo = ()=>{
//     this.service.leyendo(this.props.match.params.id, this.props.isLogged._id)
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   }

//   addToPorLeer = ()=>{
//     this.service.porLeer(this.props.match.params.id, this.props.isLogged._id)
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   }

//   renderButtons = ()=>{
//     if(this.props.isLogged.username){
//       return(
//         <div>
//           <button onClick={()=>this.addToLeidos()}>Añadir a LEIDOS</button>
//           <button onClick={()=>this.addToLeyendo()}>Añadir a LEYENDO</button>
//           <button onClick={()=>this.addToPorLeer()}>Añadir a POR LEER</button>          
//         </div>
//       )
//     } else {
//       return(
//         <div>
//           <Link to="/signup"><button>Sign Up</button></Link>
//           <Link to='/login'><button>Log In</button>    </Link>
                
//         </div>
//       )
//     }
//   }

//   componentDidMount(){
//     fetch(`https://api.jikan.moe/v3/manga/${this.props.match.params.id}`)
//     .then((data)=>{
//       return data.json()
//     })
//     .then((dataJSON)=>{
//       this.setState({mangaInfo: dataJSON})
//     })
//     .catch((err)=>{
//       console.log(err)
//     })
//   }

//   render(){
//     return(
//       <div>
//         <h2>{this.state.mangaInfo.title_english}</h2>
//         <img src={this.state.mangaInfo.image_url} alt={this.state.mangaInfo.title_english}/>
//         {this.renderButtons()}
//       </div>
//     )    
//   }
// }

// export default IndividualManga