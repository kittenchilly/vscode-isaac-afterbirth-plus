// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import fs = require('fs');
import path = require('path');

const enumsPath = path.join(__dirname, '..', 'generate-autocomplete-entries', 'enums.json');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let enums = fs.readFileSync(enumsPath, 'utf8');
	enums = JSON.parse(enums);
	const completionArray: Array<vscode.CompletionItem> = [];
	for (const e of enums) {
		completionArray.push(new vscode.CompletionItem(e));
	}
	const autoComplete = vscode.languages.registerCompletionItemProvider('*', {
		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken) {
			return completionArray;
		}
	});
	context.subscriptions.push(autoComplete);
}