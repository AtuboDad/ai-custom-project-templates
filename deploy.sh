#!/bin/bash

# AI项目模板部署脚本
# 使用方法: ./deploy.sh [template-name]

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 打印带颜色的消息
print_info() {
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

# 检查命令是否存在
check_command() {
    if ! command -v $1 &> /dev/null; then
        print_error "$1 命令未找到，请先安装"
        exit 1
    fi
}

# 显示帮助信息
show_help() {
    echo "AI项目模板部署脚本"
    echo ""
    echo "使用方法: $0 [选项] [模板名称]"
    echo ""
    echo "选项:"
    echo "  -h, --help     显示帮助信息"
    echo "  -l, --list     列出所有可用模板"
    echo "  -d, --docker   使用Docker部署"
    echo "  -c, --cloud    云部署配置"
    echo ""
    echo "模板名称:"
    echo "  kb      知识库AI助手 (knowledge-base-assistant)"
    echo "  csa     客服AI自动化 (customer-service-automation)"
    echo "  daa     数据AI分析 (data-ai-analysis)"
    echo "  wfa     流程AI助手 (workflow-ai-assistant)"
    echo ""
    echo "示例:"
    echo "  $0 kb          部署知识库AI助手"
    echo "  $0 -d csa      使用Docker部署客服AI自动化"
    echo "  $0 --list      列出所有模板"
}

# 列出所有模板
list_templates() {
    echo "可用模板列表:"
    echo ""
    echo "1. 知识库AI助手 (kb)"
    echo "   企业级知识库智能问答系统"
    echo "   报价: 8-15万"
    echo ""
    echo "2. 客服AI自动化 (csa)"
    echo "   多渠道智能客服系统"
    echo "   报价: 10-20万"
    echo ""
    echo "3. 数据AI分析 (daa)"
    echo "   智能数据报表分析平台"
    echo "   报价: 6-12万"
    echo ""
    echo "4. 流程AI助手 (wfa)"
    echo "   企业内部流程自动化"
    echo "   报价: 12-25万"
}

# 部署知识库AI助手
deploy_knowledge_base() {
    print_info "开始部署知识库AI助手..."
    
    # 检查依赖
    check_command python3
    check_command pip3
    check_command node
    check_command npm
    
    # 创建项目目录
    PROJECT_DIR="knowledge-base-project-$(date +%Y%m%d%H%M%S)"
    mkdir -p $PROJECT_DIR
    cd $PROJECT_DIR
    
    print_info "复制模板文件..."
    cp -r ../knowledge-base-assistant/* .
    
    # 创建虚拟环境
    print_info "创建Python虚拟环境..."
    python3 -m venv venv
    source venv/bin/activate
    
    # 安装Python依赖
    print_info "安装Python依赖..."
    pip install -r requirements.txt
    
    # 安装Node.js依赖
    print_info "安装Node.js依赖..."
    cd frontend
    npm install
    cd ..
    
    # 创建配置文件
    print_info "创建配置文件..."
    cp backend/config.example.py backend/config.py
    cp frontend/.env.example frontend/.env
    
    print_warning "请编辑以下配置文件:"
    echo "1. backend/config.py - 后端配置"
    echo "2. frontend/.env - 前端配置"
    echo "3. 设置API密钥和数据库连接"
    
    # 创建启动脚本
    cat > start.sh << 'EOF'
#!/bin/bash
source venv/bin/activate
cd backend && uvicorn main:app --reload --host 0.0.0.0 --port 8000 &
cd frontend && npm run dev &
wait
EOF
    chmod +x start.sh
    
    print_success "知识库AI助手项目已创建在: $PROJECT_DIR"
    print_info "启动项目: cd $PROJECT_DIR && ./start.sh"
}

# 主函数
main() {
    # 解析参数
    TEMPLATE=""
    USE_DOCKER=false
    USE_CLOUD=false
    
    while [[ $# -gt 0 ]]; do
        case $1 in
            -h|--help)
                show_help
                exit 0
                ;;
            -l|--list)
                list_templates
                exit 0
                ;;
            -d|--docker)
                USE_DOCKER=true
                shift
                ;;
            -c|--cloud)
                USE_CLOUD=true
                shift
                ;;
            *)
                TEMPLATE="$1"
                shift
                ;;
        esac
    done
    
    # 如果没有指定模板，显示帮助
    if [[ -z "$TEMPLATE" ]]; then
        show_help
        exit 1
    fi
    
    # 根据模板名称调用对应的部署函数
    case $TEMPLATE in
        kb|knowledge-base)
            deploy_knowledge_base
            ;;
        csa|customer-service)
            print_info "客服AI自动化模板部署功能开发中..."
            ;;
        daa|data-analysis)
            print_info "数据AI分析模板部署功能开发中..."
            ;;
        wfa|workflow)
            print_info "流程AI助手模板部署功能开发中..."
            ;;
        *)
            print_error "未知模板: $TEMPLATE"
            echo ""
            list_templates
            exit 1
            ;;
    esac
}

# 运行主函数
main "$@"