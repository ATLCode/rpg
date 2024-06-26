import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import { Database } from "~/server/database.types";

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const user = await serverSupabaseUser(event);

  if (!user) throw new Error("Unauthorized");

  const { data: saves, error } = await client
    .from("saves")
    .select("*")
    .eq("user_id", user.id);
  if (error) {
    throw new Error("Unable to load user saves");
  }
  return saves;
});
