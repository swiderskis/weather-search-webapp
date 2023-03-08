import { useState } from "react";
import credentials from "./credentials.json";
import { Search, Navbar } from "./components";

function App() {
  const [navbarSelection, setNavbarSelection] = useState('Search');

  const apiKey = credentials.api_key;

  return (
    <>
      <h1>Weather Search</h1>
      <Navbar setNavbarSelection={(selection: string) => setNavbarSelection(selection)} />
      {
        {
          'Search': <Search apiKey={apiKey} />,
          'Recent': <div><p>Recent</p></div>
        }[navbarSelection]
      }
    </>
  )
}

export default App;
