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
