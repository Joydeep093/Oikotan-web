# Requirements Engineering - Virsaitis

**Module**: Requirements Engineering
**Load**: When implementing features, updating traceability
**Version**: 2.0.0
**Updated**: 2026-02-17

---

## 🎯 Purpose

Defines REQ-ID format, traceability management, and requirement lifecycle for all Virsaitis development.

---

## 🤖 Machine Policy

```
[REQ_ID_FORMAT]
PATTERN=^REQ-[A-Z]{2,4}-[0-9]{3}$
INVENTION=prohibited
VALIDATION=mandatory
TRACEABILITY=required

[LIFECYCLE]
CREATE_REQUIREMENT → IMPLEMENT → TEST → TRACE → VERIFY

[TRACEABILITY]
CSV_FILE=virsaitis-development/virsaitis-requirements/traceability.csv
UPDATE_ON_IMPLEMENTATION=required
UPDATE_ON_TEST_CREATION=required
```

---

## 📋 REQ-ID Format (TIER-1)

### Structure

**PATTERN**: `REQ-[CATEGORY]-[NUMBER]`

**REGEX**: `^REQ-[A-Z]{2,4}-[0-9]{3}$`

**EXAMPLES**:
- `REQ-GOV-001` - Governance Core requirement #1
- `REQ-SEC-015` - Security Controls requirement #15
- `REQ-MCP-003` - MCP Server feature #3

### Categories

| Category | Code | Purpose | Example |
|----------|------|---------|---------|
| **Governance** | GOV | Core governance rules | REQ-GOV-001 |
| **Security** | SEC | Security controls | REQ-SEC-012 |
| **MCP** | MCP | MCP Server features | REQ-MCP-005 |
| **Extension** | EXT | Extension features | REQ-EXT-008 |
| **Agent** | AGT | Agent capabilities | REQ-AGT-004 |
| **Skills** | SKL | Agent Skills | REQ-SKL-002 |
| **Testing** | TEST | Testing requirements | REQ-TEST-007 |
| **NFR** | NFR | Non-Functional | REQ-NFR-010 |

### Number Assignment

**FORMAT**: 3 digits with leading zeros

✅ **GOOD**:
- `REQ-GOV-001`
- `REQ-GOV-010`
- `REQ-GOV-100`

❌ **BAD**:
- `REQ-GOV-1` (missing leading zeros)
- `REQ-GOV-1000` (too many digits, split category)

### Never Invent REQ-IDs

**RULE**: AI must NEVER create REQ-IDs

**WHY**:
- REQ-IDs managed by humans
- Traceability requires authority
- Invented IDs create confusion
- Audit trail must be accurate

**IF NO REQ-ID EXISTS**:
```
RESPONSE: "REQUIREMENT_NOT_FOUND: No REQ-ID for this feature"

STOP: Do not invent REQ-ID
REQUEST: User create requirement first
SUGGEST: Check virsaitis-development/virsaitis-requirements/
```

---

## 📂 Requirements Structure

### Directory Organization

```
virsaitis-development/virsaitis-requirements/
├── index.md                      (requirements overview)
├── functional-spec.md            (functional requirements)
├── nonfunctional-spec.md         (NFRs)
├── security-controls.md          (security requirements)
├── testing-requirements.md       (test requirements)
├── glossary.md                   (terminology)
├── assumptions.md                (assumptions log)
├── risk-register.md              (risks and mitigations)
├── traceability.csv              (REQ-ID → Implementation mapping)
└── archive/                      (deprecated requirements)
```

### Requirement Document Format

