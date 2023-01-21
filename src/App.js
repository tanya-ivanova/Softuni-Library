import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

import PrivateRoute from './components/common/PrivateRoute';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Footer from './components/footer/Footer';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Logout from './components/logout/Logout';
import AddBook from './components/addBook/AddBook';
import Catalog from './components/catalog/Catalog';
import Profile from './components/profile/Profile';
import BookDetails from './components/bookDetails/BookDetails';
import EditBook from './components/editBook/EditBook';


import './App.css';

function App() {
    return (
        <AuthProvider>
            <div className='site-wrapper'>
                <Header />

                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/catalog" element={<Catalog />} />
                        <Route path="/catalog/:bookId/details" element={<BookDetails />} />

                        <Route element={<PrivateRoute />}>
                            <Route path='/logout' element={<Logout />} />
                            <Route path="/create" element={<AddBook />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/catalog/:bookId/edit" element={<EditBook />} />
                        </Route>
                    </Routes>
                </main>

                <Footer />
            </div>
        </AuthProvider>
    );
}

export default App;
