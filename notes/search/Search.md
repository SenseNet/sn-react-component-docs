### Search

ToDo: Component Description

```tsx
<AdvancedSearch
    ...
    fieldComponent={(props) => {
        switch(props.field) {
            case 'DisplayName':
                return (<a href={props.content.Path}>
                    {props.content.DisplayName}
                </a>)
            default:
                return null
        }
    }}
    ...
/>
```