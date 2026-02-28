import React from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'
import { BaseUrl } from '../../utils/BaseUrl'

function PackagingBanner({ bgImage, title, subTitle, url }) {
  const base =
    typeof bgImage === 'string'
      ? bgImage.split('/').pop().replace(/\.[^/.]+$/, '')
      : 'banner';

  return (
    <div className="sm:max-w-6xl max-w-[95%] my-2 mt-5 mx-auto rounded-[8px] sm:h-[300px] h-[250px] relative overflow-hidden">
      <picture>
        <source
          srcSet={`${BaseUrl}/images/${base}_small.webp`}
          media="(max-width: 640px)"
          type="image/webp"
        />
        <source
          srcSet={`${BaseUrl}/images/${base}_medium.webp`}
          media="(max-width: 1024px)"
          type="image/webp"
        />
        <source
          srcSet={`${BaseUrl}/images/${base}_large.webp`}
          media="(min-width: 1025px)"
          type="image/webp"
        />
        <img
          src={bgImage}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </picture>

      <div className="absolute inset-0 bg-[#00000084] mix-blend-multiply"></div>

      <div className="absolute inset-0 flex justify-center items-center p-5">
        <div className="md:max-w-4xl max-w-[100%] mx-auto">
          <div className="flex flex-col justify-center items-center text-white">
            <strong className="text-center sm:text-[14px] text-[13px] text-[#E97900] font-semibold">
              {title}
            </strong>
            <label className="md:text-[38px] text-[20px] font-semibold leading-9 pt-2 text-center text-[#fff]">
              {subTitle}
            </label>
            <Link to={url} className="mt-4">
              <Button
                className="bg-[#4440E6] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg min-w-[150px] text-sm sm:text-base"
                label="Order Kraft Packaging"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PackagingBanner
