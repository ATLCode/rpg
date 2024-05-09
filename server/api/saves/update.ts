import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import { Database } from "~/server/database.types";

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const user = await serverSupabaseUser(event);

  if (!user) throw new Error("Unauthorized");
  const { saveId, saveData } = await readBody(event);

  if (!saveId) {
    throw new Error("Unable to update save data: 'saveId' is missing");
  }

  const { data: saves, error } = await client
    .from("saves")
    .update({ saveData })
    .eq("id", saveId)
    .select();
  if (error) {
    throw new Error(`Unable to update save. Error: ${JSON.stringify(error)}`);
  }
  return saves;
});
