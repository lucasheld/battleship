import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import StartScreen from "./pages/StartScreen";
import PlayerProfileScreen from "./pages/PlayerProfileScreen";
import FightModeScreen from "./pages/FightModeScreen";
import LockScreen from "./pages/LockScreen";
import SetupScreen from "./pages/SetupScreen";
import StrategyModeScreen from "./pages/StrategyModeScreen";
import EndScreen from "./pages/EndScreen";

function App() {
  return (
      <BrowserRouter>
          <main className="App">
              <Route exact path="/" component={StartScreen} />
              <Route path="/end" component={EndScreen} />
              <Route path="/fightMode" component={FightModeScreen} />
              <Route path="/lock" component={LockScreen} />
              <Route path="/playerProfile" component={PlayerProfileScreen} />
              <Route path="/setup" component={SetupScreen} />
              <Route path="/strategyMode" component={StrategyModeScreen} />
          </main>
      </BrowserRouter>
  );
}

export default App;
