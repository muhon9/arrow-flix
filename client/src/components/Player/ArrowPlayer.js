import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlay, FaPause } from 'react-icons/fa';
import {
  BsFullscreen,
  BsFullscreenExit,
  BsVolumeMute,
  BsVolumeDown,
  BsVolumeUp,
} from 'react-icons/bs';
import { AiOutlinePlayCircle } from 'react-icons/ai';
import { BiCaptions, BiArrowBack } from 'react-icons/bi';
import { capitalizeEveryFirstLetter } from 'utilities/utils';

const ArrowPlayer = ({
  src = 'Asd/aw',
  track,
  title = 'Not specified',
  ...rest
}) => {
  const navigate = useNavigate();

  // refs
  const videoContainerRef = useRef(null);
  const videoRef = useRef(null);
  const progressRef = useRef(null);

  //states
  const [fullScreen, setFullScreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [showVolumeBar, setShowVolumeBar] = useState(false);
  const [shwoControls, setShowControls] = useState(false);
  const [loading, setLoading] = useState(true);

  //state that will track the progress in timeline
  const [progress, setProgress] = useState(0);

  //It will track the mousemovement over timeline
  const [previewPosition, setPreviewPosition] = useState(null);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [prevVolume, setPrevVolume] = useState(0.5);

  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [caption, setCaption] = useState(true);

  const [error, setError] = useState('');

  let interval;

  useEffect(() => {
    if (videoRef.current.paused) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
      videoRef.current.muted = false;
      if (videoRef.current.textTracks[0]) {
        videoRef.current.textTracks[0].mode = 'showing';
      }
    }
  }, []);

  // register necessay event listener related with video playing
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.onloadeddata = () => {
        setVideoDuration(videoRef.current.duration);
        videoRef.current.ontimeupdate = () => {
          setCurrentTime(videoRef.current.currentTime);
          const percent =
            (videoRef.current.currentTime / videoRef.current.duration) * 100;
          setProgress(percent);
        };
      };

      videoRef.current.onerror = () => {
        setError('There was an error loading the video');
      };

      videoRef.current.onplaying = () => {
        setIsPlaying(true);
        setLoading(false);
        setError(null);
      };

      videoRef.current.onwaiting = () => {
        setLoading(true);
      };
    }
  }, []);

  // register eventlistener with document
  useEffect(() => {
    document.addEventListener('mouseup', () => {
      setIsScrubbing(false);
    });

    return () => {
      document.removeEventListener('mouseup', () => {
        setIsScrubbing(false);
      });
    };
  }, []);

  //function to handel keyboard shortcuts
  function handleKeyboardShortcuts(e) {
    switch (e.key.toLowerCase()) {
      case ' ':
        togglePlay();
        break;
      case 'k':
        togglePlay();
        break;
      case 'f':
        toggleFullScreen();
        break;
      case 'm':
        toggleMute();
        break;
      case 'arrowup':
        handleVolume(e);
        break;
      case 'arrowdown':
        handleVolume(e);
        break;
      case 'arrowleft':
      case 'j':
        skip(-10);
        break;
      case 'arrowright':
      case 'l':
        skip(10);
        break;
      case 'c':
        toggleCaption();
        break;
      default:
        break;
    }
  }

  //register keydown eventlistener to handle keyboard shortcuts
  useEffect(() => {
    document.addEventListener('keydown', handleKeyboardShortcuts);

    return () => {
      document.removeEventListener('keydown', handleKeyboardShortcuts);
    };
  }, [handleKeyboardShortcuts]);

  // function to show and hide video control options when user moves mouse
  function handleShowControls() {
    setShowControls(true);
    if (interval) clearTimeout(interval);
    interval = setTimeout(() => {
      setShowControls(false);
    }, 5000);
  }

  // register mousemove eventlistener
  useEffect(() => {
    document.addEventListener('mousemove', handleShowControls);

    return () => {
      document.removeEventListener('mousemove', handleShowControls);
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
      setShowControls(false);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      setShowControls(true);
    }
  }

  // handle fullscrenn toggle
  function toggleFullScreen() {
    if (document.fullscreenElement == null) {
      setFullScreen(true);
      videoContainerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
      setFullScreen(false);
    }
  }

  function toggleMute() {
    if (videoRef.current.muted) {
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
    if (e.key === 'ArrowUp') {
      videoRef.current.muted = false;
      const newVolume = videoRef.current.volume + 0.1;
      setIsMuted(false);
      if (newVolume <= 1) {
        videoRef.current.volume = newVolume;
        setVolume(newVolume);
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      videoRef.current.muted = false;
      const newVolume = (videoRef.current.volume - 0.1).toFixed(2);
      setIsMuted(false);
      if (newVolume < 0.1) {
        videoRef.current.volume = 0;
        setVolume(0);
        videoRef.current.muted = true;
        setIsMuted(true);
      }
      if (newVolume >= 0.1) {
        videoRef.current.volume = newVolume;
        setVolume(newVolume);
      }
      return;
    }

    if (e.target.value === '0') {
      videoRef.current.muted = true;
      setIsMuted(true);
      setVolume(e.target.value);
      return;
    }

    videoRef.current.muted = false;
    setIsMuted(false);
    setVolume(e.target.value);
    videoRef.current.volume = e?.target?.value;
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
      className={`group relative w-full h-[100vh] flex justify-center ${
        shwoControls ? 'cursor-auto' : 'cursor-none'
      }`}
      data-volume-level="high"
      ref={videoContainerRef}
      onMouseMove={handleScrubbingMove}
    >
      {loading && isPlaying && (
        <div className="absolute text-6xl lg:text-8xl text-red-600 font-bold top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <svg
            className="inline mr-2 w-12 h-12 text-gray-200 animate-spin fill-red-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      )}
      {error && (
        <div className="absolute right-20 top-20 text-white bg-red-700 p-2">
          {error}
        </div>
      )}
      {isScrubbing && (
        <div className="absolute bg-white opacity-50 top-0 bottom-0 left-0 right-0"></div>
      )}
      {!isPlaying && !error && (
        <div className="absolute text-6xl lg:text-8xl text-red-600 font-bold top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <AiOutlinePlayCircle />
        </div>
      )}
      <div
        onClick={() => navigate(-1)}
        className={`absolute left-6 top-6 text-white cursor-pointer select-auto z-[100] text-3xl ${
          shwoControls || !isPlaying ? 'opacity-100' : 'opacity-0'
        } `}
      >
        <BiArrowBack />
      </div>
      <div
        className={`absolute bottom-0 left-0 right-0 h-[10%] text-gray-400 z-[100] ${
          shwoControls || !isPlaying ? 'opacity-100' : 'opacity-0'
        } `}
      >
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
            {capitalizeEveryFirstLetter(title)}
          </div>
          {track && (
            <button
              className={`text-3xl border-b-2 border-red-700 border-opacity-0 hover:text-white ${
                caption && 'border-opacity-100'
              }`}
              onClick={toggleCaption}
            >
              <BiCaptions />
            </button>
          )}
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
      <video onClick={togglePlay} {...rest} ref={videoRef} src={src}>
        <track kind="captions" srcLang="en" src={track} />
      </video>
    </div>
  );
};

export default ArrowPlayer;
