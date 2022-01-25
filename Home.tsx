import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Cards from './Cards';


import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card'



interface Produtos {
  id : number,
  name : string,
  price : string,
  categorie : number,
  img_url : string
}

export default function Home() {

  const defaultProdutos : Produtos[] = []
  

  const [produtos, setProdutos]  = useState(defaultProdutos)
  const [pesquisaProduto, setPesquisaProduto] = useState('')
  const [categorias, setCategorias] = useState([])
  const [categoriaId, setCategoriaId] = useState([])

  
  
  

  //const[tamanho, setTamanho] = useState(1)
  useEffect(()=>{
    
  axios.get('http://localhost:3000/products').then((resp ) => {
      setProdutos(resp?.data)
    })

  axios.get('http://localhost:3000/categories').then(resp => setCategorias(resp.data))
    
  },[])


    const clicouCategoria  = (id)=> {
      
      if(categoriaId.includes(id)){
        setCategoriaId(categoriaId.filter(curr => curr != id))
      }else{
           setCategoriaId([...categoriaId, id])
      }
     
    }
 

    
    
    const categoriasCard = (categoria) =>{
      return(
        <Card key={categoria.id} onClick={()=>clicouCategoria(categoria.id)} style={{  borderColor : (categoriaId.includes(categoria.id)  ? ' pink ' : 'white' ) , width : '110px', display : 'grid', height : '100px', marginLeft : '9px' , marginBottom : '10px', alignContent : 'center', alignItems : 'center', position : 'relative' , float : 'left' } }>

         <Card.Body >

         <img   src={categoria.image_url} alt="Sunset in the mountains" style={{ width: '58.11px', height: '38px', left: '68.81px',
         top: '479.79px', marginTop: '0px' , borderColor : '1px red'}}/>
      
        <p style={{display :'inline-block', width : '89px', height: '10px', alignContent : 'center', alignItems : 'center'}} >  
          {categoria.title}
        </p>
         </Card.Body>

      

        </Card>
        )
    
  }
  


    
    //setTamanho( produtos.filter(produto => produto.name.toLocaleLowerCase().includes(pesquisaProduto.toLocaleLowerCase())).length )


 

  

  
  
  return (
    <View style={{backgroundColor : '#E5E5E5', justifyContent : 'center', alignItems : 'center'}} >
      
      <StatusBar />
     
      <input type="text" placeholder='Pesquisar' onChange={evt => setPesquisaProduto(evt.target.value) } value ={pesquisaProduto}/>
      <div>
        {categorias.map(categoriasCard)}
      </div>
      <div style={{marginLeft : '17px'}}>
      
      <Cards produtos={produtos} pesquisaProduto={pesquisaProduto} categoria={categoriaId} />
        
      </div>
   
    
    </View>
  );
}
//vou filtrar por categorai no onClick, que assim que eu clicar, ai eu posso aterar o array produtos
const cardStyle = StyleSheet.create({

    container:{
      width:156.35 ,
      height : 228.8
    }
  
})
