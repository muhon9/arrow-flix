import ArrowPlayer from 'components/Player/ArrowPlayer';

const PlayerPage = () => {
  return (
    <ArrowPlayer
      src="http://cdn.arrownetsylhet.com/Movies/English%20Movies%20All/2022/Bullet.Train.2022.1080p.WEBRip.mp4"
      track="videos/subtitles.vtt"
      autoPlay
      muted
    />
  );
};

export default PlayerPage;
