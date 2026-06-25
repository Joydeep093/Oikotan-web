# Agent Standards - Layer 1

**Module**: Agent Standards
**Component**: Layer 1 (Atomic Markdown Agent)
**Load**: When working on virsaitis-agent/ or .github/agents/
**Version**: 2.0.0
**Updated**: 2026-02-17

---

## 🎯 Purpose

Defines atomic sentence construction, markdown standards, and development workflow for Virsaitis Agent.md files.

---

## 🤖 Machine Policy

```
[AGENT_FORMAT]
FORMAT=markdown
SENTENCE_STRUCTURE=atomic
ENCODING=utf8_no_bom
LINE_LENGTH=80_chars_max
COMPLEXITY=one_concept_per_sentence

[FILE_OPERATIONS]
CREATE_FILE_TOOL=prohibited
AUTOMATED_FORMATTERS=prohibited
PASTE_WORKFLOW=required

[VALIDATION]
AUTOMATED_SYNTAX=not_available
MANUAL_REVIEW=required
STRUCTURE_CHECK=atomic_compliance
```

---

## 📐 Atomic Sentence Construction (TIER-0)

### What is Atomic Sentence?

**Definition**: One sentence expresses exactly ONE concept.

**Characteristics**:
- Single subject-verb-object relationship
- No compound clauses (no "and", "but", "which", "that" joining independent ideas)
- No nested dependencies
- No implicit references
- Standalone comprehensibility

### Why Atomic Sentences?

**Research Finding**: AI language models comprehend atomic sentences 30% more accurately than compound sentences.

**Benefit Chain**:
```
Atomic Sentences
  → Clearer parsing by AI
  → Reduced ambiguity
  → Correct rule interpretation
  → Higher governance compliance
  → Fewer violations (target: 95%+)
```

### Good vs Bad Examples

✅ **GOOD (Atomic)**:
```markdown
You must validate file existence.
File validation prevents NotFoundError.
Run validation before modification.
Use read_file tool for validation.
```

❌ **BAD (Compound)**:
```markdown
You must validate file existence before modification to
prevent NotFoundError, and this should be done using the
read_file tool which checks both path and permissions.
```

**Problem**: Four concepts in one sentence (validate, timing, error prevention, tool selection).

✅ **GOOD (Fixed)**:
```markdown
You must validate file existence.
Validation must occur before modification.
Validation prevents NotFoundError.
Use read_file tool for validation.
```

---

## 📝 Markdown Standards

### File Format

**REQUIRED**:
- File extension: `.md` or `.agent.md`
- Encoding: UTF-8 without BOM
- Line endings: LF (`\n`) not CRLF (`\r\n`)
- No trailing whitespace
- Single newline at end of file

**PROHIBITED**:
- UTF-8 with BOM (breaks some parsers)
- UTF-16, UTF-32, or other encodings
- CRLF line endings (Windows default)
- Tabs for indentation
- Multiple blank lines (max 1 consecutive)

### Content Structure

**TYPICAL AGENT.MD STRUCTURE**:
```markdown
# Agent Title

**Agent ID**: unique-identifier
**Version**: X.Y.Z
**Updated**: YYYY-MM-DD

---

## [MACHINE_POLICY]
[Machine-readable configuration]

---

## TIER-0: Safety-Critical Rules
[Atomic sentences for critical rules]

## TIER-1: Critical Operations
[Atomic sentences for important rules]

## TIER-2: Best Practices
[Atomic sentences for recommendations]

---

## Workflow Patterns
[Atomic sentences for procedures]

## Integration Points
[Atomic sentences for component interaction]

---

*Agent Footer*
```

### Headings

**STANDARDS**:
- H1 (`#`): Document title only (one per file)
- H2 (`##`): Major sections
- H3 (`###`): Subsections
- H4 (`####`): Rare, only if deep hierarchy needed
- Always space after hash: `## Title` not `##Title`

### Lists

