import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import NoteCreate from './components/NoteCreate';
import NoteUpdate from './components/NoteUpdate';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';
import MarkdownNotesContext from './MarkdownNotesContext';
import NOTES from './seeds/seeds.notes';

import "./App.css"; 

class App extends React.Component {
  state = {
    menus: {
      sidebar: false,
      user: false,
    }
  };

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

  getNote = (id) => {
    // this.toggleHiddenMenu("sidebar");
    const note = NOTES.find(note => note.id === +id);
    return note ? note : "notfound";
  }

  render() {
    const full_name = {name: "Nathaniel Mata"}
    const { sidebar, user } = {...this.state.menus}
    const contextValue = {
      toggleHiddenMenu: this.toggleHiddenMenu,
      getNote: this.getNote,
    };

    return (
      <div className="App">   
        <BrowserRouter>
          <Header 
            menus={{ sidebar, user }}
            closeMenus={this.closeMenus}
            toggleHiddenMenu={this.toggleHiddenMenu}
            user={full_name} >
              { this.state.menus.sidebar &&
                <Sidebar 
                  notes={NOTES}
                  closeMenus={this.closeMenus} />
              }
          </Header>
          <main className="main--container">
              <MarkdownNotesContext.Provider value={contextValue}>
                <Switch>
                  <Route exact path="/" component={Dashboard}/>
                  {/* <Route exact path="/profile/:id" component={Profile}/> */}
                  <Route exact path="/note/new" component={NoteCreate} />
                  <Route path="/note/:id" component={NoteUpdate}/>
                  <Route component={NotFound} />
                </Switch>
              </MarkdownNotesContext.Provider>
          </main>
          {/* <footer>Contact details</footer> */}
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
