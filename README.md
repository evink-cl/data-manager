# Plantilla de Módulo de Node.js

Este repositorio es un template para crear módulos de Node.js dentro de la organización **eVink**. Está diseñado para ayudar a al equipo a iniciar rápidamente el desarrollo de módulos en Node.js, cumpliendo con las directrices de la organización, y viene preconfigurado con herramientas como semantic-release y mocha.

## Características

-   ES6: Compatible con módulos de ES6, permitiendo el uso de import y export.
-   Gestión de Versiones: Incluye semantic-release para un versionado automático basado en el historial de commits.
-   Pruebas Unitarias: Configurado con mocha para ejecutar pruebas de unidad.
-   Variables de Entorno: Usa .env para configurar credenciales y configuraciones sensibles.

## Instalación

utilizando gh:

```bash
gh repo create nombre-de-la-libreria --template=evink/node-module
```

Instala las dependencias del proyecto con pnpm (preferible) ó npm:

```bash
pnpm install
```

ó

```bash
npm install
```

## Estructura del Proyecto

src/: Código fuente de la librería.
tests/: Archivos de prueba para mocha.
examples/: Ejemplos de uso de la librería.
config/: Archivos de configuración.
.env.example: Archivo de ejemplo para configuraciones de entorno.

# Uso

Este template incluye un ejemplo básico de cómo exportar y usar la función principal de la librería:

```javascript
import { mainFunction } from "nombre-de-la-libreria";

mainFunction();
```

Asegúrate de adaptar este código según el propósito específico de tu módulo.

# Pruebas

El template viene configurado con mocha como framework de pruebas. Puedes agregar archivos de prueba en la carpeta tests/ y ejecutarlos con:

```bash
npm test
```

# Gestión de Versiones y Lanzamientos

El sistema de versionado está automatizado con semantic-release, lo que significa que las versiones se generan basadas en los mensajes de commits siguiendo el esquema de Conventional Commits. Para un release exitoso, asegúrate de:

Hacer commits siguiendo la convención: feat: nueva característica, fix: corrección de un bug, etc.
Al hacer merge de tus ramas a main, semantic-release generará automáticamente una nueva versión y actualizará el changelog.
Recomendación utilizar opencommit para automatizar los comits
https://github.com/di-sukharev/opencommit

# Configuración de Variables de Entorno

Las variables de entorno, como las credenciales de API, deben configurarse en un archivo .env. Usa .env.example como plantilla y crea tu propio archivo .env en la raíz del proyecto:

```bash
# .env

API_KEY=tu_api_key
API_URL=https://api.example.com
```
