import { Music, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Song } from "@/lib/supabase";

interface PlaylistDisplayProps {
  songs: Song[];
  onRemoveSong: (id: string) => void;
  isLoading?: boolean;
}

export const PlaylistDisplay = ({ songs, onRemoveSong, isLoading }: PlaylistDisplayProps) => {
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-gold mx-auto mb-4" />
        <p className="text-muted-foreground">Carregando sugestões...</p>
      </div>
    );
  }

  if (songs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] text-center p-8">
        <div className="w-24 h-24 rounded-full bg-secondary/50 flex items-center justify-center mb-6 animate-pulse">
          <Music className="w-10 h-10 text-gold/50" />
        </div>
        <h3 className="font-display text-xl font-medium text-foreground mb-2">A festa ainda não começou!</h3>
        <p className="text-muted-foreground max-w-xs mx-auto">
          Toque no botão abaixo para sugerir a primeira música da noite.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto pb-8">
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="font-display text-lg font-medium text-foreground">
          Na Fila ({songs.length})
        </h3>
        <span className="text-xs text-muted-foreground uppercase tracking-wider">A seguir</span>
      </div>

      <div className="space-y-1">
        {songs.map((song, index) => (
          <div
            key={song.id}
            className="group flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/40 transition-colors border border-transparent hover:border-border/50"
          >
            <span className="w-6 text-center text-sm font-medium text-gold/70 font-display">
              {String(index + 1).padStart(2, '0')}
            </span>

            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground text-sm md:text-base truncate">
                {song.name.split(' - ')[0]}
              </p>
              {song.name.includes(' - ') && (
                <p className="text-xs text-muted-foreground truncate">
                  {song.name.split(' - ')[1]}
                </p>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemoveSong(song.id)}
              className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity h-8 w-8 text-muted-foreground hover:text-destructive touch-manipulation"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
