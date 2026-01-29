'use client';

import { useState, useEffect, useCallback } from 'react';
import GameBoard from './components/GameBoard/GameBoard';
import GameInfo from './components/GameInfo/GameInfo';
import { CardType, Theme } from './utils/types';
import { createDeck, checkMatch } from './utils/gameLogic';
import styles from './page.module.css';

export default function MemoryGamePage() {
  const [theme, setTheme] = useState<Theme>('light');
  const [cards, setCards] = useState<CardType[]>([]);
  const [time, setTime] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [firstSelected, setFirstSelected] = useState<number | null>(null);
  const [secondSelected, setSecondSelected] = useState<number | null>(null);
  const [canFlip, setCanFlip] = useState(true);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const newCards = createDeck();
    setCards(newCards);
    setTime(0);
    setMatchedPairs(0);
    setIsPlaying(false);
    setIsFinished(false);
    setFirstSelected(null);
    setSecondSelected(null);
    setCanFlip(true);
  };

  useEffect(() => {
    const newMatchedPairs = cards.filter(card => card.isMatched).length / 2;
    setMatchedPairs(newMatchedPairs);

    if (newMatchedPairs === 8 && cards.length > 0) {
      setIsFinished(true);
      setIsPlaying(false);
    }
  }, [cards]);

  const handleCardClick = useCallback((cardId: number) => {
    if (!canFlip || isFinished) return;

    const cardIndex = cards.findIndex(c => c.id === cardId);
    if (cardIndex === -1 || cards[cardIndex].isFlipped || cards[cardIndex].isMatched) return;

    if (firstSelected === null) {
      const newCards = [...cards];
      newCards[cardIndex] = { ...newCards[cardIndex], isFlipped: true };
      setCards(newCards);
      setFirstSelected(cardId);
      if (!isPlaying) setIsPlaying(true);
      return;
    }

    if (secondSelected === null && firstSelected !== cardId) {
      const newCards = [...cards];
      newCards[cardIndex] = { ...newCards[cardIndex], isFlipped: true };
      setCards(newCards);
      setSecondSelected(cardId);
      setCanFlip(false);

      setTimeout(() => {
        const isMatch = checkMatch(firstSelected, cardId, cards);

        const updatedCards = cards.map(c => {
          if (c.id === firstSelected || c.id === cardId) {
            return { ...c, isMatched: isMatch, isFlipped: isMatch };
          }
          return c;
        });

        if (!isMatch) {
          updatedCards.forEach(c => {
            if (c.id === firstSelected || c.id === cardId) {
              c.isFlipped = false;
            }
          });
        }

        setCards(updatedCards);
        setFirstSelected(null);
        setSecondSelected(null);
        setCanFlip(true);
      }, 1000);
    }
  }, [cards, firstSelected, secondSelected, canFlip, isFinished, isPlaying]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying && !isFinished) {
      interval = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, isFinished]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('memory_game_theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('memory_game_theme', theme);
  }, [theme]);

  return (
      <div className={`${styles.container} ${theme === 'dark' ? styles.dark : styles.light}`}>
        <div className={styles.content}>
          <div className={styles.gameArea}>
            <div className={styles.boardContainer}>
              <GameBoard
                  cards={cards}
                  onCardClick={handleCardClick}
                  isDisabled={!canFlip}
                  theme={theme}
              />
            </div>

            <div className={styles.infoContainer}>
              <GameInfo
                  time={time}
                  matchedPairs={matchedPairs}
                  isFinished={isFinished}
                  onNewGame={startNewGame}
                  theme={theme}
                  onThemeChange={setTheme}
              />
            </div>
          </div>
        </div>
      </div>
  );
}