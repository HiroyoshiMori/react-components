import {
    Fragment,
} from "react";
import {
    HgroupProps,
    PProps,
} from "../@types";
import {
    convertDataSet,
    joinClasses,
} from "../common";
import {Heading} from "./heading";
import {Paragraph} from "./index";

export const HeadingGroup = (props: HgroupProps) => {
    const {
        element: _,
        heading,
        paragraphs = [],
        classes = [],
        attributes = {},
        datasets = new Map(),
        ...restProps
    } = props;

    // Initialize
    const datasetShown = convertDataSet(datasets);

    return (
        <Fragment>
            <hgroup
                {...restProps}
                className={joinClasses(classes)}
                {...attributes}
                {...datasetShown}
            >
                <Heading
                    {...heading}
                    element={'heading'}
                />
                {
                    Array.isArray(paragraphs) && paragraphs.length > 0 && paragraphs.map((p: PProps, idx: number) => {
                        return (
                            <Fragment key={idx}>
                                <Paragraph
                                    {...p}
                                    element={'p'}
                                />
                            </Fragment>
                        )
                    })
                }
            </hgroup>
        </Fragment>
    );
};
