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
import NotFound from "./components/NotFound";
import NoteApiService from "./services/note-api-service";
import USERS from "./seeds/seeds.users";

import "./App.css";

class App extends React.Component {
  static contextType = NoteListContext;

  componentDidMount() {
    this.getNotes();
  }

  updateNote = (noteUpdate) => {
    const notes = this.context.notes.map(note => {
      return note.id === noteUpdate.id
        ? noteUpdate
        : note
    });
    this.context.setNotes(notes);
  }

  addNote = (newNote) => {
    const notes = this.context.getNotes();
    this.context.setNotes([...notes, newNote]);
  }

  getNotes = () => {
    this.context.clearError();
    NoteApiService.getNotes()
      .then((notes) => this.context.setNotes(notes))
      .catch((err) => this.context.setError(err));
  }

  render() {
    return (
      <div className="App">
        <Header user={USERS[2]} />
        <main id="main__container" className="main__container">
          <Switch>

            <Route exact path="/" render={(props) => 
              <PublicRoute 
                {...props}
                component={LandingPage} />
            }/>

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
