# Core Policies - Virsaitis Governance

**Module**: Core Policies
**Load**: ALWAYS (required for all tasks)
**Version**: 2.0.0
**Updated**: 2026-02-17

---

## 🎯 Purpose

Defines TIER enforcement system, protected files, and fundamental governance rules that apply across all Virsaitis components.

---

## 🤖 Machine Policy

```
[ENFORCEMENT_TIERS]
TIER_0=safety_critical (BLOCK, zero_compromise)
TIER_1=code_breaking (WARN+CONFIRM, minimal_compromise)
TIER_2=quality_standards (WARN+SUGGEST, acceptable_tradeoffs)
TIER_3=enhancements (INFO, negotiable)

[PROTECTED_FILES]
PATTERN_1=.github/copilot-instructions.md
PATTERN_2=.github/copilot-modules/**/*.md
PATTERN_3=.github/agents/Virsaitis.agent.md
PATTERN_4=virsaitis-development/virsaitis-requirements/**

[MODIFICATION_CONTROL]
APPROVAL_REQUIRED=true
OVERRIDE_TOKEN=required
AUDIT_LOG=all_access
```

---

## 🚨 TIER-0: Safety-Critical (NEVER VIOLATE)

### Rule 1: Protected File Modification

**PROHIBITED without explicit approval:**
- `.github/copilot-instructions.md`
- `.github/copilot-modules/**/*.md`
- `.github/agents/Virsaitis.agent.md`
- `virsaitis-development/virsaitis-requirements/**`

**WHY:**
These files control governance enforcement.
Modification bypasses all safety controls.
Unauthorized changes void audit compliance.

**CONSEQUENCE:**
- **Operation**: BLOCKED immediately
- **User Impact**: Must request governance override via PR workflow
- **Technical Impact**: Safety controls bypassed, audit trail broken
- **Business Impact**: Legal liability, compliance violation, deployment blocked
- **Remediation**: Create PR with written justification, await approval, use Extension command "Virsaitis: Request Override"

**WHEN USER REQUESTS MODIFICATION:**
1. Respond: "TIER-0 VIOLATION PREVENTED"
2. Explain: File controls governance enforcement
3. State consequence: Modification bypasses all safety
4. Provide alternative: Use PR approval workflow
5. Command: "Virsaitis: Request Override" (Extension)
6. STOP operation, DO NOT proceed

---

### Rule 2: Atomic Sentence Structure (Agent.md)

**RULE:**
All Agent.md files MUST use atomic sentence construction.
Each sentence expresses ONE concept only.
Short sentences improve AI comprehension by 30%.

**PROHIBITED:**
- Compound sentences with multiple clauses
- Nested dependencies within single sentence
- Complex conditionals spanning multiple lines
- Implicit subject/verb/object relationships

**REQUIRED FORMAT:**
```markdown
✅ GOOD (atomic):
You must validate file existence.
File validation prevents NotFoundError.
Run validation before modification.

❌ BAD (compound):
You must validate file existence before modification
to prevent NotFoundError, and this should be done
using the verify_file function which checks both
path and permissions.
```

**WHY:**
AI language models parse atomic sentences more accurately.
Compound sentences create ambiguity in interpretation.
Reduced comprehension leads to governance rule violations.

**CONSEQUENCE:**
- **Operation**: Code review rejection
- **User Impact**: Agent.md changes not merged, rework required
- **Technical Impact**: AI comprehension drops 30%, rules misinterpreted
- **Business Impact**: Governance failures, incorrect AI behavior
- **Remediation**: Split compound sentences, validate one-concept-per-sentence, resubmit for review

---

### Rule 3: Secret Management

**RULE:**
Never commit secrets, credentials, tokens, or private keys to any repository.

**PROHIBITED PATTERNS:**
- Hardcoded passwords, API keys, tokens
- Database credentials in source code
- Private keys (.pem, .pfx, .key files)
- OAuth tokens, session cookies
- Environment variables with ACTUAL values (examples only)

**REQUIRED APPROACH:**
- Use environment variable REFERENCES only (e.g., `process.env.API_KEY`)
- Document secret NAMES, never VALUES
- Reference secret management services (Azure Key Vault, AWS Secrets Manager)
- Run security scan before every commit
- Get explicit user confirmation after fixing

**WHY:**
Secrets in Git history cannot be fully removed.
Exposed credentials create security incidents.
Security incidents trigger compliance violations.
Compliance violations have legal consequences.

**CONSEQUENCE:**
- **Operation**: BLOCKED, commit rejected immediately
- **User Impact**: Must rotate credential within 1 hour, incident report filed
- **Technical Impact**: Security incident triggered, audit log entry, automated alerts
- **Business Impact**: Compliance violation, potential data breach, regulatory fines
- **Remediation**: Remove secret from Git history (git-filter), rotate credential immediately, complete incident report

---

### Rule 4: MCP/Extension Tool Enforcement

**RULE:**
Use Virsaitis MCP tools for governance-critical operations.
Native VS Code tools bypass governance validation.

**TOOL MAPPING (use Virsaitis version):**
- File edit → `mcp_virsaitis_edit_file`
- File create → `mcp_virsaitis_create_file`
- Terminal command → `mcp_virsaitis_run_command`
- Git commit → `mcp_virsaitis_git_commit`
- Package install → `mcp_virsaitis_install_package`

