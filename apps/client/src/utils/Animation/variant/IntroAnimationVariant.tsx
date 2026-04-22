export const HeaderVariant = {
    initial: {
        y: -100
    },
    animate: {
        y: 0
    },
}

export const LoginContainerVariant = {
    initial: {
        x: -100
    },
    animate: {
        x: 0
    },
}

export const TextScaleVariant = {
    initial: {
        scale: 0
    },
    animate: {
        scale: 1
    }
}

export const LinkVariant = {
    hover: {
        y: "-2px",
        // background: "var(--color-primary)",
        borderBottom: '2px solid var(--color-brand-hover)',
        borderBottomHeight:  10,
        color: 'var(--color-primary)'
    },
    tap: {
        scale: .8
    }
}