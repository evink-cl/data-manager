const admin = require("firebase-admin");

// Inicialización de Firebase Admin
var serviceAccount = require("../config/firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://evink-staging-default-rtdb.firebaseio.com",
});

// Base de datos de Firebase
const db = admin.database();

class DataManager {
  constructor() {
    this.db = db;
    this.listeners = {};
    this.deviceData = {}; // Almacena los datos de los dispositivos
    this.definitionData = {}; // Almacena las definiciones de los modelos
  }

  /**
   * Obtiene un snapshot único de datos desde una ruta.
   * @param {string} path - Ruta en la base de datos.
   * @returns {Promise<any>} - Promesa que resuelve con los datos obtenidos.
   */
  async getData(path) {
    try {
      const snapshot = await this.db.ref(path).once("value");
      return snapshot.exists() ? snapshot.val() : null;
    } catch (error) {
      console.error(`Error al obtener datos de ${path}:`, error);
      throw error;
    }
  }

  /**
   * Suscribe a cambios en una ruta.
   * @param {string} path - Ruta en la base de datos.
   * @param {Function} callback - Función que recibe los datos actualizados.
   */
  listen(path, callback) {
    const ref = this.db.ref(path);
    this.listeners[path] = ref.on("value", (snapshot) => {
      callback(snapshot.val());
    });
  }

  /**
   * Cancela la suscripción a una ruta.
   * @param {string} path - Ruta en la base de datos.
   */
  unsubscribe(path) {
    if (this.listeners[path]) {
      const ref = this.db.ref(path);
      ref.off("value", this.listeners[path]);
      delete this.listeners[path];
    }
  }

  /**
   * Escribe o sobrescribe datos en una ruta.
   * @param {string} path - Ruta en la base de datos.
   * @param {any} data - Datos a escribir.
   */
  async setData(path, data) {
    try {
      await this.db.ref(path).set(data);
    } catch (error) {
      console.error(`Error al escribir en ${path}:`, error);
      throw error;
    }
  }

  /**
   * Realiza una actualización parcial de datos en una ruta.
   * @param {string} path - Ruta en la base de datos.
   * @param {Object} updates - Claves y valores a actualizar.
   */
  async updateData(path, updates, callback) {
    try {
      await this.db.ref(path).update(updates);
    } catch (error) {
      console.error(`Error al actualizar ${path}:`, error);
      throw error;
    }
  }

  /**
   * Añade datos a una lista en una ruta.
   * @param {string} path - Ruta en la base de datos.
   * @param {any} data - Datos a añadir.
   * @returns {string} - ID del nuevo nodo añadido.
   */
  async pushData(path, data) {
    try {
      const newRef = await this.db.ref(path).push(data);
      return newRef.key; // Devuelve la clave única generada.
    } catch (error) {
      console.error(`Error al añadir datos a ${path}:`, error);
      throw error;
    }
  }

//   /**  SE DESACTIVA ESTA FUNCIÓN	POR SEGURIDAD
//    *
//    * Elimina datos en una ruta específica.
//    * @param {string} path - Ruta en la base de datos.
//    */
//   async deleteData(path) {
//     try {
//       await this.db.ref(path).remove();
//     } catch (error) {
//       console.error(`Error al eliminar ${path}:`, error);
//       throw error;
//     }
//   }


}

module.exports = new DataManager();
