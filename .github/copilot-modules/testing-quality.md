# Testing & Quality - Virsaitis

**Module**: Testing & Quality
**Load**: When writing tests, checking quality gates
**Version**: 2.0.0
**Updated**: 2026-02-17

---

## 🎯 Purpose

Defines testing standards, coverage targets, quality metrics, and validation procedures for all Virsaitis components.

---

## 🤖 Machine Policy

```
[TESTING_STANDARDS]
FRAMEWORK_MCP=vitest
FRAMEWORK_EXTENSION=@vscode/test-electron
FRAMEWORK_AGENT=manual_review
TDD=preferred

[COVERAGE_TARGETS]
OVERALL=70_percent_minimum
SECURITY_CRITICAL=100_percent_required
GOVERNANCE=100_percent_required
UTILITIES=70_percent

[QUALITY_GATES]
BUILD=must_succeed
TESTS=must_pass_all
LINT=zero_errors
COVERAGE=meet_targets
SECURITY_TESTS=100_percent_pass
```

---

## 🧪 Testing Frameworks

### MCP Server (TypeScript)

**FRAMEWORK**: Vitest

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
      exclude: [
        'node_modules/',
        'build/',
        '**/*.test.ts',
        '**/*.spec.ts',
      ],
    },
    globals: true,
    environment: 'node',
  },
});
```

**RUN TESTS**:
```bash
npm test                    # Run all tests
npm run test:watch          # Watch mode
npm run test:coverage       # Coverage report
npm run test:ui             # UI interface
```

### VS Code Extension (TypeScript)

**FRAMEWORK**: @vscode/test-electron

**test/runTest.ts**:
```typescript
import * as path from 'path';
import { runTests } from '@vscode/test-electron';

async function main() {
  try {
    const extensionDevelopmentPath = path.resolve(__dirname, '../../');
    const extensionTestsPath = path.resolve(__dirname, './suite/index');

    await runTests({
      extensionDevelopmentPath,
      extensionTestsPath,
    });
  } catch (err) {
    console.error('Failed to run tests');
    process.exit(1);
  }
}

main();
```

**RUN TESTS**:
```bash
npm test                    # Run extension tests
```

Tests run in Extension Development Host (isolated VS Code instance).

### Agent (Markdown)

**VALIDATION**: Manual review

**CHECKLIST**:
- [ ] Atomic sentence structure (one concept per sentence)
- [ ] Each sentence <80 characters
- [ ] No compound clauses
- [ ] Clear subject-verb-object
- [ ] Standalone comprehensibility

**NO AUTOMATED TESTING** (atomic structure requires human judgment)

---

## 📊 Coverage Targets (TIER-1)

### Minimum Coverage

| Component | Overall | Security | Governance |
|-----------|---------|----------|------------|
| **MCP Server** | ≥70% | 100% | 100% |
| **Extension** | ≥70% | 100% | 100% |
| **Agent** | Manual | N/A | Manual |
| **Skills** | Manual | N/A | Manual |

### What to Cover

**MUST COVER (100%)**:
- Security-critical code (secret scanning, validation)
- Governance enforcement (TIER validation, file protection)
- MCP tool handlers (core governance tools)
- Extension interceptors (file operation blocking)

**SHOULD COVER (≥70%)**:
- Business logic
- Data transformations
- Error handling
- Configuration management
- Utility functions

**CAN SKIP**:
- Generated code
- Third-party library wrappers (covered by library tests)
- Simple getters/setters (if trivial)
- Type definitions only files

---

## ✅ Test Structure

### Unit Test Pattern

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { GovernanceValidator } from '../src/governance/validator';

describe('GovernanceValidator', () => {
  let validator: GovernanceValidator;

  beforeEach(() => {
    // Setup: Create fresh validator instance
    validator = new GovernanceValidator();
  });

  afterEach(() => {
    // Cleanup: Dispose resources
    validator.dispose();
  });

  describe('validateFileOperation', () => {
    describe('Protected Files', () => {
      it('should block modification of copilot-instructions.md', () => {
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

      it('should block modification of agent files', () => {
        // Given
        const operation = 'write';
        const filePath = '.github/agents/Virsaitis.agent.md';

        // When
        const result = validator.validateFileOperation(operation, filePath);

        // Then
        expect(result.allowed).toBe(false);
        expect(result.tier).toBe('TIER-0');
      });
    });

    describe('Non-Protected Files', () => {
      it('should allow modification of source files', () => {
        // Given
        const operation = 'write';
        const filePath = 'src/my-file.ts';

        // When
        const result = validator.validateFileOperation(operation, filePath);

        // Then
        expect(result.allowed).toBe(true);
        expect(result.tier).toBeUndefined();
      });
    });

    describe('Edge Cases', () => {
      it('should handle null file path', () => {
        // Given
        const operation = 'write';
        const filePath = null as any;

        // When/Then
        expect(() => validator.validateFileOperation(operation, filePath))
          .toThrow('File path is required');
      });

      it('should handle path traversal attempts', () => {
        // Given
        const operation = 'write';
        const filePath = '../../../etc/passwd';

        // When/Then
        expect(() => validator.validateFileOperation(operation, filePath))
          .toThrow('Path traversal detected');
      });
    });
  });
});
```

