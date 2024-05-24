import React, { useRef, useEffect } from 'react';
import YouTube from 'react-youtube';

function Player({ trailerUrl, onClose }) {
  const playerRef = useRef(null);

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls: 1,
    },
  };

  const handleReady = (event) => {
    const playerElement = playerRef.current;
    if (playerElement.requestFullscreen) {
      playerElement.requestFullscreen();
    } else if (playerElement.mozRequestFullScreen) {
      playerElement.mozRequestFullScreen();
    } else if (playerElement.webkitRequestFullscreen) { 
      playerElement.webkitRequestFullscreen();
    } else if (playerElement.msRequestFullscreen) { 
      playerElement.msRequestFullscreen();
    }
  };

  const handleEnd = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { 
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { 
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { 
      document.msExitFullscreen();
    }
    onClose();
  };

  useEffect(() => {
    return () => handleEnd(); 
  }, []);

  return (
    <div className="player" ref={playerRef}>
      <YouTube videoId={trailerUrl} opts={opts} onReady={handleReady} />
    </div>
  );
}

export default Player;
