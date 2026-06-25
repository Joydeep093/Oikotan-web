# Copilot Instructions - Virsaitis Project (Hub)

**Project**: Virsaitis Three-Layer AI Governance System
**Version**: 2.0.0-modular
**Framework**: Native VS Code Agent Skills (v1.109+)
**Updated**: 2026-02-17
**Architecture**: Hub-and-Spoke (lean hub + focused modules)

---

[GOVERNANCE_PROTECTION]
COPILOT_INSTRUCTIONS_IMMUTABLE=true
MODIFICATION_PROHIBITED=requires_explicit_approval
USER_REQUEST_OVERRIDE=prohibited
EXCEPTIONS=documented_in_change_log
ENFORCEMENT=absolute

---

## 🎯 Project Mission

**Virsaitis** is a three-layer AI governance enforcement system achieving 95%+ compliance:

1. **Layer 1: Agent** - Atomic instruction design (.github/agents/)
2. **Layer 2: MCP Server** - Pre-execution validation (TypeScript)
3. **Layer 3: VS Code Extension** - User action interception (TypeScript)

**Strategic Decision (2026-02-12):** ADOPT VS Code 1.109+ native skills infrastructure, CREATE Virsaitis-specific governance content.

---

## 🤖 Machine-Readable Policy

```
[PROJECT_IDENTITY]
PROJECT_NAME=Virsaitis
VERSION=2.0.0
VS_CODE_MINIMUM=1.109.0
ARCHITECTURE=hub_and_spoke_modular

[DEVELOPMENT_APPROACH]
METHODOLOGY=discover_not_assume
HALLUCINATION_GUARD=enabled
VALIDATION=mandatory_before_commit
TESTING=tdd_preferred
DOCUMENTATION=atomic_sentences
CONSEQUENCE_AWARENESS=true

[ENFORCEMENT_TIERS]
TIER_0=safety_critical (BLOCK, zero_compromise)
TIER_1=code_breaking (WARN+CONFIRM, minimal_compromise)
TIER_2=quality_standards (WARN+SUGGEST, acceptable_tradeoffs)
TIER_3=enhancements (INFO, negotiable)

[MODULE_LOADING]
APPROACH=load_on_demand
CONTEXT_EFFICIENCY=high_priority
TOKEN_BUDGET=conservative
```

---

## 📚 Module Navigation

**Core Governance** (load for ALL tasks):
- 📋 [Core Policies](.github/copilot-modules/core-policies.md) - TIER system, enforcement, protected files

**Component Development** (load by component):
- 🤖 [Agent Standards](.github/copilot-modules/agent-standards.md) - Atomic sentences, markdown rules
- 🔌 [MCP Standards](.github/copilot-modules/mcp-standards.md) - TypeScript, Node.js, validation
- 🔧 [Extension Standards](.github/copilot-modules/extension-standards.md) - VS Code API, packaging
- 🎯 [Skills Standards](.github/copilot-modules/skills-standards.md) - SKILL.md format, frontmatter

**Development Practices** (load as needed):
- 🔄 [Development Workflow](.github/copilot-modules/development-workflow.md) - Discovery-first, TDD, commit checklist
- 🔒 [Security Controls](.github/copilot-modules/security-controls.md) - Secret scanning, input validation
- 📋 [Requirements Engineering](.github/copilot-modules/requirements-engineering.md) - REQ-ID, traceability
- ✅ [Testing & Quality](.github/copilot-modules/testing-quality.md) - Coverage, validation, metrics

**Integration & Deployment**:
- 🔗 [Integration Patterns](.github/copilot-modules/integration-patterns.md) - Agent↔Skills, MCP↔Extension
- 📦 [Distribution & Deployment](.github/copilot-modules/distribution-deployment.md) - Packaging, release

---

## 📁 Workspace Structure

