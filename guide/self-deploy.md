# Self Deploy

## Prerequisites {#prerequisites}

To self-deploy Refly, you need to have the following installed:

- Docker
- Docker Compose
- *Optional*: PostgreSQL client (either `psql` or GUI-based tools), used for managing usable LLM models

::: info
We plan to provide a fully-functional native application in the future, offering seamless installation experience in a privacy-focused manner. Stay tuned!
:::

## Steps {#steps}

### 1. Clone the repository {#clone-the-repository}

```bash
git clone https://github.com/refly-ai/refly.git
```

::: tip
If you only need to deploy with Docker, you can add `--depth 1` to the `clone` command to save disk space and download time.
:::

### 2. Prepare the configuration via `.env` file {#prepare-the-configuration-via-env-file}

```bash
cd refly/deploy/docker
cp .env.example .env
```

Notes on must-set environment variables:

- **Envs for LLM inference**:
  - `OPENAI_API_KEY`: API key for OpenAI (or any other compatible provider)
  - `OPENAI_BASE_URL`: Base URL for other OpenAI compatible provider
  - `OPENROUTER_API_KEY`: [OpenRouter](https://openrouter.ai/) API key (This will override `OPENAI_BASE_URL` with OpenRouter's if provided)
- **Envs for Embeddings**:
  - `EMBEDDINGS_PROVIDER`: Embeddings provider, currently support `openai`, `jina` and `fireworks`
  - `EMBEDDINGS_MODEL_NAME`: The name of the embeddings model, which could be different for different providers
  - `OPENAI_API_KEY`: Required if `EMBEDDINGS_PROVIDER` is `openai`
  - `JINA_API_KEY`: Required if `EMBEDDINGS_PROVIDER` is `jina`
  - `FIREWORKS_API_KEY`: Required if `EMBEDDINGS_PROVIDER` is `fireworks`
- **Envs for Web Search**:
  - `SERPER_API_KEY`: [Serper](https://serper.dev/) API key
- **Envs for PDF Parsing**:
  - `MARKER_API_KEY`: [Marker](https://www.datalab.to/) API key

::: tip
A comprehensive list of all the configuration options is available in the [Configuration](./configuration.md).
:::

### 3. Start the application via docker compose {#start-the-application-via-docker-compose}

```bash
docker compose up -d
```

You can run `docker ps` to check the status of the containers. The expected status for each container should be `Up` and `healthy`. An example output is shown below:

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

Finally, you can access the Refly application in `http://localhost:5700`.

### 4. Initialize LLM models {#initialize-llm-models}

You can configure the LLM models in the `refly.model_infos` table within the `refly_db` PostgreSQL database.

```sql
INSERT INTO "refly"."model_infos"
("name", "label", "provider", "tier", "created_at", "enabled", "updated_at", "context_limit", "max_output", "capabilities")
VALUES
('o3-mini', 'o3 mini', 'openai', 't2', now(), 't', now(), 128000, 16384, '{"vision":true}'),
('gpt-4o', 'GPT-4o', 'openai', 't2', now(), 't', now(), 128000, 16384, '{"vision":true}'),
('gpt-4o-mini', 'GPT-4o Mini', 'openai', 't2', now(), 't', now(), 128000, 16384, '{"vision":true}');
```

Here is a list of explanations for the columns:

- `name`: The name (ID) of the model, which should be the `id` value returned from `${OPENAI_BASE_URL}/v1/models`
- `label`: The label of the model, which will be displayed in the model selector
- `provider`: The provider of the model, used to display model icon (currently support `openai`, `anthropic`, `deepseek`, `google`, `qwen`, `mistral` and `meta-llama`)
- `tier`: The tier of the model, currently support `t1` (premium), `t2` (standard) and `free`
- `enabled`: Whether the model is enabled
- `context_limit`: The context limit of the model (number of tokens)
- `max_output`: The max output length of the model (number of tokens)
- `capabilities`: The capabilities of the model (JSON string), with the following keys:
  - `vision`: Whether the model supports vision (taking images as input)

::: tip
If you don't have any PostgreSQL client installed, you can use the `docker exec` command to execute the SQL above:

```bash
docker exec -i refly_db psql 'postgresql://refly:test@localhost:5432/refly' << EOF                    
INSERT INTO "refly"."model_infos"
("name", "label", "provider", "tier", "created_at", "enabled", "updated_at", "context_limit", "max_output", "capabilities")
VALUES
('openai/gpt-4o-mini', 'GPT-4o Mini', 'openai', 't2', now(), 't', now(), 128000, 16384, '{"vision":true}');
EOF
```
:::

## Troubleshooting {#troubleshooting}

If the application fails to function properly, you can try the following steps:

1. Run `docker ps` to identify unhealthy containers.
2. Run `docker logs <container_id>` to get more information about the error.
3. If the unhealthy container is `refly_api`, you can run `docker restart refly_api` to restart the container.
4. For others, you can search for the cause of error messages in the container's logs.

If the issue persists, you can raise an issue in our [GitHub repository](https://github.com/refly-ai/refly/issues), or contact us in our [Discord Server](https://discord.gg/bWjffrb89h).
