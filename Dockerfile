# 分阶段构建，第一阶段
FROM node:lts as builder
WORKDIR /app/kubmanager-web
# 拷贝源码
COPY . .
# 安装依赖
RUN npm install --registry=https://registry.npm.taobao.org
# 开始构建
RUN npm run build:prod

# 第二阶段
FROM nginx:alpine
COPY --from=builder /app/kubmanager-web/dist/ /usr/share/nginx/html/
COPY --from=builder /app/kubmanager-web/default.conf.template /etc/nginx/template/default.conf.template
EXPOSE 80
