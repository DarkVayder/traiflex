import React, { useEffect, useRef } from 'react';
import './Player.css';
import back from './back.png';

const Player = ({ trailerUrl, onClose }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    const playerElement = playerRef.current;
    if (playerElement.requestFullscreen) {
      playerElement.requestFullscreen();
    } else if (playerElement.mozRequestFullScreen) { // Firefox
      playerElement.mozRequestFullScreen();
    } else if (playerElement.webkitRequestFullscreen) { // Chrome, Safari & Opera
      playerElement.webkitRequestFullscreen();
    } else if (playerElement.msRequestFullscreen) { // IE/Edge
      playerElement.msRequestFullscreen();
    }

    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) {
        onClose();
      }
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    };
  }, [onClose]);

  return (
    <div className='player' ref={playerRef}>
      <img src={back} alt='Back' onClick={onClose} className='back-button' />
      <iframe
        width='90%'
        height='90%'
        src={`https://www.youtube.com/embed/${trailerUrl}`}
        title='trailer'
        allowFullScreen
      ></iframe>
      <div className='player-info'></div>
    </div>
  );
};

export default Player;
