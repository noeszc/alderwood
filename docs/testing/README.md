# Testing

- [Pruebas unitarias](unit-testing.md)
- [Pruebas de Componentes](component-testing.md)

Probar la aplicación es una parte importante del proceso de desarrollo. Hay algunas cosas que deben probar. Si nunca han hecho esto antes , pueden comenzar por leer [pruebas unitarias](unit-testing.md), después pasar a la [pruebas de componentes](component-testing.md)

## Usage

Para probar la aplicación deben hacer lo siguiente:

1. Colocar los archivos `.test.js` directamente al lado de las partes de la aplicación que se quiera probar (O en los subdirectorios `tests`, realmente no importa siempre que esten directamente a lado de esas partes y terminen en `.test.js`
2. Escribir solo código relacionado a las pruebas en estos archivos.
3. Ejecutar `yarn test` o `npm test` en la terminal


Hay algunos comandos más relacionados con las pruebas, revisen los [comandos](../general/commands.md#testing) para ver la lista completa.
