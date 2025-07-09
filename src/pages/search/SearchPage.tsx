import toast from "react-hot-toast";
import Topbar from "@/components/Topbar";
import { updateApiToken } from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import SearchResultSongCard from "./components/SearchResultSongCard";
import SearchResultAlbumCard from "./components/SearchResultAlbumCard";
import { useAuth } from "@clerk/clerk-react";


const NoSongFound = () => (
  <p className='text-base font-semibold text-center text-white py-4'>No songs found</p>
);

const NoAlbumFound = () => (
  <p className='text-base font-semibold text-center text-white py-4'>No albums found</p>
);

const SearchPage = () => {
  const { getToken } = useAuth();
  const { isLoading, error } = useMusicStore();
  const { searchSongResult, searchAlbumResult } = useMusicStore();
  const { searchSong, searchAlbum } = useMusicStore();
  const { playAlbum } = usePlayerStore();
  const {hasSearched, setHasSearched} = useMusicStore();

  const handleInput = async (event: any) => {
    try {
      if (event.key === 'Enter') {
        const name: string = event.currentTarget.value.trim();

        if (name.length === 0) {
          toast('Please enter song  or album name');
          return;
        }


        const token = await getToken({ skipCache: true });
        updateApiToken(token);

        if (!hasSearched) {
          setHasSearched(true);
        }

        await Promise.all([searchSong(name), searchAlbum(name)]);

        if (error) {
          toast.error(error);
        }
      }
    } catch (err: any) {
      toast.error(err?.message || 'Something went wrong');
    }
  };

  const handlePlaySong = (index: number) => {
    if (searchSongResult.length === 0) return;
    playAlbum(searchSongResult, index);
  };


  return (
    <main className='h-full flex flex-col overflow-hidden bg-gradient-to-b from-zinc-800 to-zinc-900'>
      <Topbar />

      <div className='flex-1 overflow-y-auto px-4 py-4 space-y-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
        <Input
          type='text'
          placeholder='Search for songs, albums...'
          className='w-full bg-zinc-900 border border-zinc-700 text-white'
          onKeyDown={handleInput}
        />

        {/* SONGS SECTION */}
        {hasSearched && <div className='bg-zinc-900 border border-zinc-700 rounded-md'>
          <h2 className='text-lg font-semibold px-4 pt-4 pb-2 border-b border-zinc-700'>Songs</h2>
          <ScrollArea className='max-h-[192px] px-4 py-2 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
            {isLoading ? (
              <p className='text-sm text-center text-zinc-400'>Loading songs...</p>
            ) : searchSongResult.length === 0 ? (
              <NoSongFound />
            ) : (
              <div className='space-y-2'>
                {searchSongResult.map((song, index) => (
                  <div key={song._id} onClick={() => handlePlaySong(index)} className='cursor-pointer'>
                    <SearchResultSongCard song={song} />
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
        }

        {/* ALBUMS SECTION */}
        {hasSearched && <div className='bg-zinc-900 border border-zinc-700 rounded-md'>
          <h2 className='text-lg font-semibold px-4 pt-4 pb-2 border-b border-zinc-700'>Albums</h2>
          <ScrollArea className='max-h-[192px] px-4 py-2 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
            {isLoading ? (
              <p className='text-sm text-center text-zinc-400'>Loading albums...</p>
            ) : searchAlbumResult.length === 0 ? (
              <NoAlbumFound />
            ) : (
              <div className='space-y-2'>
                {searchAlbumResult.map((album) => (
                  <SearchResultAlbumCard key={album._id} album={album} />
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
        }

        { !hasSearched && <NoSearchPlaceholder/>}

      </div>
    </main>
  );
};

export default SearchPage;


const NoSearchPlaceholder = () => (
	<div className='flex flex-col items-center justify-center h-full space-y-6'>
		<img src='/spotify.png' alt='Spotify' className='size-16 animate-bounce' />
		<div className='text-center'>
			<h3 className='text-zinc-300 text-lg font-medium mb-1'>Start exploring your music</h3>
			<p className='text-zinc-500 text-sm'>Type a song or album name and press Enter to search</p>
		</div>
	</div>
);