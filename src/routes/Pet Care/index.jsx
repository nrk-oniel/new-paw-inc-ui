/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable global-require */
/* eslint-disable import/no-duplicates */
import React from 'react';
import {
  Container, Row, Col, Image,
} from 'react-bootstrap';
import NewsBox from './Components/NewsBox';

import { styleHomePetcare } from './styles';

function Petcare() {
  const news2 = [
    {
      link: 'https://www.wdam.com/2023/03/26/exotic-pets-require-another-level-responsibility-owners/',
      asset: require('./assets/news1.png'),
      alt: 'news1',
      title: 'Exotic pets require another level of responsibility from owners',
    },
    {
      link: 'https://edition.cnn.com/2023/03/25/us/jumping-spider-pets-tiktok-cec/index.html',
      asset: require('./assets/news2.png'),
      alt: 'news2',
      title: 'How jumping spiders became the new ‘it’ pets',
    },
    {
      link: 'https://zeenews.india.com/relationship/pets/exclusive-pet-care-in-summers-7-tips-on-how-to-take-care-of-your-furry-friend-in-scorching-heat-2587719.html',
      asset: require('./assets/news3.png'),
      alt: 'news3',
      title: 'Pet Care In Summers: 7 Tips On How To Take Care Of Your Furry Friend In Scorching Heat',
    },
    {
      link: 'https://www.theguardian.com/business/2023/mar/24/cat-astrophe-whiskas-pet-food-creates-a-racket-over-shrinking-servings',
      asset: require('./assets/news4.png'),
      alt: 'news4',
      title: 'Cat-astrophe? Whiskas pet food criticised over shrinking servings',
    },
  ];

  return (
    <div>
      <div style={styleHomePetcare} />
      <div>
        <div className="text-center">
          <h2 className="w-75 mx-auto p-5">
            “Animals have come to mean so much in our lives. We live in a
            fragmented and disconnected culture. Politics are ugly, religion is
            struggling, technology is stressful, and the economy is unfortunate.
            What’s one thing that we have in our lives that we can depend on? A
            dog or a cat loving us unconditionally, every day, very faithfully.”
          </h2>
          <h2> - Jon Katz</h2>
        </div>
        <Container className="my-5">
          <Row>
            <Col>
              <h3>What do I need to know before I get a new pet ?</h3>
              <p>
                A companion animal is an animal that provides companionship to
                humans, also known as pet.
              </p>
              <br />
              <p>
                Here are some things that you need to acknowledge before getting
                a new pet:
              </p>
              <ul>
                <li>
                  Am I prepared to care for the animal for their whole life ?
                </li>
                <li>Can I afford a pet ?</li>
                <li>Do I understand how to care for a pet ?</li>
                <li>Do I have time for a pet ?</li>
                <li>
                  Do I live in a suitable accomodation with adequate space for a
                  pet ?
                </li>
                <li>Will a pet fit into my lifestyle and priorities ?</li>
              </ul>
              <br />
              <h2>
                Read More
                {' '}
                <Image
                  id="buttonReadMoreService"
                  src={require('./assets/button.png')}
                  alt="button"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(
                      'https://kb.rspca.org.au/knowledge-base/what-do-i-need-to-know-before-i-get-a-new-pet/',
                      '_blank',
                    );
                  }}
                  fluid
                />
              </h2>
            </Col>
            <Col>
              <Image
                height="400px"
                src={require('./assets/cat.jpg')}
                alt="cat"
              />
            </Col>
          </Row>
        </Container>
        <div className="my-3">
          <h3 className="text-center">Pet News</h3>
          <Container>
            <Row md={1} lg={2} className="g-3">
              {news2.map((item) => (
                <Col>
                  <NewsBox
                    link={item.link}
                    asset={item.asset}
                    alt={item.alt}
                    title={item.title}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Petcare;
