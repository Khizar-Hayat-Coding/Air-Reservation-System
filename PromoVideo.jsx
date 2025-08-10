import React, { useState } from 'react';
import './PromoVideo.css';
import Promo from './Visuals/Airline Promo.mp4';

const PromoVideo = () => {
  const [videoData] = useState({
    src: Promo,
    type: 'video/mp4',
    heading: 'Experience Khizar Airways',
    color: 'rgb(240, 240, 0)'
  });

  return (
    <section className="promo">
      <h2 className="heading" style={{ color: videoData.color }}>
        {videoData.heading}
      </h2>
      <div className="videobox">
        <video autoPlay loop controls>
          <source src={videoData.src} type={videoData.type} />
        </video>
      </div>
    </section>
  );
};

export default PromoVideo;
