<script lang="ts">
import { defineComponent } from "vue";
import InputText from "./../components/InputText.vue";
import ButtonPrimary from "./../components/ButtonPrimary.vue";
import InputCheckbox from "./../components/InputCheckbox.vue";
import StepsIndicator from "./../components/StepsIndicator.vue";
import { fetchGitHubData } from "./../services/GitHubService";
import { formFields } from "@/constants/fields";
import type {
  IFormField,
  IFormFieldValidator,
  IGitHubData,
} from "@/types/interfaces";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import FinalInfo from "../components/FinalInfo.vue";

export default defineComponent({
  data() {
    return {
      currentStep: 0,
      submitted: false,
      gitHubUserData: null,
      invalids: {} as { [key: string]: string },
      isLoading: false,
      gitHubData: {} as IGitHubData,
      isServerError: false,
      fields: formFields as {
        [key: string]: IFormField;
      },
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
    isInvalidCurrentStep(): boolean {
      let isInvalid = false;
      const steps = this.isLastStep ? this.steps.flat() : this.currentFields;
      steps.forEach((key: string) => {
        this.fields[key].validations.forEach(
          (validator: IFormFieldValidator) => {
            if (!validator.test(this.fields[key].value)) {
              isInvalid = true;
            }
          }
        );
      });
      return isInvalid;
    },
  },
  mounted() {
    this.goToNextStep();
  },
  beforeRouteUpdate(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) {
    if (Number(to.query.step) !== this.currentStep + 1) {
      if (Number(from.query.step) < Number(to.query.step)) {
        this.currentStep++;
      } else if (Number(from.query.step) > Number(to.query.step)) {
        this.currentStep--;
      }
    }
    if (from.query.step === "final") {
      this.submitted = false;
    } else if (to.query.step === "final") {
      this.submitted = true;
    }
    next();
  },

  methods: {
    previousStep() {
      this.invalids = {};
      this.currentStep--;
      this.goToNextStep();
    },
    nextStep() {
      this.validate();
      if (this.isInvalid) return;
      this.currentStep++;
      this.goToNextStep();
    },
    goToNextStep() {
      this.$router.push({
        name: "form",
        query: { step: String(this.currentStep + 1) },
      });
    },
    goToStart() {
      this.currentStep = 1;
      this.goToNextStep();
    },
    submit() {
      this.validate();
      if (this.isInvalid) return;
      this.submitted = true;
      this.fetchGitHubUserData();
      this.$router.push({
        name: "form",
        query: { step: "final" },
      });
    },
    fetchGitHubUserData() {
      this.isLoading = true;
      this.isServerError = false;
      fetchGitHubData(String(this.fields.gitHub.value))
        .then((response: IGitHubData) => (this.gitHubData = response))
        .catch(() => (this.isServerError = true))
        .finally(() => {
          this.isLoading = false;
        });
    },
    validate() {
      this.invalids = {};
      this.currentFields.forEach((key: string) => {
        this.validateField(key);
      });
    },
    validateField(fieldKey: string) {
      this.invalids[fieldKey] = "";
      const field = this.fields[fieldKey];

      field.validations.forEach((validator: IFormFieldValidator) => {
        if (!validator.test(field.value)) {
          this.invalids[fieldKey] = validator.message;
        }
      });
    },
  },
  components: {
    InputText,
    ButtonPrimary,
    InputCheckbox,
    StepsIndicator,
    FinalInfo,
  },
});
</script>

<template>
  <section class="form-wrapper">
    <main class="form-body">
      <div v-if="!submitted">
        <form @submit.prevent="">
          <StepsIndicator
            :total-steps="totalSteps"
            :current-step="currentStep"
          />

          <Transition name="slide-fade">
            <section v-if="isFirstStep" class="welcome-info">
              <h1>Checkout</h1>
              <p>Welcome to simple checkout!</p>
              <p>Please, fill out the form with your data.</p>
            </section>
          </Transition>

          <section v-for="(fieldKeys, step) in steps" :key="step">
            <Transition name="slide-fade">
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
            </Transition>
          </section>
        </form>
      </div>

      <div v-else>
        <div class="welcome-info">
          <div v-if="isLoading"><h3>Loading...</h3></div>
          <template v-else>
            <FinalInfo
              :fields="fields"
              :git-hub-data="gitHubData"
              :is-server-error="isServerError"
            />
            <ButtonPrimary
              v-if="isServerError"
              @on-click="goToStart"
              text="Check data"
            />
          </template>
        </div>
      </div>
    </main>

    <footer v-if="!submitted" class="form-footer">
      <ButtonPrimary v-if="!isFirstStep" @on-click="previousStep" text="Back" />
      <ButtonPrimary
        v-if="!isLastStep"
        @on-click="nextStep"
        text="Next"
        class="form-footer__next-btn"
        :disabled="isInvalidCurrentStep"
      />
      <ButtonPrimary
        v-else
        @on-click="submit"
        :disabled="isInvalidCurrentStep"
        text="Submit"
      />
    </footer>
  </section>
</template>

<style lang="scss">
@import "./../assets/base.scss";

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

  @media (max-width: 900px) {
    height: calc(100vh - 40px);
  }

  @media (max-width: 760px) {
    width: calc(100vw - 20px);
    height: calc(100vh - 60px);
  }
}

.slide-fade-enter-active {
  height: 0;
  transition: all 0.3s ease-in-out;
  transition-delay: 0.1s;
}

.slide-fade-leave-active {
  height: 0;
  transition: all 0.3s ease-in-out;
}

.slide-fade-enter-from {
  transform: translateX(200px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(-200px);
  opacity: 0;
}

.form-body {
  height: 412px;
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
