'use client';

import { useEffect, useRef } from 'react';

interface VideoBackgroundProps {
  posterUrl?: string;
  videoUrls: {
    mp4?: string;
    webm?: string;
  };
  autoplay?: boolean;
  loop?: boolean;
  className?: string;
}

export default function VideoBackground({
  posterUrl,
  videoUrls,
  autoplay = true,
  loop = false,
  className = '',
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video plays on mount
    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        console.warn('Video autoplay was prevented:', error);
      }
    };

    if (autoplay) {
      playVideo();
    }
  }, [autoplay]);

  return (
    <div className={`fixed inset-0 z-0 overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        autoPlay={autoplay}
        loop={loop}
        muted
        playsInline
        poster={posterUrl}
        className='absolute inset-0 w-full h-full object-cover'
        style={posterUrl ? { backgroundImage: `url("${posterUrl}")` } : undefined}>
        {videoUrls.mp4 && (
          <source
            src={videoUrls.mp4}
            type='video/mp4'
          />
        )}
        {videoUrls.webm && (
          <source
            src={videoUrls.webm}
            type='video/webm'
          />
        )}
        Your browser does not support the video tag.
      </video>

      {/* Optional overlay for better text readability */}
      <div className='absolute inset-0 bg-slate-50/10' />
    </div>
  );
}
