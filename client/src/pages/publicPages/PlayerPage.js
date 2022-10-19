import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import {
  BsFullscreen,
  BsFullscreenExit,
  BsVolumeMute,
  BsVolumeDown,
  BsVolumeUp,
} from 'react-icons/bs';
import { BiCaptions } from 'react-icons/bi';

const PlayerPage = () => {
  // refs
  const videoContainerRef = useRef(null);
  const videoRef = useRef(null);
  const progressRef = useRef(null);

  //states
  const [fullScreen, setFullScreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [showVolumeBar, setShowVolumeBar] = useState(false);

  //state that will track the progress in timeline
  const [progress, setProgress] = useState(0);

  //It will track the mousemovement over timeline
  const [previewPosition, setPreviewPosition] = useState(null);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [prevVolume, setPrevVolume] = useState(0.5);

  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [caption, setCaption] = useState(true);

  // modularize the player

  useEffect(() => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      videoRef.current.muted = true;
      if (videoRef.current.textTracks[0]) {
        videoRef.current.textTracks[0].mode = 'showing';
      }

      setIsPlaying(true);
    }
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      console.log('Captions', videoRef.current.textTracks[0]);
      videoRef.current.addEventListener('loadeddata', () => {
        setVideoDuration(videoRef.current.duration);
        videoRef.current.addEventListener('timeupdate', () => {
          setCurrentTime(videoRef.current.currentTime);
          const percent =
            (videoRef.current.currentTime / videoRef.current.duration) * 100;
          setProgress(percent);
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

  // handle play pause
  function togglePlay() {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }

  // handle fullscrenn toggle
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
    if (isMuted) {
      videoRef.current.muted = false;
      videoRef.current.volume = prevVolume;
      setIsMuted(false);
      setVolume(prevVolume);
    } else {
      setPrevVolume(volume);
      videoRef.current.muted = true;
      setIsMuted(true);
      videoRef.current.volume = 0;
      setVolume(0);
    }
  }

  function skip(duration) {
    videoRef.current.currentTime += duration;
  }

  // will handle the volume increase & decrease
  function handleVolume(e) {
    if (e.target.value === '0') {
      videoRef.current.muted = true;
      setIsMuted(true);
      setVolume(e.target.value);
      return;
    }

    videoRef.current.muted = false;
    setIsMuted(false);
    setVolume(e.target.value);
    videoRef.current.volume = e.target.value;
  }

  // this function will handle the timeline update when user hover over the timeline
  function handleTimelineUpdate(e) {
    // get the data like height width position of the progressbar
    const rect = progressRef.current.getBoundingClientRect();
    const percent =
      Math.min(Math.max(0, e.clientX - rect.x), rect.width) / rect.width;
    setPreviewPosition(percent * 100);

    // if the user is moving the mouse when clicking we will change the progressbar
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

  function handlePlaybackSpeed() {
    let newPlaybackRate = videoRef.current.playbackRate + 0.25;
    if (newPlaybackRate > 2) newPlaybackRate = 0.25;
    videoRef.current.playbackRate = newPlaybackRate;
    setPlaybackSpeed(newPlaybackRate);
  }

  // function toggleCaptions() {
  //   const isHidden = captions.mode === "hidden"
  //   captions.mode = isHidden ? "showing" : "hidden"
  //   videoContainer.classList.toggle("captions", isHidden)
  // }

  function toggleCaption() {
    if (caption) {
      setCaption(false);
      videoRef.current.textTracks[0].mode = 'hidden';
    } else {
      setCaption(true);
      videoRef.current.textTracks[0].mode = 'showing';
    }
  }

  // this will let us update the timeline during scrubbing outsite the timeline mousemove
  function handleScrubbingMove(e) {
    if (isScrubbing) toggleScrubbing(e);
  }

  return (
    <div
      className="group relative w-full h-[100vh] flex justify-center"
      data-volume-level="high"
      ref={videoContainerRef}
      onMouseMove={handleScrubbingMove}
    >
      {isScrubbing && (
        <div className="absolute bg-white opacity-50 top-0 bottom-0 left-0 right-0"></div>
      )}
      <div className="absolute bottom-0 left-0 right-0 h-[10%] text-gray-400 z-[100] opacity-100 group-hover:opacity-100">
        <div className="mx-2 cursor-pointer flex items-center h-[20%]">
          <div
            ref={progressRef}
            id="timeline-container"
            className="relative flex-grow h-[7px] bg-slate-700"
            onMouseMove={handleTimelineUpdate}
            onMouseDown={toggleScrubbing}
            onMouseOut={() => setPreviewPosition(0)}
            onBlur={() => setPreviewPosition(0)}
          >
            {/* <div className="thumb-indicator"></div> */}
            <div
              id="timeline-progress"
              style={{ right: `${100 - progress}%` }}
              className="absolute h-[7px] left-0 top-0 bottom-0 bg-red-700"
            ></div>
            <div
              id="timeline-preview"
              style={{
                left: `${progress}%`,
                right: `${100 - previewPosition}%`,
              }}
              className="absolute h-[7px] top-0 bottom-0 bg-red-200"
            ></div>
            <div
              id="timeline-indicator"
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
          <div className="text-sm min-w-[80px] flex justify-end pr-2">
            {formatDuration(videoDuration - currentTime)}
          </div>
        </div>
        <div className="flex gap-4 p-1 px-4 items-center h-[80%]">
          <button className="text-2xl hover:text-white" onClick={togglePlay}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>

          <button onClick={() => skip(-10)}>
            <svg
              className="fill-gray-400 hover:fill-white"
              viewBox="0 0 24 24"
              height="30px"
              width="30px"
            >
              <path d="M12.5,3C17.15,3 21.08,6.03 22.47,10.22L20.1,11C19.05,7.81 16.04,5.5 12.5,5.5C10.54,5.5 8.77,6.22 7.38,7.38L10,10H3V3L5.6,5.6C7.45,4 9.85,3 12.5,3M10,12V22H8V14H6V12H10M18,14V20C18,21.11 17.11,22 16,22H14A2,2 0 0,1 12,20V14A2,2 0 0,1 14,12H16C17.11,12 18,12.9 18,14M14,14V20H16V14H14Z" />
            </svg>
          </button>

          <button onClick={() => skip(10)}>
            <svg
              className="fill-gray-400 hover:fill-white"
              viewBox="0 0 24 24"
              height="30px"
              width="30px"
            >
              <path d="M10,12V22H8V14H6V12H10M18,14V20C18,21.11 17.11,22 16,22H14A2,2 0 0,1 12,20V14A2,2 0 0,1 14,12H16C17.11,12 18,12.9 18,14M14,14V20H16V14H14M11.5,3C14.15,3 16.55,4 18.4,5.6L21,3V10H14L16.62,7.38C15.23,6.22 13.46,5.5 11.5,5.5C7.96,5.5 4.95,7.81 3.9,11L1.53,10.22C2.92,6.03 6.85,3 11.5,3Z" />
            </svg>
          </button>
          <div
            className="flex flex-grow md:flex-none"
            onMouseLeave={() => setShowVolumeBar(false)}
            onBlur={() => setShowVolumeBar(false)}
          >
            <button
              className="text-3xl hover:text-white"
              onClick={toggleMute}
              onMouseOver={toggleVolumeBar}
              onFocus={toggleVolumeBar}
            >
              {isMuted ? (
                <BsVolumeMute />
              ) : Number(volume) < 0.5 ? (
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
                value={volume}
              />
            )}
          </div>
          <div
            id="movie-title"
            className="hidden md:flex flex-grow justify-center text-xl "
          >
            Bullet Train
          </div>
          <button
            className={`text-3xl border-b-2 border-red-700 border-opacity-0 hover:text-white ${
              caption && 'border-opacity-100'
            }`}
            onClick={toggleCaption}
          >
            <BiCaptions />
          </button>
          <button
            className="text-lg min-w-[70px] hover:text-white select-none"
            onClick={handlePlaybackSpeed}
          >
            {playbackSpeed.toFixed(2)}x
          </button>
          <button
            className="text-2xl hover:text-white"
            onClick={toggleFullScreen}
          >
            {fullScreen ? <BsFullscreenExit /> : <BsFullscreen />}
          </button>
        </div>
      </div>
      <video
        onClick={togglePlay}
        autoPlay
        muted
        ref={videoRef}
        // src="http://cdn.arrownetsylhet.com/Movies/English%20Movies%20All/2022/Bullet.Train.2022.1080p.WEBRip.mp4"
        src="videos/Video.mp4"
      >
        <track kind="captions" srcLang="en" src="videos/subtitles.vtt" />
      </video>
    </div>
  );
};

export default PlayerPage;
