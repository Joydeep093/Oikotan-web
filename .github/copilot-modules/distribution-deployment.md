# Distribution & Deployment - Virsaitis

**Module**: Distribution & Deployment
**Load**: When packaging, releasing, or deploying Virsaitis
**Version**: 2.0.0
**Updated**: 2026-02-17

---

## 🎯 Purpose

Defines packaging, versioning, release procedures, and deployment strategies for Virsaitis portable distribution.

---

## 🤖 Machine Policy

```
[VERSIONING]
SCHEME=semantic_versioning (major.minor.patch)
VERSION_SYNC=all_components_match
TAG_FORMAT=v{major}.{minor}.{patch}

[PACKAGING]
DISTRIBUTION=portable_zip
SIZE_TARGET=<50MB
COMPONENTS=agent + mcp + extension + skills + docs + portable

[DEPLOYMENT]
TARGET=user_workspace
INSTALLATION=manual_or_scripted
CONFIGURATION=minimal_required
```

---

## 📦 Distribution Package Structure

### Virsaitis Portable v2.0.0

```
virsaitis-portable-v2.0.0/
├── README.md                           (Installation guide)
├── CHANGELOG.md                        (Release notes)
├── LICENSE                             (MIT or appropriate)
├── install.ps1                         (Windows installation script)
├── install.sh                          (Linux/Mac installation script)
│
├── .github/                            (To be copied to user workspace)
│   ├── copilot-instructions.md         (Hub)
│   ├── copilot-modules/                (10 modules)
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
│   │   └── Virsaitis.agent.md          (Atomic agent definition)
│   └── skills/                         (6 core skills)
│       ├── python-development/
│       │   └── SKILL.md
│       ├── security-controls/
│       │   └── SKILL.md
│       ├── requirements-engineering/
│       │   └── SKILL.md
│       ├── testing-validation/
│       │   └── SKILL.md
│       ├── governance-compliance/
│       │   └── SKILL.md
│       └── typescript-development/
│           └── SKILL.md
│
├── virsaitis-mcp/                      (MCP Server)
│   ├── package.json
│   ├── build/                          (Compiled TypeScript)
│   │   └── index.js
│   ├── README.md
│   └── LICENSE
│
├── virsaitis-extension/                (VS Code Extension)
│   ├── virsaitis-extension-2.0.0.vsix  (.vsix package)
│   ├── README.md
│   └── LICENSE
│
├── docs/                               (Documentation)
│   ├── QUICK-START.md
│   ├── CONFIGURATION.md
│   ├── TROUBLESHOOTING.md
│   ├── ARCHITECTURE.md
│   └── FAQ.md
│
└── templates/                          (Optional templates)
    ├── SKILL-TEMPLATE.md
    ├── SKILL-TEMPLATE-QUICK.md
    └── requirement-template.md
```

---

## 🔢 Semantic Versioning

### Version Structure

**FORMAT**: `MAJOR.MINOR.PATCH`

**EXAMPLES**:
- `1.0.0` - Initial release
- `1.1.0` - New feature (backward compatible)
- `1.1.1` - Bug fix (backward compatible)
- `2.0.0` - Breaking change

### When to Increment

**MAJOR** (breaking changes):
- Agent.md structure change (breaks existing integrations)
- MCP API breaking change
- Extension command removal
- Skill format change (not backward compatible)

**MINOR** (new features, backward compatible):
- New skill added
- New MCP tool added
- New extension command
- New copilot module

**PATCH** (bug fixes, backward compatible):
- Bug fix in MCP validation
- Extension UI fix
- Documentation correction
- Typo fix in Agent.md

### Version Synchronization

**ALL COMPONENTS MUST MATCH**:
- `package.json` (virsaitis-mcp, virsaitis-extension)
- `CHANGELOG.md` (root, per-component)
- Git tag (`v2.0.0`)
- Distribution filename (`virsaitis-portable-v2.0.0.zip`)
- Agent.md version header
- Skill metadata.framework-version

