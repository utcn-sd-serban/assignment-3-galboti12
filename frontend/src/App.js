import React from 'react';
import './App.css';
import { HashRouter, Switch, Route } from "react-router-dom";
import 'bulma/css/bulma.min.css';

import SmartQuestionList from './view/SmartQuestionList';
import SmartCreateQuestion from './view/SmartCreateQuestion';
import SmartCreateUser from './view/SmartCreateUser';
import SmartLoginUser from './view/SmartLogIn';
import SmartHeader from './view/SmartHeader';
import SmartQuestionShow from './view/SmartQuestionShow';

const App = () => (
  <div className="App">
    <div className="container">
      <SmartHeader />
      <HashRouter>
        <Switch>
          <Route exact={true} component={SmartQuestionList} path={["/", "/questions", "/filter-by-text/:text", "/filter-by-tag/:tag"]} />
          <Route exact={true} component={SmartCreateQuestion} path="/create-question" />
          <Route exact={true} component={SmartCreateUser} path="/sign-up" />
          <Route exact={true} component={SmartLoginUser} path="/login" />
          <Route exact={true} component={SmartQuestionShow} path="/show-question/:id" />
        </Switch>
      </HashRouter>
    </div>
  </div>
);


export default App;