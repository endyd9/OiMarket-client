import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./routes/Home";
import Footer from "./Footer";
import Join from "./routes/Join";
import Login from "./routes/Login";
import Search from "./routes/Search";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/serch">
          <Search />
        </Route>
        <Route path="/join">
          <Join />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