```
SDLC-VIRSAITIS/
├── .github/
│   ├── copilot-instructions.md           ⬅ THIS FILE (hub)
│   ├── copilot-modules/                  📚 Governance modules
│   │   ├── core-policies.md
│   │   ├── agent-standards.md
│   │   ├── mcp-standards.md
│   │   ├── extension-standards.md
│   │   ├── skills-standards.md
│   │   ├── development-workflow.md
│   │   ├── security-controls.md
│   │   ├── requirements-engineering.md
│   │   ├── testing-quality.md
│   │   ├── integration-patterns.md
│   │   └── distribution-deployment.md
│   ├── agents/
│   │   └── Virsaitis.agent.md            🤖 Layer 1: Agent
│   └── skills/                           🎯 Native VS Code Skills
│       ├── python-development/
│       ├── security-controls/
│       └── ...
├── virsaitis-development/
│   ├── virsaitis-requirements/           📋 Requirements
│   ├── virsaitis-agent/                  🤖 Agent source
│   ├── virsaitis-instruction/            📚 Instructions
│   ├── virsaitis-mcp/                    🔌 MCP Server
│   ├── virsaitis-extension/              🔧 VS Code Extension
│   └── virsaitis-portable/               📦 Distribution
├── virsaitis-documentation/              📖 Docs
└── virsaitis-distribution/               🚀 Releases
```

---

## 🔍 Smart Context Loading

AI loads **ONLY relevant modules** based on task:

```yaml
Agent Development:
  - core-policies.md (always)
  - agent-standards.md
  - development-workflow.md

MCP Development:
  - core-policies.md (always)
  - mcp-standards.md
  - security-controls.md
  - testing-quality.md

Extension Development:
  - core-policies.md (always)
  - extension-standards.md
  - security-controls.md
  - testing-quality.md

Skills Development:
  - core-policies.md (always)
  - skills-standards.md
  - development-workflow.md

Security Review:
  - core-policies.md (always)
  - security-controls.md

Requirements Work:
  - core-policies.md (always)
  - requirements-engineering.md
```

---

## 🚨 TIER-0 Critical Rules (Always Enforced)

### Protected File Modification

**PROHIBITED without approval:**
- `.github/copilot-instructions.md` (this file)
- `.github/copilot-modules/**/*.md` (all modules)
- `.github/agents/Virsaitis.agent.md`
- `virsaitis-development/virsaitis-requirements/**`

**Response:** "TIER-0 VIOLATION PREVENTED" → Explain → Provide alternative workflow

### Atomic Sentence Structure (Agent.md)

All Agent.md files use atomic sentences (one concept per sentence). See [Agent Standards](.github/copilot-modules/agent-standards.md).

### Secret Management

Never commit secrets. See [Security Controls](.github/copilot-modules/security-controls.md).

### MCP Tool Enforcement

Use Virsaitis MCP tools for governance operations. See [Core Policies](.github/copilot-modules/core-policies.md).

**Full TIER-0 details:** See [Core Policies](.github/copilot-modules/core-policies.md)

---

## ⚡ Quick Reference

| Task | Load Modules | Key Command |
|------|--------------|-------------|
| Create Agent.md | agent-standards | Paste manually in VS Code |
| Develop MCP | mcp-standards, security-controls | `npm run build && npm test` |
| Develop Extension | extension-standards, testing-quality | `npm run compile && npm test` |
| Create Skill | skills-standards | `skills-ref validate` |
| Implement Feature | requirements-engineering | Search REQ-ID first |
| Security Review | security-controls | Run security scan |
| Before Commit | development-workflow | Checklist validation |

---

## 🆘 When Uncertain

```
IF uncertain about:
  - Which module to load
  - Component ownership
  - TIER classification
  - Security implications

THEN respond:
  "CONFIRM_NEEDED: [specific question]"

WAIT for user clarification

DO NOT proceed with assumptions
```

---

## 📞 Getting Started

**First time working on Virsaitis?**

1. **Read**: [Core Policies](.github/copilot-modules/core-policies.md) (foundation)
2. **Identify component**: Agent, MCP, Extension, or Skills
3. **Load**: Component-specific standards module
4. **Review**: [Development Workflow](.github/copilot-modules/development-workflow.md)
5. **Start**: Discovery-first approach (verify before implement)

**Module not loading?**
- Verify file exists: `.github/copilot-modules/[module-name].md`
- Check path in navigation section above
- Request module creation if missing

---

*Virsaitis Hub v2.0.0-modular*
*Lean hub + 10 focused modules = efficient context loading*
*Token budget: ~500 tokens hub + ~1500-2500 per module*

