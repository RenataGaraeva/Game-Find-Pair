import { CardType } from './types';

const IMAGE_IDS = [1, 2, 3, 4, 5, 6, 7, 8];

export const createDeck = (): CardType[] => {
    const cards: CardType[] = [];

    IMAGE_IDS.forEach((imageId, index) => {
        cards.push({
            id: index * 2,
            imageId,
            isFlipped: false,
            isMatched: false,
        });

        cards.push({
            id: index * 2 + 1,
            imageId,
            isFlipped: false,
            isMatched: false,
        });
    });

    return shuffleCards(cards);
};

export const shuffleCards = (cards: CardType[]): CardType[] => {
    const shuffled = [...cards];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
};

export const checkMatch = (
    firstId: number,
    secondId: number,
    cards: CardType[]
): boolean => {
    const firstCard = cards.find(card => card.id === firstId);
    const secondCard = cards.find(card => card.id === secondId);

    if (!firstCard || !secondCard) return false;
    return firstCard.imageId === secondCard.imageId;
};

export const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const getImagePath = (imageId: number): string => {
    return `/images/${imageId}.jpg`;
};