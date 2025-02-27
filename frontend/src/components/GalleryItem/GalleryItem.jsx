import './GalleryItem.css'

export default function GalleryItem(props) {
  return(
    <div className="gallery-item" onClick={() => handleViewClick(props.product.id)}>
      <div className="gallery-item__hover"/>
      {/*<div className="gallery-item__view">View Item</div>*/}
      <img className="gallery-item__image" src={props.product.ImageURLs[0] ? props.product.ImageURLs[0] : null} alt="hello" />
      <div className="gallery-item__background"/>
    </div>
  )
}