# Propuesta 1 Estructura de la aplicación

## Contenedores y Componentes

Lo primero a tener en cuenta en aplicaciones grandes usando React es marcar la diferencia entre **stateful (“containers”)** y **stateless (“components”)**. Los contenedores manejan datos o estan conectados al estado de Redux store y generalmente no tienen un estilo asociado a ellos. Por otro lado, los componentes tienen un estilo asociado y no son responsables de ningún dato o administración del estado de Redux. Basicamente los contenedores son responsables de como funcionan las cosas, y los componentes son responsables de como se ven las cosas.

Dividir nuestros componentes de esta manera permite separar de forma limpia los componentes reutilizables y las capas intermedias de gestion de datos. Como resultado, pueden entrar y editar con confianza sus componentes sin preocuparse de que sus estructuras de datos se dañen, y pueden editar sus contenedores sin preocuparse de que el diseño se estropee.

Pueden [leer](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) este articulo de [Dan Abramow](https://github.com/gaearon) para una introducción más a detalle de esta metodología.

## Estructura

Lo mejor para aplicaciones a gran escala es agrupar por *feature*, es decir todos los archivos relacionados a la funcionalidad que se desea construir, deberán estar en una carpeta ejemplo:

    react-app
            ├── containers
            │    └── FeatureName
            │        ├── index.jsx
            │        ├── actions.js
            │        ├── constants.js
            │        └── reducer.js
            └── components
                └── App.jsx

Los desarrolladores que trabajen esta aplicación necesitaran  acceder a una sola carpeta para trabajar en algo.

Y tendrían que crear solo una carpeta para agregar una nueva *feature.*

Renombrar es facil con la funcion de buscar y remplazar y varios devs podrían trabajar en la misma aplicación a la vez sin causar conflicto

Es importante tener en cuenta que esto no significa que los actions y reducers solo pueden usarse en ese componente. Pueden (y deberian) importarse y usarse en otros componentes y gracias a [babel-plugin-module-resolver](https://github.com/tleunen/babel-plugin-module-resolver) vamos a comprender mejor de donde estamos compartiendo funcionalidad.

    import { someAction } from 'SomeFeature/actions'
    import { anotherAction } from 'AnotherFeature/actions'

## Generadores

 Para poder mantener la consistencia de la estructura y que sea agil

Se propone añadir un script que nos genere el boilerplate de contenedores y componentes a travez de un comando

    npm run generate

`npm run generate <part>` para omitir la primer selección.(por ejemplo `npm run generate container`), estos comandos realizaran una cierta serie de preguntas para omitir archivos que tal vez por el tipo de funcionalidad en ese momento no se ocupe ejemplo tal vez no se ocupa que tenga una saga/thunk o que el contenedor puede o no corresponder a una ruta de la app etc.

## Testing

Probar la aplicación es una parte vital en el desarrolló de la misma y para esta propuesta es la siguiente

1. Colocar los archivos `.test.js` directamente al lado de las partes de la aplicación que se quiera probar (O en los subdirectorios tests, realmente no importa siempre que esten directamente a lado de esas partes y terminen en `.test.js`
2. Escribir las pruebas solo en estos archivos
3. Ejecutar `npm run test` en la terminal y ver pasar todas las pruebas (Ojalá)

No nos compliquemos la vida con si debería llamarse la carpeta `__test__` los archivos `.spec.js` 

Lo importante es no saltarse esta fase del desarrollo y en el ecosistema de React las librerias mas populares son [Jest](https://jestjs.io/) & [Enzyme](http://airbnb.io/enzyme/) creadas por airbnb, por lo tanto no veo que sea necesario cambiar por alguna otra.

    components
    │   ├── Grid
    │   │   ├── Ul.js
    │   │   ├── Wrapper.js
    │   │   ├── index.js
    │   │   └── tests
    │   │       ├── Ul.test.js
    │   │       ├── Wrapper.test.js
    │   │       └── index.test.js
