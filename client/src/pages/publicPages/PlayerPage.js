import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import {
  BsFullscreen,
  BsFullscreenExit,
  BsVolumeMute,
  BsVolumeDown,
  BsVolumeUp,
} from 'react-icons/bs';
import { MdForward10 } from 'react-icons/md';
import { BiCaptions } from 'react-icons/bi';

const PlayerPage = () => {
  const videoContainerRef = useRef(null);
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const [fullScreen, setFullScreen] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showVolumeBar, setShowVolumeBar] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previewPosition, setPreviewPosition] = useState(null);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [playerOptions, setPlayerOptions] = useState({
    play: true,
    mute: true,
    volume: 0.5,
  });

  // show hide controller timeout

  useEffect(() => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      videoRef.current.muted = false;
      setPlayerOptions({
        ...playerOptions,
        play: true,
      });
    }
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('loadeddata', () => {
        setVideoDuration(videoRef.current.duration);
        videoRef.current.addEventListener('timeupdate', () => {
          setCurrentTime(videoRef.current.currentTime);
          const percent =
            videoRef.current.currentTime / videoRef.current.duration;
          setProgress(percent * 100);
        });
      });
    }

    document.addEventListener('mouseup', () => {
      setIsScrubbing(false);
    });

    return () => {
      document.removeEventListener('mouseup', () => {
        setIsScrubbing(false);
      });
    };
  }, []);

  const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2,
  });

  function toggleVolumeBar() {
    setShowVolumeBar(true);
  }

  function formatDuration(time) {
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / 3600);
    if (hours === 0) {
      return `${minutes}:${leadingZeroFormatter.format(seconds)}`;
    } else {
      return `${hours}:${leadingZeroFormatter.format(
        minutes
      )}:${leadingZeroFormatter.format(seconds)}`;
    }
  }

  function togglePlay() {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlayerOptions({
        ...playerOptions,
        play: true,
      });
    } else {
      videoRef.current.pause();
      setPlayerOptions({
        ...playerOptions,
        play: false,
      });
    }
  }

  function toggleFullScreen() {
    if (!fullScreen) {
      setFullScreen(true);
      videoContainerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
      setFullScreen(false);
    }
  }

  function toggleMute() {
    if (playerOptions.mute) {
      videoRef.current.muted = false;
      setPlayerOptions({
        ...playerOptions,
        mute: false,
        volume: videoRef.current.volume,
      });
    } else {
      videoRef.current.muted = true;
      setPlayerOptions({
        ...playerOptions,
        mute: true,
        volume: 0,
      });
    }
  }

  function skip(duration) {
    videoRef.current.currentTime += 20;
  }

  function handleVolume(e) {
    if (e.target.value === '0') {
      videoRef.current.muted = true;
      setPlayerOptions({
        ...playerOptions,
        mute: true,
        volume: e.target.value,
      });
      return;
    }
    videoRef.current.muted = false;
    setPlayerOptions({
      ...playerOptions,
      volume: e.target.value,
      mute: false,
    });
    videoRef.current.volume = e.target.value;
  }

  function handleTimelineUpdate(e) {
    // console.log('buttons', e.buttons);
    const rect = progressRef.current.getBoundingClientRect();
    const percent =
      Math.min(Math.max(0, e.clientX - rect.x), rect.width) / rect.width;
    setPreviewPosition(percent * 100);
    // setCurrentTime(videoDuration * percent);
    if (isScrubbing) {
      e.preventDefault();
      setProgress(percent * 100);
      videoRef.current.currentTime = videoDuration * percent;
    }
  }

  function toggleScrubbing(e) {
    e.preventDefault();
    setIsScrubbing(true);
    const rect = progressRef.current.getBoundingClientRect();
    const percent =
      Math.min(Math.max(0, e.clientX - rect.x), rect.width) / rect.width;

    setProgress(percent * 100);
    videoRef.current.currentTime = videoDuration * percent;
    handleTimelineUpdate(e);
  }

  // this will let us update the timeline during scrubbing outsite the timeline mousemove
  function handleScrubbingMove(e) {
    if (isScrubbing) toggleScrubbing(e);
  }

  return (
    <div
      className="group relative w-[90%] max-w-[1000px] flex justify-center"
      data-volume-level="high"
      ref={videoContainerRef}
      onMouseMove={handleScrubbingMove}
    >
      {isScrubbing && (
        <div className="absolute bg-white opacity-50 top-0 bottom-0 left-0 right-0"></div>
      )}
      <div className="absolute bottom-0 left-0 right-0 text-white z-[100] opacity-0 group-hover:opacity-100">
        <div className="h-[7px] mx-2 cursor-pointer flex items-center">
          <div
            ref={progressRef}
            className="relative w-full h-[7px] bg-slate-700"
            onMouseMove={handleTimelineUpdate}
            onMouseDown={toggleScrubbing}
            onMouseOut={() => setPreviewPosition(0)}
            onBlur={() => setPreviewPosition(0)}
          >
            {/* <div className="thumb-indicator"></div> */}
            <div
              style={{ right: `${100 - progress}%` }}
              className="absolute h-[7px] left-0 top-0 bottom-0 bg-red-700"
            ></div>
            <div
              style={{
                left: `${progress}%`,
                right: `${100 - previewPosition}%`,
              }}
              className="absolute h-[7px] top-0 bottom-0 bg-red-200"
            ></div>
            <div
              style={{
                position: 'absolute',
                backgroundColor: 'red',
                transform: 'translateX(-50%)',
                height: '200%',
                aspectRatio: '1/1',
                top: '-50%',
                borderRadius: '100%',
                left: `${progress}%`,
              }}
            ></div>
          </div>
        </div>
        <div className="flex gap-2 p-1 items-center">
          <button className="play-pause-btn" onClick={togglePlay}>
            {playerOptions?.play ? <FaPause /> : <FaPlay />}
          </button>
          <button onClick={() => skip(5)}>
            <MdForward10 />
          </button>
          <div>
            {formatDuration(currentTime)}/ {formatDuration(videoDuration)}
          </div>
          <div
            className="flex flex-grow"
            onMouseLeave={() => setShowVolumeBar(false)}
            onBlur={() => setShowVolumeBar(false)}
          >
            <button
              className=""
              onClick={toggleMute}
              onMouseOver={toggleVolumeBar}
              onFocus={toggleVolumeBar}
            >
              {playerOptions.mute ? (
                <BsVolumeMute />
              ) : Number(playerOptions.volume) < 0.5 ? (
                <BsVolumeDown />
              ) : (
                <BsVolumeUp />
              )}
            </button>
            {showVolumeBar && (
              <input
                onChange={handleVolume}
                className="cursor-pointer"
                type="range"
                min="0"
                max="1"
                step="any"
                value={playerOptions.volume}
              />
            )}
          </div>
          {/* <div className="volume-container">
            <button className="mute-btn">
              <svg className="volume-high-icon" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"
                />
              </svg>
              <svg className="volume-low-icon" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z"
                />
              </svg>
              <svg className="volume-muted-icon" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z"
                />
              </svg>
            </button>
            
          </div> */}
          <button>
            <BiCaptions />
          </button>
          <button>1.1x</button>

          {/* <button className="captions-btn">
            <svg viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M18,11H16.5V10.5H14.5V13.5H16.5V13H18V14A1,1 0 0,1 17,15H14A1,1 0 0,1 13,14V10A1,1 0 0,1 14,9H17A1,1 0 0,1 18,10M11,11H9.5V10.5H7.5V13.5H9.5V13H11V14A1,1 0 0,1 10,15H7A1,1 0 0,1 6,14V10A1,1 0 0,1 7,9H10A1,1 0 0,1 11,10M19,4H5C3.89,4 3,4.89 3,6V18A2,2 0 0,0 5,20H19A2,2 0 0,0 21,18V6C21,4.89 20.1,4 19,4Z"
              />
            </svg>
          </button>
          <button className="speed-btn wide-btn">1x</button>
          <button className="mini-player-btn">
            <svg viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z"
              />
            </svg>
          </button>
          <button className="theater-btn">
            <svg className="tall" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z"
              />
            </svg>
            <svg className="wide" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M19 7H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8H5V9h14v6z"
              />
            </svg>
          </button> */}
          <button onClick={toggleFullScreen}>
            {fullScreen ? <BsFullscreenExit /> : <BsFullscreen />}
          </button>
        </div>
      </div>
      <video
        autoPlay
        muted
        ref={videoRef}
        src="http://cdn.arrownetsylhet.com/Movies/English%20Movies%20All/2022/Bullet.Train.2022.1080p.WEBRip.mp4"
      >
        <track kind="captions" src="assets/subtitles.vtt" />
      </video>
    </div>
  );
};

export default PlayerPage;
