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
git clone https://github.com/usuario/RelativityAPI.git

# Navegar al directorio del proyecto
cd RelativityAPI

# Instalar dependencias
yarn install
# o
npm install
