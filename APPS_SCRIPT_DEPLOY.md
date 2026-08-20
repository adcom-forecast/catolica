# Despliegue privado del Dashboard Católica

El tablero ya no descarga CSV públicos. `Code.gs` lee las cuatro pestañas de la
hoja privada y `tablero_catolica.html` recibe los datos mediante
`google.script.run`.

**URL interna desplegada:**
<https://script.google.com/a/macros/adcom.group/s/AKfycbxIeTja4p4i_hVQT4mt3PU27RPINNmutJEl5D2r-JYN-PhqrRUKNewvXoOwdcs1Cp4W/exec>

El portal y la antigua página de GitHub Pages redirigen a esta URL. El HTML de
GitHub no consulta la hoja: únicamente funciona como acceso al despliegue
privado, donde `google.script.run` está disponible.

## Añadirlo al proyecto existente

1. Desde **[Católica] Fuente de datos**, abre **Extensiones > Apps Script**.
   Usa ese proyecto existente; no crees uno nuevo.
2. En **Archivos**, pulsa **+ > Secuencia de comandos**, crea un archivo llamado
   `DashboardCatolica` y pega el contenido de `Code.gs` de este repositorio.
   No reemplaces los archivos `.gs` que ya existen.
3. Antes de guardar, busca `function doGet` en todo el proyecto:
   - Si no existe, conserva el `doGet` incluido en `DashboardCatolica`.
   - Si ya existe, no añadas un segundo `doGet`. Integra la llamada a
     `HtmlService.createTemplateFromFile('tablero_catolica')` en el `doGet`
     existente o solicita la adaptación del enrutamiento antes de desplegar.
4. En **Archivos**, pulsa **+ > HTML**, crea un archivo llamado
   `tablero_catolica` y pega el contenido de `tablero_catolica.html`.
5. No reemplaces el manifiesto existente. Si `appsscript.json` ya contiene una
   propiedad `oauthScopes`, añade a esa lista, si aún no está presente:
   `https://www.googleapis.com/auth/spreadsheets.readonly`. Si el manifiesto no
   declara `oauthScopes`, Apps Script puede detectar el permiso automáticamente.
6. Guarda el proyecto y ejecuta manualmente `getDashboardData` una vez. Acepta
   el permiso de solo lectura solicitado para Google Sheets.

El navegador carga las cuatro fuentes por separado y muestra el avance de
`1/4` a `4/4`. Si alguna no responde, después de 60 segundos se muestra un
mensaje que permite identificarla en **Ejecuciones**.

## Desplegar con acceso interno

1. Si el proyecto no tiene una aplicación web, pulsa **Implementar > Nueva
   implementación**. Si ya tiene una aplicación web en uso, no la actualices
   hasta comprobar que el `doGet` existente enruta correctamente al tablero.
2. En **Seleccionar tipo**, elige **Aplicación web**.
3. Configura:
   - **Ejecutar como:** `Yo`.
   - **Quién tiene acceso:** la opción que limite el acceso a
     **ADCOM GROUP INTERNACIONAL** o al dominio de la organización.
4. Pulsa **Implementar** y copia la URL terminada en `/exec`.
5. Abre esa URL en una ventana de incógnito e inicia sesión con una cuenta
   `@adcom.group`. El tablero debe cargar; una cuenta externa no debe poder
   acceder.

## Actualizaciones posteriores

Después de cambiar `Code.gs` o `tablero_catolica.html`, ve a
**Implementar > Administrar implementaciones > Editar**, selecciona **Nueva
versión** y vuelve a implementar. La URL `/exec` se conserva.

No compartas el proyecto de Apps Script ni la hoja con usuarios externos. La
protección del tablero depende de que el despliegue permanezca restringido al
dominio.
