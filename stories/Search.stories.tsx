import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";
import { ExampleApp } from "@sensenet/search-react/src/ExampleApp";
import { muiTheme } from 'storybook-addon-material-ui';
import { withKnobs } from '@storybook/addon-knobs';
import { withMarkdownNotes } from '@storybook/addon-notes';
import { withInfo } from "@storybook/addon-info";
import { checkA11y } from '@storybook/addon-a11y'
import { AdvancedSearch, PresetField } from "@sensenet/search-react/src";
import { Query } from "@sensenet/query";
import { withActions } from '@storybook/addon-actions/dist/preview'
import { action } from "@storybook/addon-actions";
import { FormControl, InputLabel } from "@material-ui/core";


addDecorator(muiTheme())

const advancedSearchNotes = require('../notes/search/AdvancedSearch.md')
const presetFieldNotes = require('../notes/search/PresetField.md')

storiesOf('Search', module).addDecorator(withKnobs).addDecorator(withInfo()).addDecorator(checkA11y)
    .addDecorator(withActions("queryChange"))
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
    .add("Reference field", () => <div>Alma</div>)
    .add("Text field", () => <div>Alma</div>)
    .add("Type field", () => <div>Alma</div>)
    .add("Showcase",
        () => (
            <ExampleApp />
        ),
    )