import {
    List,
} from "../../../../components";
import {deIndent, linkInStoryBook} from "../../../../utils";

/**
 * The &lt;dl&gt; HTML element represents a description list. The element encloses a list of groups of
 * terms (specified using the &lt;dt&gt; element) and descriptions (provided by &lt;dd&gt; elements).
 * Common uses for this element are to implement a glossary or to display metadata (a list of key-value
 * pairs).
 */
export default {
    title: 'React Component/Element/List/Dl',
    component: List,
    tags: ['autodocs'],
    parameters: {
        componentSubtitle: 'The Description List element',
    },
    argTypes: {
        element: {
            control: 'none',
            type: {
                required: true,
            },
            description: 'Switcher for <code>List</code> component to render &lt;dl&gt;',
            table: {
                type: {
                    summary: '"dl"',
                },
                defaultValue: {
                    summary: 'undefined',
                },
            },
        },
        id: {
            control: 'text',
            description: 'ID for element',
            table: {
                type: {
                    summary: 'string',
                },
                defaultValue: {
                    summary: 'undefined',
                },
            },
        },
        items: {
            control: 'object',
            description: deIndent(`
                            Pairs of &lt;dt&gt;s and &lt;dd&gt;s<br />
                            👉 See:&nbsp;
                        `)
                        + linkInStoryBook(
                            'DtProps', 'React Component/Element/List/Dt'
                        ) + ' / '
                        + linkInStoryBook(
                            'DdProps', 'React Component/Element/List/Dd'
                        ),
            table: {
                type: {
                    summary: '[DtProps|DtProps[], DdProps|DdProps[]][]',
                },
                defaultValue: {
                    summary: 'undefined',
                },
            },
        },
        commonClassesInItem: {
            control: 'object',
            description: 'Common style classes for child items',
            table: {
                type: {
                    summary: 'string[]',
                },
                defaultValue: {
                    summary: 'undefined',
                },
            },
        },
        classes: {
            control: 'object',
            description: 'Style classes',
            table: {
                type: {
                    summary: 'string[]',
                },
                defaultValue: {
                    summary: 'undefined',
                    detail: 'When undefined, treated as []',
                },
            },
        },
        attributes: {
            control: 'object',
            description: 'Additional attributes',
            table: {
                type: {
                    summary: 'HTMLAttributes<HTMLDListElement>',
                    detail: deIndent(`
                            e.g.,
                            { 'aria-label': 'This is Label' }
                        `),
                },
                defaultValue: {
                    summary: 'undefined',
                    detail: 'When undefined, treated as {}',
                },
            },
        },
        datasets: {
            control: 'object',
            description: 'Datasets. "data-" is added at the beginning of all keys',
            table: {
                type: {
                    summary: 'Map<string, string>',
                    detail: deIndent(`
                            e.g.,
                            new Map([
                                ['id', 'this-is-id'],
                                ['name', 'This is Name'],
                            ]);
                            => data-id="this-is-id" data-name="This is Name"
                        `),
                },
                defaultValue: {
                    summary: 'undefined',
                    detail: 'When undefined, treated as new Map()'
                },
            },
        },
    },
};
/** Default description list */
export const Default = {
    render: (args: any) => <List
        element={'dl'}
        items={[
            [
                {element: 'dt', children: 'Description Term'},
                {element: 'dd', children: 'Description Details'},
            ],
        ]}
        {...args}
    />,
};
/** Description list with common style classes for child */
export const DescriptionListWithCommonStyleClasses = {
    ...Default,
    args: {
        commonClassesInItem: ['test-common-1'],
    },
};
/** Description list with style classes */
export const DescriptionListWithStyleClasses = {
    ...Default,
    args: {
        classes: ['test-class1', 'test-class2'],
    },
};
/** Description list with additional attributes */
export const DescriptionListWithAdditionalAttributes = {
    ...Default,
    args: {
        attributes: {
            'aria-label': 'Description List Label',
            'aria-placeholder': 'Description List Placeholder',
        },
    },
};
/** Description list with datasets */
export const DescriptionListWithDatasets = {
    ...Default,
    args: {
        datasets: new Map([
            ['id', 'data-dl-id'],
            ['name', 'Data dl name'],
        ]),
    },
};
