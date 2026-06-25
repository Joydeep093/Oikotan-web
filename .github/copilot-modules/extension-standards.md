# Extension Standards - Layer 3

**Module**: Extension Standards
**Component**: Layer 3 (VS Code Extension)
**Load**: When working on virsaitis-development/virsaitis-extension/
**Version**: 2.0.0
**Updated**: 2026-02-17

---

## 🎯 Purpose

Defines VS Code Extension API standards, TypeScript conventions, and packaging workflow for Virsaitis Extension (Layer 3 user action interception).

---

## 🤖 Machine Policy

```
[TECHNOLOGY_STACK]
LANGUAGE=TypeScript 5.0+
FRAMEWORK=VS Code Extension API 1.85+
BUILD=webpack
PACKAGE=vsce
TEST=@vscode/test-electron

[CODE_STANDARDS]
INDENTATION=2_spaces
LINE_LENGTH=100_chars
API_VERSION=1.85.0
ACTIVATION=lazy_load

[QUALITY_GATES]
COMPILE=must_succeed
TESTS=must_pass
PACKAGE_SIZE=< 5MB
ACTIVATION_TIME=<200ms
```

---

## 📐 TypeScript Standards

Same as MCP layer: 2-space indentation, 100-char line length, single quotes, semicolons required. See [MCP Standards](mcp-standards.md) for details.

---

## 🔧 VS Code Extension Architecture

### Project Structure

```
virsaitis-development/virsaitis-extension/
├── src/
│   ├── extension.ts               (entry point, activate/deactivate)
│   ├── governance/
│   │   ├── file-interceptor.ts    (intercept file operations)
│   │   ├── mcp-client.ts          (communicate with MCP server)
│   │   └── shield-decorator.ts    (🛡️ UI indicator)
│   ├── commands/
│   │   ├── request-override.ts
│   │   └── show-governance-status.ts
│   ├── ui/
│   │   ├── status-bar.ts
│   │   ├── notifications.ts
│   │   └── webview-provider.ts
│   └── utils/
│       └── config.ts
├── test/
│   ├── suite/
│   │   ├── extension.test.ts
│   │   └── governance.test.ts
│   └── runTest.ts
├── resources/
│   └── icons/
│       └── shield.svg
├── package.json                    (extension manifest)
├── tsconfig.json
├── webpack.config.js
├── .vscodeignore
└── README.md
```

---

## 📦 Extension Manifest (package.json)

### Essential Fields

```json
{
  "name": "virsaitis-extension",
  "displayName": "Virsaitis Governance",
  "description": "AI governance enforcement for VS Code",
  "version": "2.0.0",
  "publisher": "virsaitis",
  "engines": {
    "vscode": "^1.85.0"
  },
  "categories": ["Other"],
  "activationEvents": [
    "onStartupFinished",
    "onCommand:virsaitis.requestOverride"
  ],
  "main": "./dist/extension.js",
  "contributes": {
    "commands": [
      {
        "command": "virsaitis.requestOverride",
        "title": "Virsaitis: Request Override"
      },
      {
        "command": "virsaitis.showGovernanceStatus",
        "title": "Virsaitis: Show Governance Status"
      }
    ],
    "configuration": {
      "title": "Virsaitis",
      "properties": {
        "virsaitis.enabled": {
          "type": "boolean",
          "default": true,
          "description": "Enable Virsaitis governance enforcement"
        },
        "virsaitis.mcpServerUrl": {
          "type": "string",
          "default": "http://localhost:3000",
          "description": "Virsaitis MCP server URL"
        }
      }
    }
  }
}
```

---

## 🚀 Activation (TIER-2)

### Lazy Activation

**PATTERN**:
```typescript
// extension.ts
export function activate(context: vscode.ExtensionContext) {
  console.log('Virsaitis extension activating...');

  // Register commands
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'virsaitis.requestOverride',
      () => requestOverride()
    )
  );

  // Initialize governance interceptor (lazy)
  const interceptor = new FileInterceptor();
  context.subscriptions.push(interceptor);

  // Start MCP client connection
  const mcpClient = new MCPClient();
  context.subscriptions.push(mcpClient);

  console.log('Virsaitis extension activated');
}

export function deactivate() {
  console.log('Virsaitis extension deactivated');
}
```