### Integration Test Pattern

```typescript
describe('MCP Server Integration', () => {
  let server: MCPServer;
  let client: MCPClient;

  beforeAll(async () => {
    // Start MCP server
    server = new MCPServer();
    await server.start();

    // Connect client
    client = new MCPClient('http://localhost:3000');
  });

  afterAll(async () => {
    // Cleanup
    await server.stop();
  });

  it('should validate protected file operation via MCP', async () => {
    // Given
    const request = {
      operation: 'write',
      filePath: '.github/copilot-instructions.md',
    };

    // When
    const response = await client.callTool('mcp_virsaitis_validate_operation', request);

    // Then
    expect(response.allowed).toBe(false);
    expect(response.tier).toBe('TIER-0');
  });
});
```

---

## 🔒 Security Testing (TIER-1)

### Security Test Requirements

**100% COVERAGE REQUIRED**:
- Secret detection (all patterns)
- Path traversal prevention
- Command injection prevention
- Input validation
- Error handling (no information leaks)

### Security Test Examples

```typescript
describe('Security Tests', () => {
  describe('Secret Detection', () => {
    it('should detect hardcoded API keys', () => {
      const code = 'const apiKey = "sk-abc123def456";';
      const result = secretScanner.scan(code);
      expect(result.violations).toContainEqual({
        type: 'API_KEY',
        line: 1,
        pattern: 'sk-abc123def456',
      });
    });

    it('should detect AWS access keys', () => {
      const code = 'AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE';
      const result = secretScanner.scan(code);
      expect(result.violations).toHaveLength(1);
    });

    it('should not flag environment variable references', () => {
      const code = 'const apiKey = process.env.API_KEY;';
      const result = secretScanner.scan(code);
      expect(result.violations).toHaveLength(0);
    });
  });

  describe('Path Traversal Prevention', () => {
    it('should block ../ in file paths', () => {
      expect(() => validatePath('../../../etc/passwd'))
        .toThrow('Path traversal detected');
    });

    it('should block ~/ in file paths', () => {
      expect(() => validatePath('~/sensitive-file'))
        .toThrow('Path traversal detected');
    });
  });

  describe('Command Injection Prevention', () => {
    it('should block shell metacharacters', () => {
      expect(() => executeCommand('npm', ['install', '; rm -rf /']))
        .toThrow('Invalid argument');
    });
  });
});
```

---

## 🎯 Test-Driven Development (TDD)

### Red-Green-Refactor Cycle

```
1. RED: Write failing test
   ↓
2. GREEN: Write minimum code to pass
   ↓
3. REFACTOR: Improve code quality
   ↓
4. REPEAT
```

### TDD Example

**STEP 1: Red (Write Failing Test)**
```typescript
it('should block protected file modification', () => {
  const result = validator.validateFileOperation('write', '.github/copilot-instructions.md');
  expect(result.allowed).toBe(false);
});
```

Run test: ❌ FAILS (validator not implemented)

**STEP 2: Green (Minimum Implementation)**
```typescript
validateFileOperation(operation: string, filePath: string): ValidationResult {
  if (filePath === '.github/copilot-instructions.md') {
    return { allowed: false, tier: 'TIER-0' };
  }
  return { allowed: true };
}
```

Run test: ✅ PASSES

**STEP 3: Refactor (Improve)**
```typescript
validateFileOperation(operation: string, filePath: string): ValidationResult {
  const protectedPatterns = [
    '.github/copilot-instructions.md',
    '.github/copilot-modules/',
    '.github/agents/',
  ];

  const isProtected = protectedPatterns.some(pattern => filePath.includes(pattern));

  if (isProtected) {
    return {
      allowed: false,
      tier: 'TIER-0',
      reason: 'Protected file modification blocked',
    };
  }

  return { allowed: true };
}
```

Run test: ✅ STILL PASSES

---

## 📏 Quality Metrics

