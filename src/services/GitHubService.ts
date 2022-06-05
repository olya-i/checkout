const GIT_HUB_USERS_URL = "https://api.github.com/users";

export function fetchGitHubData(username: string) {
  return fetch(`${GIT_HUB_USERS_URL}/${username}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  });
}
