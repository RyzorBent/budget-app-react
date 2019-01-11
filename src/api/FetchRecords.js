const API_URL = "http://localhost:3005/api/records/";

export async function getRecords() {
  return fetch(API_URL).then(resp => {
    if (!resp.ok) {
      if (resp.status >= 400 && resp.status < 500) {
        return resp.json().then(data => {
          let err = { errorMessage: data.message };
          throw err;
        });
      } else {
        let err = {
          errorMessage: "Please try again later, server not responding"
        };
        throw err;
      }
    }
    return resp.json();
  });
}

export async function createRecord(record) {
  return fetch(API_URL, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({ ...record })
  }).then(resp => {
    if (!resp.ok) {
      if (resp.status >= 400 && resp.status < 500) {
        return resp.json().then(data => {
          let err = { errorMessage: data.message };
          throw err;
        });
      } else {
        let err = {
          errorMessage: "Please try again later, server not responding"
        };
        throw err;
      }
    }
    return resp.json();
  });
}

export async function updateRecords(records) {
  return fetch(API_URL, {
    method: "PUT",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({ ...records })
  }).then(resp => {
    if (!resp.ok) {
      if (resp.status >= 400 && resp.status < 500) {
        return resp.json().then(data => {
          let err = { errorMessage: data.message };
          throw err;
        });
      } else {
        let err = {
          errorMessage: "Update Error, Please try again later, server not responding"
        };
        throw err;
      }
    }
    return resp.json();
  });
}

export async function deleteRecord(id) {
  const delete_URL = API_URL + id;
  fetch(delete_URL, {
    method: "DELETE"
  }).then(resp => {
    if (!resp.ok) {
      if (resp.status >= 400 && resp.status < 500) {
        return resp.json().then(data => {
          let err = { errorMessage: data.message };
          throw err;
        });
      } else {
        let err = {
          errorMessage: "Please try again later, server not responding"
        };
        throw err;
      }
    }
    else return true;
  });
}
