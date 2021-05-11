
import './App.css';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';
import {LightTheme, BaseProvider, styled} from 'baseui';
import Posts from './Posts';
import Home from './Home';
import PostDetails from './PostDetails';
const engine = new Styletron();
const Centered = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});

function App() {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Centered>
          <Router>
            <div className="app">
              <Switch>

                <Route path = '/post/:postId'>
                  <PostDetails />
                </Route>

                <Route path = '/posts'>
                  <Posts />
                </Route>

                <Route path = '/'>
                  <Home />
                </Route>
              </Switch>
            </div>
          </Router>
        </Centered>
      </BaseProvider>
    </StyletronProvider>
    
  );
}

export default App;
