import { BrowserRouter } from "react-router-dom";
import MyRoutes from "./components/MyRoutes";
import { UserProvider } from "./components/Tools/UserContext";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <MyRoutes />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
