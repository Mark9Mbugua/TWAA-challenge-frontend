import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CreateArticlePage from '../src/pages/create-article-page.component';
import ArticlesPage from '../src/pages/articles-page.component';

import './App.scss';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={CreateArticlePage} />
        <Route exact path="/articles" component={ArticlesPage} />
      </Switch>   
    </div>
  );
}

export default App;
