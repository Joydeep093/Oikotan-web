# Development Workflow - Virsaitis

**Module**: Development Workflow
**Load**: For all development tasks
**Version**: 2.0.0
**Updated**: 2026-02-17

---

## 🎯 Purpose

Defines discovery-first approach, TDD practices, commit workflows, and quality gates for all Virsaitis development.

---

## 🤖 Machine Policy

```
[APPROACH]
METHODOLOGY=discover_not_assume
TESTING=tdd_preferred
COMMIT_VALIDATION=mandatory
BEFORE_PR=checklist_required

[WORKFLOW_PATTERN]
DISCOVER → READ → SEARCH → VALIDATE → PLAN → CONFIRM → EXECUTE → TEST → UPDATE → VALIDATE → CONFIRM
```

---

## 🔍 Discovery-First Approach (TIER-1)

### Core Principle

**DISCOVER, don't ASSUME**

Never assume file structure, content, or requirements. Always verify before proceeding.

### Workflow Pattern

```
USER REQUEST
  ↓
1. VERIFY: File/directory existence
2. READ: Actual file content (entire file or large context)
3. SEARCH: Applicable REQ-IDs in requirements/
4. VALIDATE: Against TIER rules (core-policies.md)
5. PLAN: Minimal change scope
6. CONFIRM: If uncertain, ask user explicitly
7. EXECUTE: Using appropriate tools/workflow
8. TEST: Run validation scripts and test suite
9. UPDATE: CHANGELOG + traceability.csv
10. VALIDATE: RE-run checks after changes
11. CONFIRM: Report success with evidence
```

### Examples

**❌ ASSUMPTION FAILURE**:
```
User: "Update the config file"
AI: [Assumes location] Updating ./config.json...
Result: Wrong file, breaks system
```

**✅ DISCOVERY SUCCESS**:
```
User: "Update the config file"
AI: "CONFIRM_NEEDED: Which config file? Found:
  - virsaitis-mcp/config.json
  - virsaitis-extension/package.json
  - .vscode/settings.json"
User: "The MCP config"
AI: [Reads virsaitis-mcp/config.json] [Updates correctly]
```

---

## 🧪 Test-Driven Development (TIER-2)

### TDD Workflow (Preferred)

```
1. Write test FIRST (defines expected behavior)
2. Run test: Verify it FAILS (red)
3. Write minimum code to pass
4. Run test: Verify it PASSES (green)
5. Refactor: Improve code quality
6. Run test: Verify still PASSES
7. Repeat for next feature
```

###Benefits

- **Design clarity**: Test defines interface first
- **Confidence**: Changes protected by tests
- **Documentation**: Tests show usage examples
- **Regression prevention**: Catches breakage immediately

### When to Use TDD

**ALWAYS** for:
- MCP tool implementations
- Extension command handlers
- Governance validators
- Security-critical code

**CAN SKIP** for:
- Agent.md content (manual validation)
- Documentation updates
- Configuration changes
- Quick prototypes (but add tests before merge)

---

## 📝 Commit Workflow (TIER-1)

### Before Every Commit

**CHECKLIST** (all must pass):
```bash
# 1. Build succeeds
npm run build

# 2. Tests pass
npm test

# 3. Linter clean
npm run lint

# 4. Type check passes (TypeScript)
npm run type-check

# 5. Coverage sufficient
npm run test:coverage  # ≥70%

# 6. Security scan clean
python scripts/security-scan.py  # If available
```

**IF ANY FAIL**: Fix before committing

### Commit Message Format

```
<type>(<scope>): <description>

[optional body]

Implements: REQ-XXX-001
Related: REQ-YYY-002
```

**TYPES**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Formatting (no code change)
- `refactor`: Code restructure (no behavior change)
- `test`: Test additions/changes
- `chore`: Build, dependencies, tooling

**SCOPES**:
- `agent`: Agent.md changes
- `mcp`: MCP server changes
- `extension`: Extension changes
- `skills`: Agent Skills changes
- `requirements`: Requirements updates
- `docs`: Documentation

**EXAMPLES**:
```
feat(mcp): Add file operation validation tool

Implements TIER-0 protected file checking via MCP tool.
Returns validation result with tier and consequences.

Implements: REQ-MCP-012

---

fix(extension): Shield icon not showing on protected files

File decoration provider was not checking full path patterns.
Now uses path.includes() with all protected patterns.

Implements: REQ-EXT-008
```

---

## 📋 Component-Specific Workflows

### Agent Development

```
1. Draft content in memory (atomic sentences)
2. Validate atomic structure mentally
3. Check: One concept per sentence
4. Format as markdown
5. Provide code block to user
6. User: Create file manually, paste, save
7. Manual review: Atomic compliance
8. Update CHANGELOG
9. Commit with REQ-ID
```

**NEVER**: Use `create_file` for .agent.md

### MCP Development

```
1. Write test FIRST (TDD)
2. Implement MCP tool handler
3. Run: npm test
4. Run: npm run build
5. Run: npm run lint
6. Update API documentation
7. Update CHANGELOG
8. Commit with REQ-ID
```

### Extension Development

```
1. Write test FIRST (TDD)
2. Implement feature
3. Run: npm run compile
4. Run: npm test
5. Manual test: Extension Development Host
6. Update README (if user-facing)
7. Update CHANGELOG
8. Commit with REQ-ID
```

### Skills Development

```
1. Use SKILL-TEMPLATE.md
2. Fill frontmatter (name, description, metadata)
3. Write Standards & Rules (TIER-assigned)
4. Write Consequences section (per-TIER impacts)
5. Write Procedures with examples
6. Validate: skills-ref validate
7. Test: VS Code 1.109 (skill activation)
8. Update CHANGELOG
9. Commit with REQ-ID
```

