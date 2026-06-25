# Integration Patterns - Virsaitis Layers

**Module**: Integration Patterns
**Load**: When working across multiple components
**Version**: 2.0.0
**Updated**: 2026-02-17

---

## 🎯 Purpose

Defines integration patterns between Agent, MCP, Extension, and Skills layers for seamless governance enforcement.

---

## 🤖 Machine Policy

```
[INTEGRATION_ARCHITECTURE]
LAYER_1=agent (behavioral guidance)
LAYER_2=mcp_server (validation enforcement)
LAYER_3=extension (user action interception)
LAYER_4=skills (domain-specific rules)

[COMMUNICATION_PATTERNS]
AGENT_TO_MCP=tool_calls
MCP_TO_EXTENSION=http_api
AGENT_TO_SKILLS=progressive_disclosure
EXTENSION_TO_MCP=validation_requests

[PRECEDENCE]
TIER_0_SOURCE=agent_md (authoritative)
TECHNICAL_ENFORCEMENT=mcp + extension
DOMAIN_RULES=skills
```

---

## 🏗️ Three-Layer Architecture

### Overview

```
┌─────────────────────────────────────┐
│  Layer 1: Agent (Atomic Markdown)   │  ← AI Self-Regulation
│  .github/agents/Virsaitis.agent.md  │
└──────────────┬──────────────────────┘
               │ References/Delegates
               ↓
┌─────────────────────────────────────┐
│  Layer 4: Skills (Native VS Code)   │  ← Domain-Specific Rules
│  .github/skills/*/SKILL.md          │
└──────────────┬──────────────────────┘
               │ Calls MCP Tools
               ↓
┌─────────────────────────────────────┐
│  Layer 2: MCP Server (TypeScript)   │  ← Validation Enforcement
│  virsaitis-mcp/                     │
└──────────────┬──────────────────────┘
               │ Provides Results
               ↑
               │ Queries for Validation
┌──────────────┴──────────────────────┐
│  Layer 3: Extension (TypeScript)    │  ← User Action Interception
│  virsaitis-extension/               │
└─────────────────────────────────────┘
```

---

## 🔗 Agent ↔ Skills Integration

### Agent References Skills

**Agent.md pattern**:
```markdown
## File Operation Guidelines

For domain-specific file operations, activate relevant skills:
- Python files: Activate python-development skill
- Security review: Activate security-controls skill
- Requirements: Activate requirements-engineering skill

Skills provide detailed procedures and validation commands.
Agent provides TIER-0 enforcement rules.
Skills defer to Agent for conflicts.
```

### Skills Reference Agent

**SKILL.md pattern**:
```markdown
---
name: python-development
description: Python coding standards and file creation workflow
metadata:
  tier: TIER-1
---

## TIER-0 Rules (Enforced by Agent)

This skill operates under Agent.md TIER-0 rules:
- Never use `create_file` for .py files (Agent TIER-0.3)
- Never commit secrets (Agent TIER-0.3)
- Use MCP tools for governance operations (Agent TIER-0.4)

**Precedence**: Agent.md TIER-0 > Skill TIER-1 rules

## TIER-1 Rules (Skill-Specific)

- 4-space indentation (PEP 8)
- UTF-8 encoding without BOM
- Black formatter required
```

### Progressive Disclosure

**VS Code loads in 3 levels**:

**LEVEL 1: Metadata** (~100 tokens, always loaded):
```yaml
---
name: python-development
description: Python coding standards including 4-space indentation...
---
```

**LEVEL 2: Instructions** (<5000 tokens, on activation):
```markdown
## Standards & Rules
[Full detailed rules]

## Procedures
[Step-by-step workflows]
```

**LEVEL 3: Resources** (on-demand):
```
.github/skills/python-development/
├── SKILL.md                    (loaded on activation)
├── scripts/                    (loaded when referenced)
│   └── validate-python.sh
└── references/                 (loaded when referenced)
    └── pep8-full-spec.md
```

---

## 🔌 Agent/Skills → MCP Integration

### Agent/Skills Call MCP Tools

