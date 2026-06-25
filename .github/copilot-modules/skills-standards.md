# Skills Standards - Native Agent Skills

**Module**: Skills Standards
**Component**: Native VS Code Agent Skills (Layer 4)
**Load**: When creating/editing skills in .github/skills/
**Version**: 2.0.0
**Updated**: 2026-02-17

---

## 🎯 Purpose

Defines SKILL.md format, frontmatter requirements, and development workflow for Virsaitis Native Agent Skills (VS Code 1.109+).

---

## 🤖 Machine Policy

```
[SKILL_FORMAT]
FORMAT=SKILL.md
STRUCTURE=YAML_frontmatter + Markdown_body
LOCATION=.github/skills/skill-name/SKILL.md
TOKEN_TARGET=<5000_per_skill
DESCRIPTION_LENGTH=~100_tokens

[FRONTMATTER_REQUIRED]
NAME=lowercase-hyphens-only
DESCRIPTION=what_when_keywords
LICENSE=optional
COMPATIBILITY=optional
METADATA=virsaitis_extensions

[VALIDATION]
TOOL=skills-ref validate
VS_CODE_VERSION=1.109+
```

---

## 📋 SKILL.md Format (Official Specification)

### File Structure

```markdown
---
name: lowercase-hyphens-only
description: what + when + keywords (1-1024 chars)
license: MIT
compatibility: VS Code 1.109+, Node.js 18+
metadata:
  tier: TIER-0 | TIER-1 | TIER-2 | TIER-3
  category: governance | security | quality | language | testing
  framework-version: "2.0.0"
  author: virsaitis
  version: "1.0.0"
---

# Skill Title

## Overview
[What this skill does and why]

## When to Activate
[Keywords and scenarios that trigger this skill]

## Standards & Rules
[TIER-assigned rules]

## Consequences
[Per-TIER impact chains - Virsaitis extension]

## Procedures
[Step-by-step workflows]

## Examples
[Code snippets and usage]

## Validation & Testing
[Commands to validate compliance]

## Quick Reference
[Summary table]
```

---

## 📝 Frontmatter Requirements (TIER-1)

### Required Fields

#### name

**FORMAT**: `lowercase-hyphens-only`
**LENGTH**: 1-64 characters
**MUST MATCH**: Directory name exactly

✅ **GOOD**:
```yaml
name: python-development
```

❌ **BAD**:
```yaml
name: Python_Development  # Uppercase, underscore
name: pythonDevelopment   # camelCase
```

#### description

**FORMAT**: Plain text
**LENGTH**: 1-1024 characters
**CONTENT**: What + When + Keywords
**TARGET**: ~100 tokens for efficient discovery

✅ **GOOD**:
```yaml
description: Enforces Python coding standards including 4-space indentation, UTF-8 encoding, and file creation workflow. Activate when creating or modifying Python files (.py). Keywords: python, indentation, encoding, file creation.
```

❌ **BAD**:
```yaml
description: Python stuff  # Too vague, no keywords
```

### Optional Fields

#### license

```yaml
license: MIT
```

#### compatibility

```yaml
compatibility: VS Code 1.109+, Node.js 18+, Python 3.8+
```

### Virsaitis Metadata Extensions

#### metadata.tier (TIER-1)

**REQUIRED for Virsaitis skills**:
```yaml
metadata:
  tier: TIER-0  # Safety-critical
```

**VALUES**:
- `TIER-0`: Safety-critical (BLOCK)
- `TIER-1`: Code-breaking (WARN+CONFIRM)
- `TIER-2`: Quality standards (WARN+SUGGEST)
- `TIER-3`: Enhancements (INFO)

#### metadata.category

**REQUIRED for Virsaitis skills**:
```yaml
metadata:
  category: governance
```

**VALUES**:
- `governance`: Core governance rules
- `security`: Security controls, secrets
- `quality`: Code quality, testing
- `language`: Language-specific (Python, TypeScript)
- `testing`: Test frameworks, coverage

#### metadata.framework-version

```yaml
metadata:
  framework-version: "2.0.0"
```

#### metadata.author

```yaml
metadata:
  author: virsaitis
```

#### metadata.version

```yaml
metadata:
  version: "1.0.0"
```

---

## 📚 Required Sections (Virsaitis Standard)

### 1. Overview

**PURPOSE**: Explain what the skill does and why it exists.

**STRUCTURE**:
- 2-3 paragraphs
- Atomic sentences (Agent standard applies)
- Clear value proposition

**EXAMPLE**:
```markdown
## Overview

This skill enforces Python coding standards for Virsaitis projects.
Python files must use 4-space indentation.
UTF-8 encoding without BOM is required.
Manual file creation prevents indentation corruption.

Activating this skill ensures consistent Python code formatting.
It prevents common errors like IndentationError.
It maintains compatibility across development environments.
```

### 2. When to Activate

**PURPOSE**: Keywords and scenarios for VS Code skill activation.

