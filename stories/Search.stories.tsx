import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";
import { sleepAsync } from "@sensenet/client-utils"
import { ExampleApp } from "@sensenet/search-react/src/ExampleApp";
import { muiTheme } from 'storybook-addon-material-ui';
import { withKnobs } from '@storybook/addon-knobs';
import { withMarkdownNotes } from '@storybook/addon-notes';
import { withInfo } from "@storybook/addon-info";
import { checkA11y } from '@storybook/addon-a11y'
import { AdvancedSearch, PresetField, ReferenceField, TextField } from "@sensenet/search-react/src";
import { Query } from "@sensenet/query";
import { withActions } from '@storybook/addon-actions/dist/preview'
import { action } from "@storybook/addon-actions";
import { FormControl, InputLabel } from "@material-ui/core";
import { GenericContent } from "@sensenet/default-content-types/src";


addDecorator(muiTheme())

const advancedSearchNotes = require('../notes/search/AdvancedSearch.md')
const presetFieldNotes = require('../notes/search/PresetField.md')
const referenceFieldNotes = require('../notes/search/ReferenceField.md')
const textFieldNotes = require('../notes/search/TextField.md')

storiesOf('Search', module).addDecorator(withKnobs).addDecorator(withInfo()).addDecorator(checkA11y)
    .addDecorator(withActions("queryChange", "fetchItems"))
    .add("Advanced Search container component", withMarkdownNotes(advancedSearchNotes)(() => <AdvancedSearch
        schema={null}
        onQueryChanged={action("queryChange")}
        fields={(options) => <div>
            <button onClick={() => options.updateQuery("example", new Query(q => q.equals("Index", parseInt(Math.random() * 100 as any))))}>Update Query</button>
        </div>} />))
    .add("Preset field", withMarkdownNotes(presetFieldNotes)(() => <AdvancedSearch schema={null as any} fields={() =>
        <FormControl>
            <InputLabel>Created at</InputLabel>
            <PresetField
                fieldName="CreationDate"
                presets={[
                    { text: '-', value: new Query((a) => a) },
                    { text: 'Today', value: new Query((a) => a.term('CreationDate:>@@Today@@')) },
                    { text: 'Yesterday', value: new Query((a) => a.term('CreationDate:>@@Yesterday@@').and.term('CreationDate:<@@Today@@')) },
                ]}
                onQueryChange={action("onQueryChange")}
                style={{ minWidth: '250px' }}
            />
        </FormControl>}
    />)
    )
    .add("Reference field", withMarkdownNotes(referenceFieldNotes)(() => <AdvancedSearch
        schema={null as any}
        onQueryChanged={action("queryChanged")}
        fields={() => <ReferenceField<GenericContent>
            fieldName="CreatedBy"
            fieldSetting={{
                Name: "Created By",
                Type: "User",
                FieldClassName: "",
                AllowedTypes: ['User'],
            }}
            fetchItems={async (...args: any[]) => {
                action("fetchItems")(...args)
                await sleepAsync(300);
                return [{
                    Id: 1,
                    Name: "Alba",
                    DisplayName: "Alba Monday",
                    Path: "Root/Alba",
                    Type: "User",
                },
                {
                    Id: 2,
                    Name: "BusinessCat",
                    DisplayName: "Business Cat",
                    Path: "Root/BusinessCat",
                    Type: "User",
                }]
            }}
            onQueryChange={action("onQueryChange")}
            helperText={'Type something to filter'}
            id="reference-filter"
        />}
    />))
    .add("Text field", withMarkdownNotes(textFieldNotes)(() => <AdvancedSearch
        schema={null as any}
        onQueryChanged={action("queryChanged")}
        fields={() =>
            <TextField
                fieldName="DisplayName"
                onQueryChange={action("onQueryChange")}
            />
        }
    />))
    .add("Type field", () => <div>Alma</div>)
    .add("Showcase",
        () => (
            <ExampleApp />
        ),
    )