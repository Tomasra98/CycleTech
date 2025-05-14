# Instalacion de la base de datos 
Cosas a tener en cuenta y comandos que deben correr en la terminal del proyecto para que logren usar MongoDB y hagan la conexión a la base de datos correctamente:

- Instalar MongoDB Community o MongoDB Community Server, la última versión (creo que la 8.08 o algo así)

- Cuando lo estén instalando, denle en permitir instalar MongoDB Compass (Es la interfaz gráfica para que puedan usarlo más cómodamente)

- En VS Code, instalen la extensión MongoDB for VS Code, cuando la abran, denle en la opción de la izquierda, creo que decía connect to MongoDB

Correr los siguientes comandos en la terminal del proyecto:

1. Insalacion de npm
```
install npm
```
  
2. Instalacion de Nodejs
```
npm install 
```
3. Intalacion de dependencias

```
npm install mongoose 
```
```
npm install multer 
```
```
npm install dotenv 
```
```
npm install express 
```
```
npm install cors 
```
Y para poder conectarnos a MongoDB en el puerto 3000 (por defecto), corren el siguiente comando:


```
node js/index.js 
```
_NOTA_: Si no les permite hacer los primeros comandos npm, puede ser que su pc no tenga npm o node por defecto, en ese caso prueben con:
```
install npm
```
_RECOMENDACIONES_: Antes de probar las conexiones, deben crear la conexión en MongoDB Compass, le dan en New Connection, y le ponen CycleTech, mismas mayúsculas para no tener problemas al tirar la conexión por URI que ya está escrita en el archivo mongo.js en el proyecto, la llaman tal como está.


_RECOMENDACIONES_:
Si ya hicieron todo, y no conecta a la base de datos, puede ser que les falte conectarse desde MongoDB Compass, en MongoDB Compass, al lado izquierdo, en Connections, les debería aparecer CycleTech, le dan click izquierdo o click derecho y le dan en conectar, si no funciona todavía, puede ser que les falte conectarse desde VS Code, tendrían que ir a la extensión de MongoDB, ahí les debería aparecer al lado izquierdo, en Connections, localhost:27017, le dan click izquierdo o click derecho y le dan en conectar y ya.
# Recuerda descargas la carpeta node_module

```
npm install 
```
