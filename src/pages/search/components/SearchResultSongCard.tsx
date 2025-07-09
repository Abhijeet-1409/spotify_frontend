import { Song } from "@/types";

type Props = {
  song: Song;
};

const formatDuration = (duration: number) => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const SearchResultSongCard: React.FC<Props> = ({ song }) => {
  return (
    <div className='flex items-center justify-between p-3 rounded-md hover:bg-zinc-800 transition-colors h-16'>
      <div className='flex items-center gap-3 overflow-hidden'>
        <img
          src={song.imageUrl}
          alt={song.title}
          className='w-12 h-12 rounded-md object-cover shrink-0'
        />
        <div className='truncate'>
          <p className='text-sm font-medium truncate'>{song.title}</p>
          <p className='text-xs text-zinc-400 truncate'>{song.artist}</p>
        </div>
      </div>
      <p className='text-sm font-semibold text-white shrink-0 ml-4'>
        {formatDuration(song.duration)}
      </p>
    </div>
  );
};

export default SearchResultSongCard;
