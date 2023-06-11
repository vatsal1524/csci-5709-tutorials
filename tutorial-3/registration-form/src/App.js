import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationForm from "./components/registrationForm";
import Profile from "./components/profile";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<RegistrationForm />}></Route>
          <Route exact path="/profile" element={<Profile />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
