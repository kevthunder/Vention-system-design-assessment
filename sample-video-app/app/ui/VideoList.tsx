'use client'
import Image from "next/image";
import React from 'react';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
}

interface VideoListProps {
  videos: Video[];
}

const VideoList: React.FC<VideoListProps> = ({ videos }) => {
  const handleVideoSelect = (id: string) => {
    // Handle video selection (e.g., navigate to video page)
    console.log(`Selected video ID: ${id}`);
  }; 

  return (
    <div className="video-list">
      {videos.map(video => (
        <div key={video.id} className="video-item" onClick={() => handleVideoSelect(video.id)}>
          <Image src={video.thumbnail} width="250" height="100" alt={video.title} className="video-thumbnail" />
          <h3 className="video-title">{video.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default VideoList;