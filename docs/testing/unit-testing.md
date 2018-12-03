# Unit testing

La prueba unitaria es la práctica de probar las unidades más pequeñas posibles de nuestro código, `function`. 

Ejecutamos nuestras pruebas y verificamos automáticamente que nuestras funciones hacen lo que esperamos que hagan `expect`, afirmamos `assert`que dado un conjunto de entradas, nuestras funciones devuelven los valores correctos y manejan los errores de forma correcta.

Este seeder usa el framework [jest](https://github.com/facebook/jest) para ejecutar las pruebas y hacer afirmaciones. 

Esta libreria hace que escribir pruebas unitarias sea literal como hablar

`describe` una unidad de código y espera `expect` `it` se comporte..

- [Basics](#basics)
  - [Jest](#jest)
- [Testing Redux Applications](#testing-redux-applications)
  - [Reducers](#reducers)
    - [snapshots](#snapshots)
  - [Actions](#actions)

Se usa este patron global para encontrar las pruebas unitarias `client/**/*.test.js` - esto le dice a Jest que ejecute las pruebas que terminan con `.test.js` que esten en cualquier parte de la carpeta `client`. Usen esto como una ventaja y pongan sus pruebas unitarias a lado de los archivos que desean probar para que los archivos importantes permanezcan juntos.

    components
        │   ├── Grid
        │   │   ├── Ul.js
        │   │   ├── Wrapper.js
        │   │   ├── index.js
        │   │   └── tests
        │   │       ├── Ul.test.js
        │   │       ├── Wrapper.test.js
        │   │       └── index.test.js

## Basics

Vamos a pretender que quieren probar esta función situada en el archivo `add.js`

    // add.js
    
    export function add(x, y) {
      return x + y;
    }

## Jest

Vamos agregar un segundo archivo llamado `add.test.js` 

Primero importamos, `import` la función en nuestro archivo `add.test.js`:

    // add.test.js
    
    import { add } from './add.js';

Segundo vamos a describir la función usando la función `describe` que nos provee jest

    describe('add()', () => {});

Nota: `(arg1, arg2) => { }` es la notación ES6 para funciones anónimas, es decir lo mismo que `function(arg1, arg2) { }`

En tercer lugar, le decimos a Jest que debe hacer nuestra función usando la función `it`

    describe('add()', () => {
      it('adds two numbers', () => {});
    
      it("doesn't add the third number", () => {});
    });

Ahora, vamos a probar que nuestra  función agrega correctamente dos números.
Vamos a tomar algunas entradas fijas, y esperamos `expect` el resultado sea igual  `toEqual` a la salida correspondiente

    // [...]
    it('adds two numbers', () => {
      expect(add(2, 3)).toEqual(5);
    });
    // [...]

Vamos a agregar la segunda prueba, que determina que nuestra función no agrega el
tercer número si hay uno presente:

    // [...]
    it("doesn't add the third number", () => {
      expect(add(2, 3, 5)).toEqual(add(2, 3));
    });
    // [...]

Si nuestra función se comporta como esperamos, Jest mostrará esta salida al ejecutar las pruebas:

    add()
      ✓ adds two numbers
      ✓ doesn't add the third number

Digamos que alguien de el equipo rompe nuestra función:

    // add.js
    
    export function add(x, y) {
      return x * y;
    }

Ahora nuestra función ya no suma los números, los multiplica, imaginen las consecuencias para nuestro código que usa la función `add()`

Afortunadamente, tenemos pruebas unitarias que ejecutaremos antes de hacer un pase a cualquier ambiente de nuestra aplicación, al ejecutar las pruebas de nuevo, vemos la siguiente salida:

    ● add() › adds two numbers
    
      expect(received).toEqual(expected)
    
      Expected value to equal:
        5
      Received:
        6
    
    add()
      ✕ adds two numbers
      ✓ doesn't add the third number

Esto nos dice que algo se rompe en la función `add()`, y todo esto antes de que los usuarios, el área de QA y las personas involucradas en probar o usar la aplicación obtengan nuestro código por el despligue, ahorrando bugs y generando código mas fuerte.

## Testing Redux Applications

Imaginen una barra de navegación, así es como se vería su carpeta:

    NavBar
    ├── actions.js
    ├── constants.js
    ├── index.js
    ├── reducer.js
    ├── selectors.js
    └── tests
        ├── actions.test.js
        ├── index.test.js
        ├── reducer.test.js
        └── selectors.test.js

Usamos Redux en parte por que convierte nuestra dirección de datos en *funciones puras* faciles de probar, usando el ejemplo del componente `NavBar` el archivo actions puede contener algo asi

    // actions.js
    
    import { TOGGLE_NAV } from './constants';
    
    export function toggleNav() {
      return { type: TOGGLE_NAV };
    }

y el reducer

    // reducer.js
    
    import { TOGGLE_NAV } from './constants';
    
    const initialState = {
      open: false,
    };
    
    function NavBarReducer(state = initialState, action) {
      switch (action.type) {
        case TOGGLE_NAV:
          return Object.assign({}, state, {
            open: !state.open,
          });
        default:
          return state;
      }
    }
    
    export default NavBarReducer;

Vamos a probar primero el reducer.

### Reducers

Primero ocupamos importar el reducer y la action

    // reducer.test.js
    
    import NavBarReducer from '../reducer';
    import { toggleNav } from '../actions';

Despues vamos a describir `describe` el reducer y añadir 2 pruebas: debe regresarnos el estado inicial y manejar la acción `toggleNav`

    describe('NavBarReducer', () => {
      it('returns the initial state', () => {});
    
      it('handles the toggleNav action', () => {});
    });

Como el reducer es solo una funcion, podemos probar como cualquier otra funcion y usar esperar `expect` la entrada sea igual a cualquier cosa 

Para probar que regresa el estado inicial, vamos a llamar al reducer con un estado de `undefined` para el primer argumento y una accion vacia para el segundo argumento. El reducer debería devolver el estado inicia de `NavBar`, que es

    {
      open: false,
    }

Puesto a la practica

    describe('NavBarReducer', () => {
      it('returns the initial state', () => {
        expect(NavBarReducer(undefined, {})).toEqual({
          open: false,
        });
      });
    
      it('handles the toggleNav action', () => {});
    });

Esto funciona, pero tenemos un problema: también tenemos que escribir explícitamente el estado inicial. Cuando alguien cambie el estado inicial, también tendrá que actualizar manualmente el código para que la prueba pase.

Es en esta situacion donde los snapshoots de Jest no ayudan a resolver este proble

#### Snapshots

Jest tiene la capacidad de crear snapshoots de la mayoria de los tipos primitivos de información (objetos, matrices, etc.). Luego compara la version guardada cuando se ejecutan las pruebas poesteriores, para encontrar diferencias inesperadas.

Ahora podemos escribir la prueba como:

    describe('NavBarReducer', () => {
      it('returns the initial state', () => {
        expect(NavBarReducer(undefined, {})).toMatchSnapshot();
      });
    
      it('handles the toggleNav action', () => {});
    });

Jest ahora es el responsable de rastrear la definición del estado inicial. Cuando alguien lo cambie en el futuro, Jest advertirá que el snapshoot no concuerda y luego nos permitirá actualizar el snapshoot con un solo comando. No más actualizaciones manuales

Para mas detalles de los snapshoots de Jest por favor vean este [video de Kent Dodd's](https://egghead.io/lessons/javascript-use-jest-s-snapshot-testing-feature)

Así es como se vería nuestra prueba del reducer terminada:

    // reducer.test.js
    
    import NavBarReducer from '../NavBar.reducer';
    import { toggleNav } from '../NavBar.actions';
    
    describe('NavBarReducer', () => {
      it('returns the initial state', () => {
        expect(NavBarReducer(undefined, {})).toMatchSnapshot();
      });
    
      it('handles the toggleNav action', () => {
        expect(NavBarReducer({}, toggleNav())).toMatchSnapshot();
      });
    });

### Actions

Tenemos una acción `toggleNav` que cambia el estado `open` de `NavBar`.

Una acción de Redux es una función pura, por lo que probarla es muy facíl

El primer paso es importar la acción que se probará, la constante que debería
retornar y esperar `expect`:

    // actions.test.js
    
    import { toggleNav } from '../actions';
    import { TOGGLE_NAV } from '../constants';

Luego describimos `describe` las acciones:

    describe('NavBar actions', () => {
      describe('toggleNav', () => {
        it('should return the correct constant', () => {});
      });
    });

Y el último paso es agregar la afirmación `assert`:

    it('should return the correct constant', () => {
      expect(toggleNav()).toEqual({
        type: TOGGLE_NAV,
      });
    });

Si nuestra acción `toggleNav` funciona correctamente, esta es la salida que Jest nos mostrará:

    NavBar actions
      toggleNav
        ✓ should return the correct constant

Y eso es todo, ahora sabemos cuándo alguien rompa la acción `toggleNav`

El siguiente paso es probar a nivel [componente](component-testing.md)
