import InputText from "../../../src/components/InputText.vue";
import { mount } from "@vue/test-utils";

describe("Mounted InputText", () => {
  it("renders correctly", () => {
    const wrapper = mount(InputText, {
      props: {
        label: "Input label",
        name: "input",
        modelValue: "some value",
        isInvalid: false,
        invalidMessage: "Some error",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
