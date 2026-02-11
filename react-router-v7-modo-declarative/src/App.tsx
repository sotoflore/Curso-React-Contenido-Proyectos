import { Route, Routes } from 'react-router';
import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import AuthLayout from './layouts/AuthLayout';
import PublicLayout from './layouts/PublicLayout';
import RootLayout from './layouts/RootLayout';
import DashboardPage from './pages/admin/DashboardPage';
import AdminLayout from './layouts/AdminLayout';
import ProfilePage from './pages/admin/ProfilePage';
import ProductPage from './pages/admin/ProductPage';
import NotFoundPage from './pages/public/NotFoundPage';

const App = () => {
    return (
        <Routes>
            <Route element={<RootLayout />}>
                
                <Route element={<PublicLayout />}>
                    <Route
                        //path='/' 
                        index={true}
                        element={<HomePage />}
                    />
                    <Route path='about' element={<AboutPage />} />
                </Route>              

                <Route path='auth' element={<AuthLayout />}>
                    <Route index element={ <div>auth index</div>} />                    
                    <Route path='login' element={<LoginPage />} />
                    <Route path='register' element={<RegisterPage />} />
                </Route>

                <Route path='admin' element={<AdminLayout />}>
                    <Route  index element={<DashboardPage />} />
                    <Route path='profile' element={<ProfilePage />} />
                    <Route path='products/:name/:id?' element={<ProductPage />} />
                </Route>

                <Route path='*' element={<NotFoundPage />} />
            </Route>
        </Routes>
    )
}

export default App;