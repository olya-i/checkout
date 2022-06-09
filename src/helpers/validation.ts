export function validateName(firstName: string) {
  const regExp = /^[a-zA-Z ]{0,100}$/;
  return regExp.test(String(firstName));
}

export function validateGithubUsername(gitHubUsername: string) {
  const regExp = /^[a-zA-Z\d](?:[a-zA-Z\d]|-(?=[a-zA-Z\d])){0,39}$/;
  return regExp.test(String(gitHubUsername));
}

export function validateEmail(email: string): boolean {
  const regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regExp.test(String(email).toLowerCase());
}

export function validateString(value: string): boolean {
  return typeof value === "string" && value?.trim()?.length > 0;
}
