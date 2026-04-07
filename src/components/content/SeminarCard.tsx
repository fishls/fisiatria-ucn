import MaterialIcon from "@/components/ui/MaterialIcon";

type SeminarCardProps = {
  imageUrl: string;
  imageAlt: string;
  date: string;
  time: string;
  title: string;
  speakerName: string;
  speakerAvatarUrl?: string;
  onPlay?: () => void;
};

/**
 * SeminarCard — horizontal presentation card used in Guardados and Calendar screens.
 * Pattern from guardados_fisiatr_a_ucn lines 201–231.
 * Horizontal layout: image left | content center | play button right.
 */
export default function SeminarCard({
  imageUrl,
  imageAlt,
  date,
  time,
  title,
  speakerName,
  speakerAvatarUrl,
  onPlay,
}: SeminarCardProps) {
  return (
    <article className="group flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-outline-variant/10">
      {/* Image pane */}
      <div className="w-full md:w-48 h-32 md:h-auto relative bg-surface-container-highest shrink-0">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-secondary/20 group-hover:bg-transparent transition-colors" />
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col justify-center">
        <div className="flex flex-wrap items-center gap-4 mb-2">
          <span className="text-xs font-bold text-primary flex items-center gap-1">
            <MaterialIcon name="event" size={20} className="text-xs" />
            {date}
          </span>
          <span className="text-xs font-bold text-secondary flex items-center gap-1">
            <MaterialIcon name="schedule" size={20} className="text-xs" />
            {time}
          </span>
        </div>
        <h4 className="text-lg font-bold text-on-surface mb-2">{title}</h4>
        <div className="flex items-center gap-3">
          {speakerAvatarUrl ? (
            <div className="w-6 h-6 rounded-full bg-surface-container overflow-hidden shrink-0">
              <img
                src={speakerAvatarUrl}
                alt={speakerName}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center shrink-0">
              <MaterialIcon name="person" size={20} className="text-xs text-on-surface-variant" />
            </div>
          )}
          <p className="text-sm text-on-surface-variant">
            <span className="font-bold">Ponente:</span> {speakerName}
          </p>
        </div>
      </div>

      {/* Play button */}
      <div className="p-6 flex items-center justify-center md:border-l border-surface-container-low shrink-0">
        <button
          type="button"
          onClick={onPlay}
          aria-label={`Reproducir: ${title}`}
          className="bg-primary text-on-primary p-3 rounded-2xl hover:scale-105 active:scale-95 transition-transform"
        >
          <MaterialIcon name="play_arrow" />
        </button>
      </div>
    </article>
  );
}
