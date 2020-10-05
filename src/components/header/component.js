import React, { useState } from 'react';
import styles, { stylesGlobal } from '$root/components/header/styles';

import ImageGallery from 'react-image-gallery';
import Modal from 'react-responsive-modal';

export default function Header(props) {
  const [modalVideo, setModalVideo] = useState(false);
  const images = [
    { original: '/images/headers/home-main.jpg' },
    { original: '/images/headers/home-fortress.jpg' },
    { original: '/images/headers/home-desert.jpg' },
    { original: '/images/headers/home-snow.jpg' },
    { original: '/images/headers/home-forest.jpg' },
    { original: '/images/headers/home-grass.jpg' },
    { original: '/images/headers/home-water.jpg' },
    { original: '/images/headers/home-normal.jpg' },
    { original: '/images/headers/home-rain.jpg' },
    { original: '/images/headers/home-special.jpg' }
  ];

  return (
    <div>
      {(() => {
        switch (props.activePage) {
          case '/':
            return (
              <div className="main-header-home">
                <div className="my-container">
                  <ImageGallery
                    items={images}
                    autoPlay={true}
                    slideInterval={6000}
                    showThumbnails={false}
                    showBullets={true}
                    showPlayButton={false}
                    showFullscreenButton={false}
                  />
                  <div className="overlay">
                    <div className="header-info">
                      <img src="/images/logos/praetorians-hd-remaster.png" />
                      <div className="description-container">
                        <span>A remastered RTS videogame.</span>
                        <span>A crusade to become Emperor.</span>
                      </div>
                      <div className="buttons-watch-buy">
                        <button onClick={() => setModalVideo(true)} className="button-watch">
                          WATCH TRAILER
                        </button>
                        <a
                          href="https://store.steampowered.com/app/1100420/Praetorians__HD_Remaster"
                          className="button-buy"
                        >
                          BUY GAME
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <img src="/images/various/spqr.png" className="spqr" />
                <Modal
                  open={modalVideo}
                  onClose={() => setModalVideo(false)}
                  center
                  styles={{
                    modal: { padding: '36px' },
                    closeButton: {
                      top: '6px',
                      right: '6px'
                    }
                  }}
                >
                  <video autoPlay controls width="100%">
                    <source src="/videos/trailer-full.mp4" type="video/mp4" />
                  </video>
                </Modal>
              </div>
            );
          case '/about':
            return (
              <div className="main-header">
                <div className="my-container">
                  <video autoPlay loop className="video">
                    <source src="/videos/trailer-edited.mp4" type="video/mp4" />
                  </video>
                </div>
                <img src="/images/various/spqr.png" className="spqr" />
              </div>
            );
          default:
            return (
              <div className="main-header">
                <div className={`my-container ${props.activePage}`}>
                  <h1 className="heading1 title-text">{props.activePageTitle}</h1>
                </div>
                <img src="/images/various/spqr.png" className="spqr" />
              </div>
            );
        }
      })()}
      <style jsx>{styles}</style>
      <style jsx global>
        {stylesGlobal}
      </style>
    </div>
  );
}
