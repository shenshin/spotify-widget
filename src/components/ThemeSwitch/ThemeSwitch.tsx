import styles from './ThemeSwitch.module.scss';

const ThemeSwitch = ({
  switchTheme, theme,
}: { switchTheme: (e: boolean) => void, theme: string }) => (
  <div className={styles['theme-switch']}>
    <span>{`Switch page theme to ${theme === 'dark' ? 'light' : 'dark'} `}</span>
    <label className={styles.switch}>
      <input type="checkbox" onChange={(e) => switchTheme(e.target.checked)} />
      <span className={`${styles.slider} ${styles.round}`} />
    </label>
  </div>
);

export default ThemeSwitch;
