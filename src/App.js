import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import Login from "./Login";
import { AuthListener } from "./AuthListener"; 

const App = () => {
  return (
    <BrowserRouter>
      <AuthListener /> 
      <Routes>
        <Route index element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
