import React from 'react';

import createToolbarPlugin, { Separator } from '@draft-js-plugins/static-toolbar';

import {
    ItalicButton,
    BoldButton,
    UnderlineButton,
    CodeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton,
} from '@draft-js-plugins/buttons';

import HeadlinesButton from '../headlines-button/headlines-button.component';

import '@draft-js-plugins/static-toolbar/lib/plugin.css';

const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;

const CustomToolbar = () => {
    return (
        <Toolbar>
            {
                (externalProps) => (
                    <div>
                        <BoldButton {...externalProps} />
                        <ItalicButton {...externalProps} />
                        <UnderlineButton {...externalProps} />
                        <CodeButton {...externalProps} />
                        <Separator {...externalProps} />
                        <HeadlinesButton {...externalProps} />
                        <UnorderedListButton {...externalProps} />
                        <OrderedListButton {...externalProps} />
                        <BlockquoteButton {...externalProps} />
                        <CodeBlockButton {...externalProps} />
                    </div>
                )
            }
        </Toolbar>
    );
}

export default CustomToolbar
