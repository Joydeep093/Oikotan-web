# Security Controls - Virsaitis

**Module**: Security Controls
**Load**: For security-sensitive operations, all commits
**Version**: 2.0.0
**Updated**: 2026-02-17

---

## 🎯 Purpose

Defines secret management, input validation, security scanning, and secure coding practices for all Virsaitis components.

---

## 🤖 Machine Policy

```
[SECRET_MANAGEMENT]
HARDCODED_SECRETS=prohibited (TIER-0)
ENVIRONMENT_VARIABLES=required
SECRET_ROTATION=mandatory_on_exposure
SCAN_BEFORE_COMMIT=required

[INPUT_VALIDATION]
FILE_PATHS=sanitize_always
USER_COMMANDS=escape_required
REGEX_PATTERNS=redos_check
EXTERNAL_INPUT=validate_type_bounds

[ERROR_HANDLING]
INTERNAL_PATHS=never_expose
SENSITIVE_DATA=never_log
STACK_TRACES=internal_only
AUDIT_LOGGING=required
```

---

## 🚨 Secret Management (TIER-0)

### Never Commit Secrets

**PROHIBITED PATTERNS**:
- Hardcoded passwords: `password = "MySecret123"`
- API keys in code: `API_KEY = "sk-abc123..."`
- Database credentials: `DB_URL = "postgresql://user:pass@host"`
- Private keys in files: `.pem`, `.pfx`, `.key` files
- OAuth tokens: `token = "ghp_..."`
- Session cookies: `session_id = "..."`
- AWS access keys: `AWS_SECRET_ACCESS_KEY = "..."`

### Required Approach

**USE ENVIRONMENT VARIABLES**:
```typescript
// ✅ GOOD: Reference environment variable
const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error('API_KEY environment variable required');
}

// ❌ BAD: Hardcoded secret
const apiKey = 'sk-abc123def456...';
```

**DOCUMENT SECRET NAMES, NOT VALUES**:
```markdown
## Configuration

Required environment variables:
- `API_KEY`: OpenAI API key (get from platform.openai.com)
- `DB_PASSWORD`: PostgreSQL password
- `JWT_SECRET`: Random 32-character string
```

**USE SECRET MANAGEMENT SERVICES**:
- Azure Key Vault
- AWS Secrets Manager
- HashiCorp Vault
- GitHub Secrets (for CI/CD)

### Consequence if Violated

**TIER-0 VIOLATION**:
- **Operation**: BLOCKED, commit rejected
- **User Impact**: Must rotate credential within 1 hour, file incident report
- **Technical Impact**: Security incident triggered, audit log created, automated alerts sent
- **Business Impact**: Compliance violation, potential data breach, regulatory fines possible, customer trust damaged
- **Remediation**:
  1. Remove secret from Git history: `git filter-repo --path-glob '*secrets*' --invert-paths`
  2. Rotate credential immediately (generate new key)
  3. Update all systems using old credential
  4. Complete security incident report
  5. Review: How did secret get committed? Fix process gap

---

## 🔍 Secret Scanning (TIER-1)

### Before Every Commit

**RUN SECURITY SCAN**:
```bash
# Automated scan (if available)
python scripts/security-scan.py

# Manual pattern check
git diff --cached | grep -Ei "(password|api[_-]?key|secret|token|credential|private[_-]?key)"
```

**IF MATCH FOUND**:
1. STOP commit immediately
2. Review match: Is it actually a secret?
3. If yes: Remove secret, use environment variable reference
4. If false positive: Add to exceptions list (carefully)
5. Re-run scan
6. Confirm: No secrets detected

### Secret Patterns

**COMMON PATTERNS**:
```regex
# API Keys
(api[_-]?key|apikey)[\s:=]["']?[a-zA-Z0-9_-]{20,}

# AWS Keys
(AKIA[0-9A-Z]{16}|aws_secret_access_key)

# Private Keys
-----BEGIN (RSA|DSA|EC|OPENSSH) PRIVATE KEY-----

# GitHub Tokens
ghp_[a-zA-Z0-9]{36}

# JWT Tokens
eyJ[a-zA-Z0-9_-]+\.eyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+

# Database URLs
(postgresql|mysql)://[^:]+:[^@]+@[^/]+
```