---

## 📊 Quality Gates (TIER-1)

### Pre-Commit Gates

**MANDATORY** (blocks commit if failed):
- [ ] Build succeeds
- [ ] All tests pass
- [ ] Linter errors resolved
- [ ] Type checking clean (TypeScript)
- [ ] No hardcoded secrets
- [ ] CHANGELOG updated
- [ ] REQ-ID referenced

**IF GATE FAILS**: Must fix before commit

### Pre-Merge Gates

**MANDATORY** (blocks PR merge):
- [ ] All pre-commit gates passed
- [ ] Code review approved
- [ ] Coverage ≥70% overall
- [ ] Security tests 100% pass
- [ ] Documentation updated
- [ ] traceability.csv updated
- [ ] No protected file modifications without approval

### Pre-Release Gates

**MANDATORY** (blocks version release):
- [ ] All tests passing
- [ ] Coverage ≥70%
- [ ] Security scan clean
- [ ] CHANGELOG version updated
- [ ] Version numbers consistent (package.json, CHANGELOG, tags)
- [ ] Distribution package built
- [ ] Installation instructions verified

---

## 🔄 Iterative Development

### Feature Development Cycle

```
ITERATION 1: Minimum Viable
  → Write minimal test
  → Implement core logic only
  → Verify works
  → Commit

ITERATION 2: Edge Cases
  → Add edge case tests
  → Handle edge cases
  → Verify robust
  → Commit

ITERATION 3: Error Handling
  → Add error scenario tests
  → Implement error handling
  → Verify graceful failures
  → Commit

ITERATION 4: Optimization
  → Profile performance
  → Optimize bottlenecks
  → Verify no regression
  → Commit
```

**BENEFIT**: Small commits, easy to review, easy to revert

---

## 🆘 When Uncertain

### Response Pattern

```
IF uncertain about:
  - File location
  - Component ownership
  - REQ-ID applicability
  - TIER classification
  - Security implications
  - Correct workflow

THEN respond:
  "CONFIRM_NEEDED: [specific question]"

  CONTEXT: [Why clarification needed]
  OPTIONS: [List options if known]
  CONSEQUENCE: [Impact of wrong choice]

  AWAITING: User response
```

**DO NOT**:
- Guess file paths
- Assume requirements
- Invent REQ-IDs
- Proceed with ambiguity

**WAIT**: For explicit user clarification

---

## 📚 Documentation Updates

### When to Update Docs

**MUST UPDATE**:
- New feature added (update README)
- API changed (update API docs)
- Configuration changed (update config guide)
- Functional change (update CHANGELOG)
- Requirement implemented (update traceability.csv)

**LOCATIONS**:
- **README.md**: Component overview, installation, usage
- **CHANGELOG.md**: Version history, changes
- **API docs**: Function signatures, parameters
- **traceability.csv**: REQ-ID implementation mapping

### Documentation Standards

**README.md STRUCTURE**:
1. Purpose and scope
2. Installation instructions
3. Configuration guide
4. Usage examples
5. API reference (if applicable)
6. Troubleshooting
7. Contributing guidelines

**CHANGELOG.md FORMAT**:
```markdown
## [Unreleased]

### Added
- Feature description (REQ-XXX-001)

### Changed
- Modification description (REQ-YYY-002)

### Fixed
- Bug fix with root cause

### Security
- Security patch (REQ-SEC-XXX)
```

---

## 🔍 Code Review Checklist

### For Reviewer

**VERIFY**:
- [ ] Tests added and passing
- [ ] Code follows component standards
- [ ] No security issues
- [ ] No hardcoded secrets
- [ ] Documentation updated
- [ ] CHANGELOG updated
- [ ] REQ-ID referenced
- [ ] No TIER-0 violations
- [ ] Atomic sentences (Agent.md)
- [ ] Proper indentation (2-space TypeScript, 4-space Python)

**QUESTIONS TO ASK**:
- Is this the simplest solution?
- Are edge cases handled?
- Is error handling robust?
- Is performance acceptable?
- Is code maintainable?

---

## 💡 Best Practices

###Small Commits

**PREFER**:
- One logical change per commit
- Commit message explains "why" not just "what"
- Easy to review (< 500 lines changed)
- Easy to revert if needed

**AVOID**:
- Large monolithic commits
- Multiple unrelated changes
- "WIP" or "misc fixes" messages

### Continuous Integration

**AFTER EVERY COMMIT**:
- CI pipeline runs automatically
- Build verifies compilation
- Tests verify functionality
- Linters verify style
- Coverage reports generated

**IF CI FAILS**:
- Fix immediately (don't commit on top)
- Don't merge until green
- Consider reverting if blocking team

### Branching Strategy

**MAIN BRANCH** (`main`):
- Always deployable
- Protected (no direct commits)
- Requires PR approval

**FEATURE BRANCHES** (`feature/description`):
- Created from `main`
- One feature per branch
- Delete after merge

**BUGFIX BRANCHES** (`fix/description`):
- Created from `main`
- Target specific bug
- Delete after merge

---

## 📖 Quick Reference

| Phase | Action | Tool/Command |
|-------|--------|--------------|
| **Discovery** | Verify file exists | `read_file`, `list_dir` |
| **Planning** | Search REQ-IDs | `grep_search requirements/` |
| **Development** | Write tests first | `vitest`, `pytest` |
| **Validation** | Run checks | `npm run build && npm test` |
| **Documentation** | Update CHANGELOG | Manual edit |
| **Commit** | Check checklist | Pre-commit hooks |

---

*Development Workflow Module v2.0.0*
*Discovery-first, TDD, quality gates*
