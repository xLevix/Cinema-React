import React, {Component, useEffect} from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import Register2 from "./components/Register2.js";
import Register3 from "./components/register3.js";
import Login2 from "./components/login2";
import Filmy from "./components/Film";
import DodajFilm from "./components/dodajFilm";
import Rezerwacje from "./components/Rezerwacje";

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";
import NavBar from "./components/NavBar";
import SearchFilm from "./components/SearchFilm";
import DodajSeans from "./components/dodajSeans";
import ZmienSeans from "./components/zmienSeans";
import AuthVerify from "./common/auth-verify";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });


  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div>
        <NavBar>

        </NavBar>


        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login2" element={<Login2 />} />
            <Route path="/register3" element={<Register3 />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/filmy" element={<Filmy url={'http://localhost:8080/filmy'} />} />
            <Route path="/filmy/add" element={<DodajFilm />} />
            <Route path="/filmy/search" element={<SearchFilm />} />
            <Route path="/seanse/add" element={<DodajSeans />} />
            <Route path="/seanse/modify" element={<ZmienSeans />} />
            <Route path="/rezerwacje" element={<Rezerwacje />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
          </Routes>
        </div>

        {<AuthVerify logOut={this.logOut}/>}
      </div>
    );
  }
}

export default App;
