# MCP Standards - Layer 2

**Module**: MCP Standards
**Component**: Layer 2 (Model Context Protocol Server)
**Load**: When working on virsaitis-development/virsaitis-mcp/
**Version**: 2.0.0
**Updated**: 2026-02-17

---

## 🎯 Purpose

Defines TypeScript standards, MCP SDK usage, and development workflow for Virsaitis MCP Server (Layer 2 governance enforcement).

---

## 🤖 Machine Policy

```
[TECHNOLOGY_STACK]
LANGUAGE=TypeScript 5.0+
RUNTIME=Node.js 18+
FRAMEWORK=@modelcontextprotocol/sdk
BUILD=tsc + esbuild
TEST=vitest
LINT=eslint + prettier

[CODE_STANDARDS]
INDENTATION=2_spaces
LINE_LENGTH=100_chars
QUOTES=single
SEMICOLONS=required
TRAILING_COMMAS=required_multiline

[QUALITY_GATES]
BUILD=must_succeed
TESTS=must_pass
LINT=zero_errors
TYPE_CHECK=strict_mode
COVERAGE=70_percent_min
```

---

## 📐 TypeScript Standards (TIER-1)

### Indentation & Formatting

**REQUIRED**:
- **Indentation**: 2 spaces (not 4, not tabs)
- **Line length**: 100 characters maximum
- **Quotes**: Single quotes `'string'` for strings
- **Semicolons**: Required at end of statements
- **Trailing commas**: Required for multiline arrays/objects

✅ **GOOD**:
```typescript
const config = {
  server: 'virsaitis-mcp',
  port: 3000,
  enabled: true,
};
```

❌ **BAD**:
```typescript
const config = {
    server: "virsaitis-mcp",
    port: 3000,
    enabled: true
}  // Missing trailing comma, 4 spaces, double quotes
```

### File Organization

**STANDARD ORDER**:
```typescript
// 1. External imports (Node.js, npm packages)
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import * as fs from 'fs';

// 2. Internal imports (project files)
import { GovernanceValidator } from './governance/validator.js';
import { PolicyEngine } from './policy/engine.js';

// 3. Type definitions
interface ValidationResult {
  allowed: boolean;
  reason?: string;
}

// 4. Constants
const PROTECTED_PATTERNS = [
  '.github/copilot-instructions.md',
  'requirements/**',
];

// 5. Class/function implementations
export class VirsaitisMCPServer {
  // Implementation
}
```

### Naming Conventions (TIER-1)

| Element | Convention | Example |
|---------|------------|---------|
| **Classes** | PascalCase | `GovernancePolicyValidator` |
| **Interfaces** | PascalCase | `PolicyResult` or `IPolicyResult` |
| **Types** | PascalCase | `OperationType` |
| **Functions** | camelCase | `validateFileOperation` |
| **Methods** | camelCase | `checkPermissions` |
| **Variables** | camelCase | `isValid`, `fileName` |
| **Constants** | UPPER_SNAKE_CASE | `MAX_RETRIES`, `PROTECTED_PATTERNS` |
| **Private members** | Leading underscore | `_config`, `_cache` |
| **Enums**| PascalCase | `TierLevel` |
| **Enum values** | PascalCase | `TierLevel.Critical` |

---

## 🔧 MCP Server Architecture

### Server Structure

```
virsaitis-development/virsaitis-mcp/
├── src/
│   ├── index.ts                    (server entry point)
│   ├── server.ts                   (MCP server class)
│   ├── governance/
│   │   ├── validator.ts            (TIER validation)
│   │   ├── policy-engine.ts        (rule engine)
│   │   └── consequence-evaluator.ts (impact assessment)
│   ├── tools/
│   │   ├── read-governance.ts      (mcp_virsaitis_read_governance)
│   │   ├── validate-operation.ts   (mcp_virsaitis_validate_operation)
│   │   ├── edit-file.ts            (mcp_virsaitis_edit_file)
│   │   └── run-command.ts          (mcp_virsaitis_run_command)
│   ├── resources/
│   │   └── governance-rules.ts     (rule definitions)
│   └── utils/
│       ├── file-system.ts
│       └── patterns.ts
├── tests/
│   ├── unit/
│   ├── integration/
│   └── fixtures/
├── build/                           (compiled output)
├── package.json
├── tsconfig.json
├── vitest.config.ts
└── README.md
```

### MCP Tools Implementation

