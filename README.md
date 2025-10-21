# Google 搜索 MCP 服务器使用说明

## 概述

这是一个基于 Google 自定义可编程搜索的 MCP (Model Context Protocol) 服务器，允许 AI 模型通过 MCP 协议进行 Google 搜索。

## 安装

1. 克隆或下载此项目
2. 安装依赖：
```bash
npm install
```

## 配置

1. 设置环境变量：
```bash
export GOOGLE_API_KEY="你的 Google API 密钥"
export GOOGLE_SEARCH_ENGINE_ID="你的搜索引擎 ID"
export PROXY_HOST="127.0.0.1"  # 可选：代理主机地址
export PROXY_PORT="7890"       # 可选：代理端口
export PROXY_PROTOCOL="http"   # 可选：代理协议
```

2. 或者在使用时通过环境变量传入配置：
```json
{
  "mcpServers": {
    "google-search": {
      "command": "node",
      "args": ["/path/to/google-search-mcp/index.js"],
      "env": {
        "GOOGLE_API_KEY": "你的 API 密钥",
        "GOOGLE_SEARCH_ENGINE_ID": "你的搜索引擎 ID",
        "PROXY_HOST": "127.0.0.1",
        "PROXY_PORT": "7890",
        "PROXY_PROTOCOL": "http"
      }
    }
  }
}
```

### 获取 Google API 密钥和搜索引擎 ID

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建新项目或选择现有项目
3. 启用 "Custom Search API"
4. 创建 API 密钥
5. 访问 [Programmable Search Engine](https://programmablesearchengine.google.com/)
6. 创建新的搜索引擎
7. 获取搜索引擎 ID

## 使用方法

### 作为 MCP 服务器使用

此服务器可以通过 MCP 协议与支持 MCP 的客户端一起使用。

#### 在 Claude Desktop 中使用

1. 打开 Claude Desktop 的配置文件
2. 添加以下配置：

```json
{
  "mcpServers": {
    "google-search": {
      "command": "node",
      "args": ["/path/to/google-search-mcp/index.js"],
      "env": {
        "GOOGLE_API_KEY": "你的 API 密钥",
        "GOOGLE_SEARCH_ENGINE_ID": "你的搜索引擎 ID"
      }
    }
  }
}
```

注意：代理配置已硬编码为 http://127.0.0.1:7890，需要确保本地有代理服务运行。

### 可用工具

#### google_search

使用 Google 自定义可编程搜索进行搜索。

**参数：**
- `q` (必需): 搜索内容
- `key` (必需): Google API 密钥 (从环境变量获取)
- `cx` (必需): 可编程搜索引擎 ID (从环境变量获取)

**示例：**
```json
{
  "name": "google_search",
  "arguments": {
    "q": "人工智能最新发展"
  }
}
```

## 开发

### 启动服务器

```bash
npm start
```

### 测试

```bash
npm test
```

### 环境变量说明

- `GOOGLE_API_KEY`: Google API 密钥
- `GOOGLE_SEARCH_ENGINE_ID`: Google 搜索引擎 ID
- `PROXY_HOST`: 代理主机地址 (默认: 127.0.0.1)
- `PROXY_PORT`: 代理端口 (默认: 7890)
- `PROXY_PROTOCOL`: 代理协议 (默认: http)

## 错误处理

服务器会处理以下错误情况：
- 缺少必需参数
- API 调用失败
- 网络连接问题

## 许可证

ISC
