import React from 'react';

const MarkdownNotesContext = React.createContext({
  toggleHiddenMenu: () => {},
  getUser: () => {},
});

export default MarkdownNotesContext;