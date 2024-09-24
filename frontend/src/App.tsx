import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RefundRequest from '../src/pages/refund/RefundRequest';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/refund-request" element={<RefundRequest />} />
        {/* อื่นๆ */}
      </Routes>
    </Router>
  );
}

export default App;
