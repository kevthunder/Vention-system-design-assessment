'use client'
import Image from "next/image";

interface Video {
  id: string;
  title: string;
  description: string;
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
  const handleVideoLike = (id: string, e: React.UIEvent) => {
    console.log(`Like video ID: ${id}`);
    e.stopPropagation(); // Prevent triggering video selection
  }; 
  const handleVideoShare = (id: string, e: React.UIEvent) => {
    console.log(`Share video ID: ${id}`);
    e.stopPropagation(); // Prevent triggering video selection
  }; 
  const handleVideoSave = (id: string, e: React.UIEvent) => {
    console.log(`Save video ID: ${id}`);
    e.stopPropagation(); // Prevent triggering video selection
  }; 
  const handleVideoWatchLater = (id: string, e: React.UIEvent) => {
    console.log(`Watch Later video ID: ${id}`);
    e.stopPropagation(); // Prevent triggering video selection
  }; 

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {videos.map((video) => (
        <div key={video.id} className="bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col" onClick={() => handleVideoSelect(video.id)}>
          <div className="relative">
            <Image src={video.thumbnail} width="250" height="100" alt={video.title} className="video-thumbnail" />
            <button onClick={(e) => handleVideoWatchLater(video.id,e)} className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white rounded-full p-2 hover:bg-opacity-90" title="Watch Later">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 6v6l4 2" /></svg>
            </button>
          </div>
          <div className="p-4 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="video-title font-semibold text-lg line-clamp-2">{video.title}</h3>
              <p className="text-gray-600 text-sm mt-1 line-clamp-2">{video.description}</p>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <button onClick={(e) => handleVideoLike(video.id,e)} className="flex items-center gap-1 text-gray-500 hover:text-red-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 15l7-7 7 7" /></svg>
                Like
              </button>
              <button onClick={(e) => handleVideoShare(video.id,e)} className="flex items-center gap-1 text-gray-500 hover:text-blue-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4v16h16V4H4zm8 8h8" /></svg>
                Share
              </button>
              <button onClick={(e) => handleVideoSave(video.id,e)} className="flex items-center gap-1 text-gray-500 hover:text-green-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>
                Save
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoList;