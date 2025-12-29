import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { SparkleGroup } from "@/components/Sparkle";
import { ChampagneGlass } from "@/components/ChampagneGlass";
import { SongInput } from "@/components/SongInput";
import { PlaylistDisplay } from "@/components/PlaylistDisplay";
import { toast } from "sonner";
import { supabase, Song } from "@/lib/supabase";

const Index = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch songs on mount
  useEffect(() => {
    fetchSongs();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('songs-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'songs' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setSongs(prev => [payload.new as Song, ...prev]);
          } else if (payload.eventType === 'DELETE') {
            setSongs(prev => prev.filter(s => s.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchSongs = async () => {
    try {
      const { data, error } = await supabase
        .from('songs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSongs(data || []);
    } catch (error) {
      console.error('Error fetching songs:', error);
      toast.error('Erro ao carregar músicas');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSong = async (songName: string) => {
    try {
      const { error } = await supabase
        .from('songs')
        .insert([{ name: songName }]);

      if (error) throw error;

      toast.success("Música adicionada!", {
        description: songName,
      });
    } catch (error) {
      console.error('Error adding song:', error);
      toast.error('Erro ao adicionar música');
    }
  };

  const handleRemoveSong = async (id: string) => {
    // Optimistic update - remove immediately from UI
    setSongs((prev) => prev.filter((s) => s.id !== id));

    try {
      const { error } = await supabase
        .from('songs')
        .delete()
        .eq('id', id);

      if (error) {
        // If error, refetch to restore the song
        fetchSongs();
        throw error;
      }

      toast.info("Música removida");
    } catch (error) {
      console.error('Error removing song:', error);
      toast.error('Erro ao remover música');
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background decoration */}
      <SparkleGroup />

      <div className="container mx-auto px-4 py-6 md:py-8 relative z-10">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <ChampagneGlass className="w-8 h-8 md:w-10 md:h-10 animate-float" />
            <span className="text-gold font-medium tracking-[0.4em] text-sm md:text-base uppercase">
              Réveillon
            </span>
            <ChampagneGlass className="w-8 h-8 md:w-10 md:h-10 animate-float" style={{ animationDelay: '0.5s' }} />
          </div>

          <h1 className="font-display text-6xl md:text-9xl font-bold text-gradient-gold mb-3 flex items-center justify-center gap-3 md:gap-6">
            <Sparkles className="w-8 h-8 md:w-16 md:h-16 text-gold animate-sparkle" />
            2026
            <Sparkles className="w-8 h-8 md:w-16 md:h-16 text-gold animate-sparkle" style={{ animationDelay: '1s' }} />
          </h1>

          <p className="text-muted-foreground max-w-sm mx-auto text-sm md:text-base">
            Ajude a criar a trilha sonora perfeita para nossa virada!
          </p>
        </header>

        {/* Song Input - Inline */}
        <section className="mb-8">
          <SongInput onAddSong={handleAddSong} />
        </section>

        {/* Playlist Display */}
        <section className="pb-8">
          <PlaylistDisplay
            songs={songs}
            onRemoveSong={handleRemoveSong}
            isLoading={isLoading}
          />
        </section>
      </div>
    </div>
  );
};

export default Index;
