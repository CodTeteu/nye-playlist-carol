import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Plus, Music } from "lucide-react";
import { SongInput } from "./SongInput";
import { SongSuggestions } from "./SongSuggestions";

interface SongDrawerProps {
    onAddSong: (song: string) => Promise<void>;
}

export const SongDrawer = ({ onAddSong }: SongDrawerProps) => {
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button
                    className="w-full h-14 rounded-full bg-gradient-gold shadow-gold text-white font-medium text-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
                >
                    <Plus className="w-6 h-6" />
                    Sugerir Música
                </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[85vh]">
                <div className="mx-auto w-full max-w-lg">
                    <DrawerHeader>
                        <DrawerTitle className="text-center font-display text-2xl text-foreground">
                            Nova Sugestão
                        </DrawerTitle>
                        <DrawerDescription className="text-center text-muted-foreground">
                            Adicione uma música para a playlist da festa
                        </DrawerDescription>
                    </DrawerHeader>

                    <div className="p-4 pb-8 overflow-y-auto max-h-[70vh]">
                        <SongInput onAddSong={onAddSong} />
                        <div className="my-6 relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-border" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Ou escolha uma sugestão
                                </span>
                            </div>
                        </div>
                        <SongSuggestions onSelectSong={onAddSong} />
                    </div>

                    <DrawerFooter className="pt-2">
                        <DrawerClose asChild>
                            <Button variant="outline" className="w-full h-12 text-base">Cancelar</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
};
