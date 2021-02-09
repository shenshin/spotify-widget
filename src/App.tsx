import { useState } from 'react';
import './styles/App.scss';
import './styles/theme.scss';
import ThemeSwitch from './components/ThemeSwitch/ThemeSwitch';
import SpotifyWidget from './components/SpotifyWidget/SpotifyWidget';
import ThemeType from './ThemeType';

const App = (): JSX.Element => {
  const [theme, setTheme] = useState<ThemeType>(ThemeType.light);

  const switchTheme = (isDark: boolean): void => {
    setTheme(isDark ? ThemeType.dark : ThemeType.light);
  };

  return (
    <div className={theme}>
      <ThemeSwitch theme={theme} switchTheme={switchTheme} />
      <h1>Spotify Widget</h1>
      <SpotifyWidget />
    </div>
  );
};

export default App;
