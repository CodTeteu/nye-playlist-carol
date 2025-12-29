import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { SparkleGroup } from "@/components/Sparkle";
import { ChampagneGlass } from "@/components/ChampagneGlass";
import { SongDrawer } from "@/components/SongDrawer";
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

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <header className="text-center mb-8 md:mb-12 pt-4 md:pt-0">
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-2 md:mb-4">
            <ChampagneGlass className="w-6 h-6 md:w-8 md:h-8 animate-float" />
            <span className="text-gold font-medium tracking-[0.3em] text-xs md:text-sm uppercase">
              Réveillon
            </span>
            <ChampagneGlass className="w-6 h-6 md:w-8 md:h-8 animate-float" style={{ animationDelay: '0.5s' }} />
          </div>

          <h1 className="font-display text-5xl md:text-9xl font-bold text-gradient-gold mb-2 flex items-center justify-center gap-2 md:gap-4">
            <Sparkles className="w-8 h-8 md:w-14 md:h-14 text-gold animate-sparkle" />
            2026
            <Sparkles className="w-8 h-8 md:w-14 md:h-14 text-gold animate-sparkle" style={{ animationDelay: '1s' }} />
          </h1>

          <h2 className="font-display text-xl md:text-3xl text-foreground mb-3 px-4">
            Sugestões de Músicas
          </h2>

          <p className="text-muted-foreground max-w-md mx-auto">
            Ajude a criar a trilha sonora perfeita para nossa virada de ano!
          </p>
        </header>

        {/* Playlist Display - Now Main Content */}
        <section className="mb-32">
          <PlaylistDisplay
            songs={songs}
            onRemoveSong={handleRemoveSong}
            isLoading={isLoading}
          />
        </section>

        {/* Sticky Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent z-40 pb-safe">
          <div className="container max-w-lg mx-auto">
            <SongDrawer onAddSong={handleAddSong} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
