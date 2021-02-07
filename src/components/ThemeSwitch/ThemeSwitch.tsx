import ThemeType from '../../ThemeType';
import styles from './ThemeSwitch.module.scss';

const ThemeSwitch = ({
  switchTheme, theme,
}: { switchTheme: (e: boolean) => void, theme: ThemeType }) => {
  const oppositeTheme: ThemeType = theme === ThemeType.light ? ThemeType.dark : ThemeType.light;
  return (
    <div className={styles['theme-switch']}>
      <span>{`Switch page theme to ${oppositeTheme} `}</span>
      <label className={styles.switch}>
        <input type="checkbox" onChange={(e) => switchTheme(e.target.checked)} />
        <span className={`${styles.slider} ${styles.round}`} />
      </label>
    </div>
  );
};

export default ThemeSwitch;
