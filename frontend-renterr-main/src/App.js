import { routes } from "data/routes";
import { Toaster } from "react-hot-toast";
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

function App() {
  return <>
    <Toaster />
    <Router>
      <Routes>
        {
          routes.map(route => {
            return <Route path={route.path} element={route.element} />
          })
        }
      </Routes>
    </Router>
  </>
}

export default App;