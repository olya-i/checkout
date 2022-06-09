import ButtonPrimary from "../../../src/components/ButtonPrimary.vue";
import { mount } from "@vue/test-utils";

describe("Mounted ButtonPrimary", () => {
  it("renders correctly", () => {
    const wrapper = mount(ButtonPrimary, {
      props: {
        text: "ButtonName",
        disabled: false,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
