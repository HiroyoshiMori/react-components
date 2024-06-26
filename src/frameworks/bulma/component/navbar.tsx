import React, {
    AnchorHTMLAttributes,
    Fragment, HTMLAttributes,
} from "react";
import {
    NavbarBrandProps,
    NavbarDividerProps,
    NavbarDropdownProps,
    NavbarItemProps,
    NavbarMenuProps,
    NavbarProps
} from "../@types";
import {
    AProps,
    Break,
    Button,
    Buttons,
    ButtonsProps,
    Container, DivProps,
    getCssFramework,
    HrProps,
    initialize,
    Media, NavProps, SpanProps
} from "../index";
import {generateId} from "../../../utils";

export const Navbar = (props: NavbarProps) => {
    const {
        component = 'navbar',
        element = 'nav',
        brand,
        menu,
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
    if (menu && menu.id === undefined) {
        menu.id = generateId();
    }
    if (brand && brand.burger) {
        brand.burger.datasets = brand.burger.datasets ?? new Map();
        if (menu?.id && !brand.burger.datasets?.has('target')) {
            brand.burger.datasets.set('target', menu.id);
        }
    }

    return (
        <Fragment>
            <Container<NavProps>
                {...restProps}
                element={element}
            >
                { brand ? <NavbarBrand {...brand} /> : <Fragment /> }
                { menu ? <NavbarMenu {...menu} /> : <Fragment /> }
            </Container>
        </Fragment>
    );
};

export const NavbarBrand = (props: NavbarBrandProps) => {
    const {
        component = 'navbar-brand',
        element = 'div',
        item,
        burger,
        ...restProps
    } = props;

    // Initialize and set default class if not exits
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
    if (burger && burger.onClick === undefined) {
        const isActiveClasses = getCssFramework().getDefaultStyleClass(
            'modal', element, 'is-active'
        );
        burger.onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            const menuId = e.currentTarget.dataset.target;
            const burger = e.currentTarget;
            if (menuId) {
                const el = document.getElementById(menuId);
                if (el) {
                    isActiveClasses && isActiveClasses.forEach((itemClass: string) => {
                        burger.classList.toggle(itemClass);
                        el.classList.toggle(itemClass);
                    });
                }
            }
        };
        burger.onBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
            const menuId = e.currentTarget.dataset.target;
            const burger = e.currentTarget;
            if (menuId) {
                const el = document.getElementById(menuId);
                if (el) {
                    isActiveClasses && isActiveClasses.forEach((itemClass: string) => {
                        burger.classList.remove(itemClass);
                        el.classList.remove(itemClass);
                    });
                }
            }
        };
    }

    return (
        <Fragment>
            <Container<DivProps>
                {...restProps}
                element={element}
            >
                {
                    item ? function() {
                        const {
                            element = 'a',
                            children,
                            ...itemProps
                        } = item;
                        itemProps['classes'] = initialize(
                            item['classes'], [], getCssFramework().getDefaultStyleClass(
                                component, element, 'item'
                            )
                        );
                        itemProps['attributes'] = initialize(
                            item['attributes'], {}, getCssFramework().getDefaultAdditionalAttributes(
                                component, element, 'item'
                            )
                        );
                        return (
                            <Fragment>
                                <Container<AProps>
                                    {...itemProps}
                                    element={element}
                                >
                                    <Media {...children} />
                                </Container>
                            </Fragment>
                        );
                    }() : <Fragment />
                }
                {
                    burger ? function() {
                        const {
                            element = 'button',
                            ...burgerProps
                        } = burger;
                        burgerProps['classes'] = initialize(
                            burger['classes'], [], getCssFramework().getDefaultStyleClass(
                                component, 'a', 'burger',
                            )
                        );
                        burgerProps['attributes'] = initialize(
                            burger['attributes'], {}, getCssFramework().getDefaultAdditionalAttributes(
                                component, 'a', 'burger'
                            )
                        );
                        return (
                            <Fragment>
                                <Button
                                    {...burgerProps}
                                    element={element}
                                >
                                    <Container<SpanProps> element={'span'} aria-hidden={'true'} />
                                    <Container<SpanProps> element={'span'} aria-hidden={'true'} />
                                    <Container<SpanProps> element={'span'} aria-hidden={'true'} />
                                </Button>
                            </Fragment>
                        );
                    }() : <Fragment />
                }
            </Container>
        </Fragment>
    );
};

