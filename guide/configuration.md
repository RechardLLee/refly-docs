# Configuration

## API Server

The following are the detailed configurations for the API server. You can inject these environment variables into the `refly_api` container.

### General Config

| Env | Description | Default Value |
| --- | --- | --- |
| NODE_ENV | Node environment | `development` |
| PORT | HTTP API service port, used for regular API requests | `5800` |
| WS_PORT | WebSocket server port, used for real-time synchronization for canvases and documents | `5801` |
| ORIGIN | Client origin (where you are accessing the Refly application from), used for CORS check | `http://localhost:5700` |
| ENDPOINT | API endpoint, used for Refly API requests | `http://localhost:5800` |
| STATIC_ENDPOINT | Static file endpoint, used for serving static files | `http://localhost:5800/v1/misc/` |

### Credentials

| Env | Description | Default Value |
| --- | --- | --- |
| OPENAI_API_KEY | API key for OpenAI (or any other compatible provider), used for LLM inference and embeddings | (not set) |
| OPENAI_BASE_URL | Base URL for OpenAI compatible provider | `https://api.openai.com` |
| OPENROUTER_API_KEY | [OpenRouter](https://openrouter.ai/) API key, used for LLM inference | (not set) |
| JINA_API_KEY | [Jina](https://jina.ai/) API key, used for embeddings | (not set) |
| FIREWORKS_API_KEY | [Fireworks](https://fireworks.ai/) API key, used for embedding | (not set) |
| SERPER_API_KEY | [Serper](https://serper.dev/) API key, used for online search | (not set) |
| MARKER_API_KEY | [Marker](https://www.datalab.to/) API key, used for PDF parsing | (not set) |

### Middlewares

Refly depends on following middlewares to function properly:

- **Postgres**: used for basic data persistence
- **Redis**: used for cache, asynchronous task queue and coordination within distributed environment
- **Qdrant**: used for semantic searching via embeddings
- **Elasticsearch**: used for full-text searching within workspace
- **MinIO**: used for object storage for canvas, document and resource data

#### Postgres

| Env | Description | Default Value |
| --- | --- | --- |
| DATABASE_URL | PostgreSQL connection URL | `postgresql://refly:test@localhost:5432/refly?schema=refly` |

::: info
Refer to [Prisma doc](https://www.prisma.io/docs/orm/overview/databases/postgresql#connection-details) for detailed definition of connection URL.
:::

#### Redis

| Env | Description | Default Value |
| --- | --- | --- |
| REDIS_HOST | Redis host | `localhost` |
| REDIS_PORT | Redis port | `6379` |
| REDIS_PASSWORD | Redis password | `test` |

#### Qdrant (Vector Store)

| Env | Description | Default Value |
| --- | --- | --- |
| QDRANT_HOST | Qdrant host | `localhost` |
| QDRANT_PORT | Qdrant port | `6333` |
| QDRANT_API_KEY | Qdrant API key | (not set) |
| REFLY_VEC_DIM | Vector dimension size | `768` |

#### Elasticsearch

| Env | Description | Default Value |
| --- | --- | --- |
| ELASTICSEARCH_URL | Elasticsearch URL | `http://localhost:9200` |
| ELASTICSEARCH_USERNAME | Elasticsearch username | (not set) |
| ELASTICSEARCH_PASSWORD | Elasticsearch username | (not set) |

#### MinIO

Refly requires two MinIO instances:

- **Internal**: used for storing canvas, resource, and document data, typically with visibility set to *private*.
- **External**: used for storing uploaded files, typically with visibility set to *public*.

| Env | Description | Default Value |
| --- | --- | --- |
| MINIO_INTERNAL_ENDPOINT | MinIO host used for internal data | `localhost` |
| MINIO_INTERNAL_PORT | MinIO port used for internal data | `9000` |
| MINIO_INTERNAL_USE_SSL | Whether to use HTTPS for transport | `false` |
| MINIO_INTERNAL_ACCESS_KEY | Access key for internal MinIO | `minioadmin` |
| MINIO_INTERNAL_SECRET_KEY | Secret key for MinIO | `minioadmin` |
| MINIO_INTERNAL_BUCKET | Bucket name for internal | `refly-weblink` |
| MINIO_EXTERNAL_ENDPOINT | MinIO host used for internal data | `localhost` |
| MINIO_EXTERNAL_PORT | MinIO port used for internal data | `9000` |
| MINIO_EXTERNAL_USE_SSL | Whether to use HTTPS for transport | `false` |
| MINIO_EXTERNAL_ACCESS_KEY | Access key for internal MinIO | `minioadmin` |
| MINIO_EXTERNAL_SECRET_KEY | Secret key for MinIO | `minioadmin` |
| MINIO_EXTERNAL_BUCKET | Bucket name for internal | `refly-weblink` |

### Authentication Configuration

| Env | Description | Default Value |
| --- | --- | --- |
| AUTH_SKIP_VERIFICATION | Whether to skip email verification | `false` |
| REFLY_COOKIE_DOMAIN | Cookie domain used for signing authentication tokens | `localhost` |
| LOGIN_REDIRECT_URL | URL to redirect after OAuth login | (not set) |
| JWT_SECRET | JWT signing secret | `test` |
| JWT_EXPIRATION_TIME | JWT access token expiration time | `1h` |
| JWT_REFRESH_EXPIRATION_TIME | JWT refresh token expiration time | `7d` |
| COLLAB_TOKEN_EXPIRY | Collaboration token expiration time | `1h` |

::: info
The time format is compatible with [Vercel MS](https://github.com/vercel/ms).
:::

#### Email Authentication

| Env | Description | Default Value |
| --- | --- | --- |
| EMAIL_AUTH_ENABLED | Whether to enable email authentication | `true` |
| EMAIL_SENDER | Email sender | `Refly <notifications@refly.ai>` |
| RESEND_API_KEY | [Resend](https://resend.com/) API key, used for sending emails | `re_123` |

::: warning
The default `RESEND_API_KEY` is invalid (just a placeholder). Please set your own API key if needed.
:::

#### GitHub Authentication

| Env | Description | Default Value |
| --- | --- | --- |
| GITHUB_AUTH_ENABLED | Whether to enable GitHub authentication | `false` |
| GITHUB_CLIENT_ID | GitHub OAuth client ID | `test` |
| GITHUB_CLIENT_SECRET | GitHub OAuth client secret | `test` |
| GITHUB_CALLBACK_URL | GitHub OAuth callback URL | `test` |

::: warning
The default OAuth credentials are invalid (just a placeholder). Please set your own GitHub OAuth credentials if needed.
:::

::: info
You can learn more about GitHub OAuth at [GitHub Developer](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app).
:::

#### Google Authentication

| Env | Description | Default Value |
| --- | --- | --- |
| GOOGLE_AUTH_ENABLED | Whether to enable Google authentication | `false` |
| GOOGLE_CLIENT_ID | Google OAuth client ID | `test` |
| GOOGLE_CLIENT_SECRET | Google OAuth client secret | `test` |
| GOOGLE_CALLBACK_URL | Google OAuth callback URL | `test` |

::: warning
The default OAuth credentials are invalid (just a placeholder). Please set your own Google OAuth credentials if needed.
:::

::: info
You can learn more about Google OAuth at [Google Developer](https://developers.google.com/identity/protocols/oauth2).
:::

### Embeddings Configuration

| Env | Description | Default Value |
| --- | --- | --- |
| EMBEDDINGS_PROVIDER | Embeddings provider (either `jina`, `fireworks` or `openai`) | `jina` |
| EMBEDDINGS_MODEL_NAME | Embeddings model name | `jina-embeddings-v3` |
| EMBEDDINGS_DIMENSIONS | Embedding vector dimensions | `768` |
| EMBEDDINGS_BATCH_SIZE | Batch size for embedding processing | `512` |

::: warning
The default `EMBEDDINGS_PROVIDER` is `jina`. If you want to use other embeddings providers, please set the corresponding environment variables.
:::

::: warning
`EMBEDDINGS_DIMENSIONS` must be set to the same value as `REFLY_VEC_DIM` in Qdrant.
:::

### Reranker

| Env | Description | Default Value |
| --- | --- | --- |
| RERANKER_TOP_N | Number of top results to rerank | `10` |
| RERANKER_MODEL | Reranker model name | `jina-reranker-v2-base-multilingual` |
| RERANKER_RELEVANCE_THRESHOLD | Relevance threshold for reranking | `0.5` |

::: warning
Currently, only Jina rerankers are supported. You need to set the `JINA_API_KEY` environment variable.
:::

### Skill Execution

| Env | Description | Default Value |
| --- | --- | --- |
| REFLY_DEFAULT_MODEL | Default AI model | `openai/gpt-4o-mini` |
| SKILL_IDLE_TIMEOUT | Skill idle timeout in milliseconds | `60000` |
| SKILL_EXECUTION_TIMEOUT | Skill execution timeout in milliseconds | `180000` |

### Stripe

| Env | Description | Default Value |
| --- | --- | --- |
| STRIPE_API_KEY | Stripe API key | (not set) |
| STRIPE_ACCOUNT_WEBHOOK_SECRET | Stripe account webhook secret | `test` |
| STRIPE_ACCOUNT_TEST_WEBHOOK_SECRET | Stripe test account webhook secret | `test` |
| STRIPE_SESSION_SUCCESS_URL | Stripe success redirect URL | (not set) |
| STRIPE_SESSION_CANCEL_URL | Stripe cancellation redirect URL | (not set) |
| STRIPE_PORTAL_RETURN_URL | Stripe customer portal return URL | (not set) |

### Quota

#### Request Quota

| Env | Description | Default Value |
| --- | --- | --- |
| QUOTA_T1_REQUEST | Tier 1 request quota | `-1` |
| QUOTA_T2_REQUEST | Tier 2 request quota | `-1` |

#### Storage Quota

| Env | Description | Default Value |
| --- | --- | --- |
| QUOTA_STORAGE_FILE | File storage quota | `-1` |
| QUOTA_STORAGE_OBJECT | Object storage quota | `-1` |
| QUOTA_STORAGE_VECTOR | Vector storage quota | `-1` |

## Web Frontend

The following are the detailed configurations for the web frontend. You can inject these environment variables into the `refly_web` container.

### General Config

| Env | Description | Default Value |
| --- | --- | --- |
| REFLY_API_URL | Refly API server URL | `http://localhost:5800` |
| COLLAB_URL | Collaboration endpoint URL | `http://localhost:5801` |