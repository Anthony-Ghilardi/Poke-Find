import React from "react";
import { RouterProvider } from "react-router-dom";
import routes from "./components/Routes/Routes";
import { AuthContextProvider } from "./components/Context/AuthContext";
import axios from "axios";

axios.defaults.withCredentials = true;


function App() {
  return (
    <div className="App">
      <AuthContextProvider>
            <RouterProvider router={routes} />
      </AuthContextProvider>
    </div>
  );
}

export default App;
