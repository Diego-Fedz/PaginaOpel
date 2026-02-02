import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const RootLayout = () => (
 <div className="App">
   <Header />
   <Outlet />
   <Footer />
 </div>
);
export default RootLayout;