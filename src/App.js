import React, { Component } from 'react';
import {Route, BrowserRouter, Routes} from 'react-router-dom'
import Category from './Category';
import Home from './Home';
import Expenses from './Expenses'

class App extends Component {
    state = {  } 
    render() { 
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/categories' element={<Category/>}/>
                    <Route path='/expenses' element={<Expenses/>}/>
                </Routes>
            </BrowserRouter>
        );
    }
}
 
export default App;