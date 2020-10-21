import React, { useEffect, useRef } from 'react';
import videojs from 'video.js/dist/video';
import poster from '../../assets/meigo.jpg'

const Video = () => {
  const videoRef = useRef()
  const player = useRef()

  const handleMouseEnter = () => {
    player.current.currentTime(3)
    player.current.play()
    
  }

  const handleMouseLeave = () => {
    player.current.pause()
    const buffered = player.current.buffered()
    const howMuchIsDownloaded = player.current.bufferedPercent();
    console.log(buffered)
    console.log(howMuchIsDownloaded)
  }

  const setPlayerSource = () => {
    const src = 'http://techslides.com/demos/sample-videos/small.mp4'
    let type = 'application/x-mpegURL'
    if (/(.mp4)/g.test(src)) type = 'video/mp4'
    console.log(player.current.src)
    player.current.src([{src, type}])
  }

  const onPlayerReday = () => {
    console.log('player reday')
  }

  const onPlayerLoad = () => {
    console.log(this)
    console.log(player.current.videoWidth())
    console.log(player.current.videoHeight())
    // videoRef.current.width = player.current.videoWidth()
    // videoRef.current.height = player.current.videoHeight()
  }

  useEffect(() => {
    
    const option = {
      html5: {
        nativeTextTracks: false // 隱藏mobile內建字幕按鈕
      },
      loop: true,
      language: 'zh',
      languages: {
        zh: {
          LIVE: ""
        }
      },
      controlBar: {
        pictureInPictureToggle: false
      }
    }
    player.current = videojs(videoRef.current, option, onPlayerReday)
    player.current.on('loadeddata', onPlayerLoad)
    setPlayerSource()
  }, [])

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-vjs-player
    >
      <video
        ref={videoRef}
        id="my_video_1"
        className="vjs-matrix video-js vjs-default-skin vjs-big-play-centered"
        controls
        poster={poster}
        data-setup="{}"
      >
        <p class="vjs-no-js">
          To view this video please enable JavaScript, and consider upgrading to a
          web browser that
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://videojs.com/html5-video-support/"
          >supports HTML5 video</a>
        </p>
      </video>
    </div>
  )
}

export default Video