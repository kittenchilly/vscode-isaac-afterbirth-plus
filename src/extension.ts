// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const enums = [
		'ModCallbacks',
		'ModCallbacks.MC_NPC_UPDATE',
		'ModCallbacks.MC_POST_UPDATE',
	];
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

// This method is called when your extension is deactivated
export function deactivate() {}
