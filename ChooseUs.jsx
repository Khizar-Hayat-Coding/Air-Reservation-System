import React, { useState } from 'react';
import './ChooseUs.css';

const ChooseUs = () => {
  const [services] = useState([
    {
      title: "Best Prices",
      img: "https://img.icons8.com/fluency/96/cheap.png",
      alt: "price",
      description: "Promising Friendly fares with instant price matching. Find cheaper rate? We'll match."
    },
    {
      title: "24/7 Travel Support",
      img: "https://img.icons8.com/color/96/request-service.png",
      alt: "support",
      description: "Need Help ? We have team to solve issues via phone, chat, or email. Feel Free to Ask."
    },
    {
      title: "Airways Rewards",
      img: "https://img.icons8.com/external-flaticons-flat-flat-icons/100/external-points-black-friday-cyber-monday-flaticons-flat-flat-icons.png",
      alt: "rewards",
      description: "Earn miles on every flight and redeem for discounts and free trips of Khizar Airways."
    }
  ]);

  return (
    <section className="choose">
      <h2 className="heading">Why Choose Us?</h2>
      <div className="services">
        {services.map((service, index) => (
          <div className="item" key={index}>
            <div className="icons">
              <img src={service.img} alt={service.alt} />
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ChooseUs;
