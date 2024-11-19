const DataManager = require("../src/DataManager.js");

// Escribir datos
DataManager.setData("config/parameters", { maxRetries: 5, timeout: 3000 })
  .then(() => console.log("Datos escritos correctamente"))
  .catch(console.error);

// Leer datos
DataManager.getData("config/parameters")
  .then((data) => console.log("Datos obtenidos:", data))
  .catch(console.error);

// Suscribirse a cambios
DataManager.listen("config/parameters", (data) => {
  console.log("Datos actualizados:", data);
});

// Actualizar datos
DataManager.updateData("config/parameters", { timeout: 5000 })
  .then(() => console.log("Datos actualizados correctamente"))
  .catch(console.error);

// Añadir datos a una lista
DataManager.pushData("logs", { message: "Operación exitosa", timestamp: Date.now() })
  .then((id) => console.log("ID del nuevo registro:", id))
  .catch(console.error);

// Cancelar suscripción
setTimeout(() => {
  DataManager.unsubscribe("config/parameters");
  console.log("Suscripción cancelada.");
}, 10000);
