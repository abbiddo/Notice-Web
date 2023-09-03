import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";

import Alerts from "./Notice/Alerts";
import Notice from "./Notice/Notice";
import Updates from "./Notice/Updates";
import Writes from "./Notice/Writes";

const App = () => {
  return (
      <Router>
          <Routes>
              <Route index element={<Navigate to="/alerts" />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/notice/:index" element={<Notice />} />
              <Route path="/Update" element={<Updates />} />
              <Route path="/write" element={<Writes />} />
          </Routes>
      </Router>
  );
};

export default App;
