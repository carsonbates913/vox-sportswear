import { useNavigate } from "react-router-dom";

import BlockButton from "../BlockButton/BlockButton.jsx";
import "./ProductList.css"

export default function ProductList(props){

  const navigate = useNavigate();


  return(
    <>
      <div className="product-list">
          {props.products.map((product) => (
              <BlockButton onClick={() => {navigate(`./${product.name}`)}} key={product.name} color="black" backgroundColor="var(--background-color)" padding="7px 30px" fontSize="23px">{product.name}</BlockButton>
          ))}
      </div>
    </>
  )
}