import Home from "./pages/Home";
import GlobalStyle from "./GlobalStyle";

import { Route, Switch } from "react-router-dom";

import Movie from "./pages/Movie";
import TV from "./pages/TV";
import Person from "./pages/Person";
import Genre from "./pages/Genre";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <GlobalStyle />

        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>

          <Route path="/movie/:id" exact>
            <Movie />
          </Route>

          <Route path="/tv/:id" exact>
            <TV />
          </Route>

          <Route path="/person/:id" exact>
            <Person />
          </Route>

          <Route path="/genre/:id" exact>
            <Genre />
          </Route>
        </Switch>
      </header>
    </div>
  );
}

export default App;
