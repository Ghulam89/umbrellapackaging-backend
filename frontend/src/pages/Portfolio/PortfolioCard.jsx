import React, { useState } from 'react'

function PortfolioCard({img1,img2}) {
    const [image,setImage] = useState(img1)
    console.log(image,'image1');
      const [hover,setHover] = useState(false)
    
  return (
    <div className={`border border-dashed rounded-[8px] transition-all duration-400 ease-in-out`} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>

        <img src={image} alt="" className='rounded-[8px]'  onMouseEnter={()=> setImage(img2)} onMouseLeave={()=>setImage(img1)} />



      
    </div>
  )
}

export default PortfolioCard
