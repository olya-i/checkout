import { formFields } from "../../src/constants/fields";

declare global {
  function fetch(): void;
}

export const fetchMock = (isOk: boolean, response: object) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: isOk,
      json: () => Promise.resolve(response),
    })
  ) as jest.Mock;
};

export const resetFields = () => {
  for (const fieldKey in formFields) {
    formFields[fieldKey].value =
      formFields[fieldKey].type === "text" ? "" : false;
  }
};

const mockRouter = {
  push: jest.fn(),
};

export const componentOptions = {
  global: {
    mocks: {
      $route: {},
      $router: mockRouter,
    },
  },
};

export const mockFields = {
  firstName: {
    label: "First name*",
    value: "Some name",
    type: "text",
    validations: [
      {
        message: "FirstName is a required field",
        test: (value: string | boolean) => String(value).length > 0,
      },
    ],
  },
  lastName: {
    label: "Last name*",
    value: "Some Last name",
    type: "text",
    validations: [
      {
        message: "LastName is a required field",
        test: (value: string | boolean) => String(value).length > 0,
      },
    ],
  },
};

export const mockGitHubData = {
  avatar_url: "https://example.com/",
};
