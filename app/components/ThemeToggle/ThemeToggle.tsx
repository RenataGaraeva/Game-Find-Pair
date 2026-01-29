'use client';

import { Sun, Moon } from 'lucide-react';
import { Theme } from '../../utils/types';
import styles from './ThemeToggle.module.css';
import ru from '../../locales/ru.json';

interface ThemeToggleProps {
    theme: Theme;
    onThemeChange: (theme: Theme) => void;
}

export default function ThemeToggle({ theme, onThemeChange }: ThemeToggleProps) {
    const getThemeText = () => {
        return theme === 'dark' ? ru.theme.light : ru.theme.dark;
    };

    const getAriaLabel = () => {
        const themeName = theme === 'dark' ? ru.theme.light : ru.theme.dark;
        return themeName
    };

    return (
        <button
            onClick={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')}
            className={`${styles.themeToggle} ${theme === 'dark' ? styles.dark : styles.light}`}
            aria-label={getAriaLabel()}
        >
            {theme === 'dark' ? (
                <Sun className={styles.icon} />
            ) : (
                <Moon className={styles.icon} />
            )}
            <span className={styles.themeText}>
        {getThemeText()}
      </span>
        </button>
    );
}