# Cline 中配置 Google 搜索 MCP 服务器

## 概述

本文档说明如何在 Cline 中配置和使用 Google 搜索 MCP 服务器。

## 配置步骤

### 1. 确保项目已准备就绪

首先确保你已经完成了以下步骤：
```bash
# 安装依赖
npm install

# 测试服务器启动
npm start
```

### 2. 找到 Cline 配置文件

Cline 的配置文件通常位于：
- **Windows**: `%APPDATA%\Cline\cline.json`
- **macOS**: `~/Library/Application Support/Cline/cline.json`
- **Linux**: `~/.config/Cline/cline.json`

### 3. 配置 MCP 服务器

在 Cline 的配置文件中添加以下配置：

```json
{
  "mcpServers": {
    "google-search": {
      "command": "node",
      "args": ["/完整路径/google-search-mcp/index.js"],
      "env": {
        "GOOGLE_API_KEY": "你的 Google API 密钥",
        "GOOGLE_SEARCH_ENGINE_ID": "你的搜索引擎 ID"
      }
    }
  }
}
```

#### 配置说明

- **command**: `"node"` - 使用 Node.js 运行服务器
- **args**: 数组，包含服务器文件的完整路径
- **env**: 环境变量，用于传递敏感信息
  - `GOOGLE_API_KEY`: 你的 Google API 密钥
  - `GOOGLE_SEARCH_ENGINE_ID`: 你的自定义搜索引擎 ID

### 4. 获取配置路径

要获取完整的项目路径，可以在项目目录中运行：

**macOS/Linux:**
```bash
pwd
# 输出示例：/Users/sysadmin/Desktop/code/wb_projec/google-search-mcp
```

**Windows:**
```cmd
cd
# 输出示例：C:\Users\用户名\Desktop\code\wb_projec\google-search-mcp
```

### 5. 完整配置示例

假设你的项目路径是 `/Users/sysadmin/Desktop/code/wb_projec/google-search-mcp`，配置文件应该如下：

```json
{
  "mcpServers": {
    "google-search": {
      "command": "node",
      "args": ["/Users/sysadmin/Desktop/code/wb_projec/google-search-mcp/index.js"],
      "env": {
        "GOOGLE_API_KEY": "AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "GOOGLE_SEARCH_ENGINE_ID": "1234567890:abcdefg_hijklmnop"
      }
    }
  }
}
```

## 获取 API 密钥和搜索引擎 ID

### Google API 密钥

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建新项目或选择现有项目
3. 启用 "Custom Search API"
4. 在 "凭据" 页面创建 API 密钥

### 搜索引擎 ID

1. 访问 [Programmable Search Engine](https://programmablesearchengine.google.com/)
2. 点击 "添加" 创建新的搜索引擎
3. 配置搜索引擎设置
4. 获取 "搜索引擎 ID"

## 验证配置

### 1. 重启 Cline

配置完成后，重启 Cline 以加载新的 MCP 服务器。

### 2. 测试搜索功能

在 Cline 中尝试使用搜索功能，例如：
```
请使用 Google 搜索 "人工智能最新发展"
```

### 3. 检查服务器日志

如果遇到问题，可以单独运行服务器来检查日志：
```bash
npm start
```

## 故障排除

### 常见问题

1. **路径错误**
   - 确保 `args` 中的路径是绝对路径
   - 检查路径中是否包含特殊字符

2. **权限问题**
   - 确保 Node.js 有执行权限
   - 检查 API 密钥是否正确

3. **模块找不到**
   - 确保在项目目录中运行了 `npm install`
   - 检查 Node.js 版本是否符合要求

4. **API 调用失败**
   - 验证 API 密钥是否有效
   - 确认搜索引擎 ID 是否正确
   - 检查网络连接

### 调试步骤

1. **测试服务器独立运行**
   ```bash
   npm start
   ```

2. **检查依赖安装**
   ```bash
   npm list
   ```

3. **验证 Node.js 版本**
   ```bash
   node --version
   # 需要 >= 16
   ```

## 高级配置

### 使用配置文件

除了环境变量，你也可以修改 `index.js` 来使用配置文件：

```javascript
// 在 index.js 顶部添加
const fs = require('fs');
const path = require('path');

// 读取配置文件
const configPath = path.join(__dirname, 'config.json');
let config = {};

if (fs.existsSync(configPath)) {
  config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

// 使用配置
const GOOGLE_API_KEY = config.googleSearch?.apiKey || process.env.GOOGLE_API_KEY;
const GOOGLE_SEARCH_ENGINE_ID = config.googleSearch?.searchEngineId || process.env.GOOGLE_SEARCH_ENGINE_ID;
```

### 多环境配置

你可以为不同环境创建不同的配置文件：
- `config.development.json`
- `config.production.json`
- `config.test.json`

然后在启动时指定环境：
```bash
NODE_ENV=production npm start
```

## 安全建议

1. **保护 API 密钥**
   - 不要将 API 密钥提交到版本控制
   - 使用环境变量而不是硬编码
   - 定期轮换 API 密钥

2. **限制使用**
   - 在 Google Cloud Console 中限制 API 密钥的使用范围
   - 设置使用配额和限制

3. **监控使用情况**
   - 定期检查 Google Cloud Console 的使用情况
   - 监控异常活动

## 总结

通过以上配置，你就可以在 Cline 中使用 Google 搜索 MCP 服务器了。配置完成后，Cline 将能够通过 MCP 协议调用 Google 搜索功能，为 AI 模型提供实时的网络搜索能力。
