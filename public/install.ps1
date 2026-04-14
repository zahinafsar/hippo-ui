#!/usr/bin/env pwsh
$ErrorActionPreference = 'Stop'

$BASE = 'https://zahinafsar.github.io/hippo-ui/registry'
$COMPONENTS = @('accordion','alert','avatar','badge','breadcrumb','button','calendar','card','checkbox','combobox','command-palette','confirm-modal','data-table','date-picker','dialog','dropdown-menu','empty-state','input','label','pagination','popover','portal','progress','radio','select','separator','sheet','sidebar','skeleton','spinner','switch','table','tabs','textarea','toast','tooltip')
$LIB = @('cn.ts','hooks.ts','anchor.ts')

function Fetch-File($url, $dest) {
  $dir = Split-Path -Parent $dest
  if ($dir -and -not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
  Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing
  Write-Host "  + $dest"
}

$targets = $args
if (-not $targets -or $targets.Count -eq 0) { $targets = $COMPONENTS }

Write-Host 'Installing hippo-ui components...'
foreach ($f in $LIB) {
  Fetch-File "$BASE/lib/$f" "lib/$f"
}
foreach ($name in $targets) {
  Fetch-File "$BASE/ui/$name.tsx" "components/ui/$name.tsx"
}
Write-Host 'Done.'
