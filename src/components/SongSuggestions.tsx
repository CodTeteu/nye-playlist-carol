import { Music } from "lucide-react";

interface SongSuggestionsProps {
    onSelectSong: (song: string) => void;
}

const suggestions = {
    "🔥 Hits Atuais": [
        "Flowers - Miley Cyrus",
        "Anti-Hero - Taylor Swift",
        "Unholy - Sam Smith",
        "As It Was - Harry Styles",
        "Calm Down - Rema & Selena Gomez",
    ],
    "🎤 Clássicos Brasileiros": [
        "Evidências - Chitãozinho e Xororó",
        "Faroeste Caboclo - Legião Urbana",
        "Milla - Netinho",
        "Você Não Vale Nada - Calcinha Preta",
        "É o Amor - Zezé Di Camargo",
    ],
    "🌍 Internacionais Icônicos": [
        "Bohemian Rhapsody - Queen",
        "Billie Jean - Michael Jackson",
        "Sweet Child O' Mine - Guns N' Roses",
        "Don't Stop Believin' - Journey",
        "Livin' on a Prayer - Bon Jovi",
    ],
    "💃 Pra Dançar": [
        "Uptown Funk - Bruno Mars",
        "Blinding Lights - The Weeknd",
        "Levitating - Dua Lipa",
        "Ai Preto - L7nnon & UCLÃ",
        "Rave de Favela - MC Lan",
    ],
    "🎆 Réveillon Clássicos": [
        "Xote das Meninas - Luiz Gonzaga",
        "Trem-Bala - Ana Vilela",
        "Trem das Onze - Adoniran Barbosa",
        "Happy - Pharrell Williams",
        "I Gotta Feeling - Black Eyed Peas",
    ],
};

export const SongSuggestions = ({ onSelectSong }: SongSuggestionsProps) => {
    return (
        <div className="w-full max-w-2xl mx-auto mt-8">
            <h3 className="font-display text-lg font-semibold text-foreground mb-4 text-center">
                💡 Sugestões Rápidas
            </h3>
            <div className="space-y-4">
                {Object.entries(suggestions).map(([category, songs]) => (
                    <div key={category}>
                        <p className="text-sm font-medium text-muted-foreground mb-2">{category}</p>
                        <div className="flex flex-wrap gap-2">
                            {songs.map((song) => (
                                <button
                                    key={song}
                                    onClick={() => onSelectSong(song)}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary hover:bg-gold/20 hover:border-gold/30 border border-border rounded-full text-sm text-foreground transition-colors"
                                >
                                    <Music className="w-3 h-3 text-gold" />
                                    <span className="truncate max-w-[200px]">{song}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