**FROM AGENT.MD**:
```markdown
Before editing protected file:
1. Call `mcp_virsaitis_validate_operation` tool
2. Pass operation type and file path
3. Tool returns validation result
4. If not allowed, respond with TIER-0 VIOLATION PREVENTED
5. If allowed, proceed with operation
```

**FROM SKILL.MD**:
```markdown
### Validate File Operation Procedure

1. Call MCP tool:
   ```
   mcp_virsaitis_validate_operation({
     operation: "write",
     filePath: "/path/to/file.py"
   })
   ```

2. Check response:
   - If `allowed: false` → STOP, show consequences
   - If `allowed: true` → PROCEED with operation

3. Log operation in audit trail
```

### MCP Tool Interface

**TOOL SCHEMA**:
```typescript
{
  name: 'mcp_virsaitis_validate_operation',
  description: 'Validates if an operation is allowed by governance policy',
  inputSchema: {
    type: 'object',
    properties: {
      operation: {
        type: 'string',
        enum: ['read', 'write', 'delete', 'execute'],
        description: 'Operation type',
      },
      filePath: {
        type: 'string',
        description: 'Absolute file path',
      },
    },
    required: ['operation', 'filePath'],
  },
}
```

**TOOL RESPONSE**:
```typescript
interface ValidationResponse {
  allowed: boolean;
  tier?: 'TIER-0' | 'TIER-1' | 'TIER-2' | 'TIER-3';
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

### Available MCP Tools

**CORE GOVERNANCE TOOLS**:
1. **`mcp_virsaitis_read_governance`** - Load governance rules from Agent.md
2. **`mcp_virsaitis_validate_operation`** - Check if operation allowed
3. **`mcp_virsaitis_edit_file`** - Edit file with governance check
4. **`mcp_virsaitis_run_command`** - Execute command with validation
5. **`mcp_virsaitis_git_commit`** - Git commit with protection
6. **`mcp_virsaitis_request_override`** - Request approval token

---

## 🔧 Extension ↔ MCP Integration

### Extension Queries MCP

**FILE SAVE INTERCEPTION**:
```typescript
// extension/src/governance/file-interceptor.ts
export class FileInterceptor {
  private _mcpClient: MCPClient;

  constructor() {
    this._mcpClient = new MCPClient();

    vscode.workspace.onWillSaveTextDocument(async (e) => {
      // Query MCP for validation
      const validation = await this._mcpClient.validateOperation(
        'write',
        e.document.uri.fsPath
      );

      // Enforce based on TIER
      if (!validation.allowed && validation.tier === 'TIER-0') {
        // BLOCK: Prevent save
        e.waitUntil(this.blockSave(validation));
      } else if (!validation.allowed && validation.tier === 'TIER-1') {
        // WARN: Show confirmation dialog
        await this.warnUser(validation);
      }
    });
  }

  private async blockSave(validation: ValidationResponse): Promise<void> {
    const message = `TIER-0 VIOLATION: ${validation.reason}\n\n` +
      `Remediation: ${validation.consequences?.remediation}`;

    await vscode.window.showErrorMessage(message, { modal: true });
    throw new Error(message); // Prevents save
  }
}
```

### MCP Client Implementation

**HTTP API CLIENT**:
```typescript
// extension/src/governance/mcp-client.ts
export class MCPClient {
  private _serverUrl: string;

  constructor() {
    const config = vscode.workspace.getConfiguration('virsaitis');
    this._serverUrl = config.get('mcpServerUrl', 'http://localhost:3000');
  }

  async validateOperation(
    operation: string,
    filePath: string
  ): Promise<ValidationResponse> {
    try {
      const response = await fetch(`${this._serverUrl}/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operation, filePath }),
      });

      if (!response.ok) {
        throw new Error(`MCP error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('MCP client error:', error);

      // Fail-open: Allow operation if MCP unavailable
      // (Alternative: Fail-closed for stricter enforcement)
      return {
        allowed: true,
        reason: 'MCP server unavailable (fail-open)',
      };
    }
  }
}
```

---

## 🎨 Extension UI Integration

### Shield Icon Decoration

**PROTECTED FILE INDICATOR**:
```typescript
// extension/src/ui/shield-decorator.ts
export class ShieldDecorator {
  private _decorationType: vscode.TextEditorDecorationType;

