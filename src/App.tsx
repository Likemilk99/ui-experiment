import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Material from "./views/Material"

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/material-ui">
                    <Material />
                </Route>
            </Switch>
        </Router>
    )
}

export default App
