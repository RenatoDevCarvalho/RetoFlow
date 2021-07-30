import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { NewThread } from './pages/NewThread';

import { Header } from './components/Header';

import { AuthContextProvider } from './contexts/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/threads/new" exact component={NewThread} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
