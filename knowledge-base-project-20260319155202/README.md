# 知识库AI助手模板

企业级知识库智能问答系统，支持多格式文档解析和智能检索。

## 功能特性

### 核心功能
- 📄 **多格式文档支持**: PDF、Word、Excel、PPT、TXT、Markdown
- 🔍 **智能语义检索**: 基于向量数据库的语义搜索
- 💬 **智能问答**: 基于文档内容的准确回答
- 🔐 **权限管理**: 基于角色的文档访问控制
- 📊 **使用统计**: 查询热度、用户行为分析

### 高级功能
- 📱 **多端适配**: Web、微信小程序、移动APP
- 🌐 **多语言支持**: 中英文混合问答
- 🔄 **实时同步**: 文档变更自动更新索引
- 📈 **智能推荐**: 相关文档和问题推荐

## 技术架构

### 后端架构
```
┌─────────────────┐
│    FastAPI      │ ← REST API 网关
├─────────────────┤
│   LangChain     │ ← AI处理管道
├─────────────────┤
│ 向量数据库      │ ← 文档向量存储
│ (Pinecone/Qdrant)│
├─────────────────┤
│   PostgreSQL    │ ← 元数据存储
└─────────────────┘
```

### 前端架构
- **Web端**: Vue 3 + Element Plus
- **移动端**: Uni-app (一套代码多端发布)
- **管理后台**: Vue 3 + Ant Design Pro

## 快速部署

### 1. 环境准备
```bash
# 克隆模板
cp -r knowledge-base-assistant your-project-name
cd your-project-name

# 安装依赖
pip install -r backend/requirements.txt
cd frontend && npm install
```

### 2. 配置修改
```bash
# 复制配置文件
cp backend/config.example.py backend/config.py
cp frontend/.env.example frontend/.env

# 编辑配置文件
# 1. 设置API密钥 (OpenAI/百度文心/阿里通义)
# 2. 配置数据库连接
# 3. 设置向量数据库参数
```

### 3. 启动服务
```bash
# 启动后端
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# 启动前端
cd frontend
npm run dev
```

## 配置说明

### AI模型配置
支持多种AI模型，按需选择：
- **OpenAI GPT系列**: 效果最好，成本较高
- **百度文心一言**: 中文优化，性价比高
- **阿里通义千问**: 企业级服务，稳定性好
- **本地模型**: Llama2、ChatGLM等

### 向量数据库选择
- **Pinecone**: 全托管，简单易用
- **Qdrant**: 开源，可自托管
- **Milvus**: 企业级，功能强大
- **Chroma**: 轻量级，适合小项目

## 定制开发指南

### 1. 文档解析器扩展
如需支持新的文档格式，在 `backend/document_parsers/` 中添加对应的解析器。

### 2. AI管道定制
修改 `backend/ai_pipeline/` 中的处理逻辑，适应特定业务需求。

### 3. 前端界面定制
- 修改 `frontend/src/views/` 中的页面组件
- 调整 `frontend/src/components/` 中的通用组件
- 更新 `frontend/src/assets/` 中的样式和资源

## 部署方案

### 方案A: Docker部署（推荐）
```yaml
# docker-compose.yml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/knowledge_db
      - VECTOR_DB_URL=qdrant://qdrant:6333
      
  frontend:
    build: ./frontend
    ports:
      - "3000:80"
      
  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=knowledge_db
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      
  qdrant:
    image: qdrant/qdrant
    ports:
      - "6333:6333"
```

### 方案B: 云函数部署
- **后端**: 阿里云函数计算/腾讯云云函数
- **前端**: 对象存储 + CDN
- **数据库**: 云数据库RDS
- **向量数据库**: 云服务或自建

## 报价参考

### 基础版 (8-10万)
- 标准文档格式支持
- 基础问答功能
- 简单权限管理
- 单机部署

### 标准版 (10-13万)
- 扩展文档格式支持
- 高级检索功能
- 完整权限体系
- 集群部署

### 企业版 (13-15万)
- 定制文档解析器
- 智能推荐系统
- 多租户支持
- 高可用架构

## 成功案例

### 案例1: 制造业知识库
- **客户**: 某汽车零部件制造商
- **需求**: 技术文档智能检索
- **成果**: 工程师查询效率提升60%

### 案例2: 教育机构知识库
- **客户**: 某在线教育平台
- **需求**: 课程资料智能问答
- **成果**: 学生满意度提升40%

## 技术支持
- 📧 邮箱: support@example.com
- 📱 微信: 扫码添加技术支持
- 📞 电话: 400-xxx-xxxx

## 更新日志
- v1.0.0 (2024-03): 初始版本发布
- v1.1.0 (2024-04): 增加微信小程序支持
- v1.2.0 (2024-05): 优化检索算法