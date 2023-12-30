import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);

  if (!user) throw new Error("Unauthorized");

  const { data: saves, error } = await client
    .from("saves")
    .select("*")
    .eq("user_id", user.id);
  if (error) {
    throw new Error("unable to load saves");
  }
  return saves;
});
