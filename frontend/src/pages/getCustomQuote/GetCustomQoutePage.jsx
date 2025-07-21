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
  return (
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
          <div className=' border-r px-3 border-gray-300' >
           <h2 className="text-[#333333] text-center text-lg md:text-xl  mt-2">
       Get Instant Price Quote
        </h2>


        <form onSubmit={handleSubmit}>

          {step === 2 && (
            <div className="pt-3.5">
              <h6 className="text-sm md:text-base font-medium mb-4">Personal Information</h6>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="w-full">
                  <Input
                    label="Name"
                    star={"*"}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
                    required
                  />
                </div>

                <div className="w-full">
                  <Input
                    label="Email"
                    star={"*"}
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
                    required
                  />
                </div>

                <div className="w-full">
                  <Input
                    label="Company Name"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Company Name"
                    className="w-full border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
                  />
                </div>

                <div className="w-full">
                  <Input
                    label="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
                  />
                </div>
              </div>


              <div className="w-full flex justify-end gap-5  mt-1 mb-2">
                <Button
                  type="button"
                  onClick={prevStep}
                  label="Previous"
                  className="bg-gray-500 w-full sm:w-40 text-white py-2.5 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                />
                <Button
                  type="submit"
                  label={isLoading ? "Sending..." : "Send"}
                  disabled={!validateStep2() || isLoading}
                  className={`bg-[#4440E6] w-full sm:w-40 text-white py-2.5 px-4 rounded-lg hover:bg-[#3938b8] transition-colors ${!validateStep2() || isLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                />
              </div>
            </div>
          )}


          {step === 1 && (
            <div className="pt-3.5">
              <h6 className="text-sm md:text-base font-medium mb-4">Product Specification</h6>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <div className="w-full">
                  <Input
                    label="Box Style"
                    star={"*"}
                    name="boxStyle"
                    value={formData.boxStyle}
                    onChange={handleChange}
                    placeholder="Box Style"
                    className="w-full border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
                    required
                  />
                </div>

                <div className="w-full">
                  <Input
                    label="Size (Length)"
                    star={"*"}
                    name="length"
                    value={formData.length}
                    onChange={handleChange}
                    placeholder="Length"
                    className="w-full border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
                    required
                  />
                </div>

                <div className="w-full">
                  <Input
                    label="Size (Width)"
                    star={"*"}
                    name="width"
                    value={formData.width}
                    onChange={handleChange}
                    placeholder="width"
                    className="w-full border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
                    required
                  />
                </div>

                <div className="w-full">
                  <Input
                    label="Size (Depth)"
                    star={"*"}
                    name="depth"
                    value={formData.depth}
                    onChange={handleChange}
                    placeholder="Depth"
                    className="w-full border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
                    required
                  />
                </div>

                <div className="w-full">

                  <label
                    htmlFor="Unit"
                    className="  pb-1 flex  text-[#333333] text-sm font-medium   text-textColor"
                  >
                    Unit
                    <h5 className=" text-red-600 m-0 pl-1">*</h5>
                  </label>
                  <select name="unit" value={formData.unit}
                    onChange={handleChange} className="w-full border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
                    required
                  >
                    <option>Inches</option>
                    <option>mm</option>
                    <option>cm</option>
                  </select>
                </div>

                {/* <div className="w-full">
                  <Input
                    label="Stock"
                    star={"*"}
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="Stock"
                    className="w-full border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
                    required
                  />
                </div> */}


                <div className="w-full">

                  <label
                    htmlFor="Stock"
                    className="  pb-1 flex  text-[#333333] text-sm font-medium   text-textColor"
                  >
                    Stock
                    <h5 className=" text-red-600 m-0 pl-1">*</h5>
                  </label>
                  <select name="stock" value={formData.stock}
                    onChange={handleChange} className="w-full border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
                    required
                  >
                    <option>Stock</option>
                    <option>12pt Cardboard</option>
                    <option>14pt Cardboard</option>
                    <option>16pt Cardboard</option>
                    <option>18pt Cardboard</option>
                    <option>20pt Cardboard</option>
                    <option>22pt Cardboard</option>
                    <option>24pt Cardboard</option>
                    <option>White SBS C1S C25</option>
                    <option>Corrugated</option>
                    <option>Rigid</option>
                    <option>Kraft</option>
                    <option>Linen</option>
                  </select>
                </div>



                <div className="w-full">

                  <label
                    htmlFor="Colors"
                    className="  pb-1 flex  text-[#333333] text-sm font-medium   text-textColor"
                  >
                    Colors
                    <h5 className=" text-red-600 m-0 pl-1">*</h5>
                  </label>
                  <select name="colors" value={formData.colors}
                    onChange={handleChange} className="w-full border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
                    required
                  >
                    <option value={'Colors'}>Colors</option>
                    <option value={'Plain (No Printing)'}>Plain (No Printing)</option>
                    <option value={'1 Color'}>1 Color</option>
                    <option value={'2 Color'}>2 Color</option>
                    <option value={'3 Color'}>3 Color</option>
                    <option value={'4 Color'}>4 Color</option>
                    <option value={'4/1 Color'}>4/1 Color</option>
                    <option value={'4/2 Color'}>4/1 Color</option>
                    <option value={'4/3 Color'}>4/1 Color</option>
                    <option value={'4/4 Color'}>4/1 Color</option>

                  </select>
                </div>



                <div className="w-full">

                  <label
                    htmlFor="Printing Sides"
                    className="  pb-1 flex  text-[#333333] text-sm font-medium   text-textColor"
                  >
                    Printing Sides
                    <h5 className=" text-red-600 m-0 pl-1">*</h5>
                  </label>
                  <select name="printingSides" value={formData.printingSides}
                    onChange={handleChange} className="w-full border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
                    required
                  >
                    <option value={'Inside'}>Inside</option>
                    <option value={'Outside'}>Outside</option>
                    <option value={'2 Color'}>Both (Inside & Outside)</option>

                  </select>
                </div>


                <div className="w-full">
                  <Input
                    label="Quantity"
                    star={"*"}
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="Quantity"
                    className="w-full border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
                    required
                  />
                </div>



                <div className="w-full">

                  <label
                    htmlFor="Add-Ons"
                    className="  pb-1 flex  text-[#333333] text-sm font-medium   text-textColor"
                  >
                    Add-Ons
                    <h5 className=" text-red-600 m-0 pl-1">*</h5>
                  </label>
                  <select name="addOns" value={formData.addOns}
                    onChange={handleChange} className="w-full border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
                    required
                  >
                    <option selected></option>
                    <option value={'Foiling'}>Foiling</option>
                    <option value={'Spot UV'}>Spot UV</option>
                    <option value={'Embossing'}>Embossing</option>
                    <option value={'Debossing'}>Debossing</option>
                    <option value={'handles'}>handles</option>
                    <option value={'Inserts'}>Inserts</option>
                    <option value={'Windows'}>Windows</option>

                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="design_upload"
                    className="block pb-1.5 text-[#333333] text-sm md:text-base font-medium"
                  >
                    Upload Your Design, Max Size 5MB
                    <p className="flex flex-wrap gap-0.5 text-xs md:text-sm mt-1">
                      Allowed File Types:
                      <span className="font-semibold"> png, pdf, jpg, jpeg, webp</span>
                    </p>
                  </label>
                  <Input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    className="border w-full bg-white rounded-lg border-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#4440E6] file:text-white hover:file:bg-[#3a36c7]"
                    accept=".png,.pdf,.jpg,.jpeg,.webp"
                  />
                </div>

                <div className="sm:col-span-2 lg:col-span-3">
                  <label
                    htmlFor="description"
                    className="block pb-1.5 text-[#333333] text-sm md:text-base font-medium"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
                    placeholder="Tell us the size / dimensions, material, finising, add-ons, and design preferences."
                    required
                  ></textarea>
                </div>
              </div>



              <div className="w-full flex justify-between  mt-1 mb-2">
                <div className="text-xs text-gray-500">

                </div>
                <Button
                  type="button"
                  onClick={nextStep}
                  label="Next"
                  disabled={!validateStep1()}
                  className={`bg-[#4440E6] w-full sm:w-40 text-white py-2.5 px-4 rounded-lg hover:bg-[#3938b8] transition-colors ${!validateStep1() ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
              </div>
            </div>
          )}
        </form>
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
  )
}

export default GetCustomQoutePage
