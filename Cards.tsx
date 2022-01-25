import axios from "axios"
import { useEffect, useState } from "react"
import { AuthContext } from "./store/Auth"
import { useContext } from "react"
import Favoritos from "./Favoritos"
import { Button, Card } from "react-bootstrap"



const Cards = ({produtos, pesquisaProduto, categoria}) =>{


  
  const [listaFavoritos, setListaFavoritos] = useState([])
  const  {quarkShop, setQuarkShop } = useContext(AuthContext)

useEffect(() =>{
        axios.get('http://localhost:3000/favorites').then(resp => setQuarkShop({...quarkShop, favoritos : resp.data.map( favorito => favorito.id)}))
        }, [])
    
console.log(quarkShop.favoritos)
 
  
  
  const adicionandoFavoritos = async (id) =>{
      let lista = []
    await  axios.get('http://localhost:3000/favorites').then(resp => lista = resp.data)
    console.log(quarkShop.favoritos)
    
   lista = lista.map(id =>  id.id)
    
   setQuarkShop({...quarkShop, favoritos : [...lista]})
    console.log(lista)
    console.log(lista.includes( id))
    if(lista.includes(id)){
      console.log('entrou if')
     console.log('entrou')
       axios.delete(`http://localhost:3000/favorites/${id}`)
       setQuarkShop({...quarkShop, favoritos : [...quarkShop.favoritos.filter(favorito => favorito != id)]})
   }else{
     console.log('entrou else')
    axios.post('http://localhost:3000/favorites',{id}).then(resp => setQuarkShop({...quarkShop, favoritos : [...quarkShop.favoritos, resp.data.id]}))
    }
  
  }

   

  const adicionandoCarrinho = (produto) => {
    
        const carrinhoId = quarkShop.carrinho.map(produto => produto.id) // tive que criar um novo array, pois ele nunca vai entrar no if por causa que produto ainda não tem a propriedade quantidade
    if(carrinhoId.includes(produto.id)){
     let posicao =    carrinhoId.indexOf(produto.id)
      
      setQuarkShop({...quarkShop, carrinho : quarkShop.carrinho.map((produto, indice) => {
        if(indice == posicao){
         
            return {...produto, quantidade : produto.quantidade + 1 }
        }else{
     
          return produto
        }
      })})
    }else{
       console.log('não tem')
      setQuarkShop({...quarkShop, carrinho : [...quarkShop.carrinho, {...produto, quantidade : 1}]})
    }
  }
  

    const card = (cardItens) =>{
      
      return(
        <Card style={{width : '10rem', float : 'left', maxHeight : '280px'}} key={cardItens.id + cardItens.name}>
            <input type='checkbox' onChange={()=> adicionandoFavoritos(cardItens.id)}  checked={quarkShop.favoritos.includes(cardItens.id)}/>
            <Card.Img  src={cardItens.image_url} alt="Sunset in the mountains" variant="top" style={{width:'80px', height : '100px', alignItems : 'center', alignContent : 'center'}}/>
          <Card.Body style={{ height : '100px' , float : 'left'}}>

                  <Card.Text  style={{  height : '50px', width : '140px', marginLeft : '-12px'}} >
                    {cardItens.name}
                  </Card.Text>
                  <Card.Text  style = {{marginTop : '-10px', display : 'inlin-block'}} >
                     R$ {cardItens.price}
                  </Card.Text>
                  <Button style={{marginTop : '-100px' , marginLeft : '90px'}} onClick ={() => adicionandoCarrinho(cardItens)}>
                      +
                  </Button>
           
    
          </Card.Body>
        </Card>
      )

    }
  
    let tamanho
    if(categoria > 0){
         tamanho = produtos.filter(produto => produto.name.toLocaleLowerCase().includes(pesquisaProduto.toLocaleLowerCase()) && produto.category == categoria ).length
    }else{

        tamanho = produtos.filter(produto => produto.name.toLocaleLowerCase().includes(pesquisaProduto.toLocaleLowerCase()) ).length
    }
    

 console.log(tamanho)
    if(pesquisaProduto.trim() != '' && tamanho > 0  && categoria != 0){
     
       return(
         <div>

          { produtos.filter(produto => produto.name.toLocaleLowerCase().includes(pesquisaProduto.toLocaleLowerCase()) && produto.category == categoria ).map(card) }
         </div>
       )
    } else if(pesquisaProduto.trim() != '' && tamanho > 0  && categoria == 0){

        return(
            <div>
   
             { produtos.filter(produto => produto.name.toLocaleLowerCase().includes(pesquisaProduto.toLocaleLowerCase())  ).map(card) }
            </div>
          )

    } else if(pesquisaProduto.trim() != '' && tamanho == 0   ){
      
           return(
               <p>Produto não encontrado</p>
           )
    }
    else if( categoria > 0) {
     
      return(

        <div>

           { produtos.filter(produto =>   produto.category == categoria ).map(card) }
        </div>
      )
    }else {
        return(
            <div>
                {produtos.map(card)}
            </div>
        )
    }
  }


  export default Cards