**STRUCTURE**:
```markdown
## REQ-GOV-001: Protected File Modification

**Priority**: TIER-0 (Safety-Critical)
**Category**: Governance
**Status**: Approved
**Created**: 2026-02-17
**Updated**: 2026-02-17

### Description

The system MUST prevent modification of protected files without explicit approval.

Protected files include:
- `.github/copilot-instructions.md`
- `.github/copilot-modules/**/*.md`
- `.github/agents/Virsaitis.agent.md`
- `virsaitis-development/virsaitis-requirements/**`

### Rationale

Protected files control governance enforcement.
Unauthorized modification bypasses all safety controls.
Preventing modification maintains system integrity.

### Acceptance Criteria

1. GIVEN protected file modification attempted
   WHEN governance validation runs
   THEN operation is BLOCKED

2. GIVEN non-protected file modification
   WHEN governance validation runs
   THEN operation is ALLOWED

3. GIVEN protected file modification with override token
   WHEN governance validation runs
   THEN operation is ALLOWED with audit log

### Dependencies

- REQ-GOV-002 (TIER Definition)
- REQ-MCP-005 (File Validation Tool)

### Implementation Reference

- `virsaitis-mcp/src/governance/validator.ts`
- `virsaitis-extension/src/governance/file-interceptor.ts`

### Test Reference

- `virsaitis-mcp/tests/governance/validator.test.ts`
- `virsaitis-extension/test/suite/governance.test.ts`

### Verification

```bash
# Test protected file modification
npm test -- --grep "should block protected file"
```
```

---

## 🔗 Traceability Management (TIER-1)

### traceability.csv Format

**COLUMNS**:
```csv
REQ_ID,Description,Priority,ImplementationRef,TestRef,Status
REQ-GOV-001,"Protected file modification",TIER-0,"mcp/src/governance/validator.ts#L45","mcp/tests/governance/validator.test.ts#L12",Implemented
REQ-SEC-012,"Secret scanning",TIER-0,"mcp/src/security/scanner.ts#L23,extension/src/commands/scan.ts#L10","mcp/tests/security/scanner.test.ts#L8",Implemented
REQ-MCP-005,"File validation tool",TIER-1,"mcp/src/tools/validate-operation.ts#L15","mcp/tests/tools/validate-operation.test.ts#L5",Implemented
```

**FIELDS**:
- **REQ_ID**: Requirement identifier
- **Description**: Short requirement description (50 chars max)
- **Priority**: TIER-0, TIER-1, TIER-2, or TIER-3
- **ImplementationRef**: File paths with line numbers (comma-separated)
- **TestRef**: Test file paths with line numbers (comma-separated)
- **Status**: Draft, Approved, Implemented, Verified, Deprecated

### Update Traceability

**WHEN TO UPDATE**:
1. Requirement implemented → Add ImplementationRef
2. Tests written → Add TestRef
3. Requirement status changes → Update Status
4. Implementation moved → Update ImplementationRef

**HOW TO UPDATE**:
```bash
# 1. Read current traceability.csv
cat virsaitis-development/virsaitis-requirements/traceability.csv

# 2. Find REQ-ID row

# 3. Update ImplementationRef column
# Example: "mcp/src/governance/validator.ts#L45"

# 4. Update TestRef column
# Example: "mcp/tests/governance/validator.test.ts#L12"

# 5. Update Status column
# Example: "Implemented"

# 6. Save file

# 7. Commit with message referencing REQ-ID
git commit -m "feat(mcp): Implement file validation

Implements: REQ-MCP-005"
```

---

## 🔄 Requirement Lifecycle

### Lifecycle States

```
DRAFT → REVIEW → APPROVED → IMPLEMENTED → VERIFIED → (DEPRECATED)
```

**DRAFT**:
- Initial creation
- Under discussion
- May change significantly

**REVIEW**:
- Ready for stakeholder review
- Acceptance criteria defined
- Dependencies identified

**APPROVED**:
- Approved for implementation
- REQ-ID assigned officially
- Added to traceability.csv

**IMPLEMENTED**:
- Code written
- ImplementationRef updated in traceability.csv
- Not yet tested

**VERIFIED**:
- Tests written and passing
- TestRef updated in traceability.csv
- Ready for release

**DEPRECATED**:
- No longer applicable
- Moved to archive/
- Marked in traceability.csv

### State Transitions

**DRAFT → APPROVED**:
- Stakeholder approval obtained
- REQ-ID assigned
- Acceptance criteria complete

**APPROVED → IMPLEMENTED**:
- Code committed
- traceability.csv updated
- CHANGELOG updated

**IMPLEMENTED → VERIFIED**:
- Tests passing
- Coverage sufficient
- traceability.csv updated

---

## 📝 Before Implementing Feature

### Discovery Workflow

```
1. USER REQUEST: "Add feature X"
   ↓
2. SEARCH: virsaitis-development/virsaitis-requirements/
   ↓
3. FIND: Relevant REQ-ID (e.g., REQ-MCP-005)
   ↓
4. VALIDATE: REQ-ID format matches regex
   ↓
5. READ: Full requirement document
   ↓
6. UNDERSTAND: Acceptance criteria
   ↓
7. PLAN: Implementation approach
   ↓
8. IMPLEMENT: Write code
   ↓
9. TEST: Write tests matching acceptance criteria
   ↓
10. UPDATE: traceability.csv (ImplementationRef, TestRef)
    ↓
11. COMMIT: Message includes "Implements: REQ-XXX-YYY"
```

### If No REQ-ID Found

**RESPONSE PATTERN**:
```
REQUIREMENT_NOT_FOUND

SEARCHED: virsaitis-development/virsaitis-requirements/
QUERY: [search terms used]
RESULT: No matching REQ-ID found

ACTION REQUIRED:
1. Create requirement document in requirements/
2. Define acceptance criteria
3. Obtain stakeholder approval
4. Assign REQ-ID
5. Add to traceability.csv
6. Then implement feature

ALTERNATIVE:
- Feature may be out of scope
- Check: Does this align with Virsaitis mission?
- Discuss: Should this be a requirement?
```

---

## ✅ Acceptance Criteria

### Format

**USE GIVEN-WHEN-THEN**:
```
GIVEN [initial context]
WHEN [action occurs]
THEN [expected outcome]
```

### Examples

**GOOD ACCEPTANCE CRITERIA**:
```
AC1: Protected File Blocking
GIVEN user attempts to modify .github/copilot-instructions.md
WHEN MCP validation tool runs
THEN operation is BLOCKED with TIER-0 message

AC2: Non-Protected File Allowed
GIVEN user attempts to modify src/my-file.ts
WHEN MCP validation tool runs
THEN operation is ALLOWED without warnings

AC3: Audit Logging
GIVEN protected file modification attempted
WHEN operation is BLOCKED
THEN audit log entry is created with timestamp, user, file, reason
```

**WHY THIS FORMAT**:
- Testable (can write automated test directly)
- Unambiguous (clear pass/fail)
- Complete (covers happy path and edge cases)

---

## 🧪 Testing Requirements

### Test Coverage per Requirement

**REQUIREMENT → TESTS MAPPING**:
- Each requirement MUST have tests
- Each acceptance criterion → At least one test
- TIER-0/TIER-1 → Multiple test cases (happy path + edge cases)
- TIER-2/TIER-3 → Minimum one test case

**TEST NAMING CONVENTION**:
```typescript
describe('REQ-GOV-001: Protected File Modification', () => {
  describe('AC1: Protected File Blocking', () => {
    it('should block modification of copilot-instructions.md', () => {
      // Test implementation
    });

    it('should block modification of agent files', () => {
      // Test implementation
    });
  });

  describe('AC2: Non-Protected File Allowed', () => {
    it('should allow modification of source files', () => {
      // Test implementation
    });
  });
});
```

---

## 📊 Requirement Metrics

### Coverage Metrics

**MANDATORY TARGET**: 100% of MUST requirements implemented and tested

**CALCULATE**:
```bash
# Count total requirements
total=$(grep -c "^REQ-" traceability.csv)

# Count implemented requirements
implemented=$(grep -c ",Implemented," traceability.csv)

# Calculate percentage
coverage=$((implemented * 100 / total))

echo "Requirement coverage: $coverage%"
```

**QUALITY GATES**:
- TIER-0: 100% implemented and verified (no exceptions)
- TIER-1: 100% implemented, ≥95% verified
- TIER-2: ≥80% implemented
- TIER-3: Best effort

---

## 💡 Best Practices

### Requirement Writing

**GOOD REQUIREMENT**:
- Clear and testable
- One concept per requirement
- Uses "MUST", "SHOULD", or "MAY" (RFC 2119)
- Includes rationale (why)
- Has acceptance criteria
- References dependencies

**BAD REQUIREMENT**:
- Vague ("The system should be good")
- Multiple concepts mixed
- No acceptance criteria
- No clear pass/fail

### Traceability Maintenance

**KEEP CSV UP TO DATE**:
- Update immediately when implementing
- Add TestRef when tests written
- Update Status when verified
- Review quarterly for accuracy

**VERIFY REFERENCES**:
- ImplementationRef points to actual code
- Test Ref points to actual tests
- Line numbers are approximate (code changes)
- Update refs when code moves

---

## 📚 Quick Reference

| Aspect | Standard | Location |
|--------|----------|----------|
| **REQ-ID Format** | REQ-[CAT]-[NUM] | All requirements |
| **Traceability** | CSV file | requirements/traceability.csv |
| **Acceptance Criteria** | Given-When-Then | Requirement docs |
| **Test Coverage** | 100% MUST requirements | Per REQ-ID |
| **Status** | Draft → Verified | Lifecycle |

---

*Requirements Engineering Module v2.0.0*
*Traceability and requirement lifecycle management*
