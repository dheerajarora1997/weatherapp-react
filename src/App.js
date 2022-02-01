import './App.css';
import Landing from './pages/Landing';
import Home from './pages/Home';

function App() {
  window.document.body.classList.add('bg-dark', 'bg-opacity-10')
  return (<>
    <Landing></Landing>
    <Home></Home>
  </>
  );
}

export default App;
