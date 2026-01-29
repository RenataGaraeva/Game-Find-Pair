'use client';

import { CardType } from '../../utils/types';
import Card from '../Card/Card';
import styles from './GameBoard.module.css';

interface GameBoardProps {
    cards: CardType[];
    onCardClick: (cardId: number) => void;
    isDisabled: boolean;
    theme: 'light' | 'dark';
}

export default function GameBoard({
                                      cards,
                                      onCardClick,
                                      isDisabled,
                                      theme
                                  }: GameBoardProps) {
    return (
        <div className={`${styles.board} ${theme === 'dark' ? styles.dark : styles.light}`}>
            <div className={styles.grid}>
                {cards.map((card) => (
                    <div key={card.id} className={styles.cardSlot}>
                        <Card
                            card={card}
                            onClick={() => onCardClick(card.id)}
                            isDisabled={isDisabled}
                            theme={theme}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}