**VERIFY SYNC**:
```bash
# Check all versions match
grep -r '"version":' */package.json
grep -r '**Version**:' .github/*/
```

---

## 📝 Release Checklist

### Pre-Release (Development Complete)

- [ ] All features implemented
- [ ] All tests passing (100%)
- [ ] Coverage ≥70% overall
- [ ] Security tests 100% pass
- [ ] No TIER-0 violations
- [ ] Documentation updated
- [ ] CHANGELOG updated (all components)
- [ ] Version numbers synchronized

### Build & Package

- [ ] Clean build: `npm run clean && npm run build`
- [ ] MCP server compiled: `virsaitis-mcp/build/`
- [ ] Extension packaged: `vsce package` → `.vsix` file
- [ ] Agent.md validated (atomic structure)
- [ ] Skills validated: `skills-ref validate`
- [ ] Copy all components to distribution directory
- [ ] Create portable ZIP archive
- [ ] Verify archive contents
- [ ] Test archive extraction

### Testing (Clean Environment)

- [ ] Fresh VS Code installation
- [ ] Extract portable package
- [ ] Run installation script
- [ ] Verify file locations
- [ ] Start MCP server
- [ ] Install Extension (.vsix)
- [ ] Configure MCP server URL
- [ ] Test: Protected file modification (should block)
- [ ] Test: Skill activation (python-development)
- [ ] Test: Agent mode activation
- [ ] Test: Status bar shows "Active"
- [ ] Review: All integration points working

### Documentation

- [ ] README.md complete
- [ ] QUICK-START.md updated
- [ ] CHANGELOG.md finalized
- [ ] Known issues documented
- [ ] Migration guide (if breaking changes)
- [ ] API documentation up to date

### Release

- [ ] Commit all changes
- [ ] Tag release: `git tag -a v2.0.0 -m "Release v2.0.0"`
- [ ] Push tag: `git push origin v2.0.0`
- [ ] Create GitHub Release
- [ ] Upload portable ZIP to release
- [ ] Publish release notes
- [ ] Announce release

---

## 🛠️ Installation Scripts

### Windows Installation (install.ps1)

```powershell
# install.ps1 - Virsaitis Portable Installation for Windows

param(
    [string]$WorkspacePath = (Get-Location),
    [string]$MCPPort = "3000"
)

Write-Host "Virsaitis Portable v2.0.0 Installation" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan

# 1. Copy .github/ to workspace
Write-Host "`n[1/5] Copying governance files..."
Copy-Item -Path ".github" -Destination "$WorkspacePath/.github" -Recurse -Force
Write-Host "✓ Governance files copied" -ForegroundColor Green

# 2. Install MCP Server
Write-Host "`n[2/5] Installing MCP server..."
Set-Location virsaitis-mcp
npm install --production
Write-Host "✓ MCP server installed" -ForegroundColor Green

# 3. Install VS Code Extension
Write-Host "`n[3/5] Installing VS Code extension..."
$vsixPath = Get-ChildItem -Path "../virsaitis-extension/*.vsix" | Select-Object -First 1
code --install-extension $vsixPath.FullName
Write-Host "✓ Extension installed" -ForegroundColor Green

# 4. Configure Extension
Write-Host "`n[4/5] Configuring extension..."
$settingsPath = "$env:APPDATA/Code/User/settings.json"
if (Test-Path $settingsPath) {
    $settings = Get-Content $settingsPath | ConvertFrom-Json
    $settings.'virsaitis.enabled' = $true
    $settings.'virsaitis.mcpServerUrl' = "http://localhost:$MCPPort"
    $settings | ConvertTo-Json -Depth 10 | Set-Content $settingsPath
}
Write-Host "✓ Extension configured" -ForegroundColor Green

