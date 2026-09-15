"use client";
import {useState} from "react";
import {createClient} from "@/lib/supabase";
import Link from "next/link";
export default function PropertyImages({property,images}:{property:any,images:any[]}){
 const[items,setItems]=useState(images);const[msg,setMsg]=useState("");const db=createClient();
 async function add(fs:FileList|null){if(!fs)return;for(const f of Array.from(fs)){try{setMsg("上传中…");const fd=new FormData();fd.append("file",f);fd.append("bucket","property-images");fd.append("prefix",`property-${property.id}`);const res=await fetch("/api/upload",{method:"POST",body:fd});const out=await res.json();if(!res.ok)throw new Error(out.error||"上传失败");const{data,error}=await db.from("property_images").insert({property_id:property.id,image_url:out.url,sort_order:items.length}).select().single();if(error)throw error;if(data)setItems(x=>[...x,data])}catch(e:any){setMsg(e.message);return}}setMsg("图片已保存")}
 async function del(id:number){const{error}=await db.from("property_images").delete().eq("id",id);if(error){setMsg(error.message);return}setItems(x=>x.filter(i=>i.id!==id));setMsg("已删除")}
 return <main className="admin"><header className="adminHead"><div><i>PROPERTY GALLERY</i><h1>{property.title} · 多图管理</h1></div><Link className="outline" href="/admin">返回后台</Link></header><section className="panel"><label className="drop">选择多张房源图片<input type="file" multiple accept="image/*" onChange={e=>add(e.target.files)}/></label><div className="grid3 adminImgs">{items.map((x:any)=><div key={x.id}><img src={x.image_url} alt="房源图片"/><button type="button" className="danger" onClick={()=>del(x.id)}>删除</button></div>)}</div>{msg&&<div className="toast">{msg}</div>}</section></main>
}
