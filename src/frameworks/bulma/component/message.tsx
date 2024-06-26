import React, {
    Fragment,
} from "react";
import {MessageBodyProps, MessageHeaderProps, MessageProps} from "../@types";
import {ArticleProps, Button, Container, DivProps, getCssFramework, initialize, Paragraph} from "../index";
import {generateId} from "../../../utils";

export const Message = (props: MessageProps) => {
    const {
        component = 'message',
        element = 'article',
        header,
        body,
        children,
        ...restProps
    } = props;

    // Initialize and set default class if not exists
    restProps['classes'] = initialize(
        props['classes'], [], getCssFramework().getDefaultStyleClass(
            component, element
        )
    );
    restProps['attributes'] = initialize(
        props['attributes'], {}, getCssFramework().getDefaultAdditionalAttributes(
            component, element
        )
    );

    if (header && header.close.onClick === undefined) {
        restProps.id = restProps.id ?? generateId();
        header.close.onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            const el = document.getElementById(restProps.id as string);
            if (el) {
                el.style['display'] = 'none';
            }
        };
    }

    return (
        <Fragment>
            <Container<ArticleProps>
                {...restProps}
                element={element}
                noDefaultClass={true}
            >
                { header ? <MessageHeader {...header} /> : <Fragment /> }
                { children
                    ? <MessageBody {...body}>{children}</MessageBody>
                    : <MessageBody {...body} />
                }
            </Container>
        </Fragment>
    );
};

export const MessageHeader = (props: MessageHeaderProps) => {
    const {
        component = 'message-header',
        element = 'div',
        label,
        close,
        ...restProps
    } = props;

    // Initialize and set default class if not exists
    restProps['classes'] = initialize(
        props['classes'], [], getCssFramework().getDefaultStyleClass(
            component, element
        )
    );
    restProps['attributes'] = initialize(
        props['attributes'], {}, getCssFramework().getDefaultAdditionalAttributes(
            component, element
        )
    );

    label['classes'] = initialize(
        label['classes'], [], getCssFramework().getDefaultStyleClass(
            component, 'p'
        )
    );
    label['attributes'] = initialize(
        label['attributes'], {}, getCssFramework().getDefaultAdditionalAttributes(
            component, 'p'
        )
    );

    close['classes'] = initialize(
        close['classes'], [], getCssFramework().getDefaultStyleClass(
            component, 'button', 'delete'
        )
    );
    close['attributes'] = initialize(
        close['attributes'], {}, getCssFramework().getDefaultAdditionalAttributes(
            component, 'delete',
        )
    );
    if (close.onClick === undefined) {
        close.onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            const el = e.currentTarget;
            if (el && el.parentElement && el.parentElement.parentElement) {
                el.parentElement.parentElement.hidden = true;
            }
        };
    }

    return (
        <Fragment>
            <Container<DivProps>
                {...restProps}
                element={element}
            >
                <Paragraph
                    {...label}
                    element={'p'}
                    noDefaultClass={true}
                >
                    {label.children}
                </Paragraph>
                <Button
                    {...close}
                    element={'button'}
                    noDefaultClass={true}
                />
            </Container>
        </Fragment>
    );
};

export const MessageBody = (props: MessageBodyProps) => {
    const {
        component = 'message-body',
        element = 'div',
        children,
        ...restProps
    } = props;

    // Initialize and set default class if not exists
    restProps['classes'] = initialize(
        props['classes'], [], getCssFramework().getDefaultStyleClass(
            component, element
        )
    );
    restProps['attributes'] = initialize(
        props['attributes'], {}, getCssFramework().getDefaultAdditionalAttributes(
            component, element
        )
    );

    return (
        <Fragment>
            <Container<DivProps>
                {...restProps}
                element={element}
                noDefaultClass={true}
            >
                {children}
            </Container>
        </Fragment>
    );
};
