'use client';

import { formatTime } from '../../utils/gameLogic';
import styles from './GameInfo.module.css';
import ru from '../../locales/ru.json';

interface GameInfoProps {
    time: number;
    matchedPairs: number;
    isFinished: boolean;
    onNewGame: () => void;
    theme: 'light' | 'dark';
    onThemeChange: (theme: 'light' | 'dark') => void;
}

export default function GameInfo({
                                     time,
                                     matchedPairs,
                                     isFinished,
                                     onNewGame,
                                     theme,
                                     onThemeChange
                                 }: GameInfoProps) {
    return (
        <div className={`${styles.info} ${theme === 'dark' ? styles.dark : styles.light}`}>
            <div className={styles.header}>
                <h1 className={styles.title}>{ru.game.title}</h1>
                <button
                    onClick={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')}
                    className={styles.themeButton}
                    aria-label={ru.theme.toggle}
                >
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button>
            </div>

            <div className={styles.stats}>
                <div className={styles.stat}>
                    <div className={styles.statLabel}>{ru.game.stats.time}</div>
                    <div className={styles.statValue}>{formatTime(time)}</div>
                </div>

                <div className={styles.stat}>
                    <div className={styles.statLabel}>{ru.game.stats.foundPairs}</div>
                    <div className={styles.statValue}>{matchedPairs}/8</div>
                </div>
            </div>

            {isFinished && (
                <div className={styles.message}>
                    <div className={styles.messageText}>{ru.game.congratulations}</div>
                    <div className={styles.messageSubtext}>
                        {ru.game.allPairsFound} {formatTime(time)}
                    </div>
                </div>
            )}

            <button
                onClick={onNewGame}
                className={styles.newGameButton}
            >
                {ru.game.newGame}
            </button>

            <div className={styles.instructions}>
                <p>{ru.game.instructions.startGame}</p>
                <p>{ru.game.instructions.findPairs}</p>
                <p>{ru.game.instructions.memorize}</p>
                <p>{ru.game.instructions.findAll}</p>
            </div>
        </div>
    );
}