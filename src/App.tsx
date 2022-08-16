import './App.css';
import { Routes, Route, HashRouter, Navigate } from 'react-router-dom';
import Connect from './pages/connect/Connect';
import SelectProfile from './pages/select-profile/SelectProfile';
import Claimer from './pages/claimer/Claimer';
import Attester from './pages/attester/Attester';
import AttesterCtypes from './pages/attester/ctypes/AttesterCtypes';
import AttesterRequests from './pages/attester/requests/AttesterRequests';
import AttesterCtypeCreate from './pages/attester/ctypes/create/AttesterCtypeCreate';
import AttesterRequestDetail from './pages/attester/requests/detail/AttesterRequestDetail';
import ClaimerAttesterList from './pages/claimer/attester-list/ClaimerAttesterList';
import ClaimForm from './pages/claimer/attester-list/claim-form/ClaimForm';
import ClaimDetail from './pages/claimer/detail/ClaimDetail';
import AttesterCtypeView from './pages/attester/ctypes/view/AttesterCtypeView';

function App() {
  return (
    <div className="App">
    <HashRouter>
      <Routes>
        <Route path="/" element={<Connect />}></Route>
        <Route path="/select-profile" element={<SelectProfile />}> </Route>
        <Route path="/claimer" element={<Claimer />}> </Route>
        <Route path="/claimer/detail/:id" element={<ClaimDetail />}> </Route>
        <Route path="/claimer/attester-list" element={<ClaimerAttesterList />}> </Route>
        <Route path="/claimer/attester-list/claim/:id" element={<ClaimForm />}> </Route>
        <Route path="/attester" element={<Attester />}> </Route>
        <Route path="/attester/ctypes" element={<AttesterCtypes />}> </Route>
        <Route path="/attester/ctypes/create" element={<AttesterCtypeCreate />}> </Route>
        <Route path="/attester/ctypes/:id" element={<AttesterCtypeView />}> </Route>
        <Route path="/attester/requests" element={<AttesterRequests />}> </Route>
        <Route path="/attester/requests/:id" element={<AttesterRequestDetail />}> </Route>
        <Route path='/.well-known/did-configuration.json' element={ <Navigate to="/didConfiguration.json" /> }/>

        {/* Fallback routes */}
        <Route path="*" element={<Connect />}></Route>
      </Routes>
    </HashRouter>
    </div>
  );
}

export default App;
