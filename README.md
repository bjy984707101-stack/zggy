# 中国工艺大厦招商官网 V3

这版为 Next.js + Supabase + Vercel 公网版。

已实现：
- 首页大图、项目图1/2/3、地理位置图可后台独立上传/替换
- 可租房源增删改、上下架
- 房源独立详情页
- 每套房源多图上传/删除
- 管理员登录
- 客户预约线索写入 Supabase

部署：复制 .env.local.example 为 .env.local，填写 Supabase anon key；GitHub 导入 Vercel 时添加同名环境变量。

后台：/admin

## V4 修复说明
- 图片上传改为管理员登录后的服务器接口，避免浏览器直接 Storage 上传触发 RLS。
- 可租房源增加封面图上传，并明确“上传后点击保存”流程。
- 管理后台新增“客户咨询”列表，可查看姓名、电话、公司、房源、需求和时间。
- 客户咨询改为服务器接口提交。
- 新增 `supabase-v4-fix.sql`，用于补齐管理员查看/管理 leads 与 property_images 的 RLS。
