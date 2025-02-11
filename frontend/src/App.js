import { Toaster } from "./components/ui/toaster";

import "./App.css";
import MainRoutes from "./routes/MainRoutes";

function App() {
  return (
    <div className="App">
      <MainRoutes />
      <Toaster />
    </div>
  );
}

export default App;
