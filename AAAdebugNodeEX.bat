start "" /D"." node --debug-brk extendexisting.js
start "" /D"." node .\node_modules\node-inspector\bin\inspector.js &
start chrome http://127.0.0.1:8080/debug?port=5858

