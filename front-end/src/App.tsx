import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ToDoPostsPage from "./pages/ToDoPostsPage/ToDoPostsPage";
// import EditToDoPostPage from './pages/EditToDoPostPage/EditToDoPostPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ToDoPostsPage />} />

        {/* if needs to do separate page ,use it */}
        {/* <Route path='/posts/:id/edit' element={<EditToDoPostPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
