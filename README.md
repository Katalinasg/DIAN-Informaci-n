# Guia Digital de Tramites DIAN - Sistema QR

Herramienta informativa basada en codigos QR que permite a los contribuyentes consultar
desde su celular los requisitos, documentos y pasos de los tramites mas frecuentes en la DIAN.

## Estructura del proyecto

```
dian-qr/
├── index.html                    ← Pagina principal (menu de tramites)
├── qr-impresion.html             ← Codigos QR para imprimir y ubicar fisicamente
├── css/
│   └── style.css                 ← Todos los estilos (mobile-first)
├── js/
│   └── app.js                    ← Generacion QR, tabs, busqueda, compartir
└── tramites/
    ├── rut.html                  ← Inscripcion en el RUT
    ├── actualizacion-rut.html    ← Actualizacion de datos del RUT
    ├── firma-electronica.html    ← Activacion de Firma Electronica
    ├── citas.html                ← Agendamiento de Citas
    ├── devolucion-saldos.html    ← Devolucion de Saldos a Favor
    └── declaracion-renta.html   ← Declaracion de Renta (personas naturales)
```

## Despliegue en GitHub Pages (paso a paso)

### Requisitos previos
- Cuenta en GitHub (gratuita): https://github.com
- Git instalado (opcional si usas la interfaz web)

### Opcion A: Subir desde la interfaz web de GitHub

1. **Crea un repositorio nuevo** en https://github.com/new
   - Nombre: `dian-tramites` (o el nombre que prefieras)
   - Visibilidad: **Public** (obligatorio para GitHub Pages gratuito)
   - No marques ninguna opcion adicional, haz clic en "Create repository"

2. **Sube los archivos:**
   - En el repositorio vacio, haz clic en "uploading an existing file"
   - Arrastra toda la carpeta del proyecto (o selecciona todos los archivos)
   - Asegurate de incluir: `index.html`, `qr-impresion.html`, la carpeta `css/`, la carpeta `js/` y la carpeta `tramites/`
   - Escribe un mensaje de commit como "Primer subida del proyecto" y haz clic en "Commit changes"

3. **Activa GitHub Pages:**
   - Ve a Settings (Configuracion) del repositorio
   - En el menu lateral, haz clic en "Pages"
   - En "Source", selecciona "Deploy from a branch"
   - En "Branch", selecciona `main` y la carpeta `/ (root)`
   - Haz clic en "Save"

4. **Obtén la URL del sitio:**
   - Espera 1-2 minutos y recarga la pagina de Settings > Pages
   - Aparecera la URL del sitio: `https://[tu-usuario].github.io/[nombre-repositorio]/`
   - Ejemplo: `https://juanperez.github.io/dian-tramites/`

5. **Prueba el sitio:**
   - Abre la URL en tu celular
   - Verifica que cada tramite carga correctamente
   - Comprueba que los codigos QR se generan

### Opcion B: Subir con Git desde la terminal

```bash
# Desde la carpeta del proyecto:
git init
git add .
git commit -m "Sistema QR tramites DIAN"
git remote add origin https://github.com/[tu-usuario]/[nombre-repo].git
git push -u origin main
```
Luego activa GitHub Pages como se describe en el paso 3 de la opcion A.

## Como generar los QR para carteles fisicos

Una vez desplegado el sitio en GitHub Pages:

1. Abre el sitio en tu computador: `https://[tu-usuario].github.io/[repo]/`
2. Navega a la pagina **"Imprimir QR"** (hay un enlace en el encabezado)
3. Espera a que los codigos QR se generen automaticamente
4. Haz clic en **"Imprimir ahora"** o usa Ctrl+P / Cmd+P
5. Recorta cada cartel y ubicalos en las areas de atencion

> Los QR se generan dinamicamente a partir de la URL real del sitio.
> No necesitas configurar nada manualmente.

## Caracteristicas del sistema

- **Mobile-first:** Optimizado para dispositivos moviles
- **Sin servidor:** Funciona con archivos estaticos en GitHub Pages
- **QR dinamicos:** Se generan automaticamente segun la URL desplegada
- **Busqueda:** Filtro de tramites en tiempo real
- **Compartir:** Boton de compartir nativo en moviles (Web Share API)
- **Impresion:** Pagina dedicada con todos los QR para carteleria fisica
- **Sin dependencias backend:** Solo HTML, CSS y JavaScript vanilla

## Tramites incluidos

| Tramite | Archivo |
|---|---|
| Inscripcion en el RUT | `tramites/rut.html` |
| Actualizacion de datos del RUT | `tramites/actualizacion-rut.html` |
| Activacion de Firma Electronica | `tramites/firma-electronica.html` |
| Agendamiento de Citas | `tramites/citas.html` |
| Devolucion de Saldos a Favor | `tramites/devolucion-saldos.html` |
| Declaracion de Renta | `tramites/declaracion-renta.html` |

## Como agregar un tramite nuevo

1. Copia el archivo `tramites/citas.html` como base
2. Reemplaza el contenido de los tabs con la informacion del nuevo tramite
3. Actualiza el `<title>` y las meta etiquetas
4. Agrega una nueva tarjeta en `index.html` siguiendo el mismo patron
5. Agrega el nuevo QR en `qr-impresion.html`
6. En `js/app.js`, agrega la entrada en los arrays `tramites` de `initIndexQRs()` e `initPrintQRs()`

## Notas importantes

- Esta herramienta es **informativa** y no reemplaza el portal oficial de la DIAN (www.dian.gov.co)
- Los requisitos y documentos pueden cambiar. Verificar periodicamente con la DIAN oficial.
- El sitio requiere conexion a internet para cargar la libreria de QR desde CDN.
- Licencia: uso libre para fines educativos e institucionales.
