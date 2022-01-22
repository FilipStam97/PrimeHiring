import './App.css';
import HeaderMenu from './components/HeaderMenu/HeaderMenu';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Redirect} from 'react-router';
import MyHirings from './components/MyHirings/MyHirings';
import BrowsePage from './components/BrowsePage/BrowsePage';
import DeveloperPage from './components/DeveloperPage/DeveloperPage';


function App() {


  
  const renderContetnt = () => {
    return (
      <Switch>
        <Route exact path="/" component={MyHirings} />
        <Route  path="/browse" component={BrowsePage} />
        <Route path="/developer/:id" component={DeveloperPage} />
        {/* 
        <Route path="/faq" component={FAQ} />
        <Route path="/history" component={History} />
        <Route path="/favorites" component={Favorites} /> 
       
        */}  
        <Redirect to='/'/>
      </Switch>

    );
  }


  return (
    <div className="App">
      <Router>
     <HeaderMenu childernComponents={renderContetnt()} />
     </Router>
    </div>
  );

}

export default App;
