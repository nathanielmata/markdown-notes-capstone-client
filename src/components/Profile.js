import React from 'react';
import MarkdownNotesContext from '../context/NoteContext';

class Profile extends React.Component {
  static contextType = MarkdownNotesContext;

  profileForm = (user) => {
    return (
      <form className="main_profile--form">
        <div className="main__profile--img">
          <img src="/user-pic-greybox.jpg" alt={user.name + "'s user image"} />
        </div>
        <div className="main__profile--details">
          {Object.entries(user).map(([key, val]) => 
            <div>
              <label for={key}>{key}:</label>
              <input type="text" name={key} value={val} />
            </div>
          )}
            <div>
              <label for="password">Password:</label>
              <input type="text" name="password" value="" />
            </div>
            <br />
            <button>Edit</button>
        </div>
      </form>
    );

  }

  render() {
    const id = this.props.match.params.id;
    // ::TODO::
    // need to pass a user context her
    // const user = this.context.getUser(id);
    return (
      <div className="main__profile">
        <div className="main__profile--inner">
          { user === "notfound" 
            ? <h2>User not found.</h2>
            : this.profileForm(user)
          }
        </div>
      </div>
    );
  }
};

export default Profile;