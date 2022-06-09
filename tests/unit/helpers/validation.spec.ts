import {
  validateName,
  validateGithubUsername,
  validateEmail,
  validateString,
} from "../../../src/helpers/validation";

describe("validateName", () => {
  it("should return true when correct name passed in", () => {
    const name = "John";
    expect(validateName(name)).toBe(true);
  });
  it("should return false when wrong name passed in", () => {
    const wrongName = "123";
    expect(validateEmail(wrongName)).toBe(false);
  });
});

describe("validateGithubUsername", () => {
  it("should return true when correct GithubUsername passed in", () => {
    const githubUsername = "john-doe";
    expect(validateGithubUsername(githubUsername)).toBe(true);
  });
  it("should return false when wrong GithubUsername passed in", () => {
    const wrongGithubUsername = "john%doe ";
    expect(validateGithubUsername(wrongGithubUsername)).toBe(false);
  });
});

describe("validateEmail", () => {
  it("should return true when correct email passed in", () => {
    const email = "john.doe@example.com";
    expect(validateEmail(email)).toBe(true);
  });
  it("should return false when wrong email passed in", () => {
    const wrongEmail = "john..example.com@";
    expect(validateEmail(wrongEmail)).toBe(false);
  });
});

describe("validateString", () => {
  it("should return true when correct string passed in", () => {
    const string = "Some string";
    expect(validateString(string)).toBe(true);
  });
  it("should return false when wrong string passed in", () => {
    const wrongString = "";
    expect(validateString(wrongString)).toBe(false);
  });
});