**TOOL PATTERN**:
```typescript
// Tool definition
server.setRequestHandler(ToolsListRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'mcp_virsaitis_validate_operation',
        description: 'Validates if an operation is allowed by governance policy',
        inputSchema: {
          type: 'object',
          properties: {
            operation: {
              type: 'string',
              description: 'Operation type: read, write, delete, execute',
            },
            filePath: {
              type: 'string',
              description: 'Absolute file path',
            },
          },
          required: ['operation', 'filePath'],
        },
      },
    ],
  };
});

// Tool execution
server.setRequestHandler(ToolCallRequestSchema, async (request) => {
  if (request.params.name === 'mcp_virsaitis_validate_operation') {
    const { operation, filePath } = request.params.arguments;

    // Validation logic
    const result = await governanceValidator.validate(operation, filePath);

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  }
});
```

---

## ✅ Type Safety (TIER-1)

### TypeScript Configuration

**tsconfig.json REQUIREMENTS**:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": false,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./build",
    "rootDir": "./src"
  }
}
```

**STRICT MODE REQUIRED**:
- `strict: true` (enables all strict checks)
- `noImplicitAny: true` (no implicit any types)
- `strictNullChecks: true` (null/undefined handling)
- `strictFunctionTypes: true` (function type checking)
- `strictPropertyInitialization: true` (class property init)

### Explicit Type Annotations

**REQUIRED FOR**:
- Public function return types
- Public method return types
- Exported interfaces/types
- Complex function parameters

✅ **GOOD**:
```typescript
export function validateTier(tier: string): boolean {
  return ['TIER-0', 'TIER-1', 'TIER-2', 'TIER-3'].includes(tier);
}

export interface PolicyResult {
  allowed: boolean;
  tier: string;
  reason?: string;
  consequences?: Consequence[];
}
```

❌ **BAD**:
```typescript
export function validateTier(tier) {  // Missing parameter type
  return ['TIER-0', 'TIER-1', 'TIER-2', 'TIER-3'].includes(tier);
}  // Missing return type

export interface PolicyResult {
  allowed;  // Missing type
  tier;     // Missing type
}
```

---

## 🧪 Testing Standards (TIER-1)

### Test Framework

**USING**: Vitest (fast, TypeScript-native)

**vitest.config.ts**:
```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      lines: 70,
      functions: 70,
      branches: 70,
      statements: 70,
    },
  },
});
```

### Test Structure

**PATTERN**:
```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { GovernanceValidator } from '../src/governance/validator';

describe('GovernanceValidator', () => {
  let validator: GovernanceValidator;

  beforeEach(() => {
    validator = new GovernanceValidator();
  });

  describe('validateFileOperation', () => {
    it('should block protected file modification', () => {
      // Given
      const operation = 'write';
      const filePath = '.github/copilot-instructions.md';

      // When
      const result = validator.validateFileOperation(operation, filePath);

      // Then
      expect(result.allowed).toBe(false);
      expect(result.tier).toBe('TIER-0');
      expect(result.reason).toContain('protected file');
    });

    it('should allow non-protected file modification', () => {
      // Given
      const operation = 'write';
      const filePath = 'src/my-file.ts';

      // When
      const result = validator.validateFileOperation(operation, filePath);

      // Then
      expect(result.allowed).toBe(true);
    });
  });
});
```

### Test Coverage Requirements

**MINIMUM COVERAGE**:
- Overall: 70%
- Security-critical code: 100%
- Governance validation: 100%
- Consequence evaluation: 100%
- Tool implementations: 90%
- Utilities: 70%

**MEASURE**:
```bash
npm run test:coverage
```

---

## 🔒 Security Standards

### Input Validation

**ALWAYS VALIDATE**:
```typescript
function validateFilePath(filePath: string): string {
  // Check for null/undefined
  if (!filePath) {
    throw new Error('File path is required');
  }

  // Check for path traversal
  if (filePath.includes('..')) {
    throw new Error('Path traversal detected');
  }

  // Normalize path
  const normalized = path.normalize(filePath);

  // Ensure absolute path
  if (!path.isAbsolute(normalized)) {
    throw new Error('Absolute path required');
  }

  return normalized;
}
```

### Error Handling

**NEVER EXPOSE**:
- Internal file paths in error messages
- Sensitive configuration
- Stack traces to external systems
- Credentials or secrets

✅ **GOOD**:
```typescript
try {
  await fs.promises.readFile(filePath);
} catch (error) {
  // Log full error internally
  logger.error('File read failed', { filePath, error });

  // Return sanitized error to user
  return {
    success: false,
    message: 'Unable to read file',
  };
}
```

❌ **BAD**:
```typescript
try {
  await fs.promises.readFile(filePath);
} catch (error) {
  // Exposes internal path
  return {
    success: false,
    message: `Failed to read ${filePath}: ${error.message}`,
  };
}
```

---

## 🔄 Build & Development Workflow

### Development Commands

```bash
# Install dependencies
npm install

