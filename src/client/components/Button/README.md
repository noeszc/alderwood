# Button

A button allows a user to dispach some action.

## Usage

```js
import Loader from 'client/components/Button';
```

## Properties

| property      | propType            | required | default | description                                                   |
| :------------ | :------------------ | :------- | :------ | :------------------------------------------------------------ |
| as            | custom              | -        |         | An element type to render as (string or function).            |
| active        | boolean             | -        |         | A button can show it is currently the active user selection.                            |
| children      | node                | -        |         | Primary content.                                              |
| className     | string              | -        |         | Additional classes.                                           |
| content       | custom              | -        |         | Shorthand for primary content.                                |
| disabled      | boolean             | -        |         | A loader can be disabled or hidden.                           |
| indeterminate | boolean             | -        |         | A loader can show it's unsure of how long a task will take.   |
| inline        | boolean &#124; enum | -        |         | Loaders can appear inline with content. **enums:** `centered` |
| inverted      | boolean             | -        |         | Loaders can have their colors inverted.                       |
