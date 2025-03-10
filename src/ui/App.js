import React from 'react';
import "bulma/css/bulma.min.css";
import {MemoryRouter, Route} from 'react-router-dom';
import StartScreen from "./pages/StartScreen";
import PlayerProfileScreen from "./pages/PlayerProfileScreen";
import FightModeScreen from "./pages/FightModeScreen";
import LockScreen from "./pages/LockScreen";
import SetupScreen from "./pages/SetupScreen";
import StrategyModeScreen from "./pages/StrategyModeScreen";
import EndScreen from "./pages/EndScreen";
import "./App.css";

/**
 * Memory router as root to select the component for a given route
 * Always redirects to start screen when site is reloaded to prevent mistakes in our states or flow
 * @returns {component}
 * @constructor
 */
function App() {
    return (
        <MemoryRouter>
            <section className="section">
                <div className="container is-fluid">
                    <div className="has-text-centered">
                        <Route exact path="/" component={StartScreen}/>
                        <Route path="/end" component={EndScreen}/>
                        <Route path="/fight-mode/:playerId" render={(props) => (
                            <FightModeScreen key={props.match.params.playerId} {...props} />)
                        }/>
                        <Route path="/lock" component={LockScreen}/>
                        <Route path="/player-profile/:playerId/:ingame?" render={(props) => (
                            <PlayerProfileScreen key={props.match.params.playerId} {...props} />)
                        }/>
                        <Route path="/setup" component={SetupScreen}/>
                        <Route path="/strategy-mode/:playerId" render={(props) => (
                            <StrategyModeScreen key={props.match.params.playerId} {...props} />)
                        }/>
                    </div>
                </div>
            </section>
        </MemoryRouter>
    );
}

export default App;