export const NavbarMenu = (props: NavbarMenuProps) => {
    const {
        component = 'navbar-menu',
        element = 'div',
        start,
        end,
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
    restProps.id = restProps.id ?? generateId();

    const startClasses = initialize(
        [] as string[], [], getCssFramework().getDefaultStyleClass(
            component, 'div', 'start'
        )
    );
    const startAttributes = initialize(
        {} as HTMLAttributes<HTMLDivElement>, {}, getCssFramework().getDefaultAdditionalAttributes(
            component, 'div', 'start'
        )
    );
    const endClasses = initialize(
        [] as string[], [], getCssFramework().getDefaultStyleClass(
            component, 'div', 'end'
        )
    );
    const endAttributes = initialize(
        {} as HTMLAttributes<HTMLDivElement>, {}, getCssFramework().getDefaultAdditionalAttributes(
            component, 'div', 'end'
        )
    );

    return (
        <Fragment>
            <Container<DivProps>
                {...restProps}
                element={element}
            >
                {
                    start ? (
                        <Container<DivProps>
                            element={'div'}
                            classes={startClasses}
                            attributes={startAttributes}
                        >
                            <NavbarItems item={start} />
                        </Container>
                    ) : <Fragment />
                }
                {
                    end ? (
                        <Container<DivProps>
                            element={'div'}
                            classes={endClasses}
                            attributes={endAttributes}
                        >
                            <NavbarItems item={end} />
                        </Container>
                    ) : <Fragment />
                }
            </Container>
        </Fragment>
    );
};

export const NavbarItems = (props: {item: NavbarItemProps | NavbarItemProps[]}) => {
    const {item} = props;
    const items = Array.isArray(item)
        ? item : [item];
    return (
        <Fragment>
            {
                items && items.length > 0 && items.map((item: NavbarItemProps, idx: number) => (
                    <NavbarItem key={idx} {...item} />
                ))
            }
        </Fragment>
    )
}

export const NavbarItem = (props: NavbarItemProps) => {
    const {
        component = 'navbar-item',
        ...restProps
    } = props;

    // Initialize and set default class if not exists
    restProps['classes'] = initialize(
        props['classes'], [], getCssFramework().getDefaultStyleClass(
            component, restProps.element, Object.hasOwn(restProps, 'hasDropdown') ? 'hasDropdown' : undefined
        )
    );
    restProps['attributes'] = initialize(
        props['attributes'], {}, getCssFramework().getDefaultAdditionalAttributes(
            component, restProps.element, Object.hasOwn(restProps, 'hasDropdown') ? 'hasDropdown' : undefined
        )
    );

    return (
        <Fragment>
            {
                Object.hasOwn(restProps, 'hasDropdown') ? (
                    <NavbarItemDropdown {...restProps as NavbarDropdownProps} />
                ) : restProps.element === 'div' ? (
                    <Buttons {...restProps as ButtonsProps} />
                ) : (
                    <Container<AProps>
                        {...restProps as AProps}
                    >
                        {(restProps as AProps).children}
                    </Container>
                )
            }
        </Fragment>
    );
};

export const NavbarItemDropdown = (props: NavbarDropdownProps) => {
    const {
        component = 'navbar-item',
        element = 'div',
        hasDropdown: _,
        label,
        items = [],
        ...restProps
    } = props;

    // Initialize and set default class if not exists
    const dropdowns = Array.isArray(items)
        ? items : [items];
    restProps['classes'] = initialize(
        props['classes'], [], getCssFramework().getDefaultStyleClass(
            component, element, 'has-dropdown'
        )
    );
    restProps['attributes'] = initialize(
        props['attributes'], {}, getCssFramework().getDefaultAdditionalAttributes(
            component, element, 'has-dropdown'
        )
    );
    label['classes'] = initialize(
        label['classes'], [], getCssFramework().getDefaultStyleClass(
            'navbar-link', 'a'
        )
    );
    label['attributes'] = initialize(
        label['attributes'], {}, getCssFramework().getDefaultAdditionalAttributes(
            'navbar-link', 'a'
        )
    );
    const dropdownClasses = initialize(
        [] as string[], [], getCssFramework().getDefaultStyleClass(
            'navbar-dropdown', 'div'
        )
    );
    const dropdownAttributes = initialize(
        {} as HTMLAttributes<HTMLDivElement>, {}, getCssFramework().getDefaultAdditionalAttributes(
            'navbar-dropdown', 'div'
        )
    );

    return (
        <Fragment>
            <Container<DivProps>
                {...restProps}
                element={element}
            >
                <Container<AProps> {...label}></Container>
                {
                    dropdowns && dropdowns.length > 0 ? (
                        <Container<DivProps>
                            element={'div'}
                            classes={dropdownClasses}
                            attributes={dropdownAttributes}
                        >
                            {
                                dropdowns.map((item: AProps | NavbarDividerProps, idx: number) => {
                                    const {
                                        element = 'a',
                                        ...itemProps
                                    } = item;
                                    itemProps['classes'] = initialize(
                                        itemProps['classes'], [], getCssFramework().getDefaultStyleClass(
                                            component, element
                                        )
                                    );
                                    itemProps['attributes'] = initialize(
                                        itemProps['attributes'], {}, getCssFramework().getDefaultAdditionalAttributes(
                                            component, element
                                        )
                                    )
                                    return (
                                        <Fragment key={idx}>
                                            {
                                                element === 'hr' ? (
                                                    <Break<HrProps>
                                                        {...item as HrProps}
                                                        classes={itemProps['classes']}
                                                        attributes={itemProps['attributes'] as HTMLAttributes<HTMLHRElement>}
                                                    />
                                                ) : (
                                                    <Container<AProps>
                                                        {...item as AProps}
                                                        classes={itemProps['classes']}
                                                        attributes={itemProps['attributes'] as AnchorHTMLAttributes<HTMLAnchorElement>}
                                                    >
                                                        {item.children}
                                                    </Container>
                                                )
                                            }
                                        </Fragment>
                                    )
                                })
                            }
                        </Container>
                    ) : <Fragment />
                }
            </Container>
        </Fragment>
    );
};
