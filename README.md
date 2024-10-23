# 🚀 RelativityAPI

![Status](https://img.shields.io/badge/Status-Active-brightgreen)  
**RelativityAPI** es una API desarrollada en Node.js y PostgreSQL para gestionar experimentos relacionados con la correlación entre **minutos de publicidad** y **ventas** semanales. El proyecto incluye funcionalidades de registro de datos, cálculos estadísticos y auditoría mediante logs.

---

## ⚙️ **Características Principales**

- **CRUD de experimentos:** Creación, consulta y eliminación de experimentos.
- **Registro de datos:** Almacena las observaciones de los experimentos.
- **Cálculo de resultados estadísticos:** 
  - Sxx, Syy, Sxy
  - Coeficiente de correlación (r)
  - Coeficiente de determinación (R²) y 1 - R²
- **Sistema de logs:** Registro automático de todas las acciones realizadas.

---

## 🛠️ **Tecnologías Utilizadas**

- **Backend:** Node.js + Express
- **Base de Datos:** PostgreSQL
- **ORM:** Sequelize
- **Herramientas:** Axios, Postman

---

## ⚠️ **Requisitos Previos**

> **Asegúrate de tener instalados los siguientes programas antes de comenzar:**
> - Node.js (v14+)
> - PostgreSQL
> - Yarn o npm

---

## 📦 **Instalación**

```bash
# Clonar el repositorio
git clone https://github.com/notjuanda/RelativityAPI.git

# Navegar al directorio del proyecto
cd RelativityAPI

# Instalar dependencias
yarn install
# o
npm install
```

## 🚀 **Ejecución del Proyecto**

### **Configurar la Base de Datos**
1. Crea una base de datos PostgreSQL llamada `relativityapi`.
2. Ejecuta las siguientes consultas SQL para crear las tablas:

```sql
-- Crear la base de datos
CREATE DATABASE relativityapi;

-- Conectar a la base de datos
\c relativityapi;

-- Crear las tablas
-- (Ver estructura completa en /db/schema.sql)

```

3. Asegúrate de configurar tus credenciales en el archivo `config/db.config.js`:

```javascript
// config/db.config.js
module.exports = {
    HOST: 'localhost',
    USER: 'tu_usuario',
    PASSWORD: 'tu_contraseña',
    DB: 'relativityapi',
    DIALECT: 'postgres',
    PORT: 5432
};
```

### **Iniciar el Servidor**

Asegúrate de tener PostgreSQL en ejecución y conectado.  
Ejecuta el siguiente comando para iniciar el servidor en modo desarrollo:

```bash
npx nodemon index.js
La API estará disponible en: [http://localhost:3000](http://localhost:3000)
```

---

## 📝 **Uso de la API**

### 1. **Crear un Experimento**

- **Endpoint**:  
  `POST /api/experimentos`

- **Body**:
    ```json
    {
        "nombre": "Relación Publicidad vs Ventas",
        "descripcion": "Análisis del impacto de la publicidad en las ventas."
    }
    ```

---

### 2. **Registrar Datos de un Experimento**

- **Endpoint**:  
  `POST /api/datos`

- **Body**:
    ```json
    {
        "id_experimento": 1,
        "x": 30,
        "y": 90
    }
    ```

---

### 3. **Obtener Resultados Completos**

- **Endpoint**:  
  `GET /api/resultados/1/todos`

- **Respuesta**:
    ```json
    {
        "Sxx": 8025,
        "Syy": 66105,
        "Sxy": 22475,
        "r": 0.9758,
        "R2": 0.9522,
        "unoMenosR2": 0.0478
    }
    ```

---

## 🔍 **Estructura del Proyecto**

```plaintext
RelativityAPI/
│
├── controllers/        # Lógica de negocio de los controladores
├── models/             # Modelos ORM de Sequelize
├── routes/             # Definición de rutas de la API
├── public/             # Archivos estáticos (si los hubiera)
├── config/             # Configuraciones de la BD y del entorno
├── db/                 # Scripts SQL para la base de datos
└── index.js            # Punto de entrada principal del servidor
```

---

## 📂 **Contribuciones**

> **Sigue el flujo de trabajo Gitflow:**
> 1. Crea una rama `feature/nueva-funcionalidad`.
> 2. Realiza tus cambios y haz `commit`.
> 3. Abre un Pull Request hacia la rama `develop`.

---

## 🛡️ **Licencia**

Este proyecto está licenciado bajo la **MIT License**.  
Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

## ✅ **Estado del Proyecto**

![Progress](https://progress-bar.dev/80/?title=Progreso)

---
