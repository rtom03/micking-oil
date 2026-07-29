import { useEffect, useRef, useState } from "react";

const reviews = [
  {
    id: 5,
    src: "https://res.cloudinary.com/dlcfbqjkz/video/upload/v1784814916/Video_4_u6fmvn.mov",
  },
  {
    id: 4,
    src: "https://res.cloudinary.com/dlcfbqjkz/video/upload/v1784814916/Video_3_kmsiiv.mov",
  },
  {
    id: 2,
    src: "https://res.cloudinary.com/dlcfbqjkz/video/upload/v1784814917/video_7_zqp9pi.mov",
  },
  {
    id: 3,
    src: "https://res.cloudinary.com/dlcfbqjkz/video/upload/v1784814915/Video_5_kbhwmt.mov",
  },
  {
    id: 1,
    src: "https://res.cloudinary.com/dlcfbqjkz/video/upload/v1784814914/Video_6_upsu7w.mov",
  },
];

export const optimizeVideo = (url: string) => {
  return url.replace("/upload/", "/upload/q_auto:good,f_auto,w_480/");
};

export const VideoCard = ({
  src,
  index,
  activeIndex,
  setActiveIndex,
  videoRefs,
}: any) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  // const { data } = useProducts();

  // store ref globally
  const setRef = (el: HTMLVideoElement | null) => {
    videoRef.current = el;
    videoRefs.current[index] = el;
  };

  const handleMouseEnter = () => videoRef.current?.play();

  const handleMouseLeave = () => {
    if (videoRef.current && activeIndex !== index) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleClick = () => {
    setActiveIndex(index);

    videoRefs.current.forEach((video: HTMLVideoElement, i: number) => {
      if (!video) return;

      if (i === index) {
        video.muted = false;
        video.play();
      } else {
        video.muted = true;
      }
    });
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="shrink-0 w-57 aspect-9/16 rounded-2xl overflow-hidden relative group"
    >
      <video
        ref={setRef}
        src={optimizeVideo(src)}
        muted
        autoPlay
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-contain snap-center object-top"
      />

      {/* gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      {/* product pill (unchanged) */}
    </div>
  );
};

export const VideoReviews = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (!entry.isIntersecting) {
          // User scrolled past section
          videoRefs.current.forEach((video) => {
            if (!video) return;
            video.muted = true;
            video.pause(); // 🔥 important for performance
          });
        } else {
          // Section is back in view
          videoRefs.current.forEach((video) => {
            if (!video) return;
            video.play(); // resume autoplay feel
          });
        }
      },
      {
        threshold: 0.3, // triggers when ~30% visible
      },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    startX.current = e.pageX - trackRef.current!.offsetLeft;
    scrollLeft.current = trackRef.current!.scrollLeft;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current!.offsetLeft;
    trackRef.current!.scrollLeft =
      scrollLeft.current - (x - startX.current) * 1.5;
  };

  const stopDrag = () => setDragging(false);

  return (
    <section
      className="w-full bg-[#FAFAF9] py-5 overflow-hidden"
      ref={sectionRef}
    >
      {/* <h2 className="flex justify-center text-2xl font-extrabold text-black tracking-tight mb-10 md:items-center">
        GOOD MECHANICS, KNOWS THE DIFFERENCE
      </h2> */}
      <h2 className="mb-6 px-4 text-center text-xl font-extrabold tracking-tight text-black sm:mb-8 sm:text-2xl md:mb-10 md:text-3xl">
        GOOD MECHANICS, KNOWS THE DIFFERENCE
      </h2>

      <div className="w-full flex justify-center px-4 md:px-10 lg:px-20 xl:px-32">
        <div
          ref={trackRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          className={`flex gap-3 max-w-fit snap-x snap-mandatory overflow-x-auto scrollbar-hide select-none px-7 pb-2
    ${dragging ? "cursor-grabbing" : "cursor-grab"}
    max-w-fit`}
        >
          {reviews.map((r, i) => (
            <VideoCard
              key={r.id}
              src={r.src}
              index={i}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              videoRefs={videoRefs}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
