import React from "react";
import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
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
    <BrowserRouter basename={process.env.REACT_APP_ROUTE_URL}>
      <Header />
      <Switch>
        <Route
          path={`/user/:id/message/:id2?/:itemid?`}
          element={<Messages />}
        />
        <Route path={`/item/:id/edit`} element={<EditItem />} />
        <Route path={`/item/upload`} element={<Upload />} />
        <Route path={`/item/:id`} element={<Item />} />
        <Route path={`/user/:id/edit`} element={<EditUser />} />
        <Route path={`/user/:id`} element={<Mypage />} />
        <Route path={`/search`} element={<Search />} />
        <Route path={`/join`} element={<Join />} />
        <Route path={`/login`} element={<Login />} />
        <Route path={`/`} element={<Home />} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
