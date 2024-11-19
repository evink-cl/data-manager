

const DataManager = require("./DataManager.js");

const fs = require("fs");
const readline = require("readline");

let originalLog = console.log;  // Guardar la función original de console.log
let isTracingEnabled = false;  // Estado del tracing

// Manejar la entrada del usuario
function Cmd(input, rl) {
    const cmdParsed = input.split(" ");
    switch (input.trim().toLowerCase()) {
        case "filter":

            break;
        case "exit":
            console.log("DEBUG > Cerrando la aplicación...");
            rl.close();  // Cierra la interfaz de readline
            process.exit(0);  // Termina el proceso de Node.js
            break;
        case "help":
        case "-h":
            console.log("DEBUG > Comandos disponibles:");
            console.log("DEBUG > - 'exit' : Cerrar la aplicación");
            console.log("DEBUG > - 'help' o '-h' : Mostrar esta ayuda");
            console.log("DEBUG > - 'log' : Imprimir el estado actual del programa");
            console.log("DEBUG > - 'trace' : Habilitar el trazado de funciones");
            console.log("DEBUG > - 'untrace' : Deshabilitar el trazado de funciones");
            break;
        case "log":
            console.log("DEBUG > Ejecutando log en tiempo real...");
            // Aquí puedes agregar una función para imprimir el estado de ciertas variables
            console.log("DEBUG > Estado actual de las variables:", process.memoryUsage());
            break;
        case "trace":
            console.log("DEBUG > Habilitando trazado de funciones...");
            if (!isTracingEnabled) {
                console.log = (...args) => {
                    originalLog.apply(console, args);
                    // Aquí puedes agregar un callback para hacer un seguimiento de las funciones
                    console.trace("DEBUG > Trazado de función:");
                };
                isTracingEnabled = true;
            } else {
                console.log("DEBUG > El trazado de funciones ya está habilitado.");
            }
            break;
        case "untrace":
            console.log("DEBUG > Deshabilitando trazado de funciones...");
            if (isTracingEnabled) {
                console.log = originalLog;  // Restaurar el comportamiento original de console.log
                isTracingEnabled = false;
            } else {
                console.log("DEBUG > El trazado de funciones no estaba habilitado.");
            }
            break;
        default:
            console.log("DEBUG > Comando '%s' no reconocido. Escribe 'help' o '-h' para obtener ayuda.", cmdParsed[0]);
            break;
    }
    rl.prompt();
}

function handleUserInput() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    // Personalizar el prompt para que incluya el prefijo
    rl.on("line", (input) => {
        Cmd(input, rl);
    });

    // Configurar el prefijo antes de que el usuario ingrese datos
    rl.setPrompt("DEBUG > ");
    rl.prompt();  // Muestra el prompt con el prefijo

    console.log("DEBUG > Puedes escribir algo en la terminal (o 'exit' para salir).");
}

// Llamar a la función para iniciar la interfaz de comandos
module.exports = { handleUserInput };

