import './SizeInput.css';

export default function SizeInput({register}) {

  const sizeList = ["XS", "S", "M", "L", "XL", "XXL"];

  return(
    <>
    <div className="size-input">
      <label><span style={{fontWeight: "200"}}>Sizes</span></label>
      <div className="size-input__set">
          {sizeList.map( (size, index) => {
              return (
                <div key={size}>
                  <input style={{display: "none"}} type="checkbox" className="size-selector" id={size} name="size"  value={size}/>
                  <label htmlFor={size}>
                  {size}
                  </label>
                </div>
              )
          })}
      </div>
    </div>
  </>
  )
}