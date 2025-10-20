# Sistema de Gestión Hospitalaria - Frontend

Aplicación web moderna desarrollada con React y Vite para la gestión integral de un hospital.

## 🚀 Tecnologías Utilizadas

- **React 18**
- **Vite 5**
- **React Router DOM 6**
- **Axios**
- **CSS3 (Custom Styles)**

## 📋 Requisitos Previos

- Node.js 18+ y npm
- Backend corriendo en `http://localhost:8080`

## 📦 Instalación

### 1. Ubicación del proyecto
```
C:\Users\Juan\hospital-frontend
```

### 2. Instalar dependencias
```bash
cd C:\Users\Juan\hospital-frontend
npm install
```

### 3. Ejecutar en modo desarrollo
```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173`

### 4. Compilar para producción
```bash
npm run build
```

### 5. Vista previa de producción
```bash
npm run preview
```

## 📁 Estructura del Proyecto

```
hospital-frontend/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   └── Login.css
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Navbar.css
│   │   │   ├── Sidebar.jsx
│   │   │   └── Sidebar.css
│   │   ├── pacientes/
│   │   │   ├── ListaPacientes.jsx
│   │   │   ├── FormPaciente.jsx
│   │   │   ├── DetallePaciente.jsx
│   │   │   └── Pacientes.css
│   │   ├── medicos/
│   │   ├── citas/
│   │   ├── consultas/
│   │   ├── hospitalizacion/
│   │   ├── facturacion/
│   │   └── Dashboard.jsx
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── pacienteService.js
│   │   ├── medicoService.js
│   │   ├── citaService.js
│   │   ├── consultaService.js
│   │   ├── hospitalizacionService.js
│   │   └── facturacionService.js
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── package.json
└── vite.config.js
```

## 🔐 Autenticación

### Credenciales por defecto:
- **Usuario:** juan
- **Contraseña:** 1234

### Flujo de autenticación:
1. El usuario ingresa credenciales en `/login`
2. Se valida contra el backend
3. Si es correcto, se guarda en `localStorage`
4. Redirección automática a `/dashboard`

## 🧭 Rutas Disponibles

### Públicas
- `/login` - Página de inicio de sesión

### Protegidas (requieren autenticación)
- `/dashboard` - Panel principal
- `/pacientes` - Lista de pacientes
- `/pacientes/nuevo` - Formulario nuevo paciente
- `/pacientes/editar/:id` - Editar paciente
- `/pacientes/:id` - Detalle del paciente
- `/medicos` - Módulo de médicos (próximamente)
- `/citas` - Módulo de citas (próximamente)
- `/consultas` - Módulo de consultas (próximamente)
- `/hospitalizacion` - Módulo de hospitalización (próximamente)
- `/facturacion` - Módulo de facturación (próximamente)

## 🎨 Características de la UI

### Login
- Diseño profesional con animaciones
- Fondo con gradientes y formas flotantes
- Panel informativo lateral
- Validación de credenciales en tiempo real
- Manejo de errores elegante

### Dashboard
- Tarjetas de estadísticas
- Actividad reciente
- Accesos rápidos
- Diseño responsivo

### Módulo de Pacientes
- Lista con búsqueda en tiempo real
- Tabla interactiva con acciones
- Formulario de creación/edición
- Vista detallada
- Confirmación de eliminación

### Navegación
- Sidebar con iconos SVG
- Navbar con información del usuario
- Rutas protegidas
- Indicador de ruta activa

## 🔧 Configuración de la API

### Cambiar URL del Backend

Editar `src/services/api.js`:

```javascript
const API_URL = 'http://localhost:8080/api';
```

Para producción:
```javascript
const API_URL = 'https://tu-servidor.com/api';
```

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Compilar
npm run build

# Vista previa
npm run preview

# Linter
npm run lint
```

## 📱 Responsive Design

La aplicación es completamente responsiva:
- **Desktop:** Vista completa con sidebar
- **Tablet:** Adaptación de grillas
- **Mobile:** Navegación optimizada

## 🎨 Paleta de Colores

### Colores Principales
- **Primary:** `#667eea` (Morado)
- **Secondary:** `#764ba2` (Morado oscuro)
- **Success:** `#48bb78` (Verde)
- **Danger:** `#f56565` (Rojo)
- **Warning:** `#ed8936` (Naranja)

### Colores de Fondo
- **Background:** `#f7fafc`
- **Card:** `#ffffff`
- **Hover:** `#f7fafc`

### Colores de Texto
- **Primary:** `#1a202c`
- **Secondary:** `#718096`
- **Muted:** `#a0aec0`

## 🔄 Estado de la Aplicación

### LocalStorage
Se almacena:
- Información del usuario autenticado
- Token de sesión

### Limpieza al cerrar sesión
```javascript
localStorage.removeItem('user');
```

## 🧪 Pruebas

### Verificar conexión con el backend
1. Asegurarse de que el backend esté corriendo en `http://localhost:8080`
2. Abrir DevTools del navegador (F12)
3. Ir a la pestaña Network
4. Intentar hacer login
5. Verificar que las peticiones se completen con status 200

### Datos de prueba
Usar los datos insertados en la base de datos mediante el script SQL proporcionado.

## 🐛 Solución de Problemas

### Error de CORS
El backend debe permitir peticiones desde `http://localhost:5173`

Verificar en los controllers:
```java
@CrossOrigin(origins = "*")
```

### No carga los datos
1. Verificar que el backend esté corriendo
2. Verificar la URL en `src/services/api.js`
3. Revisar la consola del navegador (F12)

### Página en blanco
```bash
# Limpiar caché
npm run build
rm -rf node_modules
npm install
npm run dev
```

### Error al instalar dependencias
```bash
npm cache clean --force
npm install
```

## 📦 Dependencias Principales

```json
{
  "axios": "^1.6.0",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0"
}
```

## 🚀 Deploy

### Compilar para producción
```bash
npm run build
```

Esto genera la carpeta `dist/` con los archivos estáticos listos para deploy.

### Opciones de hosting
- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

## 🎯 Funcionalidades Implementadas

### ✅ Completadas
- Login con autenticación
- Dashboard principal
- Módulo de Pacientes (CRUD completo)
- Navegación y rutas protegidas
- Diseño responsivo

### 🔄 En Desarrollo
- Módulo de Médicos
- Módulo de Citas
- Módulo de Consultas
- Módulo de Hospitalización
- Módulo de Facturación


1. Revisar la consola del navegador (F12)
2. Verificar que el backend esté corriendo
3. Revisar los logs del servidor
