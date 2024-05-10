import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import { Database } from "~/server/database.types";

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const user = await serverSupabaseUser(event);

  if (!user) throw new Error("Unauthorized");
  const body = await readBody(event);

  const { error } = await client
    .from("saves")
    .delete()
    .eq("id", body.saveId);

  if (error) {
    throw new Error("Unable to delete save");
  }
});
