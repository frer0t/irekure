import { redirect } from "next/navigation";

import { createClientServer } from "@/lib/supabase/server";

export default async function Dashboard() {
  const supabase = await createClientServer();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return <p>Hello {data.user.email}</p>;
}
