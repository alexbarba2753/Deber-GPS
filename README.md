# Deber: Ubicación GPS y Rutas en Google Maps

Aplicación móvil sencilla desarrollada con **Ionic** y **Angular** para la materia de **Aplicaciones Móviles**.

---

## 👥 Integrantes
* **Mateo Barba**
* **Daniel Diaz**

---

## 📌 Descripción del Trabajo
El objetivo de esta práctica es implementar enlaces a Google Maps para visualizar una ubicación geográfica específica y una ruta de interés, además de permitir la exportación de dichas direcciones en archivos de texto descargables (`.txt`).

---

## 🚀 Funcionalidades Implementadas

1. **Hipervínculo a la posición GPS:**
   * Enlace directo a la posición asignada en Google Maps:
     [https://www.google.com/maps/@-0.2099077,-78.5137803,19.75z](https://www.google.com/maps/@-0.2099077,-78.5137803,19.75z)
   * Botón para abrir la ubicación en una nueva pestaña.

2. **Hipervínculo a la ruta de interés:**
   * Enlace directo a la ruta trazada en Google Maps:
     [https://www.google.com/maps/dir/...](https://www.google.com/maps/dir/C.+José+Mejia+Lequerica+%26+C.+Eugenio+Espejo,+170205+Quito/Independencia+%26+Montevideo,+170103+Quito/KFC+-+Eloy+Alfaro,+Eloy+Alfaro+y+Las+Anonas+esquina,+170513+Quito/César+Endara+%26+Jose+Fernandez,+170133+Quito/@-0.1279908,-78.4728993,15.08z)
   * Botón para abrir la ruta en una nueva pestaña.

3. **Botón Guardar Ubicación en TXT:**
   * Descarga automáticamente un archivo llamado `ubicacion.txt` que contiene la URL y los datos de la posición GPS.
   * Muestra una alerta de confirmación en la app.

4. **Botón Guardar Ruta en TXT:**
   * Descarga automáticamente un archivo llamado `ruta.txt` que contiene la URL y los detalles de la ruta.
   * Muestra una alerta de confirmación en la app.

---

## 📸 Capturas de Pantalla

### 1. Pantalla Principal
Vista general con la información de los integrantes, los hipervínculos y los botones de acción:

![Pantalla Principal](screenshots/01_pantalla_completa.png)

### 2. Guardar Ubicación GPS (`ubicacion.txt`)
Alerta que se muestra al presionar el botón de guardar ubicación y confirmación de descarga del archivo `.txt`:

![Guardar Ubicación](screenshots/02_guardar_ubicacion_alerta.png)

### 3. Guardar Ruta (`ruta.txt`)
Alerta que se muestra al presionar el botón de guardar ruta y confirmación de descarga del archivo `.txt`:

![Guardar Ruta](screenshots/03_guardar_ruta_alerta.png)

---

## 🛠️ Cómo Ejecutar el Proyecto

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/alexbarba2753/Deber-GPS.git
   cd Deber-GPS
   ```

2. Instalar las dependencias:
   ```bash
   npm install
   ```

3. Iniciar el servidor local de desarrollo:
   ```bash
   ionic serve
   ```
   o también:
   ```bash
   npm start
   ```

4. Abrir en el navegador en `http://localhost:8100/`.
