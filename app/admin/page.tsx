import {createServerSupabaseClient} from "@/lib/server";
import AdminPanel from "@/components/AdminPanel";
export const dynamic="force-dynamic";
export default async function Page(){
 const s=await createServerSupabaseClient();
 const [{data:site},{data:ps},{data:leads}]=await Promise.all([
   s.from("site_settings").select("*").eq("id",1).maybeSingle(),
   s.from("properties").select("*").order("sort_order"),
   s.from("leads").select("*, properties(title)").order("created_at",{ascending:false})
 ]);
 return <AdminPanel site={site||{}} properties={ps||[]} leads={leads||[]}/>;
}
