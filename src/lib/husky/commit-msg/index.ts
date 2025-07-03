/**默认写入配置 */
const msg = 'commit_msg=`cat $1`';
export const writePreCommitDefault = `#!/usr/bin/env sh\n
# 用 飘号键 可以将命令的输出结果复制给变量
# 获取当前提交的 commit msg
${msg}

# 获取用户 email
email=$(git config user.email)
msg_re="^(feat|fix|docs|style|refactor|del|perf|test|workflow|build|ci|chore|release|workflow): .{1,200}[^[:punct:]]$"
merge_re="^Merge branch.{0,200}$"
revert_re="^Revert.{0,200}$"

if [[ ! $commit_msg =~ $msg_re && ! ($commit_msg =~ $merge_re) && ! ($commit_msg =~ $revert_re) ]]; then
  echo -e "\n不合法的 commit 消息提交格式，请使用正确的格式：\
          \nfeat: add comments\
          \nfix: handle events on blur (close #28)\
          \n详情请查看 git commit 提交规范"
  # 异常退出
  exit 1
fi`;
