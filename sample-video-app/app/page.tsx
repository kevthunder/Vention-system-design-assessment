
import VideoList from "./components/VideoList";

export default function Home() {
  const videos = [
      {
        id: '1',
        title: 'Video 1',
        description: 'Description for Video 1',
        url: 'https://www.example.com/video1',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg'
      },
      {
        id: '2',
        title: 'Video 2',
        description: 'Description for Video 2',
        url: 'https://www.example.com/video2',
        thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/0.jpg'
      },
      {
        id: '3',
        title: 'Video 3',
        description: 'Description for Video 3',
        url: 'https://www.example.com/video3',
        thumbnail: 'https://img.youtube.com/vi/3JZ_D3ELwOQ/0.jpg'
      },
    ];
  
  
    return (
      <div>
        <h1>YouTube Clone</h1>
        <VideoList videos={videos}  />
      </div>
    );
}
