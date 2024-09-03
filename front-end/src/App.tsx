
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ToDoPostsPage from './pages/ToDoPostsPage/ToDoPostsPage';
import EditToDoPostPage from './pages/EditToDoPostPage/EditToDoPostPage';
// import CategoryPage from './pages/CategoryPage/CategoryPage';

function App() {
 


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ToDoPostsPage/>} />
        <Route path='/posts/:id/edit' element={<EditToDoPostPage />} />
      </Routes>
    </BrowserRouter>
  )
}



export default App
