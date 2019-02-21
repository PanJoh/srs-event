$srcPath = $PSScriptRoot + "/build/*" 
$destPath = $PSScriptRoot + "/deploy"
Copy-Item "$srcPath" "$destPath" -Recurse
Copy-Item "$PSScriptRoot\package.json" "$PSScriptRoot\deploy\package.json" -Force 