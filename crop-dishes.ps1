Add-Type -AssemblyName System.Drawing

$src = "C:\Users\emman\luto\public\art"
$out = "$src\dishes"
New-Item -ItemType Directory -Force -Path $out | Out-Null

$crops = @(
  # rice meal
  @{ file="rice-meal.jpg"; name="bbq-ribs";            x=0.14; y=0.18; w=0.28; h=0.14 }
  @{ file="rice-meal.jpg"; name="chicken-bbq";         x=0.57; y=0.19; w=0.29; h=0.13 }
  @{ file="rice-meal.jpg"; name="beef-tapa";           x=0.13; y=0.38; w=0.29; h=0.13 }
  @{ file="rice-meal.jpg"; name="adobo";               x=0.57; y=0.38; w=0.28; h=0.13 }
  @{ file="rice-meal.jpg"; name="braised-beef";        x=0.13; y=0.55; w=0.29; h=0.13 }
  @{ file="rice-meal.jpg"; name="tocino";              x=0.56; y=0.55; w=0.29; h=0.13 }
  @{ file="rice-meal.jpg"; name="longganisa";          x=0.13; y=0.71; w=0.29; h=0.13 }
  @{ file="rice-meal.jpg"; name="hotdog";              x=0.56; y=0.71; w=0.29; h=0.13 }
  # coolers
  @{ file="coolers.jpg"; name="original-halo-halo";    x=0.13; y=0.22; w=0.18; h=0.20 }
  @{ file="coolers.jpg"; name="salty-summer";          x=0.41; y=0.15; w=0.18; h=0.19 }
  @{ file="coolers.jpg"; name="macapuno-con-yelo";     x=0.67; y=0.25; w=0.17; h=0.17 }
  @{ file="coolers.jpg"; name="mais-con-yelo";         x=0.39; y=0.38; w=0.17; h=0.18 }
  @{ file="coolers.jpg"; name="spicy-winter";          x=0.01; y=0.41; w=0.28; h=0.37 }
  @{ file="coolers.jpg"; name="banana-con-yelo";       x=0.72; y=0.47; w=0.16; h=0.18 }
  @{ file="coolers.jpg"; name="langka-con-yelo";       x=0.45; y=0.57; w=0.16; h=0.18 }
  @{ file="coolers.jpg"; name="ube-con-yelo";          x=0.36; y=0.76; w=0.16; h=0.19 }
  @{ file="coolers.jpg"; name="ube-macapuno";          x=0.66; y=0.66; w=0.17; h=0.20 }
  # pasta
  @{ file="pasta.jpg"; name="classic-spaghetti";       x=0.15; y=0.14; w=0.30; h=0.15 }
  @{ file="pasta.jpg"; name="spicy-chicken-pasta";     x=0.56; y=0.14; w=0.28; h=0.14 }
  @{ file="pasta.jpg"; name="tuna-pasta";              x=0.15; y=0.35; w=0.30; h=0.13 }
  @{ file="pasta.jpg"; name="bacon-broccoli";          x=0.54; y=0.35; w=0.30; h=0.13 }
  @{ file="pasta.jpg"; name="pancit-canton";           x=0.00; y=0.57; w=0.50; h=0.24 }
  @{ file="pasta.jpg"; name="chinese-chicken-lomi";    x=0.64; y=0.60; w=0.36; h=0.17 }
  @{ file="pasta.jpg"; name="chinese-beef-lomi";       x=0.50; y=0.74; w=0.45; h=0.22 }
  # snacks
  @{ file="snacks.jpg"; name="beef-nachos";            x=0.06; y=0.15; w=0.42; h=0.15 }
  @{ file="snacks.jpg"; name="chicharap";              x=0.00; y=0.46; w=0.44; h=0.21 }
  @{ file="snacks.jpg"; name="crispy-chicken-sandwich";x=0.64; y=0.41; w=0.36; h=0.16 }
  @{ file="snacks.jpg"; name="tuna-sandwich";          x=0.63; y=0.58; w=0.37; h=0.16 }
  @{ file="snacks.jpg"; name="fries";                  x=0.00; y=0.69; w=0.50; h=0.30 }
  @{ file="snacks.jpg"; name="beverages";              x=0.52; y=0.77; w=0.22; h=0.18 }
)

foreach ($c in $crops) {
  $img = [System.Drawing.Image]::FromFile("$src\$($c.file)")
  $rx  = [int]($img.Width  * $c.x)
  $ry  = [int]($img.Height * $c.y)
  $rw  = [int]($img.Width  * $c.w)
  $rh  = [int]($img.Height * $c.h)
  $rect = New-Object System.Drawing.Rectangle($rx, $ry, $rw, $rh)
  $bmp  = New-Object System.Drawing.Bitmap($rw, $rh)
  $g    = [System.Drawing.Graphics]::FromImage($bmp)
  $g.DrawImage($img, 0, 0, $rect, [System.Drawing.GraphicsUnit]::Pixel)
  $bmp.Save("$out\$($c.name).jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
  $g.Dispose(); $bmp.Dispose(); $img.Dispose()
  Write-Host "cut: $($c.name)"
}

Write-Host "done - $($crops.Count) dishes in $out"