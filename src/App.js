import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/layouts/Footer";
import Navbar from "./components/layouts/Navbar";

function App() {
    return (
        <Router>
            <div className="flex flex-col justify-between h-screen">
                <Navbar></Navbar>
                <main className="container mx-aut px-3 pb-12">Content</main>
                <Footer></Footer>
            </div>
        </Router>
    );
}

export default App;
