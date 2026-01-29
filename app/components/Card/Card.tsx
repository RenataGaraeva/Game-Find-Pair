'use client';

import { CardType } from '../../utils/types';
import { getImagePath } from '../../utils/gameLogic';
import styles from './Card.module.css';
import Image from 'next/image';
import { useState } from 'react';

interface CardProps {
    card: CardType;
    onClick: () => void;
    isDisabled: boolean;
    theme: 'light' | 'dark';
}

export default function Card({ card, onClick, isDisabled, theme }: CardProps) {
    const [imageError, setImageError] = useState(false);

    const handleClick = () => {
        if (card.isMatched) return;
        if (isDisabled || card.isFlipped) return;
        onClick();
    };

    const handleImageError = () => {
        setImageError(true);
    };

    const cardClass = card.isMatched
        ? styles.matched
        : card.isFlipped
            ? styles.flipped
            : '';

    const themeClass = theme === 'dark' ? styles.dark : styles.light;

    return (
        <div
            className={`${styles.card} ${cardClass} ${themeClass}`}
            onClick={handleClick}
        >
            <div className={styles.cardInner}>
                <div className={styles.cardFront}>
                    {!imageError ? (
                        <div className={styles.imageContainer}>
                            <Image
                                src={getImagePath(card.imageId)}
                                alt={`Картинка ${card.imageId}`}
                                fill
                                className={styles.image}
                                sizes="(max-width: 480px) 70px, (max-width: 768px) 80px, 90px"
                                onError={handleImageError}
                                priority={card.imageId <= 4}
                            />
                            <div className={styles.imageOverlay} />
                        </div>
                    ) : (
                        <div className={styles.fallback}>
                            <span className={styles.fallbackText}>{card.imageId}</span>
                        </div>
                    )}
                </div>
                <div className={styles.cardBack}>
                    <div className={styles.dotPattern} />
                </div>
            </div>
        </div>
    );
}