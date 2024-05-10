import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Todo_List from './components/Todo List/Todo_List';
import Task_Form from './components/Todo List/Task_Form';
import Task_Update from './components/Todo List/Task_Update';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Todo_List />} />
        <Route path='/createtask' element={<Task_Form />} />
        <Route path='/updatetask/:item_id' element={<Task_Update />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
