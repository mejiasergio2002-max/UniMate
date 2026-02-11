export type UniMateVideo = {
  id: string;          // used in URL: /class/[id]
  subject: "math";     // for now just math
  src: string;         // /public path
  title: string;
  username: string;    // shown under thumbnail
};

export const UNIMATE_VIDEOS: UniMateVideo[] = [
  {
    id: "math-1",
    subject: "math",
    src: "/videos/math/math-1.mp4",
    title: "Math Focus 1",
    username: "math.tutor01",
  },
  {
    id: "math-2",
    subject: "math",
    src: "/videos/math/math-2.mp4",
    title: "Math Focus 2",
    username: "math.tutor02",
  },
  {
    id: "math-3",
    subject: "math",
    src: "/videos/math/math-3.mp4",
    title: "Math Focus 3",
    username: "math.tutor03",
  },
];

export function findVideo(id: string) {
  return UNIMATE_VIDEOS.find((v) => v.id === id) ?? null;
}

export function videosBySubject(subject: string) {
  const key = subject.trim().toLowerCase();
  if (key === "math") return UNIMATE_VIDEOS.filter((v) => v.subject === "math");
  // fallback to math for now
  return UNIMATE_VIDEOS.filter((v) => v.subject === "math");
}
