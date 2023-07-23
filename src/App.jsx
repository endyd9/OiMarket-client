import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./routes/Home";
import Footer from "./components/Footer";
import Join from "./routes/Join";
import Login from "./routes/Login";
import Search from "./routes/Search";
import Mypage from "./routes/Mypage";
import Upload from "./routes/Upload";
import Item from "./routes/Item";
import EditItem from "./routes/EditItem";
import EditUser from "./routes/EditUser";
import Messages from "./routes/Messages";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/user/:id/message/:id2?/:itemid?">
          <Messages />
        </Route>
        <Route path="/item/:id/edit">
          <EditItem />
        </Route>
        <Route path="/item/upload">
          <Upload />
        </Route>
        <Route path="/item/:id">
          <Item />
        </Route>
        <Route path="/user/:id/edit">
          <EditUser />
        </Route>
        <Route path="/user/:id">
          <Mypage />
        </Route>
        <Route path="/search">
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
