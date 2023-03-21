import React, { useRef } from "react";

export default function EditionVideo ({url} ) { 
  const videoRef = useRef(null)

  return (
    <div>
      <video
      className="edition_video"
        ref={videoRef}
        controls
        onPlay={() => {
          videoRef.current.play();
        }}
      >
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );

      }      