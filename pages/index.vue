<template>
  <div class="login-container">
    <div class="login-content">
      <div class="tabs">
        <div class="tab" @click="selectedTab = 'signup'">Register</div>
        <div class="tab" @click="selectedTab = 'signin'">Login</div>
      </div>
      <div v-if="selectedTab === 'signup'" class="signup">
        <AField />
        <AField />
        <AButton @click="signUp">Register</AButton>
      </div>
      <div v-if="selectedTab === 'signin'" class="signin">
        <AField v-model="email" type="email" />
        <AField v-model="password" type="password" />
        <AButton @click="signIn">Login</AButton>
      </div>
      {{ msg }}
    </div>
  </div>
</template>
<script lang="ts" setup>
const client = useSupabaseClient();
const selectedTab = ref("signin");
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
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-content {
    display: flex;
    flex-direction: column;
  }

  .tabs {
    background-color: var(--elevation1);
    display: flex;
    .tab {
      padding: 1rem;
    }
  }
}
</style>
