import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Disc3, Send, Loader2 } from "lucide-react";

interface SongInputProps {
  onAddSong: (song: string) => Promise<void>;
}

export const SongInput = ({ onAddSong }: SongInputProps) => {
  const [song, setSong] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (song.trim() && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await onAddSong(song.trim());
        setSong("");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
            <Disc3 className="w-6 h-6 text-gold" />
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">
              Qual música não pode faltar?
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Adicione o nome da música ou artista
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input
            value={song}
            onChange={(e) => setSong(e.target.value)}
            placeholder="Ex: Evidências - Chitãozinho e Xororó"
            className="w-full h-12 text-base bg-secondary/50 border-border focus:border-gold focus:ring-gold/20"
            disabled={isSubmitting}
          />
          <Button
            type="submit"
            className="w-full h-12 gap-2 text-base bg-gradient-gold hover:opacity-90 text-white font-medium shadow-gold"
            disabled={isSubmitting || !song.trim()}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Adicionando...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Adicionar
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};
