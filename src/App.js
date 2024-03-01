import './App.css';
import LoginForm from './pages/loginform';
import RegisterForm from './pages/registerform';
import Home from './pages/home'
import { Route,BrowserRouter as Router,Switch } from 'react-router-dom';
import PrivateRoute from './routes/privateRoute';
import Layout from './pages/layout';
import UpdateProfile from './pages/updateProfile';
import AddProduct from './pages/addProduct';

function App() {
  const getAuthToken=localStorage.getItem('AuthToken')
  const isAuthenticated = getAuthToken?.length ? true: false;
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginForm} />
        <Route path="/register" component={RegisterForm} />
        <Layout>
        <PrivateRoute path="/home" component={Home} isAuthenticated={isAuthenticated} />
        <PrivateRoute path='/updateProfile' component={UpdateProfile} isAuthenticated={isAuthenticated}/>
        <PrivateRoute path='/addProduct' component={AddProduct} isAuthenticated={isAuthenticated}/>
        </Layout>
      </Switch>
    </Router>
  );
}

export default App;

function PageNotFound(){
  return<h1> page not found</h1>
}



