import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styles from "./css/App.module.css";
import Header from "./components/Header";
import Home from "./routes/Home";
import Footer from "./components/Footer";
import Join from "./routes/Join";
import Login from "./routes/Login";
import Search from "./routes/Search";
import Mypage from "./routes/Mypage";
import Upload from "./routes/Upload";
import Item from "./routes/Item";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/item/upload">
          <Upload />
        </Route>
        <Route path="/item/:id">
          <Item />
        </Route>
        <Route path="/mypage/:id">
          <Mypage />
        </Route>
        <Route path="/serch">
          <Search />
        </Route>
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
