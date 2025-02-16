# 自行部署

## 前置要求 {#prerequisites}

要自行部署 Refly，您需要安装以下软件：

- Docker
- Docker Compose
- *可选*: PostgreSQL 客户端（可以是 `psql` 或基于 GUI 的工具），用于管理可用的 LLM 模型

::: info
我们计划在未来提供功能完善的原生应用程序，以隐私为重点提供无缝的安装体验。敬请期待！
:::

## 部署步骤 {#steps}

### 1. 克隆代码仓库 {#clone-the-repository}

```bash
git clone https://github.com/refly-ai/refly.git
```

::: tip
如果您只需要使用 Docker 部署，可以在 `clone` 命令中添加 `--depth 1` 参数来节省磁盘空间和下载时间。
:::

### 2. 准备环境配置 {#prepare-the-environment-configuration}

```bash
cd refly/deploy/docker
cp .env.example .env
```

环境变量说明：

- **LLM 推理相关环境变量**：
  - `OPENAI_API_KEY`：您的 OpenAI API 密钥
  - `OPENROUTER_API_KEY`：您的 OpenRouter API 密钥（如果提供，将覆盖官方 OpenAI 端点）
- **向量嵌入相关环境变量**：
  - `EMBEDDINGS_PROVIDER`：向量嵌入提供商，目前支持 `openai`、`jina` 和 `fireworks`
  - `EMBEDDINGS_MODEL_NAME`：向量嵌入模型名称，不同提供商可能不同
  - `OPENAI_API_KEY`：如果 `EMBEDDINGS_PROVIDER` 为 `openai` 则必需
  - `JINA_API_KEY`：如果 `EMBEDDINGS_PROVIDER` 为 `jina` 则必需
  - `FIREWORKS_API_KEY`：如果 `EMBEDDINGS_PROVIDER` 为 `fireworks` 则必需
