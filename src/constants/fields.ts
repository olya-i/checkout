import { validateEmail, validateString } from "@/helpers/validation";
import type { IFormField } from "@/types/interfaces";

export const formFields: { [key: string]: IFormField } = {
  firstName: {
    label: "First name*",
    value: "",
    type: "text",
    validations: [
      {
        message: "FirstName is a required field",
        test: (value: string | boolean) => validateString(value),
      },
    ],
  },
  lastName: {
    label: "Last name*",
    value: "",
    type: "text",
    validations: [
      {
        message: "LastName is a required field",
        test: (value: string | boolean) => validateString(value),
      },
    ],
  },
  gitHub: {
    label: "GitHub username*",
    value: "",
    type: "text",
    validations: [
      {
        message: "GitHub is a required field",
        test: (value: string | boolean) => validateString(value),
      },
    ],
  },
  email: {
    label: "Email*",
    value: "",
    type: "text",
    validations: [
      {
        message: "Email address not valid",
        test: (value: string | boolean) =>
          typeof value === "string" && validateEmail(value),
      },
      {
        message: "Email is required",
        test: (value: string | boolean) => validateString(value),
      },
    ],
  },
  termsAgreement: {
    label: "Agree to Terms and Services",
    value: false,
    type: "checkbox",
    private: true,
    validations: [
      {
        message: "Agreement is a required field",
        test: (value: string | boolean) => value === true,
      },
    ],
  },
};
