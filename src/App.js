import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import ErrorBoundary from './components/common/ErrorBoundary';

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
import Search from './components/search/Search';
import NotFound from './components/notFound/NotFound';


import './App.css';

function App() {
    return (

        <AuthProvider>
            <div className='site-wrapper'>
                <Header />

                <ErrorBoundary>
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
                                <Route path="/search" element={<Search />} />                                
                            </Route>

                            <Route path="/catalog/:bookId/edit" element={<EditBook />} />

                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </main>
                </ErrorBoundary>

                <Footer />
            </div>
        </AuthProvider>

    );
}

export default App;
