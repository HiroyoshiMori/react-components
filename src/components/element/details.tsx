import {
    Fragment,
} from "react";
import {
    DetailsProps, SummaryProps,
} from "../@types";
import {
    convertDataSet,
    joinClasses,
} from "../common";
import {Container} from "./index";

export const Details = (props: DetailsProps) => {
    const {
        element: _,
        children,
        open = true,
        summary,
        classes = [],
        attributes = {},
        datasets = new Map(),
        ...restProps
    } = props;

    // Initialize
    const datasetShown = convertDataSet(datasets);

    return (
        <Fragment>
            <details
                {...restProps}
                open={open}
                className={joinClasses(classes)}
                {...attributes}
                {...datasetShown}
            >
                { summary && (
                    <Container<SummaryProps>
                        {...summary}
                        element={'summary'}
                    />
                )}
                {children}
            </details>
        </Fragment>
    );
};