**STRUCTURE**:
- Clear activation triggers
- Keyword list (for discovery)
- Example scenarios

**EXAMPLE**:
```markdown
## When to Activate

**Activate this skill when**:
- Creating new Python files (.py)
- Modifying existing Python code
- Debugging IndentationError issues
- Setting up Python development environment
- Validating Python code formatting

**Keywords**: python, py, indentation, encoding, utf-8, file creation, black formatter

**Scenarios**:
- User: "Create a Python function"
- User: "Fix indentation in my Python code"
- User: "Set up Python project"
```

### 3. Standards & Rules

**PURPOSE**: Define specific rules with TIER assignments.

**STRUCTURE**:
- Group by TIER level
- Each rule: Name, TIER, Enforcement, Rationale

**EXAMPLE**:
```markdown
## Standards & Rules

### TIER-0 Rules (Safety-Critical)

#### Rule: Manual File Creation Only

**Priority**: TIER-0
**Enforcement**: BLOCK `create_file` tool for .py files
**Rationale**: `create_file` tool corrupts Python indentation 100% of time.

### TIER-1 Rules (Critical)

#### Rule: 4-Space Indentation

**Priority**: TIER-1
**Enforcement**: WARN + CONFIRM if tabs or 2-space detected
**Rationale**: PEP 8 requirement, prevents IndentationError
```

### 4. Consequences ⭐ NEW (Virsaitis Extension)

**PURPOSE**: Document impact chains for TIER violations.

**STRUCTURE**:
- Section per TIER level
- Impact dimensions: Operation, User, Technical, Business, Remediation

**EXAMPLE**:
```markdown
## Consequences

### TIER-0 Violations

**Rule**: Manual File Creation Only
**If Violated (using `create_file` tool)**:

- **Operation**: BLOCKED immediately
- **User Impact**: File not created, must use manual paste workflow
- **Technical Impact**: Prevents indentation corruption, IndentationError
- **Business Impact**: Maintains code quality, prevents broken builds
- **Remediation**: Generate code block, user pastes in VS Code, save triggers Black formatter

### TIER-1 Violations

**Rule**: 4-Space Indentation
**If Violated (tabs or wrong spacing)**:

- **Operation**: WARN + CONFIRM required
- **User Impact**: Notified of issue, can proceed with approval
- **Technical Impact**: May cause IndentationError in mixed codebases
- **Business Impact**: Technical debt, maintenance burden
- **Remediation**: Run Black formatter, verify with `python -m py_compile`
```

### 5. Procedures

**PURPOSE**: Step-by-step workflows for common tasks.

**STRUCTURE**:
- Numbered steps
- Commands with examples
- Expected outcomes

**EXAMPLE**:
```markdown
## Procedures

### Create New Python File

1. Generate code content in memory
2. Validate structure (atomic sentences, correct indentation)
3. Provide markdown code block to user
4. Instruct: "Create file manually in VS Code"
5. Instruct: "Paste content (Ctrl+V)"
6. Instruct: "Save file (Ctrl+S) triggers Black formatter"
7. Validate: Run `python -m py_compile filename.py`

### Validate Python Indentation

1. Open Python file in VS Code
2. Run: `python -m py_compile filename.py`
3. If error: Check line number in error message
4. Fix indentation: Use Black formatter
5. Re-run validation
6. Confirm: No syntax errors
```

### 6. Examples

**PURPOSE**: Demonstrate compliance with code snippets.

**STRUCTURE**:
- Good vs Bad examples
- Complete working code
- Explanation of differences

**EXAMPLE**:
````markdown
## Examples

### ✅ Correct Python Format

```python
def validate_file(file_path: str) -> bool:
    """Validate file existence.

    Args:
        file_path: Absolute path to file

    Returns:
        True if file exists, False otherwise
    """
    if not file_path:
        return False

    return Path(file_path).exists()
```

**Complies**: 4-space indentation, UTF-8 encoding, type hints

### ❌ Incorrect Python Format

```python
def validate_file(file_path):
		if not file_path:
				return False
		return Path(file_path).exists()
```

**Issues**: Tabs instead of spaces, no type hints, no docstring
````

### 7. Validation & Testing

**PURPOSE**: Commands to verify compliance.

**STRUCTURE**:
- Validation commands
- Expected output
- Interpretation guide

**EXAMPLE**:
```markdown
## Validation & Testing

### Syntax Validation

```bash
python -m py_compile filename.py
```

**Expected**: No output (success)
**If error**: Fix line indicated in error message

### Format Validation

```bash
black --check filename.py
```

**Expected**: "All done! ✨"
**If error**: Run `black filename.py` to auto-format

### Lint Validation

```bash
flake8 filename.py
```

**Expected**: No output (success)
**If warnings**: Review and fix as needed
```

### 8. Quick Reference

**PURPOSE**: Summary table for rapid lookup.

**STRUCTURE**:
- Table format
- Key rules and commands
- Copy-pasteable

