/* eslint-disable global-require */
import React from 'react';

import { styleHomeServices } from './styles';

const features = [
  {
    header: 'The Advantages',
    data: [
      {
        id: 1,
        img: require('./assets/practical.png'),
        title: 'Practical',
        desc: 'The practical reservation process that can be done anytime and anywhere',
      },
      {
        id: 2,
        img: require('./assets/fast.png'),
        title: 'Fast',
        desc: 'The fast reservation process reduces your queueing time',
      },
      {
        id: 3,
        img: require('./assets/easy.png'),
        title: 'Easy',
        desc: 'The fast reservation process reduces your queueing time',
      },
    ],
  },
  {
    header: 'How to Book',
    data: [
      {
        id: 4,
        img: require('./assets/registration.png'),
        title: 'Registration',
        desc: 'Register via the Paw Inc. website',
      },
      {
        id: 5,
        img: require('./assets/reservation.png'),
        title: 'Reservation Form',
        desc: 'Reserving by filling out the consultation registration form',
      },
      {
        id: 6,
        img: require('./assets/nearest.png'),
        title: 'Nearest Hospital',
        desc: 'Find the nearest veterinary clinics for consultation',
      },
      {
        id: 7,
        img: require('./assets/ticket.png'),
        title: 'Reservation Ticket',
        desc: 'Your reservation ticket has been made',
      },
    ],
  },
];

function Service() {
  return (
    <div id="serviceContainer">
      <div style={styleHomeServices} />
      <div>
        <div id="advantage" className="text-center mx-auto py-3">
          {features.map((item) => (
            <div className="py-5">
              <h1>{item.header}</h1>
              <div className="row">
                {item.data.map((data) => (
                  <div className="col">
                    <img width="260" src={data.img} alt="" />
                    <h2>{data.title}</h2>
                    <p className="w-50 mx-auto">{data.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Service;
