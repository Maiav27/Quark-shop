
import { AuthContext } from "./store/Auth"
import React, { useContext } from "react"
import { View } from "react-native"
import axios from "axios"
import { Button, Card } from "react-bootstrap";


const Carrinho = () => {
      const {quarkShop, setQuarkShop} = useContext(AuthContext)

      const adicionandoCarrinho = (produto) => {
        const carrinhoId = quarkShop.carrinho.map(produto => produto.id) // tive que criar um novo array, pois ele nunca vai entrar no if por causa que produto ainda não tem a propriedade quantidade
    if(carrinhoId.includes(produto.id)){
     let posicao =    carrinhoId.indexOf(produto.id)
      console.log('tem')
      setQuarkShop({...quarkShop, carrinho : quarkShop.carrinho.map((produto, indice) => {
        if(indice == posicao){
          console.log('entrou if')
            return {...produto, quantidade : produto.quantidade + 1 }
        }else{
          console.log('entrou else')
          return produto
        }
      })})
    }else{
       console.log('não tem')
      setQuarkShop({...quarkShop, carrinho : [...quarkShop.carrinho, {...produto, quantidade : 1}]})
    }
  }
  const retirandoCarrinho = (produto) => {
      let posicao = quarkShop.carrinho.indexOf(produto)

     
      if(produto.quantidade > 1 ){

          setQuarkShop({...quarkShop, carrinho : quarkShop.carrinho.map((curr , index) =>{
              if(posicao == index  ){
                  console.log('entrou if')
                  return {...produto, quantidade : produto.quantidade - 1}
                }else{
                    console.log('entrou else')
                    return curr
              }
          })})

      }else{
         setQuarkShop({...quarkShop, carrinho : quarkShop.carrinho.filter(curr => curr != produto)})
      }
      
  }

  const adicionandoFavoritos = async (id) =>{
    let lista = []
  await  axios.get('http://localhost:3000/favorites').then(resp => lista = resp.data)
  console.log(quarkShop.favoritos)
  
 lista = lista.map(id =>  id.id)
  
 setQuarkShop({...quarkShop, favoritos : [...lista]})
  console.log(lista)
  console.log(lista.includes( id))
  if(lista.includes(id)){
    
     axios.delete(`http://localhost:3000/favorites/${id}`)
     setQuarkShop({...quarkShop, favoritos : [...quarkShop.favoritos.filter(favorito => favorito != id)]})
 }else{
 
  axios.post('http://localhost:3000/favorites',{id}).then(resp => setQuarkShop({...quarkShop, favoritos : [...quarkShop.favoritos, resp.data.id]}))
  }

}

      const card = (cardItens) =>{
      
        return(
          <Card style={{width : '90%', float : 'left', maxHeight : '280px'}} key={cardItens.id + cardItens.name}>
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
                    <Card.Text style={{marginTop : '-60px' , marginLeft : '110px'}} onClick ={() => adicionandoCarrinho(cardItens)}>
                    {cardItens.quantidade}X   R${(cardItens.price * cardItens.quantidade).toFixed(2)}
                    </Card.Text>
                    <Button style={{marginTop : '-143px' , marginLeft : '220px'}} onClick ={() => adicionandoCarrinho(cardItens)}>
                        +
                    </Button>
                    <Button style={{marginTop : '-110px' , marginLeft : '220px', backgroundColor : 'red', border : '2px solid red'}} onClick ={() => retirandoCarrinho(cardItens)}>
                        -
                    </Button>
             
      
            </Card.Body>
          </Card>
        )
  
      }

    return(
        <View>
            {quarkShop.carrinho.map(card)}
        </View>
    )
}

export default Carrinho