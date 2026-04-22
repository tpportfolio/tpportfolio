$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$targets = @("app", "components", "lib", "translations", "public")
$patterns = @("Ãƒ", "Ã‚", "Ã¢", "ï¿½")
$matches = @()

foreach ($target in $targets) {
  $targetPath = Join-Path $root $target
  if (!(Test-Path $targetPath)) { continue }

  $matches += Get-ChildItem -Path $targetPath -Recurse -File -Include *.ts,*.tsx,*.js,*.jsx,*.md,*.css,*.html |
    Select-String -Pattern $patterns |
    ForEach-Object { "$($_.Path):$($_.LineNumber): $($_.Line)" }
}

if ($matches.Count -eq 0) {
  Write-Output "NO_MOJIBAKE"
  exit 0
}

$matches | ForEach-Object { Write-Output $_ }
exit 1