### Code Quality Standards (TIER-2)

**LINTING**: Zero errors, warnings acceptable

**COMPLEXITY**: Cyclomatic complexity <15 per function

**DUPLICATION**: <5% code duplication

**MAINTAINABILITY INDEX**: >70 (good), >50 (acceptable)

### Measure Quality

```bash
# Linting
npm run lint

# Type checking
npm run type-check

# Complexity (if tool available)
npx complexity-report src/

# Duplication (if tool available)
npx jscpd src/
```

---

## 🚦 Quality Gates (TIER-1)

### Pre-Commit Gates

**ALL MUST PASS**:
```bash
npm run build               # ✅ Build succeeds
npm test                    # ✅ All tests pass
npm run lint                # ✅ Zero linter errors
npm run type-check          # ✅ TypeScript strict mode
npm run test:coverage       # ✅ Coverage ≥70%
npm run test:security       # ✅ Security tests 100% pass
```

**IF ANY FAIL**: Must fix before commit

### Pre-Merge Gates

**ALL MUST PASS**:
- [ ] All pre-commit gates passed
- [ ] Code review approved
- [ ] Documentation updated
- [ ] CHANGELOG updated
- [ ] traceability.csv updated
- [ ] No TIER-0 violations introduced
- [ ] Performance acceptable (no regressions)

### Pre-Release Gates

**ALL MUST PASS**:
- [ ] All pre-merge gates passed
- [ ] End-to-end tests pass
- [ ] Manual testing complete (critical paths)
- [ ] Distribution package built successfully
- [ ] Installation instructions verified
- [ ] Migration guide written (if breaking changes)

---

## 🔄 Continuous Integration

### CI Pipeline

```yaml
# .github/workflows/test.yml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Lint
        run: npm run lint

      - name: Type check
        run: npm run type-check

      - name: Test
        run: npm test

      - name: Coverage
        run: npm run test:coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

---

## 📖 Test Documentation

### Test Naming

**CONVENTION**:
```
describe('[Component/Feature]', () => {
  describe('[Method/Function]', () => {
    it('should [expected behavior] when [condition]', () => {
      // Test implementation
    });
  });
});
```

**EXAMPLES**:
```typescript
describe('GovernanceValidator', () => {
  describe('validateFileOperation', () => {
    it('should block protected files when write operation', () => {});
    it('should allow non-protected files when write operation', () => {});
    it('should throw error when file path is null', () => {});
  });
});
```

### Test Comments

**GIVEN-WHEN-THEN**:
```typescript
it('should block protected file modification', () => {
  // Given: Protected file and write operation
  const operation = 'write';
  const filePath = '.github/copilot-instructions.md';

  // When: Validation runs
  const result = validator.validateFileOperation(operation, filePath);

  // Then: Operation is blocked with TIER-0
  expect(result.allowed).toBe(false);
  expect(result.tier).toBe('TIER-0');
});
```

---

## 💡 Best Practices

### Test Independence

**EACH TEST SHOULD**:
- Run independently (no order dependency)
- Create own test data
- Clean up after itself
- Not share state with other tests

### Test Data

**PREFER**:
- Inline test data (visible in test)
- Fixtures for large data
- Factories for object creation
- Mocks for external dependencies

**AVOID**:
- Shared mutable state
- Real external services (use mocks)
- Hard-coded file paths (use temp directories)

### Mocking

**WHEN TO MOCK**:
- External services (APIs, databases)
- File system operations (use in-memory)
- Network requests
- Time-dependent operations

**EXAMPLE**:
```typescript
import { vi } from 'vitest';

it('should call MCP server', async () => {
  // Mock fetch
  const fetchMock = vi.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    json: async () => ({ allowed: false }),
  } as Response);

  // Test
  const result = await mcpClient.validateOperation('write', 'file.ts');

  // Verify
  expect(fetchMock).toHaveBeenCalledWith(
    'http://localhost:3000/validate',
    expect.objectContaining({ method: 'POST' })
  );
});
```

---

## 📚 Quick Reference

| Aspect | Standard | Tool/Command |
|--------|----------|--------------|
| **Framework (MCP)** | Vitest | `npm test` |
| **Framework (Extension)** | @vscode/test-electron | `npm test` |
| **Coverage Target** | ≥70% overall | `npm run test:coverage` |
| **Security Coverage** | 100% required | Security test suite |
| **Pre-Commit** | All tests pass | CI/git hooks |
| **TDD** | Preferred | Red-Green-Refactor |

---

*Testing & Quality Module v2.0.0*
*Comprehensive testing standards for Virsaitis*
