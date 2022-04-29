<template>
  <v-container fill-height mt-n5>
    <v-layout justify-center align-center>
      <v-card class="elevation-8" width="50%" color="secondary">
        <v-toolbar dark color="primary">
          <v-toolbar-title
            >{{
              isRegister ? stateObj.register.name : stateObj.login.name
            }}
            form</v-toolbar-title
          >
        </v-toolbar>
        <v-card-text>
          <form ref="form" @submit.prevent="isRegister ? register() : login()">
            <v-text-field
              v-model="username"
              name="username"
              label="Username"
              type="email"
              placeholder="username"
              required
            ></v-text-field>

            <v-text-field
              v-model="password"
              name="password"
              label="Password"
              type="password"
              placeholder="password"
              required
              @keyup="passwordLengthValidation"
            ></v-text-field>

            <v-text-field
              v-if="isRegister"
              v-model="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="confirm password"
              required
            ></v-text-field>
            <div class="red--text">{{ errorMessage }}</div>
            <v-btn
              type="submit"
              @click="loginOrRegister"
              class="mt-4"
              color="primary"
              value="log in"
              >{{
                isRegister ? stateObj.register.name : stateObj.login.name
              }}</v-btn
            >
            <div class="grey--text mt-4" @click="isRegister = !isRegister">
              {{ toggleMessage }}
            </div>
          </form>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import VueRouter from "../router/index";
// import axios from "axios";
export default {
  name: "LoginB",
  data() {
    return {
      logCheck: null,
      formValidated: true,
      username: "",
      password: "",
      confirmPassword: "",
      isRegister: false,
      errorMessage: "",
      stateObj: {
        register: {
          name: "Register",
          message: "Aleady have an Account? login.",
        },
        login: {
          name: "Login",
          message: "Register",
        },
      },
    };
  },
  methods: {
    login() {
      const { username } = this;
      console.log(username + "logged in");
    },
    register() {
      if (this.password == this.confirmPassword) {
        this.isRegister = false;
        this.errorMessage = "";
        // this.$refs.form.reset();
      } else {
        this.errorMessage = "password did not match";
      }
    },
    passwordLengthValidation() {
      if (this.password?.length < 6 && this.password?.length > 0) {
        this.errorMessage = "password not long enough";
        return false;
      } else {
        this.errorMessage = "";
        return true;
      }
    },
    async loginOrRegister() {
      if (this.passwordLengthValidation()) {
        let data = { email: this.username, password: this.password };
        try {
          await this.$store.dispatch("login", data);
          this.errorMessage = "login successful";
          const router = VueRouter;
          setTimeout(() => {
            router.push({ path: "/DashBoard" });
          }, 500);
        } catch (e) {
          this.errorMessage = "invalid credentials";
          this.username = "";
          this.password = "";
        }
      }
    },
  },
  computed: {
    toggleMessage: function () {
      return this.isRegister
        ? this.stateObj.register.message
        : this.stateObj.login.message;
    },
  },
};
</script>