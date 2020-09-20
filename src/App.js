import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import NoteCreate from './components/NoteCreate';
import NoteUpdate from './components/NoteUpdate';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import NotFound from './components/NotFound';
import MarkdownNotesContext from './MarkdownNotesContext';
import NoteApiService from './services/note-api-service';
import USERS from './seeds/seeds.users';

import "./App.css"; 

class App extends React.Component {
  state = {
    notes: [],
    menus: {
      sidebar: false,
      user: false,
    }
  };

  componentDidMount() {
    NoteApiService.getNotes()
      .then(notes => {
        this.setState({ notes })
      });
    document.addEventListener("keydown", this.escKeyPress, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.escKeyPress, false);
  }

  escKeyPress = ({key}) => {
    if (key === "Escape") {
      this.closeMenus();
    }
  }

  closeMenus = () => {
    this.setState((state) => {
      // close menus when a navigation link is clicked
      const menus = {};
      Object.keys(state.menus).forEach((k) => {
        menus[k] = false;
      })
      return {menus};
    });
  }

  toggleHiddenMenu = (name) => {
    this.setState((state) => {
      // toggle the clicked menu and close other menus we are tracking with state
      const menus = {};
      Object.keys(state.menus).forEach((k) => {
        name === k
          ? menus[k] = !this.state.menus[k]
          : menus[k] = false;
      })
      return {menus: {...menus}};
    });
  }

  getUser = (id) => {
    const user = USERS.find(user => user.id === +id);
    return user ? user : "notfound";
  }

  render() {
    const { notes } = this.state;
    const contextValue = {
      toggleHiddenMenu: this.toggleHiddenMenu,
      getUser: this.getUser,
    };

    return (
      <div className="App">
        <BrowserRouter>
          <MarkdownNotesContext.Provider value={contextValue}>
            <Header 
              menus={{ ...this.state.menus }}
              closeMenus={this.closeMenus}
              toggleHiddenMenu={this.toggleHiddenMenu}
              user={USERS[2]} >
                { this.state.menus.sidebar &&
                  <Sidebar 
                    notes={notes}
                    closeMenus={this.closeMenus} />
                }
            </Header>
            <main className="main--container">   
              <Switch>
                <Route exact path="/" render={(props) => 
                  <Dashboard notes={notes} {...props} />
                }/>
                <Route exact path="/profile/:id" component={Profile}/>
                <Route exact path="/note/new" component={NoteCreate} />
                <Route path="/note/:id" component={NoteUpdate}/>
                <Route component={NotFound} />
              </Switch>  
            </main>
            {/* <footer>Contact details</footer> */}
          </MarkdownNotesContext.Provider>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
