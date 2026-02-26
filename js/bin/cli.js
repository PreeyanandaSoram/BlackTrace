#!/usr/bin/env node

import chalk from 'chalk';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG_FILE = path.join(__dirname, '..', 'config.json');
const BASE_URL = 'https://ipinfo.io';

function loadConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
    }
  } catch (e) { }
  return { apiToken: '' };
}

function getApiToken() {
  return process.env.IPINFO_TOKEN || loadConfig().apiToken || '';
}

function showBanner() {
  const ascii = `
                                                                                                    
 ▄▄▄▄    ██▓    ▄▄▄       ▄████▄   ██ ▄█▀▄▄▄█████▓ ██▀███   ▄▄▄       ▄████▄  ▓█████ 
▓█████▄ ▓██▒   ▒████▄    ▒██▀ ▀█   ██▄█▒ ▓  ██▒ ▓▒▓██ ▒ ██▒▒████▄    ▒██▀ ▀█  ▓█   ▀ 
▒██▒ ▄██▒██░   ▒██  ▀█▄  ▒▓█    ▄ ▓███▄░ ▒ ▓██░ ▒░▓██ ░▄█ ▒▒██  ▀█▄  ▒▓█    ▄ ▒███   
▒██░█▀  ▒██░   ░██▄▄▄▄██ ▒▓▓▄ ▄██▒▓██ █▄ ░ ▓██▓ ░ ▒██▀▀█▄  ░██▄▄▄▄██ ▒▓▓▄ ▄██▒▒▓█  ▄ 
░▓█  ▀█▓░██████▒▓█   ▓██▒▒ ▓███▀ ░▒██▒ █▄  ▒██▒ ░ ░██▓ ▒██▒ ▓█   ▓██▒▒ ▓███▀ ░░▒████▒
░▒▓███▀▒░ ▒░▓  ░▒▒   ▓▒█░░ ░▒ ▒  ░▒ ▒▒ ▓▒  ▒ ░░   ░ ▒▓ ░▒▓░ ▒▒   ▓▒█░░ ░▒ ▒  ░░░ ▒░ ░
▒░▒   ░ ░ ░ ▒  ░ ▒   ▒▒ ░  ░  ▒   ░ ░▒ ▒░    ░      ░▒ ░ ▒░  ▒   ▒▒ ░  ░  ▒    ░ ░  ░
 ░    ░   ░ ░    ░   ▒   ░        ░ ░░ ░   ░        ░░   ░   ░   ▒   ░           ░   
 ░          ░  ░     ░  ░░ ░      ░  ░               ░           ░  ░░ ░         ░  ░
      ░                  ░                                           ░                                                                                                                                                                                          

  [ v1.0.0 ]
  `;
  console.log(chalk.white(ascii));
}

function showMenu() {
  console.log(chalk.white('  ╔═══════════════════════════════════════════════════════╗'));
  console.log(chalk.white('  ║') + chalk.cyan('                     MAIN MENU                    ') + chalk.white('║'));
  console.log(chalk.white('  ╠═══════════════════════════════════════════════════════╣'));
  console.log(chalk.white('  ║') + chalk.green('  [1]') + chalk.white('  Lookup My IP                        ') + chalk.white('║'));
  console.log(chalk.white('  ║') + chalk.green('  [2]') + chalk.white('  Lookup Specific IP                  ') + chalk.white('║'));
  console.log(chalk.white('  ║') + chalk.cyan('  [3]') + chalk.white('  About                               ') + chalk.white('║'));
  console.log(chalk.white('  ║') + chalk.red('  [4]') + chalk.white('  Exit                                ') + chalk.white('║'));
  console.log(chalk.white('  ╚═══════════════════════════════════════════════════════╝'));
  console.log();
}

function showAbout() {
  console.log(chalk.white(`
  ╔═══════════════════════════════════════════════════════╗
  ║                     ABOUT                              ║
  ╠═══════════════════════════════════════════════════════╣
  ║                                                       ║
  ║   BLACKTRACE - Terminal IP Lookup Tool               ║
  ║                                                       ║
  ║   Version: 1.0.0                                     ║
  ║   API: ipinfo.io                                     ║
  ║                                                       ║
  ║   Made with ❤️ by Preeyananda Soram                  ║
  ║                                                       ║
  ╚═══════════════════════════════════════════════════════╝
  `));
}

