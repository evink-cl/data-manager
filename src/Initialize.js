const DEBUG_MODE = true;

const DataManager = require("./DataManager.js");
const { handleUserInput } = require("./Debuger-cli.js");

// Variables para indexar datos
let allIndexes = {}; // Para almacenar todas las tablas cargadas

/**
 * Indexa los datos recibidos y los mantiene actualizados.
 * @param {string} name - Nombre del índice.
 * @param {Object} data - Datos a indexar.
 */
function updateIndex(name, data) {
  allIndexes[name] = data || {};
  console.log(`Índice de ${name} actualizado`);
}

/**
 * Muestra las tablas cargadas y el número de elementos en cada una.
 */
function showTableDetails() {
  console.log("Tablas cargadas:");
  Object.keys(allIndexes).forEach((tableName) => {
    const table = allIndexes[tableName];
    console.log(`- ${tableName}: ${Object.keys(table).length} elementos`);
  });
}

/**
 * Obtiene las rutas principales en la base de datos y se suscribe a ellas automáticamente.
 */
async function subscribeToAllPaths() {
  try {
    const rootSnapshot = await DataManager.getData("/"); // Obtener el nivel raíz de la base de datos
    const allPaths = rootSnapshot ? Object.keys(rootSnapshot) : []; // Obtener todas las rutas principales

    // Suscribirse a cada ruta
    allPaths.forEach((path) => {
      DataManager.listen(path, (data) => {
        updateIndex(path, data);
        console.log(`Se ha realizado un cambio en: ${path}`);
      });
    });
  } catch (error) {
    console.error("Error al obtener las rutas principales:", error);
  }
}

// Inicialización
async function initialize() {
  await subscribeToAllPaths(); // Cargar y suscribirse automáticamente a todas las rutas

  setTimeout(() => {
    console.log("Mostrar detalles de las tablas cargadas:");
    showTableDetails();
  }, 5000);

  if (DEBUG_MODE) {
    handleUserInput();
  }
}

initialize();
