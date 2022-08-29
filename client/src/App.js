
// import './App.css';
import Payment from './components/payment';
import Registration from './components/registrationform';
import LoginForm from './components/registrationform/Login';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/'  element={<Registration/>}/>
        <Route path='/login'  element={<LoginForm/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
