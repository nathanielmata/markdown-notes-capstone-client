import React from 'react';

const MarkdownNotesContext = React.createContext({
  toggleHiddenMenu: () => {},
  getNote: () => {},
  getUser: () => {},
});

export default MarkdownNotesContext;