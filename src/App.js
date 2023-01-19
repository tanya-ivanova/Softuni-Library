import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

import Header from './components/header/Header';
import Home from './components/home/Home';
import Footer from './components/footer/Footer';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Logout from './components/logout/Logout';
import AddBook from './components/addBook/AddBook';
import BookItem from './components/catalog/bookItem/BookItem';
import BookDetails from './components/bookDetails/BookDetails';

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
                        <Route path='/logout' element={<Logout />} />
                        <Route path="/create" element={<AddBook />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </AuthProvider>
    );
}

export default App;
