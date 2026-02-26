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
        CYAN = GREEN = YELLOW = RED = BLUE = MAGENTA = WHITE = GRAY = ''
    class Style:
        BRIGHT = BOLD = RESET_ALL = ''

CONFIG_FILE = os.path.join(os.path.dirname(__file__), '..', 'config.json')
VERSION = "1.0.0"
BASE_URL = "https://ipinfo.io"

def load_config():
    try:
        if os.path.exists(CONFIG_FILE):
            with open(CONFIG_FILE, 'r') as f:
                return json.load(f)
    except:
        pass
    return {"apiToken": ""}

def get_api_token():
    return os.environ.get('IPINFO_TOKEN') or load_config().get('apiToken', '')

def show_banner():
    print(Fore.CYAN + Style.BRIGHT + """
                                                                                                                           
 `7MM"""Yp, `7MMF'            db       .g8"""bgd `7MMF' `YMM'MMP""MM""YMM `7MM"""Mq.        db       .g8"""bgd `7MM"""YMM  
   MM    Yb   MM             ;MM:    .dP'     `M   MM   .M'  P'   MM   `7   MM   `MM.      ;MM:    .dP'     `M   MM    `7  
   MM    dP   MM            ,V^MM.   dM'       `   MM .d"         MM        MM   ,M9      ,V^MM.   dM'       `   MM   d    
   MM"""bg.   MM           ,M  `MM   MM            MMMMM.         MM        MMmmdM9      ,M  `MM   MM            MMmmMM    
   MM    `Y   MM      ,    AbmmmqMA  MM.           MM  VMA        MM        MM  YM.      AbmmmqMA  MM.           MM   Y  , 
   MM    ,9   MM     ,M   A'     VML `Mb.     ,'   MM   `MM.      MM        MM   `Mb.   A'     VML `Mb.     ,'   MM     ,M 
 .JMMmmmd9  .JMMmmmmMMM .AMA.   .AMMA. `"bmmmd'  .JMML.   MMb.  .JMML.    .JMML. .JMM..AMA.   .AMMA. `"bmmmd'  .JMMmmmmMMM 
                                                                                                                           

  [ v1.0.0 ]
  """ + Style.RESET_ALL)

def show_menu():
    print(Fore.WHITE + "  ╔═══════════════════════════════════════════════════════╗")
    print(Fore.WHITE + "  ║" + Fore.CYAN + "                     MAIN MENU                    " + Fore.WHITE + "║")
    print(Fore.WHITE + "  ╠═══════════════════════════════════════════════════════╣")
    print(Fore.WHITE + "  ║" + Fore.GREEN + "  [1]" + Fore.WHITE + "  Lookup My IP                        " + Fore.WHITE + "║")
    print(Fore.WHITE + "  ║" + Fore.GREEN + "  [2]" + Fore.WHITE + "  Lookup Specific IP                  " + Fore.WHITE + "║")
    print(Fore.WHITE + "  ║" + Fore.CYAN + "  [3]" + Fore.WHITE + "  About                               " + Fore.WHITE + "║")
    print(Fore.WHITE + "  ║" + Fore.RED + "  [4]" + Fore.WHITE + "  Exit                                " + Fore.WHITE + "║")
    print(Fore.WHITE + "  ╚═══════════════════════════════════════════════════════╝")
    print()

def show_about():
    print(Fore.WHITE + """
  ╔═══════════════════════════════════════════════════════╗
  ║                     ABOUT                              ║
  ╠═══════════════════════════════════════════════════════╣
  ║                                                       ║
  ║   BLACKTRACE - Terminal IP Lookup Tool               ║
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
        token = get_api_token()
        if token:
            url = f'{BASE_URL}/lite/{ip}' if ip else f'{BASE_URL}/me'
            params = {'token': token}
        else:
            url = f'{BASE_URL}/{ip}/json' if ip else f'{BASE_URL}/json'
            params = {}
        
        response = requests.get(url, params=params, timeout=10)
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

def main():
    config = load_config()
    
    if len(sys.argv) > 1:
        arg = sys.argv[1]
        if arg in ['--help', '-h']:
            show_banner()
            print(Fore.WHITE + '  Usage:')
            print(Fore.GRAY + '    blacktrace              - Show this help')
            print(Fore.GRAY + '    blacktrace <ip>        - Lookup specific IP')
            print()
            return
        
        show_banner()
        lookup_ip(arg, config)
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
            show_about()
        elif choice == '4':
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
