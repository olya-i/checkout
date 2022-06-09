import { mockFields, mockGitHubData } from "../../utils/__mocks__";
import FinalInfo from "../../../src/components/FinalInfo.vue";
import { mount } from "@vue/test-utils";

describe("Mounted FinalInfo", () => {
  it("renders correctly", () => {
    const wrapper = mount(FinalInfo, {
      props: {
        fields: mockFields,
        gitHubData: mockGitHubData,
        isServerError: false,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
