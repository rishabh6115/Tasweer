export function requestGetUser(d) {
  const data = JSON.stringify({
    name: d.name,
    email: d.email,
    password: d.password,
  });
  return fetch(`${process.env.REACT_APP_BACKEND}/api/user`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: data,
  });
}

export function requestLoggedUser() {
  return fetch(`${process.env.REACT_APP_BACKEND}/api/user`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

// export const requestLogout = () => {
//   return fetch(`${process.env.REACT_APP_BACKEND}/api/user/logout`, {
//     method: "GET",
//   });
// };

export const requestLogin = (d) => {
  const data = JSON.stringify({
    email: d.email,
    password: d.password,
  });
  return fetch(`${process.env.REACT_APP_BACKEND}/api/user/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: data,
  });
};
