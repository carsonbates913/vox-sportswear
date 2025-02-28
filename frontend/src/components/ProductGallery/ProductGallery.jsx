import './ProductGallery.css'
import GalleryItem from '../GalleryItem/GalleryItem';

export default function ProductGallery(props) {
  return(
    <>
      <div className="product-gallery">
      {props.products.map((product) => (
        <GalleryItem key={product.id} product={product}/>
      ))}
      </div>
    </>
  )
}