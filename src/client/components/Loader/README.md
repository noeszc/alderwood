# Loader

A loader alerts a user to wait for an activity to complete.

## Usage

```js
import Loader from 'client/components/Loader';
```

## Properties

| property      | propType            | required | default | description                                                   |
| :------------ | :------------------ | :------- | :------ | :------------------------------------------------------------ |
| as            | custom              | -        |         | An element type to render as (string or function).            |
| active        | boolean             | -        |         | A loader can be active or visible.                            |
| children      | node                | -        |         | Primary content.                                              |
| className     | string              | -        |         | Additional classes.                                           |
| content       | custom              | -        |         | Shorthand for primary content.                                |
| disabled      | boolean             | -        |         | A loader can be disabled or hidden.                           |
| indeterminate | boolean             | -        |         | A loader can show it's unsure of how long a task will take.   |
| inline        | boolean &#124; enum | -        |         | Loaders can appear inline with content. **enums:** `centered` |
| inverted      | boolean             | -        |         | Loaders can have their colors inverted.                       |

## Types

### Loader

A loader.

Loaders are hidden unless has prop `active` or inside an `Dimmer active`

```js
<Dimmer active>
  <Loader />
</Dimmer>
```

### Text loader

A loader can contain text

```js
<Dimmer active>
  <Loader>Loading</Loader>
</Dimmer>
```

## States

### Indeterminate

A loader can show it’s unsure of how long a task will take.

```js
<Dimmer active>
  <Loader indeterminate>Preparing files</Loader>
</Dimmer>
```

### Active

An active loader may not be clearly visible without using a `Dimmer`.

```js
<Loader active />
```

### Disabled

A loader can be disabled or hidden.

```js
<Loader disabled />
```

## Variations

### Inline

Loaders can appear inline with content.

```js
<Loader active inline />
```

### Inline center

Loaders can appear inline centered with content.

```js
<Loader active inline="centered" />
```
