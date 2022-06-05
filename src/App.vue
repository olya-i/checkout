<script lang="ts">
// import { RouterLink, RouterView } from 'vue-router'

import { defineComponent } from "vue";
import TextInput from "./components/TextInput.vue";
import { validateEmail } from "./helpers/validation";

// import HelloWorld from '@/components/HelloWorld.vue'
export default defineComponent({
  data() {
    return {
      currentStep: 0,
      submitted: false,
      invalids: {} as any,
      fields: {
        firstName: {
          label: "firstName",
          value: "",
          validations: [
            {
              message: "FirstName is a required field",
              test: (value: string) => value.length,
            },
          ],
        },
        lastName: {
          label: "lastName",
          value: "",
          validations: [
            {
              message: "LastName is a required field",
              test: (value: string) => value.length,
            },
          ],
        },
        gitHub: {
          label: "GitHub username ",
          value: "",
          validations: [
            {
              message: "GitHub is a required field",
              test: (value: string) => value.length,
            },
          ],
        },
        email: {
          label: "email",
          value: "",
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
          value: "",
          validations: [
            {
              message: "Agreement is a required field",
              test: (value: boolean) => value === true,
            },
          ],
        },
      } as any,
      steps: [
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
      console.log(this.isInvalid)
      console.log(this.invalids)
      if (this.isInvalid) return;
      this.currentStep++;
    },
    submit() {
      this.validate();
      if (this.isInvalid) return;
      this.submitted = true;
      console.log("doing submit", this.fields);
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
  components: { TextInput },
});
</script>

<template>
  <div>
    <h1>Checkout</h1>
    <p>Welcome to simple checkout. Please, fill out the form with your data.</p>

    <div v-if="!submitted">
      <form @submit.prevent="">
        <div>
          <div
            v-for="step in totalSteps"
            :key="step"
            style="width: 4px; height: 3px; background-color: red"
            :class="{ bg: step - 1 <= currentStep }"
          ></div>
        </div>

        <div v-for="(fieldKeys, step) in steps" :key="step">
          <div v-if="currentStep === step">
            <div v-for="field in fieldKeys" :key="field">
              <div>
                <TextInput
                  :label="fields[field].label"
                  :name="field"
                  v-model="fields[field].value"
                  :is-invalid="!!invalids[field]"
                  :invalid-message="invalids[field]"
                  @validate="() => validateField(field)"
                />
              </div>
            </div>
          </div>
        </div>

        <footer>
          <button v-if="!isFirstStep" @click.prevent="previousStep">
            Previous
          </button>
          <button v-if="!isLastStep" @click="nextStep">Next</button>
          <button v-if="isLastStep" @click.prevent="submit">Submit</button>
        </footer>
      </form>
    </div>

    <div v-else>
      <h3>Hi {{ fields.firstName.value }}, thanks!</h3>
    </div>
  </div>

  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->

  <!-- <RouterView /> -->
</template>

<style>
@import "@/assets/base.css";

#app {
  max-width: 1280px;
  margin: 0 auto;
}

.bg {
  background-color: aqua !important;
}

/* #app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