async function lookupIP(ip = '', config) {
  console.log(chalk.cyan('\n  ┌─ LOADING ────────────────────────────────────────────┐'));
  console.log(chalk.cyan('  │ ') + chalk.white('Fetching IP information...') + ' '.repeat(20) + chalk.cyan('│'));
  console.log(chalk.cyan('  └' + '─'.repeat(55) + '┘'));
  console.log();

  try {
    const token = getApiToken();
    let url, params = {};

    if (token) {
      url = token ? `${BASE_URL}/lite/${ip || 'me'}` : `${BASE_URL}/${ip || 'me'}`;
      params = token ? { token } : {};
    } else {
      url = ip ? `${BASE_URL}/${ip}/json` : `${BASE_URL}/json`;
    }

    const headers = !token && config.apiToken
      ? { 'Authorization': `Bearer ${config.apiToken}` }
      : {};

    const response = await axios.get(url, { headers, params, timeout: 10000 });
    const data = response.data;

    const parts = [];

    if (data.ip) parts.push([chalk.green('◆ IP'), data.ip]);
    if (data.city) parts.push([chalk.cyan('◆ CITY'), data.city]);
    if (data.region) parts.push([chalk.cyan('◆ REGION'), data.region]);
    if (data.country) parts.push([chalk.yellow('◆ COUNTRY'), data.country]);
    if (data.loc) parts.push([chalk.magenta('◆ COORDINATES'), data.loc]);
    if (data.org) parts.push([chalk.red('◆ ORGANIZATION'), data.org]);
    if (data.asn) parts.push([chalk.red('◆ ASN'), data.asn]);
    if (data.hostname) parts.push([chalk.blue('◆ HOSTNAME'), data.hostname]);
    if (data.carrier) {
      if (data.carrier.name) parts.push([chalk.white('◆ CARRIER'), data.carrier.name]);
      if (data.carrier.mcc) parts.push([chalk.white('◆ MCC'), data.carrier.mcc]);
    }

    const maxLabelLen = Math.max(...parts.map(p => p[0].length));
    const maxValueLen = Math.max(...parts.map(p => p[1].length));

    const boxWidth = maxLabelLen + maxValueLen + 10;

    console.log(chalk.cyan('  ╔' + '═'.repeat(boxWidth) + '╗'));
    console.log(chalk.cyan('  ║') + chalk.white(' '.repeat(Math.floor((boxWidth - 22) / 2)) + ' IP INFORMATION ' + ' '.repeat(Math.ceil((boxWidth - 22) / 2))) + chalk.cyan('║'));
    console.log(chalk.cyan('  ╠' + '═'.repeat(boxWidth) + '╣'));

    for (const [label, value] of parts) {
      const padding = boxWidth - label.length - value.length - 4;
      console.log(chalk.cyan('  ║ ') + label + ' '.repeat(padding > 0 ? padding : 0) + value + chalk.cyan('  ║'));
    }

    console.log(chalk.cyan('  ╚' + '═'.repeat(boxWidth) + '╝'));
    console.log();

  } catch (error) {
    console.log(chalk.red('  ╔═══════════════════════════════════════════════════════╗'));
    console.log(chalk.red('  ║') + chalk.white('  ERROR: ') + chalk.white('Failed to fetch IP information') + ' '.repeat(15) + chalk.red('║'));
    console.log(chalk.red('  ║') + chalk.gray('  ' + error.message) + ' '.repeat(40) + chalk.red('║'));
    console.log(chalk.red('  ╚═══════════════════════════════════════════════════════╝'));
    console.log();
  }
}

async function main() {
  const config = loadConfig();

  if (process.argv.length > 2) {
    const ip = process.argv[2];
    if (ip === '--help' || ip === '-h') {
      showBanner();
      console.log(chalk.white('  Usage:'));
      console.log(chalk.gray('    blacktrace              - Show this help'));
      console.log(chalk.gray('    blacktrace <ip>        - Lookup specific IP'));
      console.log();
      return;
    }
    showBanner();
    await lookupIP(ip, config);
    return;
  }

  while (true) {
    showBanner();
    showMenu();

    const readline = await import('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const choice = await new Promise((resolve) => {
      rl.question(chalk.cyan('  Enter your choice: '), (answer) => {
        rl.close();
        resolve(answer.trim());
      });
    });
    console.log();

    switch (choice) {
      case '1':
        await lookupIP('', config);
        break;
      case '2':
        const rl2 = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });
        const ip = await new Promise((resolve) => {
          rl2.question(chalk.cyan('  Enter IP address: '), (answer) => {
            rl2.close();
            resolve(answer.trim());
          });
        });
        if (ip) await lookupIP(ip, config);
        break;
      case '3':
        showAbout();
        break;
      case '4':
        console.log(chalk.gray('  Goodbye, Hacker! 🖥️\n'));
        process.exit(0);
      default:
        console.log(chalk.red('  Invalid choice!'));
    }

    const rl3 = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    await new Promise((resolve) => {
      rl3.question(chalk.gray('  Press Enter to continue...'), () => {
        rl3.close();
        resolve();
      });
    });
  }
}

main().catch(console.error);
