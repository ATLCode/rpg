<template>
  <div class="login-container">
    <input v-model="email" type="email" />
    <input v-model="password" type="password" />
    <button @click="signUp">Register</button>
    <button @click="signIn">Login</button>
    {{ msg }}
  </div>
</template>
<script lang="ts" setup>
const client = useSupabaseClient();
const msg = ref("");
const email = ref("");
const password = ref("");

definePageMeta({ middleware: ["auth"] });

async function signUp() {
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
  }
}
</script>
<style lang="scss" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  max-width: 500px;
}
</style>
