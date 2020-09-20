import config from "../config";

const NoteApiService = {
  getNotes() {
    return fetch(`${config.API_ENDPOINT}/notes`, {
      headers: {
      },
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
    .catch(err => console.log(err))
  },
  getNote(id) {
    return fetch(`${config.API_ENDPOINT}/notes/${id}`, {
      headers: {
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
};

export default NoteApiService;
