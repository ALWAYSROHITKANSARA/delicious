import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from 'react-router-dom';

import React from 'react'

const Recipe = () => {

    const [details, setDetails] = useState({});
    const [activeTab, setActiveTab] = useState('instructions');
    let params = useParams();
    

    const fetchDetails = async ()=>{
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
        const detailData = await data.json();
        setDetails(detailData);
        console.log(detailData);
    }

    useEffect(()=>{
        fetchDetails();
    },[params.name]);


  return (
    <DetailWrapper>
        <div>
            <h2>{details.title}</h2>
            <img src={details.image} alt={details.title}/>
        </div>

        <Info>
            <Button className={activeTab === 'instructions' ? 'active' : ''} onClick={()=>setActiveTab("instructions")}>Instructions</Button>
            <Button className={activeTab === 'ingredients' ? 'active' : ''} onClick={()=>setActiveTab("ingredients")}>Ingredints</Button>

            {activeTab === 'instructions' && (
                <div>
                    <h3 dangerouslySetInnerHTML = {{__html: details.summary }}></h3>
                    <h3 dangerouslySetInnerHTML = {{__html: details.instructions }}></h3>
                </div>
            )}
            
            {activeTab === 'ingredients' && (
            <ul>
                {details.extendedIngredients?.map((ingredientlist)=>(
                    <li key={ingredientlist.id}>{ingredientlist.original}</li>
                ))}
            </ul>
            )}
        </Info>
    </DetailWrapper>
  )
}

const DetailWrapper = styled.div`
    margin-top: 5rem;
    margin-bottom: 5rem;
    display: flex;
    .active {
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }
    h2 {
        margin-bottom: 2rem;
    }
    li {
        font-size: 1.2rem;
        line-height: 2.5rem;
    }
    ul {
        margin-top: 2rem;
    }
    img {
        width: 400px;
        height: 300px;
        border-radius: 2rem;
    }
`;

const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    font-weight: 600;
    cursor: pointer;
    margin-left: 5rem;
    border-radius: 1rem;
`;

const Info = styled.div`
    margin-left: 10rem;
`;

export default Recipe