**EXAMPLE**:
```markdown
## Quick Reference

| Aspect | Standard | Command |
|--------|----------|---------|
| **Indentation** | 4 spaces | Black formatter |
| **Encoding** | UTF-8 no BOM | VS Code default |
| **File Creation** | Manual paste | Never use `create_file` |
| **Validation** | Syntax check | `python -m py_compile file.py` |
| **Formatting** | PEP 8 | `black file.py` |
| **Linting** | Flake8 | `flake8 file.py` |
```

---

## 📂 Directory Structure

**LOCATION**: `.github/skills/skill-name/SKILL.md`

**EXAMPLE**:
```
.github/skills/
├── python-development/
│   ├── SKILL.md                 (main skill file)
│   ├── scripts/                 (optional helper scripts)
│   │   └── validate-python.sh
│   ├── references/              (optional reference docs)
│   │   └── pep8-summary.md
│   └── assets/                  (optional images, examples)
│       └── indentation-visual.png
├── security-controls/
│   └── SKILL.md
└── requirements-engineering/
    └── SKILL.md
```

**REQUIRED**: `SKILL.md` in skill directory
**OPTIONAL**: `scripts/`, `references/`, `assets/`

---

## ✅ Validation (TIER-1)

### Using skills-ref Tool

**INSTALL**:
```bash
npm install -g @agentskills/skills-ref
```

**VALIDATE**:
```bash
skills-ref validate .github/skills/python-development/
```

**OUTPUT**:
```
✓ Skill name matches directory
✓ Description within 1-1024 characters
✓ Frontmatter valid YAML
✓ SKILL.md found
✓ Format valid
```

**IF ERRORS**: Fix before committing skill

---

## 🎯 Token Efficiency (TIER-2)

### Token Targets

**RECOMMENDED**:
- **Description**: ~100 tokens (efficient discovery)
- **Full skill body**: <5000 tokens (~500 lines)
- **Total loaded**: <1% of 200K context window

### Progressive Disclosure

**VS Code loads skills in 3 levels**:
1. **Metadata** (~100 tokens): Always loaded for discovery
2. **Instructions** (<5000 tokens): Loaded when skill activated
3. **Resources** (on-demand): Loaded only when referenced

**STRATEGY**: Keep main SKILL.md lean, put large examples in `references/`.

---

## 🔄 Skill Development Workflow

### Create New Skill

1. Choose skill name (lowercase-hyphens)
2. Create directory: `.github/skills/skill-name/`
3. Use template: `SKILL-TEMPLATE.md` (comprehensive) or `SKILL-TEMPLATE-QUICK.md` (minimal)
4. Fill frontmatter (name, description, metadata)
5. Write sections (Overview → Consequences → Procedures)
6. Add examples (good vs bad)
7. Write validation commands
8. Create quick reference table
9. Validate: `skills-ref validate .github/skills/skill-name/`
10. Test in VS Code 1.109 (verify activation)
11. Update CHANGELOG
12. Commit to repository

### Modify Existing Skill

1. Read current SKILL.md fully
2. Identify section to modify
3. Maintain atomic sentence structure
4. Update version in frontmatter
5. Add CHANGELOG entry
6. Validate: `skills-ref validate`
7. Test in VS Code
8. Commit with REQ-ID reference

---

## 📚 Templates

**COMPREHENSIVE**: `.github/skills-templates/SKILL-TEMPLATE.md` (~1000 lines)
**QUICK**: `.github/skills-templates/SKILL-TEMPLATE-QUICK.md` (~100 lines)

**USE**:
- Template for first-time skill creation
- Reference for section structure
- Copy frontmatter examples
- Follow Consequences section format

---

## 💡 Best Practices

### Writing Descriptions

**INCLUDE**:
- What skill does (core purpose)
- When to activate (use cases)
- Keywords for discovery (search terms)

**TECHNIQUE**:
```
[Core purpose]. [Specific rules enforced]. Activate when [scenarios]. Keywords: [comma-separated].
```

### TIER Assignment

**TIER-0**: Breaks build, security risk, corrupts artifacts
**TIER-1**: Violates critical requirements, causes bugs
**TIER-2**: Quality standards, best practices
**TIER-3**: Performance hints, style suggestions

### Consequences Section

**FORMAT**:
- One subsection per TIER level with violations
- One example rule per TIER
- Five impact dimensions: Operation, User, Technical, Business, Remediation
- Concrete, actionable remediation steps

---

## 📖 Quick Reference

| Aspect | Standard | Tool |
|--------|----------|------|
| **Format** | SKILL.md | VS Code markdown |
| **Location** | .github/skills/ | Repository root |
| **Frontmatter** | YAML | --- delimiters |
| **Tokens** | <5000 body | Word count estimate |
| **Validation** | skills-ref | `skills-ref validate` |
| **VS Code Version** | 1.109+ | Check release |

---

*Skills Standards Module v2.0.0*
*Native VS Code Agent Skills for Virsaitis governance*
