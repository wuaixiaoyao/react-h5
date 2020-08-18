# step1 使用标准版node构建基础镜像
FROM node:8.12.0
WORKDIR /app
COPY . .

RUN pwd \
  && yarn config set registry https://registry.npm.taobao.org --global \
  && yarn config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/ --global \
  && ls -lnta\
  && yarn

CMD node
