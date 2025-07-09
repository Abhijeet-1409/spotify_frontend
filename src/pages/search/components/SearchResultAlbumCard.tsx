import { Album } from "@/types";
import { Link } from "react-router-dom";

type Props = {
  album: Album;
};

const SearchResultAlbumCard: React.FC<Props> = ({ album }) => {
  return (
    <Link
      to={`/albums/${album._id}`}
      className='flex items-center justify-between p-3 rounded-md hover:bg-zinc-800 transition-colors h-16'
    >
      <div className='flex items-center gap-3 overflow-hidden'>
        <img
          src={album.imageUrl}
          alt={album.title}
          className='w-12 h-12 rounded-md object-cover shrink-0'
        />
        <div className='truncate'>
          <p className='text-sm font-medium truncate'>{album.title}</p>
          <p className='text-xs text-zinc-400 truncate'>{album.artist}</p>
        </div>
      </div>
      <div className='text-right ml-4 shrink-0'>
        <p className='text-xs text-zinc-400'>Release Year</p>
        <p className='text-xs text-zinc-400'>{album.releaseYear}</p>
      </div>
    </Link>
  );
};

export default SearchResultAlbumCard;