---

## 🛡️ Input Validation (TIER-1)

### File Path Validation

**ALWAYS VALIDATE**:
```typescript
function validateFilePath(filePath: string): string {
  // 1. Check null/undefined
  if (!filePath) {
    throw new Error('File path is required');
  }

  // 2. Check path traversal
  if (filePath.includes('..') || filePath.includes('~')) {
    throw new Error('Path traversal detected');
  }

  // 3. Normalize path
  const normalized = path.normalize(filePath);

  // 4. Ensure absolute path
  if (!path.isAbsolute(normalized)) {
    throw new Error('Absolute path required');
  }

  // 5. Check against whitelist (if applicable)
  const allowed = [
    'virsaitis-development/',
    '.github/',
    'docs/',
  ];

  if (!allowed.some(prefix => normalized.startsWith(prefix))) {
    throw new Error('File path not in allowed directories');
  }

  return normalized;
}
```

**WHY**:
- Prevents directory traversal attacks (`../../../etc/passwd`)
- Prevents access to system files
- Ensures operations stay within workspace

### Command Execution Validation

**ALWAYS SANITIZE**:
```typescript
function executeCommand(command: string, args: string[]): Promise<string> {
  // 1. Whitelist allowed commands
  const allowedCommands = ['npm', 'python', 'git', 'tsc'];
  if (!allowedCommands.includes(command)) {
    throw new Error(`Command not allowed: ${command}`);
  }

  // 2. Escape arguments (prevent injection)
  const escapedArgs = args.map(arg => shell Escape(arg));

  // 3. Execute with spawn (not exec)
  const result = await execFile(command, escapedArgs);

  return result.stdout;
}
```

**WHY**:
- Prevents command injection
- Limits blast radius (whitelist only)
- Prevents shell expansion attacks

### Regular Expression Validation

**PREVENT ReDoS**:
```typescript
// ❌ BAD: Catastrophic backtracking
const badRegex = /^(a+)+$/;

// ✅ GOOD: No backtracking
const goodRegex = /^a+$/;

// Validate regex complexity
function isRegexSafe(pattern: string): boolean {
  // Check for nested quantifiers
  if (/(\*|\+|\{[^}]+\})(\*|\+|\{[^}]+\})/.test(pattern)) {
    return false;
  }

  // Check length (prevent excessive backtracking)
  if (pattern.length > 1000) {
    return false;
  }

  return true;
}
```

**WHY**:
- ReDoS attacks cause CPU exhaustion
- Can DOS entire server
- Hard to detect without analysis

### Type and Bounds Validation

**ALWAYS CHECK**:
```typescript
interface FileOperationParams {
  operation: 'read' | 'write' | 'delete';
  filePath: string;
  content?: string;
}

function validateParams(params: any): FileOperationParams {
  // Type check
  if (typeof params !== 'object') {
    throw new Error('Params must be object');
  }

  // Required fields
  if (!params.operation || !params.filePath) {
    throw new Error('Missing required fields');
  }

  // Enum validation
  const validOps = ['read', 'write', 'delete'];
  if (!validOps.includes(params.operation)) {
    throw new Error(`Invalid operation: ${params.operation}`);
  }

  // Bounds validation
  if (params.content && params.content.length > 1_000_000) {
    throw new Error('Content too large (max 1MB)');
  }

  return params as FileOperationParams;
}
```

---

## ⚠️ Error Handling (TIER-1)

### Never Expose Internal Details

**❌ BAD**:
```typescript
try {
  await fs.promises.readFile(filePath);
} catch (error) {
  // Exposes internal file path to user
  throw new Error(`Failed to read ${filePath}: ${error.message}`);
}
```

**✅ GOOD**:
```typescript
try {
  await fs.promises.readFile(filePath);
} catch (error) {
  // Log full details internally
  logger.error('File read failed', {
    filePath,
    error: error.message,
    stack: error.stack
  });

  // Return sanitized error to user
  throw new Error('Unable to read file. Check permissions and file existence.');
}
```

