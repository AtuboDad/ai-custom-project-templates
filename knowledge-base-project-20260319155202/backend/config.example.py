# 知识库AI助手配置文件示例
# 复制此文件为 config.py 并修改配置

import os
from typing import List

# 基础配置
DEBUG = True
SECRET_KEY = "your-secret-key-change-in-production"
API_V1_STR = "/api/v1"
PROJECT_NAME = "知识库AI助手"
VERSION = "1.0.0"

# 数据库配置
DATABASE_URL = "postgresql://user:password@localhost:5432/knowledge_db"
# 或者使用SQLite开发
# DATABASE_URL = "sqlite:///./knowledge.db"

# AI模型配置
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "your-openai-api-key")
OPENAI_MODEL = "gpt-4"  # 或 "gpt-3.5-turbo"
OPENAI_TEMPERATURE = 0.1
OPENAI_MAX_TOKENS = 2000

# 备选AI模型（如果OpenAI不可用）
BAIDU_API_KEY = os.getenv("BAIDU_API_KEY", "")
BAIDU_SECRET_KEY = os.getenv("BAIDU_SECRET_KEY", "")
ALIYUN_API_KEY = os.getenv("ALIYUN_API_KEY", "")

# 向量数据库配置
VECTOR_DB_TYPE = "qdrant"  # qdrant, pinecone, milvus
QDRANT_URL = "http://localhost:6333"
QDRANT_COLLECTION = "knowledge_base"
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY", "")

# Pinecone配置
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY", "")
PINECONE_ENVIRONMENT = "us-east1-gcp"
PINECONE_INDEX = "knowledge-base"

# 文件上传配置
UPLOAD_DIR = "./uploads"
ALLOWED_EXTENSIONS = {".pdf", ".doc", ".docx", ".txt", ".md", ".xlsx", ".pptx"}
MAX_FILE_SIZE = 50 * 1024 * 1024  # 50MB

# Redis配置（用于缓存和Celery）
REDIS_URL = "redis://localhost:6379/0"

# Celery配置
CELERY_BROKER_URL = REDIS_URL
CELERY_RESULT_BACKEND = REDIS_URL

# 安全配置
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7天
ALGORITHM = "HS256"

# CORS配置
BACKEND_CORS_ORIGINS: List[str] = [
    "http://localhost:3000",
    "http://localhost:8080",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:8080",
]

# 邮件配置（用于通知）
SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = 587
SMTP_USER = ""
SMTP_PASSWORD = ""
EMAILS_FROM_EMAIL = "noreply@knowledge-ai.com"
EMAILS_FROM_NAME = "知识库AI助手"

# 日志配置
LOG_LEVEL = "INFO"
LOG_FILE = "logs/app.log"

# 性能配置
EMBEDDING_MODEL = "text-embedding-3-small"
CHUNK_SIZE = 1000
CHUNK_OVERLAP = 200
MAX_CHUNKS_PER_DOCUMENT = 1000