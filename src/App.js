import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import NoteCreate from './components/NoteCreate';
import NoteUpdate from './components/NoteUpdate';
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
    const note = NOTES.find(note => note.id === +id);
    return note ? note : "notfound";
  }

  render() {
    const full_name = {name: "Nathaniel Mata"}
    const { sidebar, user } = {...this.state.menus}
    const contextValue = {
      getNote: this.getNote,
    };

    return (
      <div className="App">      
          <Header 
            menus={{ sidebar, user }}
            toggleHiddenMenu={this.toggleHiddenMenu}
            user={full_name} >
              { this.state.menus.sidebar &&
                <Sidebar 
                  notes={NOTES}
                  toggleHiddenMenu={this.toggleHiddenMenu} />
              }
          </Header>
          <main className="main--container">
            <BrowserRouter>
              <MarkdownNotesContext.Provider value={contextValue}>
                <Switch>
                  {/* <Route exact path="/" component={Dashboard}/>
                  <Route exact path="/profile/:id" component={Profile}/> */}
                  <Route exact path="/note/new" component={NoteCreate} />
                  <Route path="/note/:id" component={NoteUpdate}/>
                  <Route component={NotFound} />
                </Switch>
              </MarkdownNotesContext.Provider>
            </BrowserRouter>
          </main>
          {/* <footer>Contact details</footer> */}
      </div>
    );
  }
}

export default App;
