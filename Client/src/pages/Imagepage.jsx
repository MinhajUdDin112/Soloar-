import React, { useEffect, useState } from 'react'
import Image2 from '../components/Image2'
import styled from "styled-components";
import NewImage from '../components/NewImage'
import axios from 'axios';

const Container = styled.div`
    display: flex;
    padding: 20px;
    flex-wrap: wrap;
    justify-content: space-between;
`

const Imagepage = () => {

  const [product, setProduct] = useState([])

  useEffect(() => {
    const getProduct = async ()=>{
      try {
        const res = await axios.get("http://localhost:5000/api/find");

        setProduct(res.data)
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
    getProduct();
  }, [product])

  return (
    <div>
    <NewImage/>
       <Container>
        {product.map((item)=>(
            <Image2 item={item} key={item._id} />
        ))}
    </Container>
    </div>
  )
}

export default Imagepage
