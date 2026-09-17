# ---------- 依赖安装 ----------
FROM node:lts-slim AS deps
WORKDIR /app

COPY package*.json ./

# 有 package-lock.json 用 npm ci，没有就退回 npm install
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# ---------- 构建 ----------
FROM node:lts-slim AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 确保 public 目录存在，避免后面 COPY 失败
RUN mkdir -p public

# 关键：必须执行构建，生成 .next
RUN npm run build

# ---------- 运行 ----------
FROM node:lts-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

# 让 Next.js 监听所有网卡和 3000 端口
CMD ["npm", "start", "--", "-H", "0.0.0.0", "-p", "3000"]