### Activation Events

**RECOMMENDED**:
- `onStartupFinished` - Start when VS Code ready (lazy)
- `onCommand:virsaitis.*` - Activate on command
- NOT `*` - Don't activate on every event (performance)

**TARGET**: Activation time <200ms

---

## 🛡️ File Operation Interception (TIER-1)

### Intercept File Save

```typescript
export class FileInterceptor implements vscode.Disposable {
  private _disposables: vscode.Disposable[] = [];
  private _mcpClient: MCPClient;

  constructor() {
    this._mcpClient = new MCPClient();

    // Intercept file save
    this._disposables.push(
      vscode.workspace.onWillSaveTextDocument(async (e) => {
        const validation = await this.validateOperation(
          'write',
          e.document.uri.fsPath
        );

        if (!validation.allowed && validation.tier === 'TIER-0') {
          // Block save for TIER-0 violation
          e.waitUntil(this.blockSave(validation));
        } else if (!validation.allowed && validation.tier === 'TIER-1') {
          // Warn for TIER-1
          await this.warnUser(validation);
        }
      })
    );
  }

  private async validateOperation(
    operation: string,
    filePath: string
  ): Promise<ValidationResult> {
    return await this._mcpClient.validateOperation(operation, filePath);
  }

  private async blockSave(validation: ValidationResult): Promise<void> {
    const message = `TIER-0 VIOLATION: ${validation.reason}`;
    await vscode.window.showErrorMessage(message, { modal: true });
    throw new Error(message); // Prevents save
  }

  dispose() {
    this._disposables.forEach(d => d.dispose());
  }
}
```

---

## 🎨 UI Components

### Status Bar Item

```typescript
export class GovernanceStatusBar implements vscode.Disposable {
  private _statusBarItem: vscode.StatusBarItem;

  constructor() {
    this._statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Right,
      100
    );
    this._statusBarItem.command = 'virsaitis.showGovernanceStatus';
    this.update StatusBarItem.text = '$(shield) Virsaitis: Active';
    this._statusBarItem.tooltip = 'Governance enforcement active';
    this._statusBarItem.show();
  }

  public setStatus(status: 'active' | 'warning' | 'error'): void {
    switch (status) {
      case 'active':
        this._statusBarItem.text = '$(shield) Virsaitis: Active';
        this._statusBarItem.backgroundColor = undefined;
        break;
      case 'warning':
        this._statusBarItem.text = '$(warning) Virsaitis: Warning';
        this._statusBarItem.backgroundColor = new vscode.ThemeColor(
          'statusBarItem.warningBackground'
        );
        break;
      case 'error':
        this._statusBarItem.text = '$(error) Virsaitis: Error';
        this._statusBarItem.backgroundColor = new vscode.ThemeColor(
          'statusBarItem.errorBackground'
        );
        break;
    }
  }

  dispose() {
    this._statusBarItem.dispose();
  }
}
```

### File Decoration (Shield Icon)

```typescript
export class ShieldDecorator implements vscode.Disposable {
  private _disposables: vscode.Disposable[] = [];

  constructor() {
    const decorationType = vscode.window.createTextEditorDecorationType({
      gutterIconPath: vscode.Uri.file('resources/icons/shield.svg'),
      gutterIconSize: '80%',
    });

    // Apply to protected files
    this._disposables.push(
      vscode.window.onDidChangeActiveTextEditor(editor => {
        if (editor && this.isProtectedFile(editor.document.uri)) {
          const range = new vscode.Range(0, 0, 0, 0);
          editor.setDecorations(decorationType, [{ range }]);
        }
      })
    );
  }

  private isProtectedFile(uri: vscode.Uri): boolean {
    const path = uri.fsPath;
    const protectedPatterns = [
      '.github/copilot-instructions.md',
      '.github/copilot-modules/',
      '.github/agents/',
      'virsaitis-development/virsaitis-requirements/',
    ];

    return protectedPatterns.some(pattern => path.includes(pattern));
  }

  dispose() {
    this._disposables.forEach(d => d.dispose());
  }
}
```

