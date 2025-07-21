import React, { useState } from 'react'
function GetCustomQuote({title,icon,answer}) {
const [accordionBox,setAccordionBox] = useState(false)
console.log(accordionBox);

const toggleAccordionBox = ()=>setAccordionBox(prev => !prev)
  return (
    <div className=' p-[5px] shadow rounded-[8px] bg-[#fff]'>

    
            <div className='flex items-center w-full justify-between space-x-5 '>
            <span className='flex'><img src={icon} width={50} alt="" /><span className='md:text-[22px] text-[14px] text-[#242424] font-medium whitespace-nowrap'>{title}</span></span>
           <button  onClick={toggleAccordionBox} className='md:text-[12px] text-[8px] uppercase whitespace-nowrap'> {accordionBox ? 'Read Less':'Read More'} </button>

         

            </div>
            <div className={`grid overflow-hidden transition-all duration-400 ease-in-out text-slate-700 text-sm
                    ${accordionBox ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>

                        <div className="overflow-hidden text-start p-2 ">
                        {answer}

                        </div>

                
           

            </div>

            

       
      
      
    </div>
  )
}

export default GetCustomQuote
