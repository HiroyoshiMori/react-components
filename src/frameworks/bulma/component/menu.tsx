import {
    Fragment,
} from "react";
import {MenusLabelListProps, MenusLabelProps, MenusListItemProps, MenusListProps, MenusProps} from "../@types";
import {AProps, AsideProps, Container, getCssFramework, initialize, LiProps, List, Paragraph} from "../index";

export const Menu = (props: MenusProps) => {
    const {
        component = 'menu',
        element = 'aside',
        items = [],
        ...restProps
    } = props;

    // Initialize and set default class if not exists
    const menus = Array.isArray(items)
        ? items : [items];
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
            <Container<AsideProps>
                {...restProps}
                element={element}
            >
                {
                    menus && menus.length > 0 && menus.map((menu: MenusLabelListProps, idx: number) => {
                        const {
                            label,
                            list
                        } = menu;
                        return (
                            <Fragment key={idx}>
                                <MenuLabel {...label} />
                                <MenuList {...list} />
                            </Fragment>
                        );
                    })
                }
            </Container>
        </Fragment>
    );
};

export const MenuLabel = (props: MenusLabelProps) => {
    const {
        component = 'menu-label',
        element = 'p',
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
            <Paragraph
                {...restProps}
                element={element}
                noDefaultClass={true}
            >
                {children}
            </Paragraph>
        </Fragment>
    );
};

export const MenuList = (props: MenusListProps) => {
    const {
        component = 'menu-list',
        element = 'ul',
        items: itemData = [],
        commonClassesInItem = [],
        ...restProps
    } = props;

    // Initialize and set default class if not exists
    const items = Array.isArray(itemData)
        ? itemData : [itemData];
    const menus = items.length > 0 ? items.map((item: MenusListItemProps) => {
        return {
            element: 'li',
            children: <Fragment>
                <Container<AProps> {...item.label} />
                {
                    item.subLevel && <List
                        {...item.subLevel}
                        noDefaultClass={true}
                    />
                }
            </Fragment>,
            classes: commonClassesInItem,
        } as LiProps;
    }) : [];
    restProps['classes'] = initialize(
        props['classes'], [], getCssFramework().getDefaultStyleClass(
            component, element
        )
    );
    restProps['attributes'] = initialize(
        props['attributes'], {}, getCssFramework().getDefaultAdditionalAttributes(
            component, element,
        )
    )

    return (
        <Fragment>
            <List
                {...restProps}
                element={element}
                items={menus}
                noDefaultClass={true}
            />
        </Fragment>
    );
};
