// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
// import LoginPage from './pages/LoginPage';
// import SignUpPage from './pages/SignUpPage';
// import ProductList from './pages/ProductList';
// import './App.css';
// const App: React.FC = () => {
//   const [firstName, setFirstName] = useState<string | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedFirstName = localStorage.getItem('firstName');
//     if (storedFirstName) {
//       setFirstName(storedFirstName);
//     }
//   }, []);
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('firstName');
//     window.location.href = '/';
//   };
//   const handleSignupNavigation = () => {
//     navigate('/signup');
//   };
//   return (
//     <div>
//       <header>
//         <nav className="navbar navbar-expand-lg bg-body-tertiary">
//           <div className="container-fluid">
//             <a className="navbar-brand fs-3" href="#">
//               Product Management
//             </a>
//             <button
//               className="navbar-toggler"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#navbarNav"
//               aria-controls="navbarNav"
//               aria-expanded="false"
//               aria-label="Toggle navigation"
//             >
//               <span className="navbar-toggler-icon"></span>
//             </button>
//             <div
//               className="collapse navbar-collapse justify-content-end pe-4"
//               id="navbarNav"
//             >
//               <ul className="navbar-nav text-center fs-5">
//               {!firstName ? (
//                   <>
//                     <li className="nav-item">
//                       <a className="nav-link" href="/">
//                         Login
//                       </a>
//                     </li>
//                     <li className="nav-item">
//                       <a className="nav-link" onClick={handleSignupNavigation}>
//                         Sign Up
//                       </a>
//                     </li>
//                   </>
//                 ) : (
//                   <>
//                     <li className="nav-item">
//                       <a className="nav-link">Hello, {firstName}</a>
//                     </li>
//                     <li className="nav-item">
//                       <a className="nav-link"  onClick={handleLogout}>
//                         Logout
//                       </a>
//                     </li>
//                   </>
//                 )}
//               </ul>
//             </div>
//           </div>
//         </nav>
//       </header>
//       {!firstName && <div className="text-center my-5 fs-3">Manage your inventory efficiently, Anytime..Anywhere!</div>}
//     <Router>
//       <Routes>
//           <Route path="/" element={<LoginPage setFirstName={setFirstName}/>} />
//           <Route path="/login" element={<LoginPage setFirstName={setFirstName}/>} />
//           <Route path="/signup" element={<SignUpPage />} />
//           <Route path="/products" element={<ProductList />} />
//           {/* <Route path="/add-product" element={<AddProduct />} /> */}
//       </Routes>
//   </Router>
 
//   </div>
  
//   );
// };

// export default App;
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProductList from './pages/ProductList';
import './App.css';

const NavContent: React.FC = () => {
  const [firstName, setFirstName] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFirstName = localStorage.getItem('firstName');
    if (storedFirstName) {
      setFirstName(storedFirstName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('firstName');
    setFirstName(null);
    navigate('/');
  };

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link className="navbar-brand fs-3" to="/">
              Product Management
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-end pe-4"
              id="navbarNav"
            >
              <ul className="navbar-nav text-center fs-5">
              {!firstName ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/signup">
                        Sign Up
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <span className="nav-link">Hello, {firstName}</span>
                    </li>
                    <li className="nav-item">
                      <button className="nav-link" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
      {!firstName && <div className="text-center my-5 fs-3">Manage your inventory efficiently, Anytime..Anywhere!</div>}
      <Routes>
        <Route path="/" element={<LoginPage setFirstName={setFirstName}/>} />
        <Route path="/login" element={<LoginPage setFirstName={setFirstName}/>} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/products" element={<ProductList />} />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <NavContent />
    </Router>
  );
};

export default App;