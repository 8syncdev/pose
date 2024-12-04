"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { Music4, X } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ExpandableCard = {
    title: string;
    description: string;
    src?: string;
    ctaText: string;
    ctaLink: string;
    content: string | (() => React.ReactNode);
    icon?: React.ReactNode;
};

interface ExpandableCardsProps {
    cards: ExpandableCard[];
    className?: string;
}

export function ExpandableCards({ cards, className }: ExpandableCardsProps) {
    const [active, setActive] = useState<ExpandableCard | boolean | null>(null);
    const ref = useRef<HTMLDivElement>(null);
    const id = useId();
    const prefersReducedMotion = useReducedMotion();

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === "Escape") {
            setActive(false);
        }
    }, []);

    useEffect(() => {
        if (active && typeof active === "object") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [active, handleKeyDown]);

    useOutsideClick(ref, () => setActive(null));

    const transition = {
        type: "spring",
        stiffness: 350,
        damping: 30
    };

    const fadeInOut = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: prefersReducedMotion ? { duration: 0.1 } : transition
    };

    return (
        <>
            <AnimatePresence mode="wait">
                {active && typeof active === "object" && (
                    <motion.div
                        {...fadeInOut}
                        className="fixed inset-0 bg-background/95 backdrop-blur-sm h-full w-full z-10"
                    />
                )}
            </AnimatePresence>
            <AnimatePresence mode="wait">
                {active && typeof active === "object" ? (
                    <div className="fixed inset-0 grid place-items-center z-[100] p-0 md:p-4">
                        <motion.div
                            key={`button-${active.title}-${id}`}
                            layout
                            {...fadeInOut}
                            className="absolute top-4 right-4 z-50"
                        >
                            <Button
                                variant="ghost" 
                                size="icon"
                                className="h-8 w-8 bg-[hsl(var(--background))] backdrop-blur rounded-full shadow-lg"
                                onClick={() => setActive(null)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </motion.div>
                        <Card className="w-full h-full md:max-w-[500px] md:h-fit md:max-h-[90%] overflow-hidden bg-[hsl(var(--card))] rounded-none md:rounded-lg">
                            <motion.div
                                layoutId={`card-${active.title}-${id}`}
                                ref={ref}
                                className="flex flex-col h-full"
                                transition={transition}
                            >
                                <motion.div layoutId={`image-${active.title}-${id}`} className="relative w-full h-80" transition={transition}>
                                    {active.src ? (
                                        <AspectRatio ratio={16/9} className="bg-[hsl(var(--muted))]">
                                            <Image
                                                src={active.src}
                                                alt={active.title}
                                                fill
                                                className="object-cover md:rounded-t-lg"
                                                loading="eager"
                                                priority
                                            />
                                        </AspectRatio>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-[hsl(var(--muted))] md:rounded-t-lg">
                                            {active.icon || <Music4 className="w-20 h-20 text-[hsl(var(--muted-foreground))]" />}
                                        </div>
                                    )}
                                </motion.div>

                                <CardHeader className="space-y-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <motion.div layoutId={`title-${active.title}-${id}`} transition={transition}>
                                                <CardTitle>{active.title}</CardTitle>
                                            </motion.div>
                                            <motion.div layoutId={`description-${active.description}-${id}`} transition={transition}>
                                                <CardDescription>{active.description}</CardDescription>
                                            </motion.div>
                                        </div>
                                        <motion.div layoutId={`button-${active.title}-${id}`} transition={transition}>
                                            <Button 
                                                asChild 
                                                variant="default"
                                            >
                                                <a href={active.ctaLink} target="_blank" rel="noopener noreferrer">
                                                    {active.ctaText}
                                                </a>
                                            </Button>
                                        </motion.div>
                                    </div>
                                </CardHeader>

                                <CardContent className="flex-1 overflow-auto">
                                    <motion.div
                                        layout
                                        {...fadeInOut}
                                        className="prose dark:prose-invert max-w-none"
                                    >
                                        {typeof active.content === "function"
                                            ? active.content()
                                            : active.content}
                                    </motion.div>
                                </CardContent>
                            </motion.div>
                        </Card>
                    </div>
                ) : null}
            </AnimatePresence>
            <ul className={`max-w-2xl mx-auto w-full gap-4 ${className}`}>
                {cards.map((card) => (
                    <Card
                        key={`card-${card.title}-${id}`}
                        className="cursor-pointer hover:shadow-lg transition-all duration-300"
                    >
                        <motion.div
                            layoutId={`card-${card.title}-${id}`}
                            onClick={() => setActive(card)}
                            className="p-4 flex flex-col md:flex-row justify-between items-center"
                            transition={transition}
                        >
                            <div className="flex gap-4 flex-col md:flex-row">
                                <motion.div layoutId={`image-${card.title}-${id}`} className="relative h-40 w-40 md:h-14 md:w-14" transition={transition}>
                                    {card.src ? (
                                        <Image
                                            src={card.src}
                                            alt={card.title}
                                            fill
                                            className="object-cover rounded-lg"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-[hsl(var(--muted))] rounded-lg">
                                            {card.icon || <Music4 className="w-8 h-8 text-[hsl(var(--muted-foreground))]" />}
                                        </div>
                                    )}
                                </motion.div>
                                <div>
                                    <motion.div layoutId={`title-${card.title}-${id}`} transition={transition}>
                                        <CardTitle className="text-center md:text-left">{card.title}</CardTitle>
                                    </motion.div>
                                    <motion.div layoutId={`description-${card.description}-${id}`} transition={transition}>
                                        <CardDescription className="text-center md:text-left">{card.description}</CardDescription>
                                    </motion.div>
                                </div>
                            </div>
                            <motion.div layoutId={`button-${card.title}-${id}`} className="mt-4 md:mt-0" transition={transition}>
                                <Button 
                                    variant="outline"
                                    size="sm"
                                >
                                    {card.ctaText}
                                </Button>
                            </motion.div>
                        </motion.div>
                    </Card>
                ))}
            </ul>
        </>
    );
}

