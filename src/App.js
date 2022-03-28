import React from 'react'
import { BrowserRouter as Router, Switch, Route, Routes } from "react-router-dom";
import BarChart from './components/BarChart'
import Info from './components/Info'
import Navbar from "./components/Navbar"
import Etusivu from "./components/Etusivu"
import './App.css'

const App = () => {

  return (
    <div>

      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Etusivu} />
          <Route path='/barchart' component={BarChart} />
          <Route path='/info' component={Info} />
        </Switch>
      </Router>

    </div>
  )
}

export default App
