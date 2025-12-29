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
      <div className="text-center py-12">
        <div className="w-20 h-20 rounded-full bg-secondary mx-auto flex items-center justify-center mb-4">
          <Music className="w-8 h-8 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground">A playlist está vazia.</p>
        <p className="text-gold font-medium mt-1">Seja o primeiro a sugerir!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-w-2xl mx-auto">
      <h3 className="font-display text-lg font-semibold text-foreground mb-4 text-center">
        Sugestões ({songs.length})
      </h3>
      {songs.map((song) => (
        <div
          key={song.id}
          className="flex items-center gap-3 bg-card rounded-xl p-4 shadow-sm border border-border group hover:border-gold/30 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
            <Music className="w-5 h-5 text-gold" />
          </div>
          <span className="flex-1 font-medium text-foreground">{song.name}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemoveSong(song.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 text-muted-foreground hover:text-destructive"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};
