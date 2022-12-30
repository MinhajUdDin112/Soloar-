import React from 'react'
import { useState,useEffect } from 'react';
import { sliderItems } from '../data';
import Button from 'react-bootstrap/Button';
import './background.css'
import {AiOutlineArrowLeft,AiOutlineArrowRight} from 'react-icons/ai'
import Modelss from './Modelss';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Background = () => {
  const [product, setProduct] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = sliderItems.length;
  const autoScroll = true;
  let slideInterval;
  let intervalTime = 15000;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
    console.log("next");
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
    console.log("prev");
  };

  function auto() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

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
    
    return () => clearInterval(slideInterval);
  }, [currentSlide]);


  return (
    <>
    <Link to='/imagepage'>
      <Button variant="success" className='bttn'  >
        Add/delete
      </Button>
    </Link>
    <div className='slider'>
    <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
      <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />
      {product.map((slide, index) => {
        return (
          <div
            className={index === currentSlide ? "slide current" : "slide"}
            key={index}
          >
            {index === currentSlide && (
              <div>
                <img src={slide.image} alt="slide" className="image" />
                <div className="content">
                  <h2><span style={{color:"green"}}>Green</span><span style={{color:"blue"}}>Wend</span><span style={{color:"orange"}}>Energy</span></h2>
                  <p>Empowering Our Future with solor</p>
                  <Modelss  />
                </div>
              </div>
            )}
          </div>
        );
      })}
      
    </div>
    </>
  )
}

export default Background
