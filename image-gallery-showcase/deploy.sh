#!/bin/bash

# 现代化图片展示模板部署脚本
# 使用说明: ./deploy.sh [环境]

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 环境变量
ENV=${1:-"production"}
BUILD_DIR="dist"
DEPLOY_DIR="/var/www/image-gallery"

# 打印带颜色的消息
print_message() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查依赖
check_dependencies() {
    print_message "检查系统依赖..."
    
    # 检查 Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js 未安装"
        exit 1
    fi
    
    # 检查 npm
    if ! command -v npm &> /dev/null; then
        print_error "npm 未安装"
        exit 1
    fi
    
    print_success "依赖检查通过"
    print_message "Node.js 版本: $(node --version)"
    print_message "npm 版本: $(npm --version)"
}

# 安装依赖
install_dependencies() {
    print_message "安装项目依赖..."
    
    if [ -f "package-lock.json" ]; then
        npm ci --silent
    else
        npm install --silent
    fi
    
    print_success "依赖安装完成"
}

# 构建项目
build_project() {
    print_message "构建项目 (环境: $ENV)..."
    
    # 设置环境变量
    export NODE_ENV=$ENV
    
    # 执行构建
    npm run build
    
    # 检查构建结果
    if [ ! -d "$BUILD_DIR" ]; then
        print_error "构建失败: $BUILD_DIR 目录不存在"
        exit 1
    fi
    
    print_success "项目构建完成"
    print_message "构建目录: $BUILD_DIR"
}

# 运行测试
run_tests() {
    print_message "运行测试..."
    
    if [ -f "package.json" ] && grep -q "\"test\"" package.json; then
        npm test -- --passWithNoTests
        print_success "测试通过"
    else
        print_warning "未找到测试脚本，跳过测试"
    fi
}

# 代码检查
run_lint() {
    print_message "运行代码检查..."
    
    if [ -f "package.json" ] && grep -q "\"lint\"" package.json; then
        npm run lint
        print_success "代码检查完成"
    else
        print_warning "未找到代码检查脚本，跳过检查"
    fi
}

# 部署到服务器
deploy_to_server() {
    print_message "部署到服务器..."
    
    # 检查部署目录
    if [ ! -d "$DEPLOY_DIR" ]; then
        print_warning "部署目录不存在，创建目录: $DEPLOY_DIR"
        sudo mkdir -p "$DEPLOY_DIR"
    fi
    
    # 备份旧版本
    if [ -d "$DEPLOY_DIR" ] && [ "$(ls -A $DEPLOY_DIR)" ]; then
        BACKUP_DIR="$DEPLOY_DIR.backup.$(date +%Y%m%d%H%M%S)"
        print_message "备份旧版本到: $BACKUP_DIR"
        sudo cp -r "$DEPLOY_DIR" "$BACKUP_DIR"
    fi
    
    # 复制新版本
    print_message "复制新版本到部署目录..."
    sudo cp -r "$BUILD_DIR"/* "$DEPLOY_DIR"/
    
    # 设置权限
    sudo chown -R www-data:www-data "$DEPLOY_DIR"
    sudo chmod -R 755 "$DEPLOY_DIR"
    
    print_success "部署完成"
    print_message "部署目录: $DEPLOY_DIR"
}

# 配置 Nginx
configure_nginx() {
    print_message "配置 Nginx..."
    
    NGINX_CONFIG="/etc/nginx/sites-available/image-gallery"
    NGINX_ENABLED="/etc/nginx/sites-enabled/image-gallery"
    
    # 创建 Nginx 配置
    cat > /tmp/image-gallery.conf << EOF
server {
    listen 80;
    server_name your-domain.com;
    root $DEPLOY_DIR;
    index index.html;
    
    # Gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
    # 缓存设置
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # SPA 路由支持
    location / {
        try_files \$uri \$uri/ /index.html;
    }
    
    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
EOF
    
    # 检查是否有权限写入配置
    if [ -w "/etc/nginx/sites-available/" ]; then
        sudo cp /tmp/image-gallery.conf "$NGINX_CONFIG"
        sudo ln -sf "$NGINX_CONFIG" "$NGINX_ENABLED"
        print_success "Nginx 配置已创建"
        
        # 测试 Nginx 配置
        print_message "测试 Nginx 配置..."
        sudo nginx -t && print_success "Nginx 配置测试通过"
    else
        print_warning "无权限写入 Nginx 配置，请手动配置"
        print_message "配置文件内容已保存到: /tmp/image-gallery.conf"
    fi
}

# 重启服务
restart_services() {
    print_message "重启服务..."
    
    # 重启 Nginx
    if systemctl is-active --quiet nginx; then
        sudo systemctl reload nginx
        print_success "Nginx 已重启"
    fi
    
    # 如果有 PM2，重启应用
    if command -v pm2 &> /dev/null && [ -f "ecosystem.config.js" ]; then
        pm2 restart ecosystem.config.js --env $ENV
        print_success "PM2 应用已重启"
    fi
}

# 健康检查
health_check() {
    print_message "执行健康检查..."
    
    # 检查部署目录
    if [ -d "$DEPLOY_DIR" ] && [ -f "$DEPLOY_DIR/index.html" ]; then
        print_success "部署文件检查通过"
    else
        print_error "部署文件检查失败"
        exit 1
    fi
    
    # 检查服务状态
    if systemctl is-active --quiet nginx; then
        print_success "Nginx 服务运行正常"
    else
        print_warning "Nginx 服务未运行"
    fi
    
    print_success "健康检查完成"
}

# 显示部署信息
show_deploy_info() {
    print_success "🎉 部署完成！"
    echo ""
    echo "📊 部署信息:"
    echo "  - 环境: $ENV"
    echo "  - 构建时间: $(date)"
    echo "  - 部署目录: $DEPLOY_DIR"
    echo ""
    echo "🚀 访问地址:"
    echo "  - http://your-domain.com"
    echo ""
    echo "🔧 后续操作:"
    echo "  1. 配置域名解析"
    echo "  2. 配置 SSL 证书 (推荐使用 Let's Encrypt)"
    echo "  3. 配置监控和日志"
    echo ""
    echo "📝 日志文件:"
    echo "  - Nginx 访问日志: /var/log/nginx/access.log"
    echo "  - Nginx 错误日志: /var/log/nginx/error.log"
}

# 主函数
main() {
    print_message "开始部署现代化图片展示模板..."
    echo ""
    
    # 执行部署步骤
    check_dependencies
    echo ""
    
    install_dependencies
    echo ""
    
    run_lint
    echo ""
    
    run_tests
    echo ""
    
    build_project
    echo ""
    
    deploy_to_server
    echo ""
    
    configure_nginx
    echo ""
    
    restart_services
    echo ""
    
    health_check
    echo ""
    
    show_deploy_info
}

# 执行主函数
main "$@"