# Start development with file watching
npm run dev

# Build TypeScript
npm run build

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# TypeScript type checking
npm run type-check

# Format code
npm run format
```

### Before Commit Checklist (TIER-1)

**ALL MUST PASS**:
```bash
npm run build       # ✅ Must succeed
npm test            # ✅ Must pass (all tests)
npm run lint        # ✅ Zero errors
npm run type-check  # ✅ No type errors
npm run test:coverage  # ✅ Coverage ≥70%
```

**IF ANY FAIL**: Fix before committing

---

## 📦 MCP Server Packaging

### Build Output

**COMPILED TO**: `build/` directory

**INCLUDES**:
- `build/index.js` (entry point)
- `build/**/*.js` (compiled TypeScript)
- `build/**/*.d.ts` (type definitions)
- `build/**/*.js.map` (source maps)

### NPM Package

**package.json ESSENTIALS**:
```json
{
  "name": "@virsaitis/mcp-server",
  "version": "2.0.0",
  "type": "module",
  "main": "./build/index.js",
  "types": "./build/index.d.ts",
  "bin": {
    "virsaitis-mcp": "./build/index.js"
  },
  "engines": {
    "node": ">=18.0.0"
  },
  "scripts": {
    "build": "tsc && esbuild",
    "test": "vitest run",
    "test:coverage": "vitest run --coverage",
    "lint": "eslint src/",
    "type-check": "tsc --noEmit"
  }
}
```

---

## 🔗 Integration with Agent & Extension

### Agent → MCP Communication

**Agent calls MCP tools**:
```markdown
[Agent.md instruction]
Before editing protected file, call mcp_virsaitis_validate_operation tool.
Tool returns whether operation allowed.
If not allowed, respond with TIER-0 VIOLATION PREVENTED.
```

**MCP response format**:
```typescript
interface ValidationResponse {
  allowed: boolean;
  tier: 'TIER-0' | 'TIER-1' | 'TIER-2' | 'TIER-3';
  reason?: string;
  consequences?: {
    operation: string;
    userImpact: string;
    technicalImpact: string;
    businessImpact: string;
    remediation: string;
  };
}
```

### MCP ← Extension Communication

**Extension queries MCP**:
- User tries to edit file
- Extension calls mcp_virsaitis_validate_operation
- MCP validates against governance
- Extension shows 🛡️ shield if protected
- Extension blocks action if TIER-0

---

## 💡 Best Practices

### Code Organization

**ONE CONCERN PER FILE**:
- Each file handles one specific responsibility
- Validators in `governance/`
- Tools in `tools/`
- Utilities in `utils/`

**SMALL FUNCTIONS**:
- Keep functions <50 lines
- Single responsibility
- Testable in isolation

**AVOID GOD CLASSES**:
- Break large classes into smaller components
- Use composition over inheritance
- Inject dependencies

### Performance

**CACHING**:
```typescript
class GovernanceCache {
  private _rulesCache: Map<string, Rule[]> = new Map();
  private _cacheExpiry = 5 * 60 * 1000; // 5 minutes

  async getRules(category: string): Promise<Rule[]> {
    const cached = this._rulesCache.get(category);
    if (cached && !this.isExpired(cached)) {
      return cached;
    }

    const rules = await this.loadRules(category);
    this._rulesCache.set(category, rules);
    return rules;
  }
}
```

---

## 📚 Quick Reference

| Aspect | Standard | Command |
|--------|----------|---------|
| **Indentation** | 2 spaces | ESLint enforces |
| **Build** | `tsc` + `esbuild` | `npm run build` |
| **Test** | Vitest | `npm test` |
| **Coverage** | ≥70% | `npm run test:coverage` |
| **Lint** | ESLint + Prettier | `npm run lint` |
| **Type Check** | TypeScript strict | `npm run type-check` |

---

*MCP Standards Module v2.0.0*
*TypeScript governance enforcement server*
