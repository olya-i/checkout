import StepsIndicator from "../../../src/components/StepsIndicator.vue";
import { mount } from "@vue/test-utils";

describe("Mounted StepsIndicator", () => {
  it("renders correctly", () => {
    const wrapper = mount(StepsIndicator, {
      props: {
        totalSteps: 3,
        currentStep: 2,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
