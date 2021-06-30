import { Name } from './components/name/Name';
import { ResetButton } from './components/resetButton/ResetButton';
import { Map } from './components/map/Map';
import { ScoreBoard } from './components/scoreBoard/ScoreBoard';

function App() {
  return (
    <div>
      <ResetButton />
      <Name />
      <Map />
      <ScoreBoard />
    </div>
  );
}

export default App;
