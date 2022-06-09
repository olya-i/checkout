import InputCheckbox from "../../../src/components/InputCheckbox.vue";
import { mount } from "@vue/test-utils";

describe("Mounted InputCheckbox", () => {
  it("renders correctly", () => {
    const wrapper = mount(InputCheckbox, {
      props: {
        label: "Checkbox label",
        name: "checkbox",
        modelValue: false,
        isInvalid: false,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
