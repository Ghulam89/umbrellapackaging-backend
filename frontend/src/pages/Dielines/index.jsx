import React from 'react';
import video from '../../assets/videos/dieline-video.mp4';
function Dielines() {
  return (
    <>
      <div className="sm:max-w-8xl bg-[#f9fafb] p-7 rounded-2xl max-w-[95%] mx-auto">
        <div>
        </div>
        <div>
          <video width="640" height="360" autoplay loop muted playsinline>
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

    </>
  );
}

export default Dielines;