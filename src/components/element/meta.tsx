import {
    Fragment,
} from "react";
import {MetaProps} from "../@types";
import {convertDataSet, joinClasses} from "../common";

export const Meta = (props: MetaProps) => {
    const {
        element: _,
        itemProp,
        classes = [],
        attributes = {},
        datasets = new Map(),
        ...metaProps
    } = props;

    // Initialize
    const datasetShown = convertDataSet(datasets);

    return (
        <Fragment>
            <meta
                {...metaProps}
                itemProp={''}
                className={joinClasses(classes)}
                {...attributes}
                {...datasetShown}
            />
        </Fragment>
    );
};
