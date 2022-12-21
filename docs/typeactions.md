# TypeActions

This component is the actions that a object in organise can have, it provides a bar on the pages `items`, `boxes`, `locations`, `organisations` with 4 default actions

-   New
    -   Always available
-   Edit
    -   Disabled unless item(s) are selected
-   Delete
    -   Disabled unless item(s) are selected
-   Share
    -   Disabled unless item(s) are selected

## Actions

> All actions need to know what type they are executing on. Selecting a `box` should NOT execute delete on an `item`, `location`, etc...

First thought was to pass in the `function`/method for these standard actions

-   Not a great solution to reusing the component; means that you have to re-write likely identical methods only changing the type that it's action on
-

## Inputs

-   The selected items - this allows the buttons to action something
-   The type of items that are selected?
    -   could be a custom object with only the types `id` and what type it is so it knows the connector to call
    -   doesn't need extra information about things like `name`

## Modals

### New

-   When on a specific page it should directly show the modal for that object type `item`, `box`, etc...
-   When on the `All` page it should have a submenu that asks which object type you are creating
