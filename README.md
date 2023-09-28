# useQueryParams Hook

### Custom Hook de React para subir el estado al a url de un formulario

```typescript
type InitialState = {
  first: string
  last: string
  age: number
}

```
```jsx
const { queryUrl, onChangeQuery, queryObject } = useQueryParams<InitialState>(initialState)
```


El custom hook recibe como parámetro un <ins>*initialState*</ins> que será un objeto. El objeto serà lo que represente la información del formulario.

El hook devuelve un objeto con que tiene queryUrl, onChangeQuery y queryObject

- __queryUrl__: es un objeto parseado de los queryparams de la url. Este objeto servirá para realizar el filtrado de la data por la url.

- __onChangeQuery__: es una función que recibe un argumento. El argumento es un objeto que tiene como ***key*** el *name* del `<input>` y el *valor* del mismo. Se implementa en el *onChange.*

- __queryObject__: Es el objeto propio de todo el formulario. Es el que se implementará en el *value* del elemento `<input>`


>En el caso de implementar un debounce utilizar el queryObject en el value del input. Sino se podrá utilizar el objeto **queryUrl**