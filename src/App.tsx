import { useState } from 'react';
import './styles/App.scss';
import './styles/theme.scss';
import ThemeSwitch from './components/ThemeSwitch/ThemeSwitch';
import Widget from './components/Widget/Widget';

const App = () => {
  const [theme, setTheme] = useState('light');

  const switchTheme = (isDark: boolean) => {
    setTheme(isDark ? 'dark' : 'light');
  };

  return (
    <div className={theme}>
      <ThemeSwitch theme={theme} switchTheme={switchTheme} />
      <h1>Spotify Widget</h1>
      <Widget />
    </div>
  );
};

export default App;
