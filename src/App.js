import React, { useEffect, useRef } from 'react';
import './App.css';
import videojs from 'video.js/dist/video'
import 'video.js/dist/video-js.min.css'

function App() {
  const videoRef = useRef()
  const player = useRef()

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
    <div className="App">
      <div data-vjs-player>
        <video
          ref={videoRef}
          id="my_video_1"
          className="video-js vjs-default-skin"
          controls
          poster=""
          data-setup="{}"
        />
      </div>
    </div>
  );
}

export default App;