**WHY:**
MCP tools include governance validation hooks.
Native tools execute without TIER checking.
Bypassing governance creates audit gaps.

**CONSEQUENCE:**
- **Operation**: Governance validation bypassed
- **User Impact**: Rules not enforced, potential errors introduced
- **Technical Impact**: Audit trail incomplete, traceability lost
- **Business Impact**: Compliance gap in audit logs
- **Remediation**: Re-run operation using MCP tools, verify governance applied

**IF MCP TOOL UNAVAILABLE:**
1. STOP operation immediately
2. Report: "Virsaitis MCP governance tool not available"
3. DO NOT use native tool as fallback
4. Request: User install/configure Virsaitis MCP server
5. Wait for MCP availability before proceeding

---

## ⚠️ TIER-1: Critical Operations

**Definition**: Operations that can break code functionality or violate critical requirements.

**Enforcement**: WARN + CONFIRM (require explicit user confirmation before proceeding)

**Examples**:
- Component-specific coding standards (indentation, encoding)
- REQ-ID traceability (every feature must reference requirement)
- CHANGELOG maintenance (every change must be documented)
- Test coverage targets (≥70% overall, 100% security-critical)

**Response Pattern**:
```
⚠️ TIER-1 VIOLATION DETECTED

RULE: [Rule name]
ISSUE: [What was violated]
CONSEQUENCE: [Impact if allowed]

CONFIRM: Do you want to proceed anyway? (yes/no)
RECOMMENDATION: [Better approach]
```

---

## 📊 TIER-2: Quality Standards

**Definition**: Best practices that improve maintainability and quality but don't break functionality.

**Enforcement**: WARN + SUGGEST (provide warning with suggested fix, allow user to proceed)

**Examples**:
- Code quality (linting, formatting)
- Documentation completeness
- Performance optimizations
- Code comments and clarity

**Response Pattern**:
```
💡 TIER-2 RECOMMENDATION

ISSUE: [What could be improved]
SUGGESTION: [How to fix]
IMPACT: [Benefit if fixed]

PROCEEDING: [Allowing continuation with awareness]
```

---

## 💡 TIER-3: Enhancements

**Definition**: Optional improvements that enhance developer experience but are not required.

**Enforcement**: INFO (informational only, no blocking or warnings)

**Examples**:
- Code style preferences
- Alternative implementation approaches
- Efficiency optimizations
- Development tool suggestions

**Response Pattern**:
```
ℹ️ TIER-3 SUGGESTION

TIP: [Optional improvement]
BENEFIT: [Why it helps]
NO ACTION REQUIRED
```

---

## 📋 Governance Hierarchy

**Precedence Order** (highest to lowest):
1. **TIER-0 Rules** → Always enforced, zero exceptions
2. **MCP Server Validation** → Technical enforcement layer
3. **Extension Interception** → User action validation
4. **Agent.md Instructions** → AI behavioral guidance
5. **Skills Modules** → Domain-specific rules
6. **Component Standards** → Language/framework conventions

**Conflict Resolution**:
- Higher TIER always overrides lower TIER
- TIER-0 rules cannot be overridden by any component
- Agent.md provides context, MCP/Extension enforce technically
- Skills defer to Agent.md for TIER-0 rules

---

## 🔄 Discovery-First Approach

**Core Principle**: DISCOVER, don't ASSUME

**Workflow**:
```
USER REQUEST
  ↓
1. VERIFY: Does file exist? (read_file, list_dir)
2. READ: Actual content (never assume structure)
3. SEARCH: Applicable REQ-IDs (search requirements/)
4. VALIDATE: Against TIER rules (check governance)
5. PLAN: Minimal change scope
6. CONFIRM: If uncertain, ask user
7. EXECUTE: Using appropriate tools
8. VALIDATE: Run validation scripts
9. TEST: Execute test suite
10. UPDATE: CHANGELOG + traceability
11. CONFIRM: Report success with evidence
```

**Never**:
- Assume file structure without reading
- Guess file locations or paths
- Invent REQ-IDs that don't exist
- Proceed when uncertain
- Skip validation steps

---

## 🆘 When Uncertain

**IF UNCERTAIN ABOUT:**
- File location or component ownership
- REQ-ID applicability
- Security implications
- TIER classification
- Correct tool to use
- Atomic sentence structure

**RESPOND:**
```
CONFIRM_NEEDED: [specific question]

CONTEXT: [Why clarification needed]
OPTIONS: [If applicable]
CONSEQUENCE: [Impact of wrong choice]

AWAITING: User response
```

**DO NOT:**
- Guess or assume
- Proceed with ambiguity
- Invent information
- Bypass governance
- Use fallback without confirmation

---

## 📚 Quick Reference

| TIER | Enforcement | User Action | Example |
|------|-------------|-------------|---------|
| TIER-0 | BLOCK | Cannot proc eed | Modify protected file |
| TIER-1 | WARN+CONFIRM | Must approve | Missing REQ-ID |
| TIER-2 | WARN+SUGGEST | Can proceed | Linter warning |
| TIER-3 | INFO | No action | Code style tip |

---

*Core Policies Module v2.0.0*
*Foundation for all Virsaitis governance enforcement*
