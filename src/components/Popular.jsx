import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useEffect, useState } from "react";
import styled from "styled-components";
import '@splidejs/react-splide/css';
import { Link } from 'react-router-dom'

const Popular = () => {
    const [popular, setPopular] = useState([]);
    useEffect(() => {
        getPopular();
    }, []);

    const getPopular = async () => {

        const check = localStorage.getItem('popular');
        if(check){
            setPopular(JSON.parse(check));
        }
        else{
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`);
            const data = await api.json();
            localStorage.setItem("popular",JSON.stringify(data.recipes));
            setPopular(data.recipes);
        }
    };

    return (
        <div>
            <Wrapper>
                <h3>Popular Picks</h3>
                <Splide options={{
                    perPage: 4,
                    arrows: false,
                    pagination:false,
                    drag: 'free',
                    gap: '5rem',
                    autoplay: true,
                    interval: 2000,
                    speed: 500,
                    perMove: 1,
                    type   : 'loop',
                    breakpoints: {
                        1200: { perPage: 4, gap: '5rem' },
                        720 : { perPage: 1, gap: '3rem' },
                      },
                }}>
                    {popular?.map((recipe) => {
                        return (
                            <SplideSlide key={recipe.title}>
                                <Card>
                                    <Link to={'/recipe/'+recipe.id}>
                                    <p>{recipe.title}</p>
                                    <img src={recipe.image} alt={recipe.title}/>
                                    {/* <img
                                        src='https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600'
                                        alt={recipe.tile} /> */}
                                    <Gradient/>
                                    </Link> 
                                </Card>
                            </SplideSlide>
                        );
                    })}
                </Splide>
            </Wrapper>
        </div>
    )
}

const Wrapper = styled.div`
    margin: 4rem 0rem;
`;

const Card = styled.div`
    height: 15rem;
    border-radius: 2rem;
    overflow: hidden;
    position: relative;

    img{
        border-radius: 2rem;
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    p{
        position: absolute;
        z-index: 10;
        left:50%;
        bottom: 0%;
        transform: translate(-50%,0%);
        color: white;
        width: 100%;
        text-align: center;
        font-weight: 600rem;
        font-size: 1rem;
        height: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const Gradient = styled.div`
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.5));
`;



export default Popular