- **网络搜索相关环境变量**：
  - `SERPER_API_KEY`：[Serper](https://serper.dev/) API 密钥
- **PDF 解析相关环境变量**：
  - `MARKER_API_KEY`：[Marker](https://marker.com/) API 密钥

::: tip
所有配置选项的完整列表可以在[配置指南](./configuration.md)中找到。
:::

::: warning
目前，应用程序将使用 OpenRouter 兼容的模型名称进行配置。如果未提供 `OPENROUTER_API_KEY`，应用程序将使用官方 OpenAI 端点，此时您需要对模型配置进行调整：

```sql
UPDATE refly.model_info SET name = TRIM(LEADING 'openai/' FROM name) WHERE provider = 'openai';
```
:::

### 3. 通过 docker compose 启动应用 {#start-the-application-via-docker-compose}

```bash
docker compose up -d
```

您可以运行 `docker ps` 来检查容器的状态。每个容器的预期状态应该是 `Up` 和 `healthy`。以下是示例输出：

```bash
CONTAINER ID   IMAGE                                      COMMAND                  CREATED       STATUS                 PORTS                                                                                  NAMES
71681217973e   reflyai/refly-api:latest                   "docker-entrypoint.s…"   5 hours ago   Up 5 hours (healthy)   3000/tcp, 0.0.0.0:5800-5801->5800-5801/tcp, :::5800-5801->5800-5801/tcp                refly_api
462d7e1181ca   reflyai/qdrant:v1.13.1                     "./entrypoint.sh"        5 hours ago   Up 5 hours (healthy)   0.0.0.0:6333-6334->6333-6334/tcp, :::6333-6334->6333-6334/tcp                          refly_qdrant
fd287fa0a04e   redis/redis-stack:6.2.6-v18                "/entrypoint.sh"         5 hours ago   Up 5 hours (healthy)   0.0.0.0:6379->6379/tcp, :::6379->6379/tcp, 0.0.0.0:8001->8001/tcp, :::8001->8001/tcp   refly_redis
16321d38fc34   reflyai/refly-web:latest                   "/docker-entrypoint.…"   5 hours ago   Up 5 hours             0.0.0.0:5700->80/tcp, [::]:5700->80/tcp                                                refly_web
2e14ec2e55a2   reflyai/elasticsearch:7.10.2               "/tini -- /usr/local…"   5 hours ago   Up 5 hours (healthy)   0.0.0.0:9200->9200/tcp, :::9200->9200/tcp, 9300/tcp                                    refly_elasticsearch
a13f349fe35b   minio/minio:RELEASE.2025-01-20T14-49-07Z   "/usr/bin/docker-ent…"   5 hours ago   Up 5 hours (healthy)   0.0.0.0:9000-9001->9000-9001/tcp, :::9000-9001->9000-9001/tcp                          refly_minio
e7b398dbd02b   postgres:16-alpine                         "docker-entrypoint.s…"   5 hours ago   Up 5 hours (healthy)   0.0.0.0:5432->5432/tcp, :::5432->5432/tcp                                              refly_db
```

最后，您可以通过访问 `http://localhost:5700` 来使用 Refly 应用程序。

### 4. 初始化 LLM 模型 {#initialize-the-llm-models}

您可以在 `refly_db` PostgreSQL 数据库中的 `refly.model_infos` 表中配置 LLM 模型。

```sql
INSERT INTO "refly"."model_infos"
("name", "label", "provider", "tier", "created_at", "enabled", "updated_at", "context_limit", "max_output", "capabilities")
VALUES
('o3-mini', 'o3 mini', 'openai', 't1', now(), 't', now(), 200000, 100000, '{}'),
('gpt-4o', 'GPT-4o', 'openai', 't1', now(), 't', now(), 128000, 16384, '{"vision":true}'),
('gpt-4o-mini', 'GPT-4o Mini', 'openai', 't2', now(), 't', now(), 128000, 16384, '{"vision":true}');
```

以下是各列的说明：

- `name`：模型的名称（ID），应为 `${OPENAI_BASE_URL}/v1/models` 返回的 `id` 值
- `label`：模型的标签，将在模型选择器中显示
- `provider`：模型的提供商，用于显示模型图标（目前支持 `openai`、`anthropic`、`deepseek`、`google`、`qwen`、`mistral` 和 `meta-llama`）
- `tier`：模型的等级，目前支持 `t1`（高级）、`t2`（标准）和 `free`
- `enabled`：是否启用模型
- `context_limit`：模型的上下文限制（token 数量）
- `max_output`：模型的最大输出长度（token 数量）
- `capabilities`：模型的能力（JSON 字符串），具有以下键：
  - `vision`：是否支持视觉输入（接受图片作为输入）

::: tip
如果您未安装 PostgreSQL 客户端，可以使用 `docker exec` 命令执行上述 SQL：

```bash
docker exec -i refly_db psql 'postgresql://refly:test@localhost:5432/refly' << EOF
INSERT INTO "refly"."model_infos"
("name", "label", "provider", "tier", "created_at", "enabled", "updated_at", "context_limit", "max_output", "capabilities")
VALUES
('openai/gpt-4o-mini', 'GPT-4o Mini', 'openai', 't2', now(), 't', now(), 128000, 16384, '{"vision":true}');
EOF
```
:::

## 故障排除 {#troubleshooting}

如果应用程序无法正常运行，您可以尝试以下步骤：

1. 运行 `docker ps` 来识别不健康的容器。
2. 运行 `docker logs <container_id>` 来获取更多错误信息。
3. 如果不健康的容器是 `refly_api`，您可以运行 `docker restart refly_api` 来重启容器。
4. 对于其他容器，您可以在容器日志中搜索错误消息的原因。

如果问题仍然存在，您可以在我们的 [GitHub 仓库](https://github.com/refly-ai/refly/issues)提出问题，或在我们的 [Discord 服务器](https://discord.gg/bWjffrb89h)中联系我们。 