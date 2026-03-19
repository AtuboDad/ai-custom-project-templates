# 如何将项目推送到GitHub

## 步骤1: 在GitHub上创建新仓库

1. 登录GitHub (https://github.com)
2. 点击右上角 "+" → "New repository"
3. 填写仓库信息:
   - **Repository name**: `ai-custom-project-templates`
   - **Description**: 专业AI定制项目模板库，为中小企业提供快速部署的AI解决方案模板
   - **Public** (公开) 或 **Private** (私有，推荐)
   - 不要初始化README、.gitignore或LICENSE（我们已经有了）
4. 点击 "Create repository"

## 步骤2: 将本地仓库连接到GitHub

### 方法A: 使用HTTPS（推荐初学者）
```bash
# 进入项目目录
cd /root/.openclaw/workspace/ai-custom-project-templates

# 添加远程仓库
git remote add origin https://github.com/你的用户名/ai-custom-project-templates.git

# 推送代码
git push -u origin master
```

### 方法B: 使用SSH（更安全）
```bash
# 添加远程仓库（SSH格式）
git remote add origin git@github.com:你的用户名/ai-custom-project-templates.git

# 推送代码
git push -u origin master
```

## 步骤3: 设置GitHub Token（如果需要）

如果提示需要认证，可以创建Personal Access Token：

1. 访问: https://github.com/settings/tokens
2. 点击 "Generate new token" → "Generate new token (classic)"
3. 设置权限:
   - `repo` (全选)
   - `workflow`
   - `write:packages`
   - `delete:packages`
4. 生成token并保存（只显示一次！）
5. 使用token作为密码:
   ```bash
   # 当提示输入密码时，使用token
   git push -u origin master
   ```

## 步骤4: 配置GitHub Actions（可选）

创建 `.github/workflows/ci.yml` 文件来自动化测试和部署：

```yaml
name: CI

on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.10'
    
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -r requirements.txt
    
    - name: Lint with flake8
      run: |
        pip install flake8
        flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics
        flake8 . --count --exit-zero --max-complexity=10 --max-line-length=127 --statistics
    
    - name: Test with pytest
      run: |
        pip install pytest
        pytest
```

## 步骤5: 完善仓库信息

### 添加仓库主题
在仓库页面点击 "Manage topics"，添加相关标签：
- `ai`
- `templates`
- `python`
- `vue`
- `knowledge-base`
- `customer-service`
- `data-analysis`
- `workflow-automation`

### 设置仓库描述
在 "About" 部分添加详细描述：
```
专业AI定制项目模板库，包含4个企业级AI解决方案：

1. 知识库AI助手 - 企业文档智能检索和问答系统
2. 客服AI自动化 - 多渠道智能客服和工单系统  
3. 数据AI分析 - 智能报表和预测分析平台
4. 流程AI助手 - 企业内部流程自动化和OCR识别

每个模板都包含完整的后端、前端和部署配置，支持快速定制和交付。
```

## 步骤6: 创建GitHub Pages（可选）

如果需要展示项目文档：

1. 进入仓库 Settings → Pages
2. Source选择: `GitHub Actions`
3. 创建 `.github/workflows/pages.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ master ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run docs:build
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs/dist
```

## 常见问题解决

### 问题1: 推送被拒绝
```
error: failed to push some refs to 'github.com:username/repo.git'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref. You may want to first integrate the remote changes
hint: (e.g., 'git pull ...') before pushing again.
```

**解决方案**:
```bash
# 拉取远程更改
git pull origin master --allow-unrelated-histories

# 解决冲突（如果有）
# 然后再次推送
git push -u origin master
```

### 问题2: 认证失败
```
remote: Support for password authentication was removed on August 13, 2021.
remote: Please use a personal access token instead.
```

**解决方案**:
1. 使用SSH密钥或Personal Access Token
2. 配置Git凭证存储:
```bash
git config --global credential.helper store
# 下次推送时会保存凭证
```

### 问题3: 分支名称不同
如果本地是 `master` 但GitHub默认是 `main`:
```bash
# 重命名本地分支
git branch -m master main

# 推送并设置上游
git push -u origin main
```

## 后续维护

### 日常开发流程
```bash
# 1. 拉取最新代码
git pull origin main

# 2. 创建新分支
git checkout -b feature/new-template

# 3. 开发并提交
git add .
git commit -m "Add new template"

# 4. 推送到GitHub
git push -u origin feature/new-template

# 5. 创建Pull Request
```

### 版本发布
```bash
# 打标签
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0

# 在GitHub创建Release
# 访问: https://github.com/username/ai-custom-project-templates/releases/new
```

## 联系方式

如有问题，可以通过以下方式联系：
- GitHub Issues: https://github.com/你的用户名/ai-custom-project-templates/issues
- 邮箱: your-email@example.com

---

**提示**: 建议定期备份代码，并保持提交信息的清晰和规范。