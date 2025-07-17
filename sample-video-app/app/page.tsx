
import VideoList from "./ui/VideoList";
import type { Video } from "./types/video";

async function GetVideos(): Promise<Video[]> {
  try {
    const response = await fetch('http://localhost:3001/api/videos');
    return response.json();
  } catch (error) {
    console.error("Could not fetch videos. Did you start the API server ? Using fallback data.", error);
    return [
      {
        id: "1",
        title: "How to Build a YouTube Clone",
        description: "Step-by-step guide to building a YouTube clone with Next.js and Tailwind CSS.",
        url: "https://www.example.com/video1",
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg"
      },
      {
        id: "2",
        title: "React 19 New Features",
        description: "Explore the latest features in React 19.",
        url: "https://www.example.com/video2",
        thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/0.jpg"
      },
      {
        id: "3",
        title: "Next.js 15 Crash Course",
        description: "Learn Next.js 15 in 30 minutes!",
        url: "https://www.example.com/video3",
        thumbnail: "https://img.youtube.com/vi/3JZ_D3ELwOQ/0.jpg"
      }
    ];
  }

}

export default async function Home() {
  const videos = await GetVideos();
  console.log(videos);

  return (
    <div>
      <VideoList videos={videos} />
    </div>
  );
}
