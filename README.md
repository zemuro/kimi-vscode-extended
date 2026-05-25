# Kimi Code Extended

An extended, highly-configurable fork of the [Kimi Code](https://github.com/MoonshotAI/kimi-agent-sdk/tree/main/node/vscode_extension) VS Code extension, designed to work with a customized [Kimi CLI](https://github.com/zemuro/kimi_cli_mod).

> **Original work** by [Moonshot AI](https://github.com/MoonshotAI). Licensed under [Apache-2.0](LICENSE).

## What is this?

This project takes the official Kimi Code VS Code extension and extends its GUI and configuration layer to expose the new options available in a forked/modified Kimi CLI. The goal is to make the extension fully configurable from the UI and `settings.json`, rather than being limited to the original bundled CLI behavior.

## Features

- **All original Kimi Code features** — long-context workflows, thinking mode, MCP support, slash commands, native diff viewer
- **Extended configuration** — new settings to control your forked CLI's behavior directly from VS Code
- **Custom executable support** — seamlessly switch between the bundled CLI and your own build
- **Open-source & hackable** — full TypeScript source for both the extension backend and the React webview UI

## Project Structure

```
.
├── agent_sdk/              # Vendored Kimi Agent SDK (was an external workspace dep)
├── src/                    # Extension backend (VS Code API, CLI manager, handlers)
├── shared/                 # Shared types & bridge protocol (extension ↔ webview)
├── webview-ui/             # React + Tailwind + Vite webview frontend
└── scripts/                # Build & packaging helpers
```

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- [VS Code](https://code.visualstudio.com/)

### Setup

```bash
git clone https://github.com/zemuro/kimi-vscode-extended.git
cd kimi-vscode-extended

# Install root dependencies
npm install

# Install webview-ui dependencies
cd webview-ui && npm install && cd ..
```

### Build

```bash
# Build both webview and extension
npm run build

# Or individually
npm run build:webview
npm run build:extension
```

### Run & Debug

1. Open the project in VS Code
2. Press `F5` to launch the **Extension Development Host**
3. A new VS Code window opens with your local extension loaded
4. Open the **Kimi Code** panel from the Activity Bar and test your changes

## Configuration

All settings live under the `kimi.*` namespace in VS Code settings.

| Setting | Type | Description |
|---------|------|-------------|
| `kimi.executablePath` | `string` | Path to a custom Kimi CLI executable |
| `kimi.yoloMode` | `boolean` | Auto-approve all tool calls |
| `kimi.autosave` | `boolean` | Automatically save files before Kimi reads/writes them |
| `kimi.showThinkingContent` | `boolean` | Show thinking/reasoning content in the chat UI |
| `kimi.editorContext` | `string` | When to share active editor context (`never`, `onConversationStart`, `onFileChange`) |

> **New options** for the forked CLI will be added here as they are implemented.

## Related Projects

- **Original Extension**: [`MoonshotAI/kimi-agent-sdk`](https://github.com/MoonshotAI/kimi-agent-sdk/tree/main/node/vscode_extension)
- **Forked CLI**: [`zemuro/kimi_cli_mod`](https://github.com/zemuro/kimi_cli_mod)

## Contributing

This is a personal fork for experimentation. Feel free to open issues or PRs if you find bugs or want to share improvements.

## License

[Apache-2.0](LICENSE) — same as the original Kimi Code extension.