# 5. Start MCP Server
Write-Host "`n[5/5] Starting MCP server..."
Start-Process -NoNewWindow -FilePath "node" -ArgumentList "build/index.js", "--port", $MCPPort

Write-Host "`n✓ Installation complete!" -ForegroundColor Green
Write-Host "`nNext steps:"
Write-Host "1. Reload VS Code window (Ctrl+Shift+P → 'Developer: Reload Window')"
Write-Host "2. Verify Virsaitis status bar shows 'Active' (bottom right)"
Write-Host "3. Try editing .github/copilot-instructions.md (should be protected)"
Write-Host "`nDocumentation: docs/QUICK-START.md"
```

### Linux/Mac Installation (install.sh)

```bash
#!/bin/bash
# install.sh - Virsaitis Portable Installation for Linux/Mac

WORKSPACE_PATH=${1:-.}
MCP_PORT=${2:-3000}

echo "Virsaitis Portable v2.0.0 Installation"
echo "======================================="

# 1. Copy .github/ to workspace
echo -e "\n[1/5] Copying governance files..."
cp -r .github "$WORKSPACE_PATH/.github"
echo "✓ Governance files copied"

# 2. Install MCP Server
echo -e "\n[2/5] Installing MCP server..."
cd virsaitis-mcp
npm install --production
echo "✓ MCP server installed"

