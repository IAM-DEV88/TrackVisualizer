<?php
$encoded_data = json_encode($_POST['lyric'], JSON_PRETTY_PRINT);
$archivo = "../".$_POST['file'];

if(file_put_contents($archivo, $encoded_data)){
	print_r("Archivo actualizado");
}
else{
	print_r("Error al actualizar");
}
?>