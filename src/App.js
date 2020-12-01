import React from "react";
import { Switch, Route } from "react-router-dom";
import NoteListContext from "./context/NoteListContext";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import LandingPage from "./routes/LandingPage";
import Header from "./components/Header";
import LoginPage from "./routes/LoginPage";
import NoteCreate from "./components/NoteCreate";
import NoteUpdate from "./components/NoteUpdate";
import Dashboard from "./components/Dashboard";
import HowToPage from "./routes/HowToPage";
import NotFound from "./components/NotFound";


import "./App.css";

class App extends React.Component {
  static contextType = NoteListContext;

  addNote = (newNote) => {
    const notes = this.context.getNotes();
    this.context.setNotes([...notes, newNote]);
  }

  updateNote = (noteUpdate) => {
    const notes = this.context.notes.map(note => {
      return note.id === noteUpdate.id
        ? noteUpdate
        : note
    });
    this.context.setNotes(notes);
  }

  deleteNote = (id) => {
    const notes = this.context.notes.filter(note => note.id !== +id);
    this.context.setNotes(notes);
  }

  render() {
    return (
      <div className="App">
        <Header />
        <main id="main__container" className="main__container">
          <Switch>

            <Route exact path="/" render={(props) => 
              <PublicRoute 
                {...props}
                component={LandingPage} />
            }/>

            <Route exact path="/how-to"component={HowToPage} />
            <Route path="/login" component={LoginPage} />

            <Route exact path="/dashboard" render={(props) => 
              <PrivateRoute
                {...props}
                component={Dashboard} />
            }/>
            
            <Route exact path="/note/new" render={(props) => 
              <PrivateRoute
                {...props}
                addNote={this.addNote}
                component={NoteCreate} />
            }/>

            <Route path="/note/:id" render={(props) => 
              <PrivateRoute
                {...props}
                updateNote={this.updateNote}
                deleteNote={this.deleteNote}
                component={NoteUpdate} />
            }/>

            <Route component={NotFound} />

          </Switch>
        </main>
        {/* <footer>Contact details</footer> */}
      </div>
    );
  }
}

export default App;
