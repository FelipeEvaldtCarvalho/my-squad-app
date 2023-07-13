import Banner from "./components/Banner/Banner";
import Footer from "./components/Footer/Footer";
import Form from "./components/Form/Form";
import TeamSection from "./components/TeamSection/TeamSection";
import { useState } from "react";

function App() {
  const [store, setStore] = useState(
    JSON.parse(localStorage.getItem("times")) || []
  );
  return (
    <div className="App">
      <Banner />
      <Form setStore={setStore} store={store} />
      <TeamSection setStore={setStore} store={store} />
      <Footer />
    </div>
  );
}

export default App;
