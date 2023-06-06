/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState } from 'react';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

function NewsBox(props) {
  const {
    link, top, left, asset, alt,
  } = props;
  const [isHover, setHover] = useState(false);
  return (
    <div
      id="imageContainer"
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {isHover && (
        <Button
          onClick={(e) => {
            e.preventDefault();
            window.open(
              `${link}`,
              '_blank',
            );
          }}
          size="sm"
          style={{
            position: 'absolute',
            top,
            left,
          }}
          variant="primary"
        >
          Read News
        </Button>
      )}
      <Image src={asset} alt={alt} fluid />
    </div>
  );
}

export default NewsBox;
