#!/usr/bin/env node

import chalk from 'chalk';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG_FILE = path.join(__dirname, '..', 'config.json');

function loadConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
    }
  } catch (e) {}
  return { apiToken: '' };
}

function saveConfig(config) {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
}

function showBanner() {
  console.log(chalk.cyan(`
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
  `));
}

function showMenu() {
  console.log(chalk.white('  ╔═══════════════════════════════════════════════════════╗'));
  console.log(chalk.white('  ║') + chalk.cyan('                     MAIN MENU                    ') + chalk.white('║'));
  console.log(chalk.white('  ╠═══════════════════════════════════════════════════════╣'));
  console.log(chalk.white('  ║') + chalk.green('  [1]') + chalk.white('  Lookup My IP                        ') + chalk.white('║'));
  console.log(chalk.white('  ║') + chalk.green('  [2]') + chalk.white('  Lookup Specific IP                  ') + chalk.white('║'));
  console.log(chalk.white('  ║') + chalk.yellow('  [3]') + chalk.white('  Configure API Token                 ') + chalk.white('║'));
  console.log(chalk.white('  ║') + chalk.cyan('  [4]') + chalk.white('  About                               ') + chalk.white('║'));
  console.log(chalk.white('  ║') + chalk.red('  [5]') + chalk.white('  Exit                                ') + chalk.white('║'));
  console.log(chalk.white('  ╚═══════════════════════════════════════════════════════╝'));
  console.log();
}

function showAbout() {
  console.log(chalk.white(`
  ╔═══════════════════════════════════════════════════════╗
  ║                     ABOUT                              ║
  ╠═══════════════════════════════════════════════════════╣
  ║                                                       ║
  ║   IPINFO CLI - Terminal IP Lookup Tool               ║
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
    const url = ip 
      ? `https://ipinfo.io/${ip}/json`
      : 'https://ipinfo.io/json';
    
    const headers = config.apiToken 
      ? { 'Authorization': `Bearer ${config.apiToken}` }
      : {};

    const response = await axios.get(url, { headers, timeout: 10000 });
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

async function configureToken(config) {
  const tokenStatus = config.apiToken ? chalk.green('Configured') : chalk.red('Not Set');
  console.log(chalk.yellow('  ╔═══════════════════════════════════════════════════════╗'));
  console.log(chalk.yellow('  ║') + chalk.white('  Current API Token: ') + tokenStatus + ' '.repeat(28) + chalk.yellow('║'));
  console.log(chalk.yellow('  ╚═══════════════════════════════════════════════════════╝'));
  console.log();
  console.log(chalk.gray('  Get your free token at: https://ipinfo.io/account'));
  console.log();

  const readline = await import('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(chalk.cyan('  Enter new API Token (or press Enter to skip): '), (answer) => {
      rl.close();
      if (answer.trim()) {
        config.apiToken = answer.trim();
        saveConfig(config);
        console.log(chalk.green('\n  ✓ API Token saved successfully!\n'));
      } else {
        console.log(chalk.gray('\n  Cancelled.\n'));
      }
      resolve(config);
    });
  });
}

async function main() {
  const config = loadConfig();
  
  if (process.argv.length > 2) {
    const ip = process.argv[2];
    if (ip === '--help' || ip === '-h') {
      showBanner();
      console.log(chalk.white('  Usage:'));
      console.log(chalk.gray('    ipinfo              - Show this help'));
      console.log(chalk.gray('    ipinfo <ip>        - Lookup specific IP'));
      console.log(chalk.gray('    ipinfo --config    - Configure API token'));
      console.log();
      return;
    }
    if (ip === '--config') {
      showBanner();
      await configureToken(config);
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
        await configureToken(config);
        break;
      case '4':
        showAbout();
        break;
      case '5':
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
