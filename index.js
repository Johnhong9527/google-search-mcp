#!/usr/bin/env node

const { Server } = require("@modelcontextprotocol/sdk/server/index.js");
const { StdioServerTransport } = require("@modelcontextprotocol/sdk/server/stdio.js");

const {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} = require("@modelcontextprotocol/sdk/types.js");
const axios = require('axios');

// 创建 MCP 服务器实例
const server = new Server(
  {
    name: 'google-search',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Google 搜索 API 配置
const GOOGLE_SEARCH_API_BASE_URL = 'https://www.googleapis.com';
const GOOGLE_SEARCH_ENDPOINT = '/customsearch/v1';

// 从环境变量获取配置
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_SEARCH_ENGINE_ID = process.env.GOOGLE_SEARCH_ENGINE_ID;
// 从环境变量获取代理配置
const PROXY_HOST = process.env.PROXY_HOST;
const PROXY_PORT = process.env.PROXY_PORT || 7890;
const PROXY_PROTOCOL = process.env.PROXY_PROTOCOL || 'http';

// 列出可用工具
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'google_search',
        description: '使用 Google 自定义可编程搜索进行搜索',
        inputSchema: {
          type: 'object',
          properties: {
            q: {
              type: 'string',
              description: '搜索内容',
            },
          },
          required: ['q'],
        },
      },
    ],
  };
});

// 处理工具调用
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === 'google_search') {
    const { q } = args;

    // 验证必需参数
    if (!q) {
      throw new Error('缺少必需参数: q (搜索内容)');
    }

    // 验证环境变量配置
    if (!GOOGLE_API_KEY || !GOOGLE_SEARCH_ENGINE_ID) {
      throw new Error('环境变量未正确配置: 请确保设置了 GOOGLE_API_KEY 和 GOOGLE_SEARCH_ENGINE_ID');
    }

    try {
      // 构建 API 请求 URL
      const url = `${GOOGLE_SEARCH_API_BASE_URL}${GOOGLE_SEARCH_ENDPOINT}`;
      
      // 构建请求配置
      const requestConfig = {
        params: {
          q: q,
          key: GOOGLE_API_KEY,
          cx: GOOGLE_SEARCH_ENGINE_ID,
          // num: 5
        },
        headers: {
          'Accept': 'application/json',
        }
      };

      // 只有当 PROXY_HOST 存在时才设置 proxy
      if (PROXY_HOST) {
        requestConfig.proxy = {
          host: PROXY_HOST,
          port: parseInt(PROXY_PORT),
          protocol: PROXY_PROTOCOL
        };
      }

      // 发送请求到 Google 搜索 API
      const response = await axios.get(url, requestConfig);

      // 返回搜索结果
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(response.data, null, 2),
          },
        ],
      };
    } catch (error) {
      console.error('Google 搜索 API 调用失败:', error.message);
      
      // 返回错误信息
      return {
        content: [
          {
            type: 'text',
            text: `搜索失败: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  } else {
    throw new Error(`未知工具: ${name}`);
  }
});

// 启动服务器
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Google 搜索 MCP 服务器已启动');
}

main().catch((error) => {
  console.error('服务器启动失败:', error);
  process.exit(1);
});
