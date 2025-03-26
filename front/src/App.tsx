
import { Switch, Route, Link } from 'wouter';

import './App.css'
import { Cursor } from './Cursor';
import { Offset } from './Offset';

function App() {
  

  return (
    <div className={"container"}>
      <div className={"content"}>
        <Link href="/offset">Offset</Link>
        <Link href="/cursor">Cursor</Link>
      </div>

      <div className={"content"}>
      <Switch>
        <Route path="/offset">
        <Offset />
          </Route>
        <Route path="/cursor">
        <Cursor />
        </Route>
      </Switch>
      </div>

    </div>
  )
}

export default App
