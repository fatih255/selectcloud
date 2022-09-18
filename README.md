# Select Cloud Package Introduction

This package is an easy to use library that allows us to make multiple selections with the mouse and returns the selected HTMLElements as an array and allows us to add classes and styles to these HTMLElements.

# Tips
- This package supports asynchronous children.
- If you have a clickable area in any HTML Element you specify, you can turn off the selection feature in these areas.(with notSelectableClasses prop)
- Automatic scrolling is active during selection. For example, if there is a scroll value and your selection goes down, it will automatically scroll.

# Preview

![Screenshot_2](https://user-images.githubusercontent.com/52957100/190905083-820fb16e-e08b-4eab-96db-605c4a95c8f2.png)


# Basic Example
```
    <SelectCloud
          loadingComponent={<div>Loading...</div>} 
          options={{
            itemsClass: 'note',
            containerClass: 'cloud-selection-box',
            notSelectableClasses: ['action-box', 'tessasc'],
            crossEffect: ({ style, classList }) => {
              style.color = 'yellow';
              classList.add('test');
            },
            onComplete: ({ getAttributes, elements }) => {
              // console.log(getAttributes("data-id"));
            },
          }}
        >
        <div className="cloud-selection-box">
        <ul>
        <li className="note"></li>
         <li className="note"></li>
          <li className="note"></li>
          ....
        </ul>
        </div>
        </SelectCloud/>
```
# Props
| Prop  |  Type | Definition |
| ------------- | ------------- |------------- |
| ```selectable``` | ```selectable: boolean```  | Enables or disables the ability to select. It is true by default. |
| ```loadingComponent``` | JSX.Element | If your selection items is created with asynchronous, you can provide a loading component until your child is ready. |
- Options Props:

| Prop  |  Type | Definition |
| ------------- | ------------- |------------- |
| ```itemsClass```  | ```string```  | The class attribute of the HTML Elements to be selected.  |
| ```containerClass```  | ```string``` | HTMLElement class attribute where selection can be made |
| ```notSelectableClasses```  | ```string , string[]```  | HTMLElement class property on which selection property is turned off |
| ```crossEffect```  |  ```({style:CSSStyleDeclaration,classList:DOMTokenList})=>void``` | Adds design features to selected HTMLElements |
| ```onComplete```  | ```({getAttributes:(attributeName: string) => any[],elements: Element[]})=>void``` | When mouse up trigger this function and return array of selected HTMLElement |
| ```cloudStyle``` | ```string``` | You can change cloud selection square style with write CSS. By default, its own style is used. |