**ORDERED LISTS** (numbered steps):
```markdown
1. First step (atomic sentence)
2. Second step (atomic sentence)
3. Third step (atomic sentence)
```

**UNORDERED LISTS** (bullets):
```markdown
- First item (atomic sentence)
- Second item (atomic sentence)
- Third item (atomic sentence)
```

**NESTED LISTS**:
```markdown
- Parent item
  - Child item (2-space indent)
  - Child item
- Parent item
```

### Code Blocks

**INLINE CODE**: `functionName()`, `variable`, `command`

**CODE BLOCKS**:
````markdown
```language
code content here
```
````

**MACHINE-READABLE BLOCKS**:
````markdown
```
[SECTION_NAME]
KEY=value
KEY2=value2
```
````

---

## 🚫 Prohibited Tools (TIER-0)

### Never Use `create_file` for Agent Files

**WHY PROHIBITED**:
The `create_file` tool has indentation handling bugs.
It corrupts nested markdown lists.
It mangl es code block formatting.
Corrupted structure breaks AI parsing.

**CONSEQUENCE**:
- **Operation**: File creation fails to parse correctly
- **User Impact**: Must manually fix formatting issues
- **Technical Impact**: AI cannot read agent instructions
- **Remediation**: Delete file, regenerate with paste workflow

### Never Use Automated Formatters

**WHY PROHIBITED**:
Formatters may merge atomic sentences.
Prettier/markdownlint may combine lines.
Combined sentences violate atomic structure.

**ALLOWED FORMATTERS**:
- None for agent files (manual formatting only)
- Spell checkers are OK (no structural changes)

---

## ✅ Required Workflow (TIER-0)

### Agent File Creation Process

**STEP-BY-STEP**:
1. Generate agent content in memory
2. Validate atomic structure mentally
3. Check each sentence: one concept only
4. Format as clean markdown
5. Provide markdown code block to user
6. Instruct user: "Copy this content"
7. Instruct user: "Create file manually in VS Code"
8. Instruct user: "Paste content (Ctrl+V)"
9. Instruct user: "Save file (Ctrl+S)"
10. User saves: triggers VS Code validation

**IMPORTANT**: Never call `create_file`, `write_file`, or terminal heredoc commands for agent files.

### Agent File Modification Process

**STEP-BY-STEP**:
1. Read existing file content (entire file)
2. Identify section to modify
3. Draft changes in memory
4. Validate atomic structure of changes
5. Provide markdown block with changes
6. Instruct user: "Replace [section] with this content"
7. User pastes and saves
8. Verify changes applied correctly

**ALTERNATIVE** (for small changes):
- Use `replace_string_in_file` tool
- Include 3-5 lines of context before/after
- Ensure replacement maintains atomic structure
- Verify no sentences merged accidentally

---

## 🔍 Validation Procedures

### Manual Atomic Structure Review

**FOR EACH SENTENCE, CHECK**:
1. Count concepts: Should be exactly 1
2. Find subject: Should be clear and explicit
3. Find verb: Should be present and active
4. Find object: Should be concrete (if needed)
5. Check length: Prefer <80 characters
6. Check dependencies: Should standalone

**CONCEPT COUNTING TECHNIQUE**:
- Read sentence aloud
- Pause at commas, semicolons, "and", "but"
- Each pause = potential concept boundary
- If >1 concept, split sentence

### Atomic Sentence Checklist

**SENTENCE PASSES IF**:
- [ ] Expresses one concept only
- [ ] Has clear subject and verb
- [ ] Can be understood without prior sentence
- [ ] Length <80 characters (recommended)
- [ ] No compound clauses
- [ ] No nested dependencies

**SENTENCE FAILS IF**:
- Multiple concepts joined with "and", "or", "but"
- Dependent clause with "which", "that" adds new concept
- Requires previous sentence for context
- Length >120 characters (usually indicates multiple concepts)

---

## 📦 File Organization

### Directory Structure

