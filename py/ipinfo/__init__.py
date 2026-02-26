#!/usr/bin/env python3

import sys
import os
import json
import requests

try:
    from colorama import init, Fore, Style
    init(autoreset=True)
except ImportError:
    class Fore:
        CYAN = GREEN = YELLOW = RED = BLUE = MAGENTA = WHITE = ''
    class Style:
        BRIGHT = BOLD = ''

CONFIG_FILE = os.path.join(os.path.dirname(__file__), '..', 'config.json')
VERSION = "1.0.0"

def load_config():
    try:
        if os.path.exists(CONFIG_FILE):
            with open(CONFIG_FILE, 'r') as f:
                return json.load(f)
    except:
        pass
    return {"apiToken": ""}

def save_config(config):
    with open(CONFIG_FILE, 'w') as f:
        json.dump(config, f, indent=2)

def show_banner():
    print(Fore.CYAN + Style.BRIGHT + """
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
  """ + Style.RESET_ALL)

def show_menu():
    print(Fore.WHITE + "  ╔═══════════════════════════════════════════════════════╗")
    print(Fore.WHITE + "  ║" + Fore.CYAN + "                     MAIN MENU                    " + Fore.WHITE + "║")
    print(Fore.WHITE + "  ╠═══════════════════════════════════════════════════════╣")
    print(Fore.WHITE + "  ║" + Fore.GREEN + "  [1]" + Fore.WHITE + "  Lookup My IP                        " + Fore.WHITE + "║")
    print(Fore.WHITE + "  ║" + Fore.GREEN + "  [2]" + Fore.WHITE + "  Lookup Specific IP                  " + Fore.WHITE + "║")
    print(Fore.WHITE + "  ║" + Fore.YELLOW + "  [3]" + Fore.WHITE + "  Configure API Token                 " + Fore.WHITE + "║")
    print(Fore.WHITE + "  ║" + Fore.CYAN + "  [4]" + Fore.WHITE + "  About                               " + Fore.WHITE + "║")
    print(Fore.WHITE + "  ║" + Fore.RED + "  [5]" + Fore.WHITE + "  Exit                                " + Fore.WHITE + "║")
    print(Fore.WHITE + "  ╚═══════════════════════════════════════════════════════╝")
    print()

def show_about():
    print(Fore.WHITE + """
  ╔═══════════════════════════════════════════════════════╗
  ║                     ABOUT                              ║
  ╠═══════════════════════════════════════════════════════╣
  ║                                                       ║
  ║   IPINFO CLI - Terminal IP Lookup Tool               ║
  ║                                                       ║
  ║   Version: """ + VERSION + """                                     ║
  ║   API: ipinfo.io                                     ║
  ║                                                       ║
  ║   Made with ❤️ by Preeyananda Soram                  ║
  ║                                                       ║
  ╚═══════════════════════════════════════════════════════╝
  """ + Style.RESET_ALL)

