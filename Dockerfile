# 构建基础镜像
FROM node:12-alpine AS base

ENV PORT=4001 APP_PATH=/app

# 工作目录 app
WORKDIR  $APP_PATH

# 使用基础镜像 装依赖阶段
FROM base AS install

# 拷贝 package.json 到工作跟目录下
COPY package.json ./

# 安装依赖 build 时执行
RUN yarn

# 最终阶段，也就是输出的镜像是这个阶段构建的，前面的阶段都是为这个阶段做铺垫
FROM base

# 拷贝 装依赖阶段 生成的 node_modules 文件夹到工作目录下
COPY --from=install $APP_PATH/node_modules ./node_modules

# 将当前目录下的所有文件（除了.dockerignore排除的路径），都拷贝进入镜像的工作目录下
COPY . .

RUN yarn build

EXPOSE $PORT
# run 时执行 
CMD ["node", "app.js"]