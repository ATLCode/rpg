import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import { Database } from "~/server/database.types";

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const user = await serverSupabaseUser(event);

  if (!user) throw new Error("Unauthorized");
  const body = await readBody(event);

  const { data, error } = await client
    .from("saves")
    .insert({ user_id: user.id, saveData: body.saveData })
    .select();
  if (error) {
    throw new Error("Unable to add save");
  }
  return data[0];
});
