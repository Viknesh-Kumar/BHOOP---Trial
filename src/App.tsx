import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Pulse from "./pages/Pulse";
import Community from "./pages/Community";
import More from "./pages/More";
import VitalsHub from "./pages/VitalsHub";
import FinancialHealthHub from "./pages/FinancialHealthHub";
import MetricDetail from "./pages/MetricDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="pulse" element={<Pulse />} />
          <Route path="community" element={<Community />} />
          <Route path="more" element={<More />} />
        </Route>
        <Route path="/vitals" element={<VitalsHub />} />
        <Route path="/financial-health" element={<FinancialHealthHub />} />
        <Route path="/metric/:id" element={<MetricDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
