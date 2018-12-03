# Commands

## Generators

    # Usando Yarn
    yarn generate

    # Usando npm
    npm run genearate

Permite generar automáticamente código repetitivo para partes comunes de la
aplicación, específicamente `component`, y`containers`. 

Tambien pueden ejecutar `yarn generate <part>` para omitir la primera selección. (por ejemplo, `yarn generate container`)

## Testing

Consulten la [documentación de pruebas](../testing/README.md), para obtener información detallada
acerca de la configuración de pruebas y paquetes instalados para ejecutarlas.

## Unit Testing

    # Usando Yarn
    yarn test

    # Usando npm
    npm test

Para probar la aplicación con pruebas unitarias se especifican los archivos `**/tests/*.js`

que están a lo largo de la aplicación.

Todos los comandos test permiten un argumento opcional `-- [string]`

para filtrar las pruebas que esta ejecutando Jest. Esto es muy util si solo desean ejecutar una prueba en especifico

    # Solo ejecutara las pruebas del componente Button
    yarn test -- Button

### Watching

    yarn test:watch

Observa cambios en los archivos  `**/tests/*.js` y vuelve a ejecutar las pruebas cada vez que cambie un archivo.

## Linting

    # Usando Yarn
    yarn lint

Linter a todo el JavaScript y CSS

    yarn lint:eslint:fix -- .

Linter a todo el código e intenta corregir los errores que encuentra.