---

## 🔌 MCP Client Communication

```typescript
export class MCPClient {
  private _serverUrl: string;

  constructor() {
    const config = vscode.workspace.getConfiguration('virsaitis');
    this._serverUrl = config.get('mcpServerUrl', 'http://localhost:3000');
  }

  async validateOperation(
    operation: string,
    filePath: string
  ): Promise<ValidationResult> {
    try {
      const response = await fetch(`${this._serverUrl}/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operation, filePath }),
      });

      if (!response.ok) {
        throw new Error(`MCP server error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('MCP client error:', error);
      // Fail open (allow operation if MCP unavailable)
      return {
        allowed: true,
        reason: 'MCP server unavailable',
      };
    }
  }
}
```

---

## 🧪 Testing

### Extension Test Setup

```typescript
// test/suite/extension.test.ts
import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Extension Test Suite', () => {
  vscode.window.showInformationMessage('Start all tests.');

  test('Extension should activate', async () => {
    const extension = vscode.extensions.getExtension('virsaitis.virsaitis-extension');
    assert.ok(extension);
    await extension.activate();
    assert.strictEqual(extension.isActive, true);
  });

  test('Should register commands', async () => {
    const commands = await vscode.commands.getCommands();
    assert.ok(commands.includes('virsaitis.requestOverride'));
    assert.ok(commands.includes('virsaitis.showGovernanceStatus'));
  });
});
```

### Run Tests

```bash
npm test
```

Tests run in Extension Development Host (isolated VS Code instance).

---

## 📦 Packaging & Distribution

### Build Extension

```bash
# Compile TypeScript + webpack bundle
npm run compile

# Run tests
npm test

# Package extension (.vsix file)
vsce package
```

**OUTPUT**: `virsaitis-extension-2.0.0.vsix`

### Package Size

**TARGET**: <5MB

**CHECK**:
```bash
ls -lh *.vsix
```

**REDUCE SIZE**:
- Exclude test files (`.vscodeignore`)
- Exclude source maps in production
- Minimize dependencies
- Use webpack production mode

### .vscodeignore

```
.vscode/**
.gitignore
.yarnrc
vsc-extension-quickstart.md
**/tsconfig.json
**/.eslintrc.json
**/*.map
**/*.ts
src/**
test/**
node_modules/**
!node_modules/@modelcontextprotocol/**
webpack.config.js
```

---

## 🔧 Configuration

### Extension Settings

Users can configure via VS Code settings:

```json
{
  "virsaitis.enabled": true,
  "virsaitis.mcpServerUrl": "http://localhost:3000",
  "virsaitis.showShieldIcons": true,
  "virsaitis.blockTier0": true
}
```

### Reading Configuration

```typescript
const config = vscode.workspace.getConfiguration('virsaitis');
const enabled = config.get<boolean>('enabled', true);
const mcpUrl = config.get<string>('mcpServerUrl', 'http://localhost:3000');
```

---

## 💡 Best Practices

### Disposal Pattern

Always implement `vscode.Disposable`:

```typescript
export class MyComponent implements vscode.Disposable {
  private _disposables: vscode.Disposable[] = [];

  constructor() {
    this._disposables.push(
      // Register event handlers, commands, etc.
    );
  }

  dispose() {
    this._disposables.forEach(d => d.dispose());
  }
}
```

### Error Handling

```typescript
try {
  await riskyOperation();
} catch (error) {
  // Log for debugging
  console.error('Operation failed:', error);

  // Show user-friendly message
  vscode.window.showErrorMessage(
    'Operation failed. Please check Virsaitis logs.'
  );
}
```

### Performance

- Use lazy loading
- Debounce frequent events
- Cache expensive operations
- Minimize synchronous work on activation

---

## 📚 Quick Reference

| Aspect | Standard | Command |
|--------|----------|---------|
| **Build** | Webpack | `npm run compile` |
| **Test** | @vscode/test-electron | `npm test` |
| **Package** | vsce | `vsce package` |
| **Size** | <5MB | Check .vsix |
| **Activation** | <200ms | Lazy load |

---

*Extension Standards Module v2.0.0*
*VS Code user action interception layer*