export const CloseIcon = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
                opacity: 0,
                // transition: { duration: 0.05 }
            }}
        >
            <X className="h-4 w-4" />
        </motion.div>
    );
};

export function ExpandableCardDemo() {
    const demoCards: ExpandableCard[] = [
        {
            description: "Lana Del Rey",
            title: "Summertime Sadness",
            src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
            ctaText: "Play",
            ctaLink: "https://ui.aceternity.com/templates",
            content: () => (
                <p>
                    Lana Del Rey, an iconic American singer-songwriter, is celebrated for
                    her melancholic and cinematic music style. Born Elizabeth Woolridge
                    Grant in New York City, she has captivated audiences worldwide with
                    her haunting voice and introspective lyrics. <br /> <br /> Her songs
                    often explore themes of tragic romance, glamour, and melancholia,
                    drawing inspiration from both contemporary and vintage pop culture.
                    With a career that has seen numerous critically acclaimed albums, Lana
                    Del Rey has established herself as a unique and influential figure in
                    the music industry, earning a dedicated fan base and numerous
                    accolades.
                </p>
            ),
        },
        {
            description: "Babbu Maan",
            title: "Mitran Di Chhatri",
            src: "https://assets.aceternity.com/demos/babbu-maan.jpeg",
            ctaText: "Play",
            ctaLink: "https://ui.aceternity.com/templates",
            content: () => (
                <p>
                    Babu Maan, a legendary Punjabi singer, is renowned for his soulful
                    voice and profound lyrics that resonate deeply with his audience. Born
                    in the village of Khant Maanpur in Punjab, India, he has become a
                    cultural icon in the Punjabi music industry. <br /> <br /> His songs
                    often reflect the struggles and triumphs of everyday life, capturing
                    the essence of Punjabi culture and traditions. With a career spanning
                    over two decades, Babu Maan has released numerous hit albums and
                    singles that have garnered him a massive fan following both in India
                    and abroad.
                </p>
            ),
        },
        {
            description: "Metallica",
            title: "For Whom The Bell Tolls",
            src: "https://assets.aceternity.com/demos/metallica.jpeg",
            ctaText: "Play",
            ctaLink: "https://ui.aceternity.com/templates",
            content: () => (
                <p>
                    Metallica, an iconic American heavy metal band, is renowned for their
                    powerful sound and intense performances that resonate deeply with
                    their audience. Formed in Los Angeles, California, they have become a
                    cultural icon in the heavy metal music industry. <br /> <br /> Their
                    songs often reflect themes of aggression, social issues, and personal
                    struggles, capturing the essence of the heavy metal genre. With a
                    career spanning over four decades, Metallica has released numerous hit
                    albums and singles that have garnered them a massive fan following
                    both in the United States and abroad.
                </p>
            ),
        },
        {
            description: "Led Zeppelin",
            title: "Stairway To Heaven",
            src: "https://assets.aceternity.com/demos/led-zeppelin.jpeg",
            ctaText: "Play",
            ctaLink: "https://ui.aceternity.com/templates",
            content: () => (
                <p>
                    Led Zeppelin, a legendary British rock band, is renowned for their
                    innovative sound and profound impact on the music industry. Formed in
                    London in 1968, they have become a cultural icon in the rock music
                    world. <br /> <br /> Their songs often reflect a blend of blues, hard
                    rock, and folk music, capturing the essence of the 1970s rock era.
                    With a career spanning over a decade, Led Zeppelin has released
                    numerous hit albums and singles that have garnered them a massive fan
                    following both in the United Kingdom and abroad.
                </p>
            ),
        },
        {
            description: "Mustafa Zahid",
            title: "Toh Phir Aao",
            src: "https://assets.aceternity.com/demos/toh-phir-aao.jpeg",
            ctaText: "Play",
            ctaLink: "https://ui.aceternity.com/templates",
            content: () => (
                <p>
                    &quot;Aawarapan&quot;, a Bollywood movie starring Emraan Hashmi, is
                    renowned for its intense storyline and powerful performances. Directed
                    by Mohit Suri, the film has become a significant work in the Indian
                    film industry. <br /> <br /> The movie explores themes of love,
                    redemption, and sacrifice, capturing the essence of human emotions and
                    relationships. With a gripping narrative and memorable music,
                    &quot;Aawarapan&quot; has garnered a massive fan following both in
                    India and abroad, solidifying Emraan Hashmi&apos;s status as a
                    versatile actor.
                </p>
            ),
        },
    ];

    return <ExpandableCards cards={demoCards} />;
}
