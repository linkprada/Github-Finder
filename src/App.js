import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/layouts/Footer";
import Navbar from "./components/layouts/Navbar";
import { UsersContextProvider } from "./context/UsersContext";
import About from "./pages/About";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <UsersContextProvider>
            <Router>
                <div className="flex flex-col justify-between h-screen">
                    <Navbar></Navbar>
                    <main className="container mx-auto px-3 pb-12">
                        <Routes>
                            <Route exact path="/" element={<Home></Home>}></Route>
                            <Route path="/about" element={<About></About>}></Route>
                            <Route path="/notfound" element={<NotFound></NotFound>}></Route>
                            <Route path="/*" element={<NotFound></NotFound>}></Route>
                        </Routes>
                    </main>
                    <Footer></Footer>
                </div>
            </Router>
        </UsersContextProvider>
    );
}

export default App;
