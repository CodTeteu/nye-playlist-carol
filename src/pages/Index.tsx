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
            const newSong = payload.new as Song;
            setSongs(prev => {
              // Prevent duplicates if already added manually
              if (prev.some(s => s.id === newSong.id)) return prev;
              return [newSong, ...prev];
            });
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
      // Optimistic ID for immediate feedback (will be replaced by real one or handled by duplicate check)
      // Actually, better to wait for the return to get the real ID to avoid key issues during deletion if user tries to delete immediately.
      // But user wants "instant". 
      // Strategy: Insert -> .select() -> update state. It's fast enough to feel instant compared to waiting for a full refetch or just pure realtime.

      const { data, error } = await supabase
        .from('songs')
        .insert([{ name: songName }])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setSongs(prev => [data, ...prev]);
        toast.success("Música adicionada!", {
          description: songName,
        });
      }

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
        <header className="text-center mb-12 mt-4">
          <div className="flex items-center justify-center gap-4 mb-4">
            <ChampagneGlass className="w-10 h-10 md:w-14 md:h-14 animate-float" />
            <span className="text-gold font-medium tracking-[0.5em] text-lg md:text-2xl uppercase glow-text">
              Réveillon
            </span>
            <ChampagneGlass className="w-10 h-10 md:w-14 md:h-14 animate-float" style={{ animationDelay: '0.5s' }} />
          </div>

          <h1 className="font-display text-8xl md:text-[8rem] leading-none font-bold text-gradient-gold mb-6 flex items-center justify-center gap-4 md:gap-8 drop-shadow-2xl">
            <Sparkles className="w-12 h-12 md:w-24 md:h-24 text-gold animate-sparkle" />
            2026
            <Sparkles className="w-12 h-12 md:w-24 md:h-24 text-gold animate-sparkle" style={{ animationDelay: '1s' }} />
          </h1>

          <p className="text-muted-foreground/80 max-w-lg mx-auto text-base md:text-xl font-light">
            Ajude a criar a trilha sonora perfeita para nossa virada!
          </p>
        </header>

        {/* Song Input - Inline */}
        <section className="mb-12">
          <SongInput onAddSong={handleAddSong} />
        </section>

        {/* Playlist Display */}
        <section className="pb-12">
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
