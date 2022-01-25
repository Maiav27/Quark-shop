import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Card } from "react-bootstrap";
import { View } from "react-native";
import { AuthContext } from "./store/Auth";




const Favoritos  = () => {

    const [listaProdutos, setListaProdutos] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:3000/products').then(resp => setListaProdutos(resp.data))

    }, [])

    
    const {quarkShop, setQuarkShop} = useContext(AuthContext)
    
   let favoritos = quarkShop.favoritos

   
    console.log(favoritos)



    const adicionandoFavoritos = async (id) =>{
        let lista = []
      await  axios.get('http://localhost:3000/favorites').then(resp => lista = resp.data)
     lista = lista.map(id =>  id.id)
      console.log(lista)
      console.log(lista.includes( id))
      if(lista.includes(id)){
       console.log('entrou')
         axios.delete(`http://localhost:3000/favorites/${id}`)
         setQuarkShop({...quarkShop, favoritos : [ ...quarkShop.favoritos.filter(favorito => favorito != id)]})
         
         
     }else{
      axios.post('http://localhost:3000/favorites',{id})
      }
    
    }

    const card = (cardItens) =>{
    return(
      <Card style={{width : '10rem', float : 'left', maxHeight : '280px'}} key={cardItens.id + cardItens.name}>
            <Card.Text  onClick={()=> adicionandoFavoritos(cardItens.id)} style={{ marginTop : '0px', border : '2px solid black', width: '12px', marginLeft : '0px'}}>
                {cardItens.id}
            </Card.Text>
            <Card.Img  src={cardItens.image_url} alt="Sunset in the mountains" variant="top" style={{width:'80px', height : '100px', alignItems : 'center', alignContent : 'center'}}/>
          <Card.Body style={{ height : '100px' , float : 'left'}}>

                  <Card.Text  style={{  height : '50px', width : '140px', marginLeft : '-12px'}} >
                    {cardItens.name}
                  </Card.Text>
                  <Card.Text  style = {{marginTop : '-10px', display : 'inlin-block'}} >
                     R$ {cardItens.price}
                  </Card.Text>
                  <Card.Text style={{marginTop : '-40px' , marginLeft : '110px'}}>
                      +
                  </Card.Text>
           
    
          </Card.Body>
        </Card>
        )
    
      }
    return(
        <View>
           {listaProdutos.filter(produto =>    favoritos.includes(produto.id)).map(card)}
        </View>
    )
}

export default Favoritos