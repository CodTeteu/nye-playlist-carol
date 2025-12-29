import { useState } from "react";
import { Music, ChevronDown, ChevronUp } from "lucide-react";

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
        "Vampire - Olivia Rodrigo",
        "Dance The Night - Dua Lipa",
        "Cruel Summer - Taylor Swift",
        "Kill Bill - SZA",
        "Boy's a Liar - PinkPantheress",
    ],
    "🎤 Clássicos Brasileiros": [
        "Evidências - Chitãozinho e Xororó",
        "Faroeste Caboclo - Legião Urbana",
        "Milla - Netinho",
        "Você Não Vale Nada - Calcinha Preta",
        "É o Amor - Zezé Di Camargo",
        "Tocando em Frente - Almir Sater",
        "Pais e Filhos - Legião Urbana",
        "Anunciação - Alceu Valença",
        "Velha Infância - Tribalistas",
        "Eduardo e Mônica - Legião Urbana",
    ],
    "🌍 Internacionais Icônicos": [
        "Bohemian Rhapsody - Queen",
        "Billie Jean - Michael Jackson",
        "Sweet Child O' Mine - Guns N' Roses",
        "Don't Stop Believin' - Journey",
        "Livin' on a Prayer - Bon Jovi",
        "Hotel California - Eagles",
        "Stairway to Heaven - Led Zeppelin",
        "Imagine - John Lennon",
        "Like a Prayer - Madonna",
        "Purple Rain - Prince",
    ],
    "💃 Pra Dançar": [
        "Uptown Funk - Bruno Mars",
        "Blinding Lights - The Weeknd",
        "Levitating - Dua Lipa",
        "Ai Preto - L7nnon",
        "Rave de Favela - MC Lan",
        "Envolver - Anitta",
        "Vai Embrazando - MC Zaac",
        "I Wanna Dance With Somebody - Whitney Houston",
        "September - Earth, Wind & Fire",
        "Stayin' Alive - Bee Gees",
    ],
    "🎆 Virada de Ano": [
        "Happy - Pharrell Williams",
        "I Gotta Feeling - Black Eyed Peas",
        "Celebration - Kool & The Gang",
        "Don't Stop Me Now - Queen",
        "Dancing Queen - ABBA",
        "We Are the Champions - Queen",
        "Firework - Katy Perry",
        "Good Feeling - Flo Rida",
        "Can't Stop the Feeling - Justin Timberlake",
        "Viva La Vida - Coldplay",
    ],
};

export const SongSuggestions = ({ onSelectSong }: SongSuggestionsProps) => {
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

    const toggleCategory = (category: string) => {
        setExpandedCategory(expandedCategory === category ? null : category);
    };

    return (
        <div className="w-full max-w-2xl mx-auto mt-6">
            <h3 className="font-display text-lg font-semibold text-foreground mb-4 text-center">
                💡 Sugestões Rápidas
            </h3>
            <div className="space-y-2">
                {Object.entries(suggestions).map(([category, songs]) => {
                    const isExpanded = expandedCategory === category;
                    return (
                        <div key={category} className="bg-card rounded-xl border border-border overflow-hidden">
                            <button
                                onClick={() => toggleCategory(category)}
                                className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/50 transition-colors"
                            >
                                <span className="font-medium text-foreground">{category}</span>
                                {isExpanded ? (
                                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                                )}
                            </button>

                            {isExpanded && (
                                <div className="px-3 pb-3 grid grid-cols-1 gap-2">
                                    {songs.map((song) => (
                                        <button
                                            key={song}
                                            onClick={() => onSelectSong(song)}
                                            className="flex items-center gap-3 p-3 bg-secondary/50 hover:bg-gold/20 hover:border-gold/30 border border-transparent rounded-lg text-left transition-colors active:scale-[0.98]"
                                        >
                                            <Music className="w-4 h-4 text-gold flex-shrink-0" />
                                            <span className="text-sm text-foreground">{song}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
