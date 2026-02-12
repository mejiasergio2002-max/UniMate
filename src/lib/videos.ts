export type UniMateVideo = {
  id: string; // "math-1"
  subject: "math";
  src: string; // "/videos/math/math-1.mp4"
  title: string;
  username: string; // shown under video
};

export const VIDEOS: UniMateVideo[] = [
  {
    id: "math-1",
    subject: "math",
    src: "/videos/math/math-1.mp4",
    title: "Math Video 1",
    username: "math.tutor01",
  },
  {
    id: "math-2",
    subject: "math",
    src: "/videos/math/math-2.mp4",
    title: "Math Video 2",
    username: "math.tutor02",
  },
  {
    id: "math-3",
    subject: "math",
    src: "/videos/math/math-3.mp4",
    title: "Math Video 3",
    username: "math.tutor03",
  },
];

export function findVideo(id: string) {
  return VIDEOS.find((v) => v.id === id) ?? null;
}

export function videosBySubject(subject: string) {
  const key = (subject || "").trim().toLowerCase();
  // MVP: always return math videos (even if search is empty)
  if (!key || key === "math") return VIDEOS;
  return VIDEOS;
}
