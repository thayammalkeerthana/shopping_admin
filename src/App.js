import './App.css';
import LoginForm from './pages/loginform';
import RegisterForm from './pages/registerform';
import Home from './pages/home'
import { Route,BrowserRouter as Router,Switch } from 'react-router-dom';
import PrivateRoute from './routes/privateRoute';
import Layout from './pages/layout';
import About from './pages/about';
import Trending from './pages/trending';
import CartPage from './pages/cart';
import CheckoutPage from './pages/checkout_details';
import UpdateProfile from './pages/updateProfile';
import AddProduct from './pages/addProduct';

function App() {
  const getAuthToken=localStorage.getItem('AuthToken')
  console.log("getAuthToken",getAuthToken);
  const isAuthenticated = getAuthToken?.length ? true: false;
  console.log("isAuthenticated",isAuthenticated);
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginForm} />
        <Route path="/register" component={RegisterForm} />
        <Layout>
        <PrivateRoute exact path="/home" component={Home} isAuthenticated={isAuthenticated} />
        <PrivateRoute  path="/about" component={About} isAuthenticated={isAuthenticated} />
        <PrivateRoute  path="/trending" component={Trending} isAuthenticated={isAuthenticated} />
        <PrivateRoute  path="/cart" component={CartPage} isAuthenticated={isAuthenticated} />
        <PrivateRoute  path="/checkout" component={CheckoutPage} isAuthenticated={isAuthenticated} />
        <PrivateRoute path='/updateProfile' component={UpdateProfile} isAuthenticated={isAuthenticated}/>
        <PrivateRoute path='/addProduct' component={AddProduct} isAuthenticated={isAuthenticated}/>
        </Layout>
      </Switch>
    </Router>
  );
}

export default App;



