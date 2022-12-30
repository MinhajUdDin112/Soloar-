import React from 'react'
import styled from "styled-components";
import {Link} from "react-router-dom"
import axios from 'axios';


const Info = styled.div`
opacity: 0;
width: 100%;
height: 60%;
position: absolute;
top: 0;
left: 0;
background-color: rgba(0, 0, 0, 0.2);
z-index: 3;
display: flex;
align-items: center;
justify-content: center;
transition: all 0.5s ease;
cursor: pointer;
`;

const Container = styled.div`
flex: ;
margin: 5px;
min-width: 280px;
height: 350px;
display: flex;
justify-content: center;
background-color: #f5fbfd;
position: relative;
&:hover ${Info}{
  opacity: 1;
}
`;

const Circle = styled.div`
width: 200px;
height: 200px;
border-radius: 50%;
background-color: white;
position: absolute;
`;

const Image = styled.img`
height: 60%;
z-index: 2;
`;

const Icon = styled.div`
width: 40px;
height: 40px;
border-radius: 50%;
background-color: white;
display: flex;
align-items: center;
justify-content: center;
margin: 10px;
transition: all 0.5s ease;
&:hover {
  background-color: #e9f5f5;
  transform: scale(1.1);
}
`;

const Image2 = ({item}) => {

  const handleChange = (item)=>{
    axios.delete(`http://localhost:5000/delete/${item}`)
    .then((res) => {
      // update the state to remove the deleted item
    })
    .catch((err) => {
      // handle the error
    });
  }
  
  return (
    <>
    
    <Container>
        
        <Image src={item.image} />
        <Info>
          
          <Icon  onClick={() => handleChange(item._id)}>
            x
          </Icon>
        </Info>
      </Container>
      </>
  )
}

export default Image2
