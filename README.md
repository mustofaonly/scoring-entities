# scoring-entities

Shared TypeScript entities and Zod schemas for pencak silat scoring.

## Prisma schema and migrations

The npm package includes the PostgreSQL schema, configuration example, and
[migration guide](./src/infra/database/migrations/MIGRATION_GUIDE.md) under
`src/infra/database/migrations/`.

After installing the package, copy these templates into your project:

```sh
mkdir -p src/infra/database
cp -R node_modules/@musthida/scoring-entities/src/infra/database/migrations src/infra/database/
cp src/infra/database/migrations/prisma.config.ts.example prisma.config.ts
```

Use a destination without an existing `migrations` directory to avoid overwriting
local changes. Review the copied schema and follow its migration guide before
applying it. Keep application migration history in your own project.

Tools can also locate the packaged files through the `prisma/*` exports:

```js
const schemaPath = require.resolve("@musthida/scoring-entities/prisma/schema.prisma");
const configExamplePath = require.resolve("@musthida/scoring-entities/prisma/prisma.config.ts.example");
const guidePath = require.resolve("@musthida/scoring-entities/prisma/MIGRATION_GUIDE.md");
```
