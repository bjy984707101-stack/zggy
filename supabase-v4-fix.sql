-- 确保管理员可以管理网站数据、房源图片和客户咨询。
-- 请在 Supabase SQL Editor 执行一次。

create policy "authenticated_read_leads_v4"
on public.leads for select to authenticated using (true);

create policy "authenticated_update_leads_v4"
on public.leads for update to authenticated using (true) with check (true);

create policy "authenticated_delete_leads_v4"
on public.leads for delete to authenticated using (true);

create policy "authenticated_read_property_images_v4"
on public.property_images for select to authenticated using (true);

create policy "authenticated_insert_property_images_v4"
on public.property_images for insert to authenticated with check (true);

create policy "authenticated_delete_property_images_v4"
on public.property_images for delete to authenticated using (true);
