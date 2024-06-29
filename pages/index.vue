<template>
  <div class="login-container">
    <div class="login-content">
      <div class="tabs">
        <div
          class="tab"
          :class="{ active: isRegister }"
          @click="isRegister = true"
        >
          Register
        </div>
        <div
          class="tab"
          :class="{ active: !isRegister }"
          @click="isRegister = false"
        >
          Login
        </div>
      </div>
      <div class="login-form">
        <div v-show="isRegister" class="signup">
          <AField v-model="email" label="Email" />
          <AField v-model="password" label="Password" type="password" />
          <AButton @click="signUp">Register</AButton>
        </div>
        <div v-show="!isRegister" class="signin">
          <AField v-model="email" label="Email" />
          <AField v-model="password" label="Password" type="password" />
          <AButton @click="signIn">Login</AButton>
        </div>
      </div>

      {{ msg }}
    </div>
  </div>
</template>
<script lang="ts" setup>
const client = useSupabaseClient();
const isRegister = ref(false);
const msg = ref("");
const email = ref("");
const password = ref("");

definePageMeta({ middleware: ["auth"] });

async function signUp() {
  console.log("Registering");
  console.log(email.value, password.value);
  const { error } = await client.auth.signUp({
    email: email.value,
    password: password.value,
  });

  if (error) {
    msg.value = error.message;
  } else {
    msg.value = "Success";
  }
}

async function signIn() {
  const { error } = await client.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (error) {
    msg.value = error.message;
  } else {
    msg.value = "Success";
    navigateTo("/saves");
  }
}
</script>
<style lang="scss" scoped>
.login-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-radius: 10px;
    height: 40vh;
    width: 40vw;
    background-color: var(--elevation1);
  }

  .tabs {
    background-color: var(--elevation1);
    display: flex;
    border-radius: 10px;

    .tab {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem;
      border-radius: 10px;
      cursor: pointer;
    }
  }
  .signup {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .signin {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .login-form {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .active {
    background-color: var(--elevation2);
  }
}
</style>
