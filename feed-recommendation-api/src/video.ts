export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

export const videos: Video[] = [
  {
    id: "1",
    title: "How to Build a YouTube Clone",
    description: "Step-by-step guide to building a YouTube clone with Next.js and Tailwind CSS.",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg"
  },
  {
    id: "2",
    title: "React 19 New Features",
    description: "Explore the latest features in React 19.",
    thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/0.jpg"
  },
  {
    id: "3",
    title: "Next.js 15 Crash Course",
    description: "Learn Next.js 15 in 30 minutes!",
    thumbnail: "https://img.youtube.com/vi/3JZ_D3ELwOQ/0.jpg"
  }
];