```
virsaitis-development/virsaitis-agent/
├── agent-source/
│   ├── Virsaitis-CHIEF-v4.0.md        (main agent, atomic)
│   ├── governance-core.md             (TIER system, atomic)
│   └── workflow-patterns.md           (procedures, atomic)
├── archive/
│   └── [previous versions]
├── templates/
│   └── agent-template-atomic.md
├── validation/
│   └── atomic-sentence-checker.md     (manual checklist)
├── CHANGELOG.md
└── README.md
```

### File Naming

**STANDARDS**:
- Lowercase with hyphens: `agent-name.md`
- Version suffix: `agent-name-v1.0.md`
- Component prefix: `component-agent.md`
- Descriptive: `governance-core.md` not `gc.md`

---

## 🔄 Change Management

### When to Update Agent.md

**MUST UPDATE**:
- New TIER-0 rule added
- Existing rule modified
- Enforcement consequence changed
- New component integration
- Security policy updated

**SHOULD UPDATE**:
- TIER-1/TIER-2 rule added
- Workflow improved
- Example clarified
- Documentation enhanced

**MAY UPDATE**:
- Typo fixes
- Formatting improvements (maintain atomic structure)
- Comment additions

### Update Process

1. Identify section requiring change
2. Draft new content (atomic sentences)
3. Validate atomic structure
4. Update version number
5. Update "Updated" date (YYYY-MM-DD)
6. Add CHANGELOG entry
7. Commit with REQ-ID reference
8. Update traceability.csv

---

## 📚 Templates & Resources

### Agent Template Location

**TEMPLATE**: `virsaitis-development/virsaitis-agent/templates/agent-template-atomic.md`

**CONTAINS**:
- Standard header structure
- TIER section templates
- Machine policy block examples
- Workflow pattern templates
- All in atomic sentence format

### Validation Checklist

**CHECKLIST**: `virsaitis-development/virsaitis-agent/validation/atomic-sentence-checker.md`

**USE BEFORE**:
- Committing agent changes
- Requesting code review
- Publishing agent version
- Distributing to users

---

## 🎯 Quality Targets

**ATOMIC COMPLIANCE**:
- Target: 100% of sentences atomic
- Measurement: Manual review (no automated tool yet)
- Frequency: Every commit
- Reviewer: Agent author + peer review

**READABILITY**:
- AI comprehension: 95%+ accuracy target
- Human comprehension: Clear and unambiguous
- Token efficiency: <500 lines per agent file

**MAINTAINABILITY**:
- Changes localized to specific sections
- No ripple effects from sentence edits
- Version control friendly (line-by-line diffs)

---

## 💡 Best Practices

### Writing Atomic Sentences

**TECHNIQUE 1: Start Simple**
- Write basic sentence first
- Add details in separate sentences
- Don't combine during editing

**TECHNIQUE 2: One Idea Per Line**
- Think of bullet points
- Each point = one sentence
- Expand later if needed

**TECHNIQUE 3: Read Aloud**
- If you pause mid-sentence, split there
- If you need breath, probably too long
- If you forget start by end, too complex

### Common Pitfalls to Avoid

❌ **Pitfall**: Using "and" to join related concepts
✅ **Fix**: Split into two sentences

❌ **Pitfall**: Using "which" or "that" to add details
✅ **Fix**: Make second sentence with explicit subject

❌ **Pitfall**: Implicit pronouns ("it", "this", "that")
✅ **Fix**: Repeat noun for clarity

❌ **Pitfall**: Assuming prior context
✅ **Fix**: Make each sentence standalone

---

## 📖 Quick Reference

| Aspect | Standard | Violation |
|--------|----------|-----------|
| **Sentence Structure** | One concept only | Multiple concepts |
| **File Creation** | Manual paste | `create_file` tool |
| **Encoding** | UTF-8 no BOM | UTF-8 with BOM |
| **Line Length** | <80 chars | >120 chars |
| **Formatting** | Manual | Auto-formatter |
| **Validation** | Manual review | Assume correct |

---

*Agent Standards Module v2.0.0*
*Atomic sentence construction for maximum AI comprehension*