def lookup_ip(ip='', config=None):
    print(Fore.CYAN + '\n  ┌─ LOADING ────────────────────────────────────────────┐')
    print(Fore.CYAN + '  │ ' + Fore.WHITE + 'Fetching IP information...' + Fore.CYAN + ' ' * 30 + '│')
    print(Fore.CYAN + '  └' + '─' * 55 + '┘')
    print()

    try:
        url = f'https://ipinfo.io/{ip}/json' if ip else 'https://ipinfo.io/json'
        headers = {}
        if config and config.get('apiToken'):
            headers['Authorization'] = f"Bearer {config['apiToken']}"
        
        response = requests.get(url, headers=headers, timeout=10)
        data = response.json()

        parts = []
        
        if 'ip' in data:
            parts.append([Fore.GREEN + '◆ IP', data['ip']])
        if 'city' in data:
            parts.append([Fore.CYAN + '◆ CITY', data['city']])
        if 'region' in data:
            parts.append([Fore.CYAN + '◆ REGION', data['region']])
        if 'country' in data:
            parts.append([Fore.YELLOW + '◆ COUNTRY', data['country']])
        if 'loc' in data:
            parts.append([Fore.MAGENTA + '◆ COORDINATES', data['loc']])
        if 'org' in data:
            parts.append([Fore.RED + '◆ ORGANIZATION', data['org']])
        if 'hostname' in data:
            parts.append([Fore.BLUE + '◆ HOSTNAME', data['hostname']])

        max_label_len = max(len(p[0]) for p in parts)
        max_value_len = max(len(p[1]) for p in parts)
        box_width = max_label_len + max_value_len + 10

        print(Fore.CYAN + '  ╔' + '═' * box_width + '╗')
        print(Fore.CYAN + '  ║' + Fore.WHITE + ' ' * ((box_width - 22) // 2) + ' IP INFORMATION ' + ' ' * ((box_width - 22) // 2 + 1) + Fore.CYAN + '║')
        print(Fore.CYAN + '  ╠' + '═' * box_width + '╣')
        
        for label, value in parts:
            padding = box_width - len(label) - len(value) - 4
            print(Fore.CYAN + '  ║ ' + label + ' ' * (padding if padding > 0 else 0) + value + Fore.CYAN + '  ║')
        
        print(Fore.CYAN + '  ╚' + '═' * box_width + '╝')
        print()

    except Exception as e:
        print(Fore.RED + '  ╔═══════════════════════════════════════════════════════╗')
        print(Fore.RED + '  ║' + Fore.RED + '  ERROR: ' + Fore.WHITE + 'Failed to fetch IP information' + ' ' * 15 + Fore.RED + '║')
        print(Fore.RED + '  ║' + Fore.GRAY + '  ' + str(e) + Fore.RED + ' ' * 40 + '║')
        print(Fore.RED + '  ╚═══════════════════════════════════════════════════════╝')
        print()

def configure_token(config):
    token_status = Fore.GREEN + 'Configured' if config.get('apiToken') else Fore.RED + 'Not Set'
    print(Fore.YELLOW + '  ╔═══════════════════════════════════════════════════════╗')
    print(Fore.YELLOW + '  ║' + Fore.WHITE + '  Current API Token: ' + token_status + ' ' * 28 + Fore.YELLOW + '║')
    print(Fore.YELLOW + '  ╚═══════════════════════════════════════════════════════╝')
    print()
    print(Fore.GRAY + '  Get your free token at: https://ipinfo.io/account')
    print()
    
    answer = input(Fore.CYAN + '  Enter new API Token (or press Enter to skip): ' + Fore.WHITE).strip()
    if answer:
        config['apiToken'] = answer
        save_config(config)
        print(Fore.GREEN + '\n  ✓ API Token saved successfully!\n')
    else:
        print(Fore.GRAY + '\n  Cancelled.\n')
    
    return config

def main():
    config = load_config()
    
    if len(sys.argv) > 2:
        arg = sys.argv[1]
        if arg in ['--help', '-h']:
            show_banner()
            print(Fore.WHITE + '  Usage:')
            print(Fore.GRAY + '    ipinfo              - Show this help')
            print(Fore.GRAY + '    ipinfo <ip>        - Lookup specific IP')
            print(Fore.GRAY + '    ipinfo --config    - Configure API token')
            print()
            return
        if arg == '--config':
            show_banner()
            configure_token(config)
            return
        
        show_banner()
        lookup_ip(arg, config)
        return

    if len(sys.argv) == 2 and sys.argv[1] == '--config':
        show_banner()
        configure_token(config)
        return

    while True:
        show_banner()
        show_menu()
        
        choice = input(Fore.CYAN + '  Enter your choice: ' + Fore.WHITE).strip()
        print()

        if choice == '1':
            lookup_ip('', config)
        elif choice == '2':
            ip = input(Fore.CYAN + '  Enter IP address: ' + Fore.WHITE).strip()
            if ip:
                lookup_ip(ip, config)
        elif choice == '3':
            configure_token(config)
        elif choice == '4':
            show_about()
        elif choice == '5':
            print(Fore.GRAY + '  Goodbye, Hacker! 🖥️\n')
            break
        else:
            print(Fore.RED + '  Invalid choice!')

        input(Fore.GRAY + '  Press Enter to continue...')

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print(Fore.RED + '\n\n  Interrupted. Goodbye!\n')
        sys.exit(1)
