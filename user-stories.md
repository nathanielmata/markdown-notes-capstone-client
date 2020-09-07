New Note Page
=============  

Action --> 
  ```User clicks "NEW+" button in top right of header```  
Result --> 
  ```User is navigated to a page where they can create and save a new Markdown note, /note/new```

---

Action --> 
  ```User inserts new Markdown into editor```  
Result --> 
  ```User sees parsed HTML output in preview pane```

---

Action --> 
  ```User saves newly created Markdown note```  
Result --> 
  ```User is taken to newly created note url /note/:id```

---

Action --> 
  ```User clicks lock icon```  
Result --> 
  ```Note will be set to whichever public or private state was chosen when saved```

---

Action --> 
  ```User clicks file export icon```  
Result --> 
  ```User is prompted to choose export file type .md or .html before being prompted to save the file to their machine```

---

Action(mobile only) --> 
  ```User clicks editor toggle icon```  
Result --> 
  ```User toggles between viewing the Markdown editor and HTML output preview```

---

Action --> 
  ```User edits new Markdown note title field```  
Result --> 
  ```Title updates based on user input```

---

Edit Note Page
==============  

Action --> 
  ```User removes or inserts Markdown in editor to edit existing note```  
Result --> 
  ```User sees updated parsed HTML output in preview pane```

---

Action --> 
  ```User saves updated Markdown note```  
Result --> 
  ```User is notified that the note has been updated and the page refreshes```

---

Action --> 
  ```User clicks lock icon```  
Result --> 
  ```Note will be set to whichever public or private state was chosen when saved```

---

Action --> 
  ```User clicks file export icon```  
Result --> 
  ```User is prompted to choose export file type .md or .html before being prompted to save the file to their machine```

---

Action(mobile only) --> 
  ```User clicks editor toggle icon```  
Result --> 
  ```User toggles between viewing the Markdown editor and HTML output preview```

---

Action --> 
  ```User edits new Markdown note title field```  
Result --> 
  ```Title updates based on user input```

---

List Notes and Search Bar(Sidebar)
==================================  

Action --> 
  ```User clicks sidebar icon in top left of screen```  
Result --> 
  ```Sidebar opens providing a list of saved Markdown notes and a search bar to find notes```

---

Action --> 
  ```User clicks a note listed in the sidebar```  
Result --> 
  ```User is navigated to the note page at /note/:id for the clicked note where they can review or edit```

---

Action --> 
  ```User enters a search keyword into search bar and submission matches a list of saved notes```  
Result --> 
  ```List below sidebar is repopulated with saved notes that match the search keyword submitted which user can click to navigate to```

---

Action --> 
  ```User enters a search keyword into search bar and submission does not match any saved notes```  
Result --> 
  ```User sees message below search bar saying "Notes matching 'Keyword' not found."```

---

User Dashboard Page
===================  

Action --> 
  ```User navigates to dashboard page by clicking the dashboard link in user dropdown menu in header```  
Result --> 
  ```User sees cards of the 10 latest notes and when they were last edited```

---

Action --> 
  ```User clicks a note card in dashboard```  
Result --> 
  ```User is navigated to the page for the card clicked /note/:id```

---

User Profile Page
=================  

Action --> 
  ```User navigates to profile page by clicking the profile link in user dropdown menu in header```  
Result --> 
  ```User sees profile page with name, email, and date joined```

---

Action --> 
  ```User clicks edit button```  
Result --> 
  ```User is able to edit name, email, or password and submit change then see updated Profile details in page with a notification that profile was updated```

---