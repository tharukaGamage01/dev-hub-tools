import { Routes, Route, BrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ToolList from "./components/ToolList";
import ToolForm from "./components/ToolForm";
import Landing from "./pages/Landing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/toollist" element={<ToolList />} />
        <Route path="/toolform" element={<ToolForm />} />
        <Route path="/login" element={<Login />} />
  
      </Routes>
    </BrowserRouter>
  );
}

export default App;

