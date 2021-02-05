import './App.scss';
import Widget from './components/Widget';

function App() {
  const playLists = [
    '37i9dQZF1DWXRqgorJj26U',
    '37i9dQZF1DWWGFQLoP9qlv',
    '37i9dQZEVXbKCF6dqVpDkS',
  ];
  return (
    <Widget playListIDs={playLists} />
  );
}

export default App;
