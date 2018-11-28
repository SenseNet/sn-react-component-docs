### Reference field

The reference field can be used as an autocomplete field to pick from a list of content.

```ts
<AdvancedSearch
    schema={null as any}
    fields={() => <ReferenceField<GenericContent>
        fieldName="CreatedBy"
        fieldSetting={{
            Name: "Created By",
            Type: "User",
            FieldClassName: "",
            AllowedTypes: ['User'],
        }}
        fetchItems={async (query) => {
            /** your logic to retrieve the fetched content based on the provided query */
            return [...]
        }}
        onQueryChange={action("onQueryChange")}
        helperText={'Type something to filter'}
        id="reference-filter"
    />}
/>
```