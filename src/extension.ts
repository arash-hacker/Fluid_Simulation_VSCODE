'use strict';

import * as vscode from 'vscode';
import * as path from 'path';

let panel: vscode.WebviewPanel | undefined = undefined;

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "fluid-simulation" is now active!');

	let disposable = vscode.commands.registerCommand('extension.fluid', async () => {
      
        
        vscode.window.showInformationMessage('Enjoy Fluid  🌊🎴!');
    
        
    
        panel = vscode.window.createWebviewPanel(
          'ArashMidos',
          `Fluid 🌊🎴`,
          vscode.ViewColumn.One,
          {
            enableScripts: true
          }
        );
    
         const DataGuiMinJs = vscode.Uri.file(
          path.join(context.extensionPath, 'utils', 'dat.gui.min.js')
        ); 
        const ScriptJS = vscode.Uri.file(
            path.join(context.extensionPath, 'utils', 'script.js')
          ); 
    
        panel.webview.html = getWebSite(
            DataGuiMinJs.with({ scheme: 'vscode-resource' }),
            ScriptJS.with({ scheme: 'vscode-resource' }),
        );
    
        panel.webview.onDidReceiveMessage(
          message => {
            switch (message.command) {
              case 'alert':
                vscode.window.showWarningMessage(message.text);
                panel!.dispose();
                return;
            }
          },
          undefined,
          context.subscriptions
        );
    
        panel.onDidDispose(
          () => { },
          null,
          context.subscriptions
    );
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}

function getWebSite(guiPath:vscode.Uri,scriptJs:vscode.Uri) {

    return `<!DOCTYPE html>
    <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
            <meta charset="utf-8">
            <meta http-equiv="Cache-Control" content="no-cache">
            <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
            <meta name="apple-mobile-web-app-capable" content="yes">
            <meta name="mobile-web-app-capable" content="yes">
    
           
    
            <meta name="description" content="A WebGL fluid simulation that works in mobile browsers.">
    
            <meta property="og:type" content="website">
            <meta property="og:title" content="Webgl Fluid Simulation">
            <meta property="og:description" content="A WebGL fluid simulation that works in mobile browsers.">
            <meta property="og:url" content="https://github.com/Arshiamidos/Fluid_Simulation_VSCODE">
            <meta property="og:image" content="https://github.com/Arshiamidos/Fluid_Simulation_VSCODE/logo.png">
    
            <script type="text/javascript" src="${guiPath}"></script>
            <style>
                * {
                    user-select: none;
                }
    
                html, body {
                    overflow: hidden;
                    background-color: #000;
                }
    
                body {
                    margin: 0;
                    position: fixed;
                    width: 100%;
                    height: 100%;
                }
    
                canvas {
                    width: 100%;
                    height: 100%;
                }
    
                .dg {
                    opacity: 0.9;
                }
    
                .dg .property-name {
                    overflow: visible;
                }
    
                @font-face {
                    font-family: 'iconfont';
                    src: url('iconfont.ttf') format('truetype');
                }
    
                .bigFont {
                    font-size: 150%;
                    color: #8C8C8C;
                }
    
                .cr.function.appBigFont {
                    font-size: 150%;
                    line-height: 27px;
                    color: #A5F8D3;
                    background-color: #023C40;
                }
    
                .cr.function.appBigFont .property-name {
                    float: none;
                }
    
                .cr.function.appBigFont .icon {
                    position: sticky;
                    bottom: 27px;
                }
    
                .icon {
                    font-family: 'iconfont';
                    font-size: 130%;
                    float: right;
                }
    
                .twitter:before {
                    content: 'a';
                }
    
                .github:before {
                    content: 'b';
                }
    
                .app:before {
                    content: 'c';
                }
    
                .discord:before {
                    content: 'd';
                }
            </style>
            <script>
                window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
                ga('create', 'UA-XXXXX-1', 'auto');
                ga('send', 'pageview');
            </script>
            <script async src='https://www.google-analytics.com/analytics.js'></script> 
        </head>
        <body>
            <canvas id="cc">
            Your browser does <strong>not support</strong> the <code>&lt;canvas&gt;</code> element.
            </canvas>
            <script async src="${scriptJs}"></script>
        </body>
    </html>`;
  
  
  }