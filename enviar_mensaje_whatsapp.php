<?php
// Requiere la librería Twilio
require __DIR__ . '/twilio-php-master/Twilio/autoload.php';

use Twilio\Rest\Client;

// Configura tu cuenta de Twilio
$sid = 'AC3ce537190067598d7541a0cf13a9a17a';
$token = '265a44aaf72005163052768202a3e17c';
$from = 'whatsapp:+5491168741797'; // Número de WhatsApp de Twilio

// Crea un nuevo cliente de Twilio
$client = new Client($sid, $token);

// Verifica si se ha enviado el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibe los datos del formulario
    $name = $_POST["name"];
    $phone = $_POST["phone"];
    $message = $_POST["message"];

    // Formatea el número de teléfono para WhatsApp
    $to = 'whatsapp:' . $phone;

    // Construye el mensaje de WhatsApp
    $body = "Hola $name,\n\n$message";

    try {
        // Envía el mensaje de WhatsApp
        $client->messages->create(
            $to,
            array(
                'from' => $from,
                'body' => $body
            )
        );

        // Mensaje enviado con éxito
        echo "¡El mensaje ha sido enviado por WhatsApp correctamente!";
    } catch (Exception $e) {
        // Error en el envío
        echo "Ha ocurrido un error al enviar el mensaje por WhatsApp. Por favor, inténtalo nuevamente.";
    }
}
?>


