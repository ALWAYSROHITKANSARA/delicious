import Category from "./components/Category";
import Pages from "./pages/Pages";
import { BrowserRouter, Link } from 'react-router-dom';
import Search from "./components/Search";
import styled from "styled-components";
import {GiKnifeFork} from "react-icons/gi";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav>
          <GiKnifeFork/>
          <Logo to={'/'}>Delicious</Logo>
        </Nav>
        <Search/>
        <Category/>
        <Pages/>
      </BrowserRouter>
      
    </div>
  );
}

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
  font-family: 'Lobster Two', cursive;
`;

const Nav = styled.div`
  padding: 1rem 0rem;
  display: flex;
  justify-content: flex-start;

  svg {
    font-size: 2rem;
  }

`;


export default App;
