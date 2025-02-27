import { useNavigate } from "react-router-dom";

import BlockButton from "../BlockButton/BlockButton.jsx";
import "./ProductList.css"

export default function ProductList(props){

  const navigate = useNavigate();


  return(
    <>
      <div className="product-list">
        <div className="product-list__row">
          {props.products.slice(0,5).map((product) => (
              <BlockButton onClick={() => {navigate(`./${product.name}`)}} key={product.name} color="#01683E" backgroundColor="#F8F5ED" padding="7px 30px" fontSize="23px">{product.name}</BlockButton>
          ))}
        </div>
        <div className="product-list__row">
          {props.products.slice(5).map((product) => (
              <BlockButton onClick={() => {navigate(`./${product.name}`)}} key={product.name} color="#01683E" backgroundColor="#F8F5ED" padding="7px 30px" fontSize="23px">{product.name}</BlockButton>
          ))}
        </div>
      </div>
    </>
  )
}