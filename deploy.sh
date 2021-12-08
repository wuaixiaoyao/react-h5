echo "======= 部署开始 ======"

# 宿主暴露的端口
port=4001
image_name="reacth5"
container_name="$image_name-run"
echo "镜像：$image_name"

# 获取最新的tag
old_tag=`docker images |grep $image_name |awk '{print $2}'|sort -r -n -k1 |head -1`
echo "最新tag: $old_tag"


# 计算出新镜像的tag
new_tag=$(($old_tag+1))
dockerid=`docker ps -a|grep  $container_name |wc -l`
echo $new_tag
echo $container_name

# 构建新镜像
echo "构建新镜像"
docker build -t $image_name:$new_tag -f ./Dockerfile --rm --force-rm .
if [ "$?" == 0 ];then
  echo "构建镜像成功"
else
  echo "构建镜像失败"
  exit
fi

# 查看容器是否存在
if [ "$dockerid" -ne 0 ];then
  echo "停止并删除旧容器"
  docker stop $container_name
  docker rm $container_name
  echo "清理历史镜像"
  docker rmi $image_name:$old_tag
  echo "运行新的镜像"
  docker run -d -p $port:4001 -e RUNTIME_ENV=sit --restart=always --name $container_name $image_name:$new_tag
else
  echo "运行新的镜像 第一次启动$container_name容器"
  docker run -d -p $port:4001 -e RUNTIME_ENV=sit --restart=always --name $container_name $image_name:$new_tag 
fi

# 检查结果
sleep 5
echo "清理无用镜像"
docker images -f "dangling=true" -q
# 是否存在无用悬停镜像
if [ $? == 0 ];then
 docker rmi $(docker images -f "dangling=true" -q)
else 
echo '无需清理'
fl

docker ps |grep  $container_name
echo "部署完毕"


