import './App.css';
import './Sample.scss';
import Landing from './pages/Landing';

function App() {
  window.document.body.classList.add('bg-dark', 'bg-opacity-10')
  return (<>
    <Landing></Landing>
  </>
  );
}

export default App;
