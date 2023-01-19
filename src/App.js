import { Routes, Route } from 'react-router-dom';

import Header from './components/header/Header';
import Home from './components/home/Home';
import Footer from './components/footer/Footer';
import Register from './components/register/Register';
import Login from './components/login/Login';
import AddBook from './components/addBook/AddBook';
import BookItem from './components/catalog/bookItem/BookItem';
import BookDetails from './components/bookDetails/BookDetails';

import './App.css';

function App() {
    return (
        <div className='site-wrapper'>
            <Header />

            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/create" element={<AddBook />} />                    
                </Routes>
            </main>

            <Footer />
        </div>
    );
}

export default App;