  constructor() {
    this._decorationType = vscode.window.createTextEditorDecorationType({
      gutterIconPath: vscode.Uri.file('resources/icons/shield.svg'),
      gutterIconSize: '80%',
    });

    // Update on editor change
    vscode.window.onDidChangeActiveTextEditor(editor => {
      if (editor && this.isProtectedFile(editor.document.uri)) {
        this.applyDecoration(editor);
      }
    });
  }

  private isProtectedFile(uri: vscode.Uri): boolean {
    const protectedPatterns = [
      '.github/copilot-instructions.md',
      '.github/copilot-modules/',
      '.github/agents/',
      'virsaitis-development/virsaitis-requirements/',
    ];

    return protectedPatterns.some(pattern => uri.fsPath.includes(pattern));
  }

  private applyDecoration(editor: vscode.TextEditor): void {
    const range = new vscode.Range(0, 0, 0, 0);
    editor.setDecorations(this._decorationType, [{ range }]);
  }
}
```

### Status Bar Integration

**GOVERNANCE STATUS INDICATOR**:
```typescript
// extension/src/ui/status-bar.ts
export class GovernanceStatusBar {
  private _statusBarItem: vscode.StatusBarItem;

  constructor() {
    this._statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Right,
      100
    );
    this._statusBarItem.command = 'virsaitis.showGovernanceStatus';
    this._statusBarItem.text = '$(shield) Virsaitis: Active';
    this._statusBarItem.show();
  }

  public updateStatus(mcpConnected: boolean): void {
    if (mcpConnected) {
      this._statusBarItem.text = '$(shield) Virsaitis: Active';
      this._statusBarItem.backgroundColor = undefined;
    } else {
      this._statusBarItem.text = '$(warning) Virsaitis: MCP Disconnected';
      this._statusBarItem.backgroundColor = new vscode.ThemeColor(
        'statusBarItem.warningBackground'
      );
    }
  }
}
```

---

## 📋 MCP → Agent Integration

### MCP Reads Agent.md

**GOVERNANCE RULES LOADING**:
```typescript
// mcp/src/governance/rules-loader.ts
export class GovernanceRulesLoader {
  private _agentPath = '.github/agents/Virsaitis.agent.md';

  async loadTierDefinitions(): Promise<TierDefinition[]> {
    // Read Agent.md
    const agentContent = await fs.promises.readFile(this._agentPath, 'utf-8');

    // Parse TIER definitions
    const tiers = this.parseTierSections(agentContent);

    return tiers;
  }

  private parseTierSections(content: string): TierDefinition[] {
    // Extract TIER-0, TIER-1, TIER-2, TIER-3 sections
    const tierPatterns = [
      /## TIER-0:(.+?)(?=## TIER-1|$)/s,
      /## TIER-1:(.+?)(?=## TIER-2|$)/s,
      /## TIER-2:(.+?)(?=## TIER-3|$)/s,
      /## TIER-3:(.+?)(?=##|$)/s,
    ];

    return tierPatterns.map((pattern, index) => {
      const match = content.match(pattern);
      return {
        tier: `TIER-${index}` as TierLevel,
        content: match ? match[1].trim() : '',
      };
    });
  }
}
```

### MCP Validates Against Agent Rules

**VALIDATION ENGINE**:
```typescript
// mcp/src/governance/validator.ts
export class GovernanceValidator {
  private _rules: GovernanceRules;

  constructor() {
    this._rules = new GovernanceRulesLoader().loadRules();
  }

  validateFileOperation(operation: string, filePath: string): ValidationResult {
    // Check TIER-0 protected patterns (from Agent.md)
    const protectedPatterns = this._rules.tier0.protectedFilePatterns;
    const isProtected = protectedPatterns.some(pattern =>
      filePath.includes(pattern)
    );

    if (isProtected && operation === 'write') {
      return {
        allowed: false,
        tier: 'TIER-0',
        reason: 'Protected file modification blocked',
        consequences: this._rules.tier0.consequences,
      };
    }

    // Check TIER-1 rules...
    // Check TIER-2 rules...

    return { allowed: true };
  }
}
```

---

## 🔄 Data Flow Patterns

### User Edits Protected File

```
1. USER: Attempts to save .github/copilot-instructions.md
   ↓
