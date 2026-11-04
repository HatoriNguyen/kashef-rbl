const fs = require('fs');
const vm = require('vm');
const assert = require('assert/strict');
const html = fs.readFileSync('index.html', 'utf8');
const code = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]).join('\n') + '\n' + fs.readFileSync('assets/app.js', 'utf8') + '\n' + fs.readFileSync('assets/lab.js', 'utf8');
const nodes = new Map();
function element() { return { value:'', innerHTML:'', innerText:'', style:{}, dataset:{}, classList:{add(){},remove(){},toggle(){}}, appendChild(){}, disabled:false }; }
const context = vm.createContext({ tailwind: {}, URL, Date, console, alert(){}, prompt(){return null}, setTimeout(fn){fn();return 1},setInterval(){return 1},clearInterval(){},window:{addEventListener(){}}, document:{getElementById(id){if(!nodes.has(id))nodes.set(id,element());return nodes.get(id)},createElement:element,querySelectorAll(){return []}} });
vm.runInContext(code,context);
(async()=>{
 for(const [url,expected] of [['http://stock.vulnshop.internal:8080/a',true],['https://stock.vulnshop.internal/a',true],['https://example.com',false],['http://169.254.169.254',false],['http://stock.vulnshop.internal.evil.test',false],['ftp://stock.vulnshop.internal',false],['http://user@stock.vulnshop.internal',false],['invalid',false]]) assert.equal(context.isAllowedStockUrl(url),expected,url);
 vm.runInContext("currentLabVector='ssrf'; isLabPatched=true",context);
 nodes.get('labPayloadInput') || context.document.getElementById('labPayloadInput');
 nodes.get('labPayloadInput').value='https://example.com';context.executeLabRequest();assert.match(nodes.get('labHttpStatus').innerText,/403/);
 nodes.get('labPayloadInput').value='http://stock.vulnshop.internal:8080/a';context.executeLabRequest();assert.match(nodes.get('labHttpStatus').innerText,/200/);
 context.document.getElementById('targetUrl').value='https://first.example';
 await context.startPassiveSecurityAudit();
 nodes.get('targetUrl').value='https://changed.example';context.exportReportModal();
 assert.match(nodes.get('reportContent').innerHTML,/https:\/\/first.example/);assert.doesNotMatch(nodes.get('reportContent').innerHTML,/changed.example/);
 assert.match(nodes.get('reportContent').innerHTML,/DỮ LIỆU MẪU/);assert.doesNotMatch(nodes.get('reportContent').innerHTML,/Grade B/);
 context.setScanMode('active');nodes.get('targetUrl').value='http://localhost';await context.startActiveDASTSimulation();nodes.get('targetUrl').value='https://changed.example';context.exportReportModal();assert.match(nodes.get('reportContent').innerHTML,/http:\/\/localhost/);
 context.toggleLabPatch(); assert.equal(nodes.get('btnTogglePatch').dataset.patched, 'false'); context.toggleLabPatch(); assert.equal(nodes.get('btnTogglePatch').dataset.patched, 'true');
 context.resetLab(); assert.equal(vm.runInContext('isLabPatched', context), false); assert.equal(vm.runInContext('Object.values(capturedLootCount).some(Boolean)', context), false);
 context.resetScannerState();assert.equal(vm.runInContext('scanContext',context),null);
 console.log('PASS: JS parse; 8 URL policy cases; SSRF patched responses; passive + active report target snapshots; simulation labels; reset state.');
})().catch(e=>{console.error(e);process.exitCode=1});

