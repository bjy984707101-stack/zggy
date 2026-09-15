create policy "Authenticated can upload site images" on storage.objects for insert to authenticated with check (bucket_id='site-images');
create policy "Authenticated can update site images" on storage.objects for update to authenticated using (bucket_id='site-images') with check (bucket_id='site-images');
create policy "Authenticated can delete site images" on storage.objects for delete to authenticated using (bucket_id='site-images');
create policy "Authenticated can upload property images" on storage.objects for insert to authenticated with check (bucket_id='property-images');
create policy "Authenticated can update property images" on storage.objects for update to authenticated using (bucket_id='property-images') with check (bucket_id='property-images');
create policy "Authenticated can delete property images" on storage.objects for delete to authenticated using (bucket_id='property-images');
