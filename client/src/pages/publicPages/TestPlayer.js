import React from 'react';

const TestPlayer = () => {
  return (
    <div>
      <video
        muted
        autoPlay
        controls
        // src="http://cdn.arrownetsylhet.com/Movies/English%20Movies%20All/2022/Bullet.Train.2022.1080p.WEBRip.mp4"
        src="videos/Video.mp4"
      >
        <track kind="captions" srcLang="en" src="videos/subtitles.vtt" />
      </video>
    </div>
  );
};

export default TestPlayer;
