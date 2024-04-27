export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser();

  if (nonAuthPaths.includes(to.path) && user.value) {
    console.log(user.value);
    return navigateTo("/saves");
  } else if (!nonAuthPaths.includes(to.path) && !user.value) {
    return navigateTo("/");
  }
});

const nonAuthPaths = ["/"];
