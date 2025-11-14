import React, { useState } from 'react'
import GetCustomQuote from './GetCustomQuote'
import pickbox from '../../assets/images/1.svg'
import provideBox from '../../assets/images/2.svg'
import boxMaterial from '../../assets/images/3.svg'
import uploadArtwork from '../../assets/images/4.svg'
import discover from '../../assets/images/discover.png'
import american from '../../assets/images/emrican-expreess.png'
import bankTranfer from '../../assets/images/ebank-transfer.png'
import masterCard from '../../assets/images/master-card.png'
import paypal from '../../assets/images/paypal.png'
import wireTransfer from '../../assets/images/wire-transfer.png'
import maestro from '../../assets/images/mastro.png'
import visa from '../../assets/images/visa.png'
import CustomPackagingProduced from '../../components/CustomPackagingProduced'
import Icon1 from '../../assets/images/icon/free quote.svg';
import Icon3 from '../../assets/images/icon/Free Design support.svg';
import Icon2 from '../../assets/images/icon/Free Lamination.svg';
import aboutVideo from '../../assets/videos/about.mp4'
import Icon4 from '../../assets/images/icon/free shipping.svg';
import Icon5 from '../../assets/images/icon/FSC Certified.svg';
import Icon6 from '../../assets/images/icon/Quickest Turnaround.svg';
import GetPriceQuote from '../../components/GetPriceQuote/GetPriceQuote'
import { BaseUrl } from '../../utils/BaseUrl'
import axios from 'axios'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import PageMetadata from '../../components/common/PageMetadata'
function GetCustomQoutePage() {
  const images = [discover, american, bankTranfer, masterCard, paypal, wireTransfer, maestro, visa]


  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);


  const initialFormState = {
    name: "",
    email: "",
    companyName: "",
    phoneNumber: "",
    boxStyle: "",
    length: "",
    width: "",
    depth: "",
    unit: "Inches",
    stock: "Stock",
    colors: "Colors",
    printingSides: "Inside",
    quantity: "",
    addOns: "",
    image: null,
    description: ""
  };

  const [formData, setFormData] = useState(initialFormState);

  const validateStep1 = () => {
    return (
      formData.boxStyle &&
      formData.length &&
      formData.width &&
      formData.depth &&
      formData.unit &&
      formData.stock &&
      formData.colors &&
      formData.printingSides &&
      formData.quantity
    );
  };

  const validateStep2 = () => {
    return (
      formData.name &&
      formData.email
    );
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep2()) {
      alert("Please fill all required fields");
      return;
    }
    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await axios.post(`${BaseUrl}/requestQuote/create`, formDataToSend);

      if (response.data.status === 'success') {
        toast.success(response.data.message)
        setIsLoading(false);
        setStep(1)
        setFormData(initialFormState);
      } else {
        toast.error(response.data.message)
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (step === 1 && !validateStep1()) {
      alert("Please fill all required fields in Product Specification");
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);
const metadata = {
      title: "Get Custom Quote - Umbrella Custom Packaging",
      description: "Get Custom Quote Umbrella Custom Packaging-The House of Proficient Printing & Distinct Featured Boxes. Umbrella Custom Packaging facilitates your business by providing innovative styled boxes in extraordinary design. We use the finest paper material and high quality cardboard to ensure perfect Die Cut boxes. You will get guaranteed satisfaction with high quality printing.",
      keywords: "custom packaging, wholesale boxes, packaging solutions, affordable packaging, custom boxes, packaging design, eco-friendly packaging",
      author: "Umbrella Custom Packaging",
      ogUrl: `${BaseUrl}/get-custom-quote`,
      canonicalUrl: `${BaseUrl}/get-custom-quote`,
      ogTitle: "Get Custom Quote - Umbrella Custom Packaging",
      ogDescription: "Get In Touch Umbrella Custom Packaging-The House of Proficient Printing & Distinct Featured Boxes...",
      modifiedTime: "2025-06-13T15:18:43+00:00",
      twitterTitle: "Get Custom Quote - Umbrella Custom Packaging",
      twitterDescription: "Get In Touch Umbrella Custom Packaging-The House of Proficient Printing & Distinct Featured Boxes...",
      robots: "index, follow"
    };

  return (
    <>
    
      <PageMetadata {...metadata} />
          <div className='sm:max-w-6xl  py-9 rounded-xl max-w-[95%] mx-auto'>

      <div className='bg-[#F7F7F7] rounded-[8px] p-5  flex flex-col justify-center items-center'>
        <h2 className='md:text-[35px] text-[20px] text-black font-semibold leading-10 text-center mb-5'>Important Points to Get a Quote</h2>
        <div className='grid md:grid-cols-2 grid-cols-1  gap-5'>
          <div>
            <GetCustomQuote title={"Pick Box Style"} icon={pickbox} answer={"Pick the style of box you want from the different options we have, like mailers, shippers, and displays. They're all here for you to choose from or you can type your style by yourself in the following style section."} />
          </div>
          <div>
            <GetCustomQuote title={"Provide Box Size"} icon={provideBox} answer={"Type in the box dimensions so we can make sure the box fits perfectly and keeps it safe. If you haven’t figured out the box dimensions, then provide the size of your product and mention it in the following message section and we will figure out the box size."} />
          </div>
          <div>
            <GetCustomQuote title={"Select Box Material"} icon={boxMaterial} answer={"Please make sure that you are selecting the right material for your product box. A complete guide for selecting the right stock is available on the home page. If you are confused about selecting the right stock of the box, contact us immediately."} />
          </div>
          <div>
            <GetCustomQuote title={"Upload the Artwork"} icon={uploadArtwork} answer={"If you're ready, you can upload your own brand logo, pictures, designs, and textures to customize your box and make it unique to you. If you don’t have your artwork ready yet, then you can skip it now and provide it later by emailing us."} />
          </div>

        </div>
      </div>

      <div className='rounded-[8px] bg-[#D2E0FB59] mt-5 p-5 space-y-5'>

        <h2 className='md:text-[35px] text-[20px] text-black font-semibold leading-10 text-center mb-5 '>Shop with Confidence</h2>
        <p className='text-black text-[17px] capitalize text-center'>
          Our portfolio highlights a range of custom packaging solutions, designed to protect, promote, and enhance your products with style.
        </p>

        <div className='grid md:grid-cols-8 grid-cols-4 gap-5'>
          {images.map((image, index) => (
            <div key={index} >

              <img src={image} width={120} alt="" onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHover(null)} className={`transition-all duration-300 ease-in-out ${hoveredIndex === index ? 'opacity-100 scale-120' : 'opacity-100 scale-100'}`} /></div>

          ))}


        </div>

      </div>
      <div className=' flex my-4 rounded-md  bg-[#F7F7F7] py-2 gap-2'>
          <div className=' border-r  border-gray-300' >
          <GetPriceQuote/>
          </div>
          <div className="  bg-[#F7F7F7]  flex flex-col  p-3 rounded-md w-sm">
            <div className=" flex gap-1  border-b  py-2 border-gray-300 items-center">
              <img src={Icon1} width={40} alt="" />
              <h5>Free Quote</h5>
            </div>
            <div className=" flex gap-1  border-b  py-2 border-gray-300 items-center">
              <img src={Icon2} width={40} alt="" />
              <h5>Free Design support</h5>
            </div>
            <div className=" flex gap-1  border-b  py-2 border-gray-300 items-center">
              <img src={Icon3} width={40} alt="" />
              <h5>Free Lamination</h5>
            </div>
            <div className=" flex gap-1  border-b  py-2 border-gray-300 items-center">
              <img src={Icon4} width={40} alt="" />
              <h5>Free Shipping</h5>
            </div>
            <div className=" flex gap-1  border-b  py-2 border-gray-300 items-center">
              <img src={Icon5} width={40} alt="" />
              <h5>FSC Certified</h5>
            </div>
            <div className=" flex gap-1  border-b  py-2 border-gray-300 items-center">
              <img src={Icon6} width={40} alt="" />
              <h5>Quickest Turnaround</h5>
            </div>
          </div>
        

      </div>
      <div className=' py-10'>
        <CustomPackagingProduced />
      </div>





    </div>
    </>

  )
}

export default GetCustomQoutePage
