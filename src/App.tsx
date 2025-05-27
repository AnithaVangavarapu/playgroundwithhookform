import { BrowserRouter, Routes, Route } from "react-router-dom";
import { InsulineDairy } from "./pages/InsulineDiary";
import { StudyDrugDoseDairy } from "./pages/StudyDrugDoseDairy";
import { Header, SideMenu } from "./components";
import { HypoglycemiaDiary } from "./pages/HypoglycemiaDiary";
function App() {
  return (
    <BrowserRouter>
      <div className="font-poppins">
        <div className="flex flex-col">
          <Header />
          <div className="grid grid-cols-6 w-full lg:min-h-[660px]">
            <div className="grid-cols-1 border-r border-gray-200">
              <SideMenu />
            </div>
            <div className="col-span-5 w-full bg-gray-50">
              <Routes>
                <Route path="/" element={<StudyDrugDoseDairy />} />
                <Route
                  path="/studyDrugDoseDiary"
                  element={<StudyDrugDoseDairy />}
                />
                <Route path="/insulineDiary" element={<InsulineDairy />} />
                <Route
                  path="/hypoglycemiaDiary"
                  element={<HypoglycemiaDiary />}
                />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
