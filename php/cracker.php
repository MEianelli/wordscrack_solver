             
<?php
require 'todasPalavrasNoArray.php';
//DESENHO DA MATRIX DIGITADA NO INPUT
//---------------------------------------------------------------------
if(isset($_POST['text']) && !empty($_POST['text'])){
    $input = $_POST['text'];
} else {$input = "chulhrskieanmctn";} 
$input = str_split($input);
for ($i1 = 0; $i1 < 4; $i1++) {
    for ($j1 = 0; $j1 < 4; $j1++) {
        $matrix[$i1][$j1] = $input[$i1*4+$j1];
    }
}
//echo "<table>";
//for ($i1 = 0; $i1 < 4; $i1++) {
//    echo "<tr>";
//    for ($j1 = 0; $j1 < 4; $j1++) {
//        echo "<td class='matrix'>".$matrix[$i1][$j1]."</td>";
//    }
//}
//echo "</table>";
//---------------------------------------------------------------------



//CRIACAO DOS OBJETOS COM O NOME DA PROPRIA LETRA MAS O INDICE (por causa de duplicadas)
//---------------------------------------------------------------------
$todasLetrasDaMatrix = array();
for ($i1 = 0; $i1 < 4; $i1++) {
    for ($j1 = 0; $j1 < 4; $j1++) {
        $nome = $matrix[$i1][$j1].$i1.$j1;
        ${$nome} = new letra();
        ${$nome}->valor = $matrix[$i1][$j1];
        ${$nome}->index = $j1;
        ${$nome}->indey = $i1;
        $todasLetrasDaMatrix[$nome] = ${$nome};
    }
}
//---------------------------------------------------------------------


//ACHA E GUARDA TODOS OS VIZINHOS EM CADA OBJETO
//---------------------------------------------------------------------
for ($i1 = 0; $i1 < 4; $i1++) {
    for ($j1 = 0; $j1 < 4; $j1++) {
        for ($i2 = -1; $i2 <= 1; $i2++) {
            for ($j2 = -1; $j2 <= 1; $j2++) {
                if($i2 == 0 && $j2 == 0){} else{
                $indexX = $i1+$i2;
                $indexY = $j1+$j2;
                    if($indexX > -1 && $indexX < 4 && $indexY > -1 && $indexY < 4){
                        ${$matrix[$i1][$j1].$i1.$j1}->vizinhos[] = $matrix[$indexX][$indexY].$indexX.$indexY;
                    }
                }
            }
        }
    }
}
//---------------------------------------------------------------------

//PROGRAMA PRINCIPAL --------------------------------------------------
//---------------------------------------------------------------------

//ANTIGO CRIACAO DE ARRAYS COM TODAS AS PALAVRAS COMECANDO COM A PRIMEIRA LETRA DE TODAS CONTIDAS NA MATRIX
//$words = file_get_contents('new.txt');
//$words = explode("\n", $words);
//foreach ($input as $letra){
//    ${$letra} = array();
//    foreach ($words as $word){
//        if(substr($word,0,1) == $letra){
//            ${$letra}[] = $word;
//        } 
//    }
//}
//---------------------------------------------------------------------



$found = array();
$palavras2letras = array();
$palavras3letras = array();
$palavras4letras = array();
$palavras5letras = array();
$palavras6letras = array();
$palavras7letras = array();



foreach($todasLetrasDaMatrix as $key=>$value){
    foreach ($value->vizinhos as $vizinho){
        $palavras2letras[] = array($key,$vizinho);
    }
}


foreach($palavras2letras as $value){
    foreach (${$value[1]}->vizinhos as $vizinho){
        if(in_array($vizinho, $value)){} else{
            $palavras3letras[] = array($value[0],$value[1],$vizinho);
        }
    }
}
foreach($palavras3letras as $value){
    foreach (${$value[2]}->vizinhos as $vizinho){
        if(in_array($vizinho, $value)){} else{
            $palavras4letras[] = array($value[0],$value[1],$value[2],$vizinho);
        }
    }
}
foreach($palavras4letras as $value){
    foreach (${$value[3]}->vizinhos as $vizinho){
        if(in_array($vizinho, $value)){} else{
            $palavras5letras[] = array($value[0],$value[1],$value[2],$value[3],$vizinho);
        }
    }
}
foreach($palavras5letras as $value){
    foreach (${$value[4]}->vizinhos as $vizinho){
        if(in_array($vizinho, $value)){} else{
            $palavras6letras[] = array($value[0],$value[1],$value[2],$value[3],$value[4],$vizinho);
        }
    }
}
foreach($palavras6letras as $value){
    foreach (${$value[5]}->vizinhos as $vizinho){
        if(in_array($vizinho, $value)){} else{
            $palavras7letras[] = array($value[0],$value[1],$value[2],$value[3],$value[4],$value[5],$vizinho);
        }
    }
}


$todasPalavras = array_merge($palavras2letras,$palavras3letras,$palavras4letras,$palavras5letras,$palavras6letras,$palavras7letras);
$palavras2letras = array();
$palavras3letras = array();
$palavras4letras = array();
$palavras5letras = array();
$palavras6letras = array();
$palavras7letras = array();

foreach ($todasPalavras as $teste){
    $palavra = array();
    $sequencia = array();
    foreach ($teste as $teste1){
        $palavra[] = ${$teste1}->valor;
        $sequencia[] = ${$teste1}->index.${$teste1}->indey;
    }
    $iniciais = $palavra[0].$palavra[1];
    $palavra = implode("", $palavra);
    $sequencia = implode("", $sequencia);
    if(in_array($palavra, $all[$iniciais])){
        $found[] = array($palavra,$sequencia);
    }
}



//ARRAY FOUND COM PALAVRAS QUE ACHARAM, ORGANIZADO DO MAIOR PRO MENOR
//---------------------------------------------------------------------
//$found = array_unique($found);
function sorta($a,$b){
    return strlen($b[0])-strlen($a[0]);
}
usort($found,'sorta');
$found = json_encode($found);
echo $found;

//foreach($found as $found1){
//    $found1 = json_encode($found1); //TRANSFORMA EM JSON PARA ENVIAR PRO JAVA
//    echo $found1;
//}
//---------------------------------------------------------------------




//CADA LETRA DA MATRIX VIRA UM OBJETO QUE GUARDA SEU VALOR E SEUS VIZINHOS
//---------------------------------------------------------------------
class letra{
    public $valor;
    public $index;
    public $indey;
    public $vizinhos = array();  
}
//---------------------------------------------------------------------

?>