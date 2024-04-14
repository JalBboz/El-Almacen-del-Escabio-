<?php
$pedido = $_POST['pedido'];

$mensaje = "Nuevo pedido de El Almacén del Escabio:\n";
$mensaje .= "Detalle del pedido:\n";
$mensaje .= $pedido;

$numeroVendedor = 'https://wa.me/5491168741797';
$urlWhatsApp = 'https://api.whatsapp.com/send?phone=' . $numeroVendedor . '&text=' . urlencode($mensaje);

header('Location: ' . $urlWhatsApp);
exit;
?>