2. EXTENSION: onWillSaveTextDocument event fires
   ↓
3. EXTENSION: Calls MCP validateOperation()
   ↓
4. MCP: Loads Agent.md TIER-0 rules
   ↓
5. MCP: Checks file against protected patterns
   ↓
6. MCP: Returns { allowed: false, tier: 'TIER-0' }
   ↓
7. EXTENSION: Blocks save (throw error)
   ↓
8. EXTENSION: Shows modal error with consequences
   ↓
9. USER: Sees TIER-0 VIOLATION message
```

### AI Generates Code with Secret

```
1. AGENT: About to suggest code with API key
   ↓
2. AGENT: Calls mcp_virsaitis_validate_operation (hypothetical)
   ↓
3. MCP: Scans code for secret patterns
   ↓
4. MCP: Detects API key pattern
   ↓
5. MCP: Returns { allowed: false, tier: 'TIER-0', reason: 'Secret detected' }
   ↓
6. AGENT: Responds to user: "TIER-0 VIOLATION PREVENTED: Secret detected"
   ↓
7. AGENT: Suggests environment variable approach
```

---

## ⚖️ Precedence & Conflict Resolution

### Rule Hierarchy

```
TIER-0 (Agent.md) ────► HIGHEST AUTHORITY
         ↓
TIER-1/2/3 (Agent.md) ─► Core Rules
         ↓
Skills (TIER-1/2/3) ───► Domain-Specific Rules
         ↓
Component Standards ───► Language/Framework Rules
```

### Conflict Resolution

**IF CONFLICT BETWEEN**:
- Agent TIER-0 vs Skill TIER-1 → Agent wins (always)
- Agent TIER-1 vs Skill TIER-1 → Agent wins (authoritative)
- Skill A TIER-1 vs Skill B TIER-2 → TIER-1 wins (higher priority)
- Two skills same TIER → User chooses (ambiguous)

**EXAMPLE CONFLICT**:
```
# Agent.md TIER-0
Never use create_file for .agent.md files

# skill.md (hypothetical) TIER-1
Use automated tools for file creation

RESOLUTION: Agent TIER-0 wins (higher precedence)
AI MUST: Use manual paste workflow, ignore skill suggestion
```

---

## 💡 Best Practices

### Loose Coupling

**PREFER**:
- Agent → MCP: Tool calls (loose coupling)
- Extension → MCP: HTTP API (loose coupling)
- Skills → Agent: References only (no dependencies)

**AVOID**:
- Direct file system access across layers
- Tight coupling between Agent and Extension
- Circular dependencies

### Fail-Safe Defaults

**IF MCP UNAVAILABLE**:
- Agent: Continue with degraded governance (warn user)
- Extension: Fail-open (allow operations) OR Fail-closed (block operations)

**CHOOSE BASED ON**:
- Fail-open: Better UX, lower security
- Fail-closed: Better security, worse UX when MCP down

**VIRSAITIS DEFAULT**: Fail-open for non-TIER-0, fail-closed for TIER-0

### Audit Logging

**LOG AT EACH LAYER**:
- Agent: Log MCP tool calls
- MCP: Log all validation requests
- Extension: Log user actions blocked/allowed

**BENEFITS**:
- Troubleshooting integration issues
- Compliance audit trail
- Performance monitoring

---

## 📚 Quick Reference

| Integration | Pattern | Interface |
|-------------|---------|-----------|
| **Agent → Skills** | Progressive disclosure | VS Code native loading |
| **Agent → MCP** | Tool calls | MCP protocol |
| **Skills → MCP** | Tool calls | MCP protocol |
| **Extension → MCP** | HTTP API | JSON REST |
| **MCP → Agent** | File read | Markdown parser |

---

*Integration Patterns Module v2.0.0*
*Seamless three-layer governance integration*
