
interface ExerciseVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string | null;
  exerciseName: string;
}

export function ExerciseVideoModal({ isOpen, onClose, videoUrl, exerciseName }: ExerciseVideoModalProps) {
  if (!isOpen || !videoUrl) return null;

  // Extract YouTube video ID
  let embedUrl = videoUrl;
  try {
    const url = new URL(videoUrl);
    let videoId = "";
    if (url.hostname.includes("youtube.com") || url.hostname.includes("youtu.be")) {
      if (url.hostname.includes("youtu.be")) {
        videoId = url.pathname.slice(1);
      } else {
        videoId = url.searchParams.get("v") || "";
      }
    }
    
    // Add start time if t= parameter is present
    const tParam = url.searchParams.get("t");
    const startTime = tParam ? `?start=${tParam.replace('s', '')}` : '';

    if (videoId) {
      embedUrl = `https://www.youtube.com/embed/${videoId}${startTime}`;
    }
  } catch (e) {
    // Keep original if parsing fails
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      <div 
        className="bg-surface-container border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-white/10 flex justify-between items-center">
          <h3 className="font-headline-sm text-white font-bold uppercase pr-8">{exerciseName}</h3>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-on-surface-variant transition-colors flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe 
            src={embedUrl} 
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
