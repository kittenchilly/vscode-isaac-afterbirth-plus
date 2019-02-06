"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const fs = require('fs');
const path = require('path');
const enumsPath = path.join(__dirname, '..', 'generate-autocomplete-entries', 'enums.json');
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    let enums = fs.readFileSync(enumsPath, 'utf8');
    enums = JSON.parse(enums);
    const completionArray = [];
    for (const e of enums) {
        completionArray.push(new vscode.CompletionItem(e));
    }
    const autoComplete = vscode.languages.registerCompletionItemProvider('*', {
        provideCompletionItems(document, position, token) {
            return completionArray;
        }
    });
    context.subscriptions.push(autoComplete);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map