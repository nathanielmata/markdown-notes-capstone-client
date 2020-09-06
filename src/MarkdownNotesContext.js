import React from 'react';

const MarkdownNotesContext = React.createContext({
  toggleHiddenMenu: () => {},
  getNote: () => {},
});

export default MarkdownNotesContext;