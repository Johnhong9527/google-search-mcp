# Google自定义可编程搜索

## OpenAPI Specification

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /customsearch/v1:
    get:
      summary: Google自定义可编程搜索
      deprecated: false
      description: ''
      tags: []
      parameters:
        - name: q
          in: query
          description: 搜索内容
          required: false
          schema:
            type: string
        - name: key
          in: query
          description: INSERT_YOUR_API_KEY
          required: false
          schema:
            type: string
        - name: cx
          in: query
          description: 可编程搜索引擎 ID
          required: false
          schema:
            type: string
      responses:
        '200':
          description: ''
          content:
            application/json:
              schema:
                type: object
                properties: {}
          headers: {}
          x-apifox-name: 成功
      security: []
      x-apifox-folder: ''
      x-apifox-status: developing
      x-run-in-apifox: https://app.apifox.com/web/project/4889777/apis/api-345541946-run
components:
  schemas: {}
  securitySchemes: {}
servers:
  - url: https://www.googleapis.com
    description: 正式环境
security: []

```