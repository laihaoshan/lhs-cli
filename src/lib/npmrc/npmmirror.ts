/**淘宝镜像配置 */
export const npmrcOption = `
registry=https://registry.npmmirror.com/
# 如有私有库，如需配置地址及权限执行命令echo -n 'username:password' | base64
# 生成之后配置到下面权限上
always-auth=true
//私有库地址/:_auth=权限
shamefully-hoist=true`;