### Logging Security

**NEVER LOG**:
- Passwords or secrets
- API keys or tokens
- Personal Identifiable Information (PII)
- Credit card numbers
- Full file paths (use relative paths)
- Stack traces to external systems

**DO LOG**:
- Audit trail (who did what when)
- Governance violations (with sanitized details)
- Security scan results
- Authentication/authorization events
- File operation attempts (protected files)
- MCP tool usage

**LOG FORMAT**:
```typescript
logger.audit({
  timestamp: new Date().toISOString(),
  user: getUserId(), // Not username
  action: 'file_operation',
  operation: 'write',
  file: relativePath('/virsaitis-development/'), // Not full path
  allowed: false,
  tier: 'TIER-0',
  reason: 'Protected file modification attempted',
});
```

---

## 🔒 Secure Coding Practices

### Principle of Least Privilege

**FILE SYSTEM**:
- Only access files in workspace
- Read-only by default
- Write only when validated
- Never execute without explicit approval

**NETWORK**:
- Only connect to configured MCP server
- Use HTTPS for external requests
- Validate SSL certificates
- Timeout all network requests

### Defense in Depth

**LAYER 1**: Input validation (validate all external input)
**LAYER 2**: Business logic validation (check against rules)
**LAYER 3**: MCP tool validation (governance checks)
**LAYER 4**: Extension validation (user action intercept)
**LAYER 5**: Audit logging (track all operations)

**BENEFIT**: If one layer fails, others still protect

### Secure Defaults

**DEFAULT**: Deny (operations blocked unless explicitly allowed)
**CONFIGURATION**: Secure out of box (no setup required for security)
**ENCRYPTION**: TLS for all network communication
**AUTHENTICATION**: Always verify MCP server identity

---

## 🔐 Cryptography (TIER-2)

### Use Well-Vetted Libraries

**✅ RECOMMENDED**:
- Node.js `crypto` module (native)
- `bcrypt` for password hashing
- `jsonwebtoken` (JWT)
- `crypto-js` (if needed)

**❌ AVOID**:
- Custom encryption algorithms
- `crypto-js` deprecated methods
- MD5, SHA1 (broken)
- Home-grown authentication

### Hashing

**FOR PASSWORDS**:
```typescript
import bcrypt from 'bcrypt';

// Hash password
const saltRounds = 12;
const hashedPassword = await bcrypt.hash(password, saltRounds);

// Verify password
const isValid = await bcrypt.compare(inputPassword, hashedPassword);
```

**FOR DATA INTEGRITY**:
```typescript
import crypto from 'crypto';

// SHA-256 hash
const hash = crypto.createHash('sha256')
  .update(data)
  .digest('hex');
```

---

## 🚦 Security Testing (TIER-1)

### Security Test Coverage

**REQUIRE 100% COVERAGE**:
- Secret detection (all patterns)
- Path traversal prevention
- Command injection prevention
- Input validation (all inputs)
- Error handling (no leaks)

**TEST EXAMPLES**:
```typescript
describe('Security', () => {
  describe('Secret Detection', () => {
    it('should detect API keys', () => {
      const code = 'const key = "sk-abc123def456";';
      expect(detectSecrets(code)).toContain('API_KEY_DETECTED');
    });
  });

  describe('Path Traversal', () => {
    it('should block directory traversal', () => {
      expect(() => validatePath('../../../etc/passwd')).toThrow();
    });
  });
});
```

---

## 📚 Quick Reference

| Threat | Prevention | Test |
|--------|------------|------|
| **Secrets** | Env variables only | Secret scan before commit |
| **Path Traversal** | Sanitize, normalize | Try `../` in tests |
| **Command Injection** | Whitelist, escape | Try `; rm -rf` |
| **ReDoS** | Simple regex only | Test with long input |
| **Info Leak** | Sanitize errors | Check error messages |
| **PII Logging** | Redaction required | Review all logs |

---

*Security Controls Module v2.0.0*
*Defense in depth for Virsaitis governance*
