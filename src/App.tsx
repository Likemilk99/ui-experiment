import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Material, ReactTableView } from "./views"

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/material-ui">
                    <Material />
                </Route>
                <Route path="/react-table">
                    <ReactTableView />
                </Route>
            </Switch>
        </Router>
    )
}

export default App
