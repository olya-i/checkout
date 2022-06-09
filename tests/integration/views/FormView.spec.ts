import {
  resetFields,
  componentOptions,
  fetchMock,
} from "./../../utils/__mocks__";
import {
  render,
  fireEvent,
  waitFor,
  type ByRoleOptions,
} from "@testing-library/vue";
import FormView from "../../../src/views/FormView.vue";

function gitHubServiceFoundMock() {
  fetchMock(true, {
    avatar_url: "http://example.com/avatar.png",
  });
}

function gitHubServiceNotFoundMock() {
  fetchMock(false, {
    message: "Not Found",
  });
}

const fillValidForm = async (
  getByText: (value: string) => HTMLElement,
  getByLabelText: (value: string) => HTMLElement,
  getByRole: (value: string, args: ByRoleOptions) => HTMLElement
) => {
  // step 1
  getByText("Checkout");

  const nextButton = getByRole("button", { name: "Next" });

  await fireEvent.click(nextButton);

  // step 2
  getByLabelText("First name*");
  const firstNameField = getByRole("textbox", {
    name: "First name*",
  });
  await fireEvent.update(firstNameField, "John");

  getByLabelText("Last name*");
  const lastNameField = getByRole("textbox", {
    name: "Last name*",
  });

  await fireEvent.update(lastNameField, "Doe");

  getByLabelText("GitHub username*");
  const gitHubUsernameField = getByRole("textbox", {
    name: "GitHub username*",
  });
  await fireEvent.update(gitHubUsernameField, "john-doe");

  await fireEvent.click(nextButton);

  // step 3
  getByLabelText("Email*");
  const emailField = getByRole("textbox", {
    name: "Email*",
  });

  await fireEvent.update(emailField, "john.doe@example.com");

  const agreementCheckBox = getByRole("checkbox", {
    name: "Agree to Terms and Services",
  });
  await fireEvent.click(agreementCheckBox);
};

const fillAndSubmitValidForm = async (
  getByText: (value: string) => HTMLElement,
  getByLabelText: (value: string) => HTMLElement,
  getByRole: (value: string, args: ByRoleOptions) => HTMLElement
) => {
  await fillValidForm(getByText, getByLabelText, getByRole);

  await fireEvent.click(getByRole("button", { name: "Submit" }));
};

describe("Full scenario", () => {
  it("should show avatar when valid form and user found", async () => {
    gitHubServiceFoundMock();

    const { getByText, getByLabelText, getByRole } = render(
      FormView,
      componentOptions
    );

    await fillAndSubmitValidForm(getByText, getByLabelText, getByRole);

    // final page - success
    await waitFor(() => getByRole("heading", { level: 1 }));

    getByText("Success!");

    getByText("John");
    getByText("Doe");
    getByText("john-doe");
    getByText("john.doe@example.com");

    expect(getByRole("img")).toHaveAttribute(
      "src",
      "http://example.com/avatar.png"
    );
  });

  it("shouldn't show avatar when valid form and user not found", async () => {
    gitHubServiceNotFoundMock();

    const { getByText, getByLabelText, getByRole } = render(
      FormView,
      componentOptions
    );

    await fillAndSubmitValidForm(getByText, getByLabelText, getByRole);

    // final page - fail
    await waitFor(() => {
      getByText("Something went wrong, please check your data");
    });
  });
});

describe("Step 2 validations", () => {
  const cases = [
    ["", "Doe", "john-doe"],
    ["John", "", "john-doe"],
    ["John", "Doe", ""],
    ["123", "Doe", "john-doe"],
    ["John", "123", "john-doe"],
    ["John", "Doe", "%%%%-doe"],
  ];
  it.each(cases)(
    "Should show invalid form state due to invalid fields",
    async (
      firstNameText: string,
      lastNameText: string,
      gitHubUsernameText: string
    ) => {
      const { getByText, getByLabelText, getByRole } = render(
        FormView,
        componentOptions
      );

      // step 1
      getByText("Checkout");

      const nextButton = getByRole("button", { name: "Next" });

      await fireEvent.click(nextButton);

      // step 2
      getByLabelText("GitHub username*");
      const firstNameField = getByRole("textbox", {
        name: "First name*",
      });
      await fireEvent.update(firstNameField, firstNameText);

      getByLabelText("Last name*");
      const lastNameField = getByRole("textbox", {
        name: "Last name*",
      });

      await fireEvent.update(lastNameField, lastNameText);

      getByLabelText("GitHub username*");
      const gitHubUsernameField = getByRole("textbox", {
        name: "GitHub username*",
      });
      await fireEvent.update(gitHubUsernameField, gitHubUsernameText);

      expect(nextButton).toBeDisabled();
    }
  );
});

describe("Step 3 validations", () => {
  const cases = [
    ["john..example.com@", true],
    ["john.doe@example.com", false],
  ];
  it.each(cases)(
    "Should show invalid form state due to invalid fields",
    async (emailText, agreementCheckBoxState) => {
      const { getByText, getByLabelText, getByRole } = render(
        FormView,
        componentOptions
      );

      // step 1
      getByText("Checkout");

      const nextButton = getByRole("button", { name: "Next" });

      await fireEvent.click(nextButton);

      // step 2
      getByLabelText("GitHub username*");
      const firstNameField = getByRole("textbox", {
        name: "First name*",
      });
      await fireEvent.update(firstNameField, "John");

      getByLabelText("Last name*");
      const lastNameField = getByRole("textbox", {
        name: "Last name*",
      });

      await fireEvent.update(lastNameField, "Doe");

      getByLabelText("GitHub username*");
      const gitHubUsernameField = getByRole("textbox", {
        name: "GitHub username*",
      });
      await fireEvent.update(gitHubUsernameField, "john-doe");

      await fireEvent.click(nextButton);

      // step 3
      getByLabelText("Email*");
      const emailField = getByRole("textbox", {
        name: "Email*",
      });

      await fireEvent.update(emailField, emailText as string);

      const agreementCheckBox = getByRole("checkbox", {
        name: "Agree to Terms and Services",
      });

      if (agreementCheckBoxState) {
        await fireEvent.click(agreementCheckBox);
      }

      const submitButton = getByRole("button", { name: "Submit" });

      expect(submitButton).toBeDisabled();
    }
  );
});

describe("Back button functionality", () => {
  it("Should return to the starting page", async () => {
    const { getByText, getByLabelText, getByRole } = render(
      FormView,
      componentOptions
    );

    await fillValidForm(getByText, getByLabelText, getByRole);

    let backButton = getByRole("button", { name: "Back" });

    await fireEvent.click(backButton);

    // step 2
    getByLabelText("First name*");

    backButton = getByRole("button", { name: "Back" });

    await fireEvent.click(backButton);

    // step 1
    getByText("Checkout");
  });
});

afterEach(() => {
  resetFields();
  jest.restoreAllMocks();
});
