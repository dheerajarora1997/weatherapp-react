import './App.scss';
import Landing from './pages/Landing';

function App() {
  window.document.body.classList.add('bg-primary', 'bg-opacity-10')
  return (<>
    <Landing></Landing>
  </>
  );
}

export default App;