# 3. Install VS Code Extension
echo -e "\n[3/5] Installing VS Code extension..."
VSIX_FILE=$(ls ../virsaitis-extension/*.vsix | head -1)
code --install-extension "$VSIX_FILE"
echo "✓ Extension installed"

# 4. Configure Extension
echo -e "\n[4/5] Configuring extension..."
SETTINGS_PATH="$HOME/.config/Code/User/settings.json"
if [ -f "$SETTINGS_PATH" ]; then
    jq '. + {"virsaitis.enabled": true, "virsaitis.mcpServerUrl": "http://localhost:'$MCP_PORT'"}' \
       "$SETTINGS_PATH" > "$SETTINGS_PATH.tmp"
    mv "$SETTINGS_PATH.tmp" "$SETTINGS_PATH"
fi
echo "✓ Extension configured"

# 5. Start MCP Server
echo -e "\n[5/5] Starting MCP server..."
nohup node build/index.js --port $MCP_PORT > mcp.log 2>&1 &

echo -e "\n✓ Installation complete!"
echo -e "\nNext steps:"
echo "1. Reload VS Code window (Ctrl+Shift+P → 'Developer: Reload Window')"
echo "2. Verify Virsaitis status bar shows 'Active' (bottom right)"
echo "3. Try editing .github/copilot-instructions.md (should be protected)"
echo -e "\nDocumentation: docs/QUICK-START.md"
```

---

## 🎯 Deployment Strategies

### Strategy 1: Local Installation (Recommended)

**TARGET**: Single developer workspace
**METHOD**: Extract portable ZIP, run installation script
**BENEFITS**: Simple, complete control, no dependencies
**USE CASE**: Individual developers, project teams

### Strategy 2: Organization-Wide

**TARGET**: Multiple developers, shared governance
**METHOD**: Central MCP server, distributed Extension + Skills
**BENEFITS**: Consistent governance, centralized updates
**USE CASE**: Large teams, enterprise deployments

**ARCHITECTURE**:
```
Central MCP Server (virsaitis.company.com:3000)
        ↑
        │ HTTP
        ↓
Developer 1 (Extension → MCP)
Developer 2 (Extension → MCP)
Developer 3 (Extension → MCP)
  ...
Developer N (Extension → MCP)

.github/skills/ distributed via:
- GitHub Enterprise repository
- VS Code Settings Sync
- Organization policy deployment
```

### Strategy 3: Project Template

**TARGET**: New project creation
**METHOD**: Bootstrap new projects with Virsaitis pre-configured
**BENEFITS**: Governance from day one
**USE CASE**: Greenfield projects, standardized setup

---

## 🔧 Configuration Management

### Minimal Required Configuration

**USER MUST SET**:
```json
{
  "virsaitis.enabled": true,
  "virsaitis.mcpServerUrl": "http://localhost:3000"
}
```

**OPTIONAL CONFIGURATION**:
```json
{
  "virsaitis.showShieldIcons": true,
  "virsaitis.blockTier0": true,
  "virsaitis.auditLogPath": "./virsaitis-audit.log",
  "virsaitis.failOpen": false
}
```

### Environment Variables (MCP Server)

```bash
# MCP Server configuration
export VIRSAITIS_PORT=3000
export VIRSAITIS_AGENT_PATH=".github/agents/Virsaitis.agent.md"
export VIRSAITIS_AUDIT_LOG="./mcp-audit.log"
```

---

## 📊 Distribution Metrics

### Package Size Targets

| Component | Target Size | Actual (v2.0.0) |
|-----------|-------------|-----------------|
| **Agent** | <100 KB | ~50 KB |
| **Skills** | <500 KB | ~300 KB |
| **MCP Server** | <10 MB | ~8 MB |
| **Extension** | <5 MB | ~3 MB |
| **Documentation** | <5 MB | ~2 MB |
| **Total ZIP** | <50 MB | ~15 MB |

### Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Installation time** | <5 minutes | Manual timing |
| **MCP startup** | <2 seconds | `time node build/index.js` |
| **Extension activation** | <200ms | VS Code telemetry |
| **Skill load time** | <50ms | Progressive disclosure |

---

## 🔄 Update Procedure

### Patch Update (2.0.0 → 2.0.1)

1. Download new portable ZIP
2. Extract to temporary location
3. Stop MCP server
4. Replace MCP server files
5. Replace Extension (.vsix), reinstall
6. Restart MCP server
7. Reload VS Code
8. Verify: Check status bar, test protected file
9. No .github/ changes needed (backward compatible)

### Minor Update (2.0.1 → 2.1.0)

1. Download new portable ZIP
2. Extract to temporary location
3. **Backup current .github/** (important!)
4. Stop MCP server
5. Replace MCP server files
6. Replace Extension, reinstall
7. **Selectively merge .github/ updates** (review changes)
8. Restart MCP server
9. Reload VS Code
10. Review: New features, configuration changes

### Major Update (2.x.x → 3.0.0)

1. **READ MIGRATION GUIDE** (critical!)
2. Backup entire workspace
3. Review breaking changes
4. Plan migration steps
5. Test in isolated environment first
6. Follow migration guide step-by-step
7. Verify all integration points
8. Update project dependencies if needed

---

## 💡 Best Practices

### Testing Before Release

**ALWAYS TEST IN CLEAN ENVIRONMENT**:
- Fresh OS install (VM recommended)
- Fresh VS Code install
- No existing configurations
- Follow installation guide exactly
- Document any issues

### Documentation

**MUST INCLUDE**:
- Installation instructions (step-by-step)
- Configuration guide
- Troubleshooting section
- Known issues
- Migration guide (for breaking changes)

### Backward Compatibility

**MAINTAIN WHEN POSSIBLE**:
- Keep old MCP tool names (add new, deprecate old)
- Support old configuration formats (warn, don't break)
- Provide migration scripts for data
- Document deprecations clearly

---

## 📚 Quick Reference

| Task | Command/Tool | Location |
|------|--------------|----------|
| **Build MCP** | `npm run build` | virsaitis-mcp/ |
| **Package Extension** | `vsce package` | virsaitis-extension/ |
| **Validate Skills** | `skills-ref validate` | .github/skills/ |
| **Create ZIP** | Archive utility | virsaitis-portable/ |
| **Install (Win)** | `.\install.ps1` | Extracted ZIP |
| **Install (Linux)** | `./install.sh` | Extracted ZIP |

---

*Distribution & Deployment Module v2.0.0*
*Portable packaging and deployment strategies*
