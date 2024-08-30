
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ToDoPostsPage from './pages/ToDoPostsPage/ToDoPostsPage';
import CreateToDoPostPage from './pages/CreateToDoPostPage/CreateToDoPostPage';
import EditToDoPostPage from './pages/EditToDoPostPage/EditToDoPostPage';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import CreateCategoryPage from './pages/CreateCategoryPage/CreateCategoryPage';

function App() {
 


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ToDoPostsPage/>} />
        <Route path='/posts/new' element={<CreateToDoPostPage />} />
        <Route path='/posts/:id/edit' element={<EditToDoPostPage />} />
        <Route path='/categories' element={<CategoryPage />} />
        <Route path='/categories/new' element={<CreateCategoryPage />} />
      </Routes>
    </BrowserRouter>
  )
}



export default App
