import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ManageVideos from "./components/ManageVideos/ManageVideos";
import ManageUsers from "./components/ManageUser/ManageUsers";
import SignInPage from "./components/SignInPage/SignInPage";
import PrivateRoute from "./hooks/privateRoute";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route
          path="/videos"
          element={
            <PrivateRoute>
              <ManageVideos />
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <ManageUsers />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
