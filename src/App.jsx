import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Parent from "./components/Parent";
import Eurovision from "./components/Eurovision";
import Ziferblat from "./components/Ziferblat";
import Ruslana from "./components/Ruslana";
import Jamala from "./components/Jamala";
import Kalush from "./components/Kalush";
import Verka from "./components/Verka";
import Error from "./components/Error";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Parent />}>
            <Route index element={<Eurovision />} />
            <Route path="/ziferblat" element={<Ziferblat />} />
            <Route path="/ruslana" element={<Ruslana />} />
            <Route path="/jamala" element={<Jamala />} />
            <Route path="/kalush" element={<Kalush />} />
            <Route path="/verka" element={<Verka />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
