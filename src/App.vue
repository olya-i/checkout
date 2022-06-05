<script lang="ts">
// import { RouterLink, RouterView } from 'vue-router'

import { defineComponent } from "vue";
import InputText from "./components/InputText.vue";
import { validateEmail } from "./helpers/validation";
import ButtonPrimary from "./components/ButtonPrimary.vue";
import InputCheckbox from "./components/InputCheckbox.vue";
import StepsIndicator from "./components/StepsIndicator.vue";
import { fetchGitHubData } from "./services/GitHubService";
import SuccessView from "./views/SuccessView.vue";

export default defineComponent({
  data() {
    return {
      currentStep: 0,
      submitted: false,
      gitHubUserData: null,
      invalids: {} as any,
      isLoading: false,
      gitHubData: {},
      fields: {
        firstName: {
          label: "First name",
          value: "",
          type: "text",
          validations: [
            {
              message: "FirstName is a required field",
              test: (value: string) => value.length,
            },
          ],
        },
        lastName: {
          label: "Last name",
          value: "",
          type: "text",
          validations: [
            {
              message: "LastName is a required field",
              test: (value: string) => value.length,
            },
          ],
        },
        gitHub: {
          label: "GitHub username",
          value: "",
          type: "text",
          validations: [
            {
              message: "GitHub is a required field",
              test: (value: string) => value.length,
            },
          ],
        },
        email: {
          label: "Email",
          value: "",
          type: "text",
          validations: [
            {
              message: "Email address not valid",
              test: (value: string) => validateEmail(value),
            },
            {
              message: "Email is required",
              test: (value: string) => value.length,
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
              test: (value: boolean) => value === true,
            },
          ],
        },
      } as any,
      steps: [
        [],
        ["firstName", "lastName", "gitHub"],
        ["email", "termsAgreement"],
      ],
    };
  },
  computed: {
    totalSteps(): number {
      return this.steps.length;
    },
    isFirstStep(): boolean {
      return this.currentStep === 0;
    },
    isLastStep(): boolean {
      return this.currentStep === this.totalSteps - 1;
    },
    isInvalid(): boolean {
      return !!Object.values(this.invalids).filter((key) => key).length;
    },
    currentFields(): string[] {
      return this.steps[this.currentStep];
    },
  },

  methods: {
    previousStep() {
      this.invalids = {};
      this.currentStep--;
    },
    nextStep() {
      this.validate();
      if (this.isInvalid) return;
      this.currentStep++;
    },
    submit() {
      this.validate();
      if (this.isInvalid) return;
      this.submitted = true;
      this.fetchGitHubUserData();
      console.log("doing submit", this.fields);
    },
    fetchGitHubUserData() {
      this.isLoading = true;
      fetchGitHubData(this.fields.gitHub.value)
        .then((res) => (this.gitHubData = res))
        .catch((err) => console.log(err))
        .finally(() => (this.isLoading = false));
    },
    validate() {
      this.invalids = {};
      this.currentFields.forEach((key) => {
        this.validateField(key);
      });
    },
    validateField(fieldKey: string) {
      this.invalids[fieldKey] = "";
      const field = this.fields[fieldKey];

      field.validations.forEach((validation: any) => {
        if (!validation.test(field.value)) {
          this.invalids[fieldKey] = validation.message;
        }
      });
    },
  },
  components: {
    InputText,
    ButtonPrimary,
    InputCheckbox,
    StepsIndicator,
    SuccessView,
},
});
</script>

<template>
  <section class="form-wrapper">
    <div class="form-body">
      <div v-if="!submitted">
        <form @submit.prevent="">
          <StepsIndicator
            :total-steps="totalSteps"
            :current-step="currentStep"
          />

          <div v-if="isFirstStep" class="welcome-info">
            <h1>Checkout</h1>
            <p>Welcome to simple checkout!</p>
            <p>Please, fill out the form with your data.</p>
          </div>

          <div v-for="(fieldKeys, step) in steps" :key="step">
            <div v-if="currentStep === step">
              <div v-for="field in fieldKeys" :key="field">
                <div>
                  <InputText
                    v-if="fields[field].type === 'text'"
                    :label="fields[field].label"
                    :name="field"
                    v-model="fields[field].value"
                    :is-invalid="!!invalids[field]"
                    :invalid-message="invalids[field]"
                    @validate="() => validateField(field)"
                  />
                  <InputCheckbox
                    v-if="fields[field].type === 'checkbox'"
                    :label="fields[field].label"
                    :name="field"
                    v-model="fields[field].value"
                    :is-invalid="!!invalids[field]"
                    @validate="() => validateField(field)"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div v-else>
        <div class="welcome-info">
          <div v-if="isLoading"><h3>Loading...</h3></div>
          <SuccessView v-else :fields="fields" :git-hub-data="gitHubData" />
        </div>
      </div>
    </div>

    <footer v-if="!submitted" class="form-footer">
      <ButtonPrimary v-if="!isFirstStep" @on-click="previousStep" text="Back" />
      <ButtonPrimary
        v-if="!isLastStep"
        @on-click="nextStep"
        text="Next"
        class="form-footer__next-btn"
      />
      <ButtonPrimary v-if="isLastStep" @on-click="submit" text="Submit" />
    </footer>
  </section>
</template>

<style lang="scss">
@import "@/assets/base.scss";

.form-wrapper {
  width: 720px;
  padding: 40px;
  height: calc(100vh - 160px);
  border: 1px solid var(--gray);
  border-radius: var(--border-radius);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: scroll;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.welcome-info {
  text-align: center;
}

.form-footer {
  display: flex;
  justify-content: space-between;

  &__next-btn {
    margin-left: auto;
  }
}
</style>
