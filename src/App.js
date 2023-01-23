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

        {/*<nav className="navbar navbar-expand navbar-dark bg-dark">*/}
        {/*  <Link to={"/"} className="navbar-brand">*/}
        {/*    bezKoder*/}
        {/*  </Link>*/}
        {/*  <div className="navbar-nav mr-auto">*/}
        {/*    <li className="nav-item">*/}
        {/*      <Link to={"/home"} className="nav-link">*/}
        {/*        Home*/}
        {/*      </Link>*/}
        {/*    </li>*/}

        {/*    {showModeratorBoard && (*/}
        {/*      <li className="nav-item">*/}
        {/*        <Link to={"/mod"} className="nav-link">*/}
        {/*          Moderator Board*/}
        {/*        </Link>*/}
        {/*      </li>*/}
        {/*    )}*/}

        {/*    {showAdminBoard && (*/}
        {/*      <li className="nav-item">*/}
        {/*        <Link to={"/admin"} className="nav-link">*/}
        {/*          Admin Board*/}
        {/*        </Link>*/}
        {/*      </li>*/}
        {/*    )}*/}

        {/*    {currentUser && (*/}
        {/*      <li className="nav-item">*/}
        {/*        <Link to={"/user"} className="nav-link">*/}
        {/*          User*/}
        {/*        </Link>*/}
        {/*      </li>*/}
        {/*    )}*/}
        {/*  </div>*/}

        {/*  {currentUser ? (*/}
        {/*    <div className="navbar-nav ml-auto">*/}
        {/*      <li className="nav-item">*/}
        {/*        <Link to={"/profile"} className="nav-link">*/}
        {/*          {currentUser.username}*/}
        {/*        </Link>*/}
        {/*      </li>*/}
        {/*      <li className="nav-item">*/}
        {/*        <a href="/login" className="nav-link" onClick={this.logOut}>*/}
        {/*          LogOut*/}
        {/*        </a>*/}
        {/*      </li>*/}
        {/*    </div>*/}
        {/*  ) : (*/}
        {/*    <div className="navbar-nav ml-auto">*/}
        {/*      <li className="nav-item">*/}
        {/*        <Link to={"/login"} className="nav-link">*/}
        {/*          Login*/}
        {/*        </Link>*/}
        {/*      </li>*/}

        {/*      <li className="nav-item">*/}
        {/*        <Link to={"/register"} className="nav-link">*/}
        {/*          Sign Up*/}
        {/*        </Link>*/}
        {/*      </li>*/}

        {/*      <li className="nav-item">*/}
        {/*        <Link to={"/register2"} className="nav-link">*/}
        {/*          Sign Up2*/}
        {/*        </Link>*/}
        {/*      </li>*/}

        {/*      <li className="nav-item">*/}
        {/*        <Link to={"/register3"} className="nav-link">*/}
        {/*          Sign Up3*/}
        {/*        </Link>*/}
        {/*      </li>*/}

        {/*    </div>*/}
        {/*  )}*/}
        {/*</nav>*/}

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login2" element={<Login2 />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register2" element={<Register2 />} />
            <Route path="/register3" element={<Register3 />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/filmy" element={<Filmy url={'http://localhost:8080/filmy'} />} />
            <Route path="/filmy/add" element={<DodajFilm />} />
            <Route path="/filmy/search" element={<SearchFilm />} />
            <Route path="/rezerwacje" element={<Rezerwacje />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
          </Routes>
        </div>

        {/* <AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default App;
