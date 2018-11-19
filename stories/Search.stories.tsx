import React from "react";
import { storiesOf, addDecorator } from "@storybook/react";
import { ExampleApp } from "@sensenet/search-react/src/ExampleApp";
import { muiTheme } from 'storybook-addon-material-ui';
import { withKnobs } from '@storybook/addon-knobs';
import { withMarkdownNotes } from '@storybook/addon-notes';
import { withInfo } from "@storybook/addon-info";
import { checkA11y } from '@storybook/addon-a11y'

addDecorator(muiTheme())

const searchNotes = require('../notes/search/Search.md')

storiesOf('Search', module).addDecorator(withKnobs).addDecorator(withInfo()).addDecorator(checkA11y)
    .add("Advanced search example",
        withMarkdownNotes(searchNotes)
            (() => (
                <ExampleApp />
            )),
    )