import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import './App.css';
import { Provider } from "react-redux";
import store from "./redux/store";
import Index from './components/customer/index';
import CustomerLogin from './components/customer/custlogin';
import CustomerRegister from './components/customer/custregister';
import Home from './components/customer/home';
import BrandRegister from './components/brandwise/brandregister';
import AdminLogin from './components/admin/adminLogin';
import AdminHome from './components/admin/adminHome';
import AdminUserMgmt from './components/admin/usersMngmt';
import AdminBrandManagement from './components/admin/brandMngmt';
import BrandLogin from './components/brandwise/brandLogin';
import BrandHome from './components/brandwise/brandHome';
import BrandAddLaptop from './components/brandwise/addProduct';
import BrandProfile from './components/brandwise/brandprofile';
import BrandProducts from './components/brandwise/viewProducts';
import UserCart from './components/customer/usercart';
import UserSettings from './components/customer/settings';
import UserComplaint from './components/customer/report';
import BrandProductEdit from './components/brandwise/productEdit';
import BrandProductDetail from './components/brandwise/produtDetails';
import ProductList from './components/customer/productbook';
import UserProductSingleView from './components/customer/productSingleView';
import UserBookings from './components/customer/purchasehistory';
import AboutPage from './components/customer/about';
import BrandBookings from './components/brandwise/brandBookings';
import Contact from './components/customer/contact';
import AdminComplaintList from './components/admin/adminComplaint';
import UserProfile from './components/customer/userProfile';

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Index />} />
            <Route path='/login' element={<CustomerLogin />} />
            <Route path='/register' element={<CustomerRegister />} />
            <Route path='/home' element={<Home />} />
            <Route path='/brandregister' element={<BrandRegister />} />
            <Route path='/adminLogin' element={<AdminLogin />} />
            <Route path='/adminHome' element={<AdminHome />} />
            <Route path='/adminusermgmt' element={<AdminUserMgmt />} />
            <Route path='/brandManagement' element={<AdminBrandManagement />} />
            <Route path='/brandLogin' element={<BrandLogin />} />
            <Route path='/brandHome' element={<BrandHome />} />
            <Route path='/addProduct' element={<BrandAddLaptop />} />
            <Route path='/brandProfile' element={<BrandProfile />} />
            <Route path='/brandProducts' element={<BrandProducts />} />
            <Route path='/booking' element={<ProductList />} />
            <Route path='/cart' element={<UserCart />} />
            <Route path='/history' element={<UserBookings />} />
            <Route path='/settings' element={<UserSettings />} />
            <Route path='/complaint' element={<UserComplaint />} />
            <Route path='/brandProductEdit/:id' element={<BrandProductEdit />} />
            <Route path='/brandProductDetail/:id' element={<BrandProductDetail />} />
            <Route path='/singleView/:id' element={<UserProductSingleView />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/brandBookings' element={<BrandBookings />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/admincomplaints' element={<AdminComplaintList />} />
            <Route path='/userProfile' element={<UserProfile />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
