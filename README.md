<div align="center">

<font size="2">

```
                                                                                                                           
 `7MM"""Yp, `7MMF'            db       .g8"""bgd `7MMF' `YMM'MMP""MM""YMM `7MM"""Mq.        db       .g8"""bgd `7MM"""YMM  
   MM    Yb   MM             ;MM:    .dP'     `M   MM   .M'  P'   MM   `7   MM   `MM.      ;MM:    .dP'     `M   MM    `7  
   MM    dP   MM            ,V^MM.   dM'       `   MM .d"         MM        MM   ,M9      ,V^MM.   dM'       `   MM   d    
   MM"""bg.   MM           ,M  `MM   MM            MMMMM.         MM        MMmmdM9      ,M  `MM   MM            MMmmMM    
   MM    `Y   MM      ,    AbmmmqMA  MM.           MM  VMA        MM        MM  YM.      AbmmmqMA  MM.           MM   Y  , 
   MM    ,9   MM     ,M   A'     VML `Mb.     ,'   MM   `MM.      MM        MM   `Mb.   A'     VML `Mb.     ,'   MM     ,M 
 .JMMmmmd9  .JMMmmmmMMM .AMA.   .AMMA. `"bmmmd'  .JMML.   MMb.  .JMML.    .JMML. .JMM..AMA.   .AMMA. `"bmmmd'  .JMMmmmmMMM 
                                                                                                                           
```

</font>

# ⚡ Blacktrace

### A powerful IP lookup CLI tool with an amazing hacker-style UI

[![PyPI Version](https://img.shields.io/pypi/v/blacktrace?color=blue&style=flat-square)](https://pypi.org/project/blacktrace/)
[![npm Version](https://img.shields.io/npm/v/blacktrace?color=red&style=flat-square)](https://www.npmjs.com/package/blacktrace)
[![License](https://img.shields.io/github/license/PreeyanandaSoram/blacktrace?style=flat-square)](https://github.com/PreeyanandaSoram/blacktrace)
[![Python](https://img.shields.io/pypi/pyversions/blacktrace?style=flat-square)](https://pypi.org/project/blacktrace/)
[![Node.js](https://img.shields.io/node/v/blacktrace?style=flat-square)](https://nodejs.org/)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎨 **Hacker UI** | Amazing terminal interface with matrix-style aesthetics |
| 🌐 **IP Lookup** | Look up your public IP or any IP address worldwide |
| 🔑 **API Support** | Configure token for higher lookup limits |
| 🖥️ **Cross-Platform** | Works on Node.js & Python |
| ⚡ **Fast & Light** | Minimal dependencies, blazing fast |

---

## 🚀 Quick Install

### Python (pip)
```bash
pip install blacktrace
```

### Node.js (npm)
```bash
npm install -g blacktrace
```

---

## 💻 Usage

```bash
# Interactive menu
blacktrace

# Lookup your IP
blacktrace

# Lookup specific IP
blacktrace 8.8.8.8

# Help
blacktrace --help
```

---

## 📸 Preview

### Menu
```
  ╔═══════════════════════════════════════════════════════╗
  ║                     MAIN MENU                    ║
  ╠═══════════════════════════════════════════════════════╣
  ║  [1]  Lookup My IP                        ║
  ║  [2]  Lookup Specific IP                  ║
  ║  [3]  About                               ║
  ║  [4]  Exit                                ║
  ╚═══════════════════════════════════════════════════════╝
```

### Output
```
  ┌─ LOADING ────────────────────────────────────────────┐
  │ Fetching IP information...                            │
  └───────────────────────────────────────────────────────┘

  ╔═══════════════════════════════════════════════════════╗
  ║                    IP INFORMATION                      ║
  ╠═══════════════════════════════════════════════════════╣
  ◆ IP            1.2.3.4
  ◆ CITY          Bangkok
  ◆ REGION        Thailand
  ◆ COUNTRY       TH
  ◆ COORDINATES   13.7563,100.5018
  ◆ ORGANIZATION  AIS Fibre
  ╚═══════════════════════════════════════════════════════╝
```

---

## 🔑 API Token

Get a free token at [ipinfo.io/account](https://ipinfo.io/account)

### Option 1: Environment Variable (Recommended for GitHub)
```bash
# Linux/Mac
export IPINFO_TOKEN=your_token_here

# Windows (CMD)
set IPINFO_TOKEN=your_token_here

# Windows (PowerShell)
$env:IPINFO_TOKEN="your_token_here"
```

### Option 2: Config File
```bash
blacktrace --config
```

**Free tier:** 50,000 requests/month

> **Note:** `.env` and `config.json` are ignored by Git to protect your token.

---

## 🛠️ Development

### Python
```bash
git clone https://github.com/PreeyanandaSoram/blacktrace.git
cd blacktrace/py
pip install -r requirements.txt
python -m blacktrace
```

### Node.js
```bash
git clone https://github.com/PreeyanandaSoram/blacktrace.git
cd blacktrace/js
npm install
node bin/cli.js
```

---

## 📝 License

MIT License - see [LICENSE](https://github.com/PreeyanandaSoram/blacktrace/blob/main/LICENSE)

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/PreeyanandaSoram">Preeyananda Soram</a>
</p>
