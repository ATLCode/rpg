import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);

  if (!user) throw new Error("Unauthorized");
  const body = await readBody(event);

  const { data: saves, error } = await client
    .from("saves")
    .insert([{ user_id: user.id, saveData: body.saveData }]);
  if (error) {
    throw new Error("Unable to add save");
  }
  return saves;
});
