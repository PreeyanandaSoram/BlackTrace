<div align="center">

```text
  ╔═══════════════════════════════════════════════════════════════════════╗
  ║                                                                       ║
  ║   ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗               ██████╗  ║
  ║  ██╔═══██╗██║   ██║██║     ██╔════╝██╔════╝██║              ██╔══██╗ ║
  ║  ██║   ██║██║   ██║██║     █████╗  ███████╗██║              ██║  ██║ ║
  ║  ██║▄▄ ██║██║   ██║██║     ██╔══╝  ╚════██║██║              ██║  ██║ ║
  ║  ╚██████╔╝╚██████╔╝███████╗███████╗███████║██║              ██████╔╝ ║
  ║   ╚══▀▀═╝  ╚═════╝ ╚══════╝╚══════╝╚══════╝╚═╝              ╚═════╝  ║
  ║                                                                       ║
  ║                      ███████╗ ██████╗ ██████╗                       ║
  ║                      ██╔════╝██╔═══██╗██╔══██╗                      ║
  ║                      █████╗  ██║   ██║██████╔╝                      ║
  ║                      ██╔══╝  ██║   ██║██╔══██╗                      ║
  ║                      ███████╗╚██████╔╝██║  ██║                      ║
  ║                      ╚══════╝ ╚═════╝ ╚═╝  ╚═╝                      ║
  ║                                                                       ║
  ║                         [ v1.0.0 ]                                    ║
  ║                                                                       ║
  ╚═══════════════════════════════════════════════════════════════════════╝
```

</div>

A powerful IP lookup CLI tool with an amazing hacker-style UI.

<p align="center">
  <img src="https://img.shields.io/npm/v/ipinfo-cli" alt="npm version">
  <img src="https://img.shields.io/pypi/v/ipinfo-cli" alt="PyPI version">
  <img src="https://img.shields.io/github/license/PreeyanandaSoram/ipinfo-cli" alt="license">
</p>

## ✨ Features

- 🎨 Amazing hacker-style terminal UI
- 🌐 Lookup your public IP address
- 🔍 Lookup any IP address worldwide
- 🔑 API token configuration for higher limits
- 🖥️ Cross-platform (Node.js & Python)
- ⚡ Fast and reliable

## 📦 Installation

### Node.js (npm)
```bash
npm install -g ipinfo-cli
```

### Python (pip)
```bash
pip install ipinfo-cli
```

## 🚀 Usage

```bash
ipinfo
```

## 📸 Menu

```
  ╔═══════════════════════════════════════════════════════╗
  ║                     MAIN MENU                    ║
  ╠═══════════════════════════════════════════════════════╣
  ║  [1]  Lookup My IP                        ║
  ║  [2]  Lookup Specific IP                  ║
  ║  [3]  Configure API Token                 ║
  ║  [4]  About                               ║
  ║  [5]  Exit                                ║
  ╚═══════════════════════════════════════════════════════╝
```

## 📸 Example Output

```
  ┌─ LOADING ────────────────────────────────────────────┐
  │ Fetching IP information...                            │
  └──────────────────────────────────────────────────────┘

  ╔═══════════════════════════════════════════════════════╗
  ║                    IP INFORMATION                      ║
  ╠═══════════════════════════════════════════════════════╣
  ║ ◆ IP            1.2.3.4                               ║
  ║ ◆ CITY          Bangkok                               ║
  ║ ◆ REGION        Thailand                              ║
  ║ ◆ COUNTRY       TH                                   ║
  ║ ◆ COORDINATES   13.7563,100.5018                      ║
  ║ ◆ ORGANIZATION  AIS Fibre                             ║
  ╚═══════════════════════════════════════════════════════╝
```

## 🔑 API Token

For higher lookup limits, configure your API token:

1. Get a free token at https://ipinfo.io/account
2. Run `ipinfo --config` or use option 3 in menu
3. Enter your API token

Free tier: 50,000 requests/month

## 📖 Command Line Options

```bash
ipinfo              # Show menu
ipinfo <ip>        # Lookup specific IP
ipinfo --config    # Configure API token
ipinfo --help      # Show help
```

## 🔧 Development

### Node.js
```bash
git clone https://github.com/Preeyananda/ipinfo-cli.git
cd ipinfo-cli/js
npm install
node bin/cli.js
```

### Python
```bash
git clone https://github.com/Preeyananda/ipinfo-cli.git
cd ipinfo-cli/py
pip install -r requirements.txt
python -m ipinfo
```

## 📄 License

MIT License - see the [LICENSE](https://github.com/PreeyanandaSoram/ipinfo-cli/blob/main/LICENSE) file.

---

<p align="center">Made with ❤️ by Preeyananda Soram</p>
