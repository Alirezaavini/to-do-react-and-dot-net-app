import i18next from 'i18next';
import React, { CSSProperties, ReactNode } from 'react';
import { useT } from '../../i18n';
import { code } from './code';

const getHilightTexts = () => code.getCookie('hilightTexts') == '1';

export const toggleHilightTexts = () => {
    code.setCookie('hilightTexts', getHilightTexts() ? '0' : '1');
    window.location.reload();
};

type TProps = {
    className?: string;
    style?: CSSProperties;
    width?: number | string;
    minWidth?: number | string;
    maxWidth?: number | string;
    as?: string;
    params?: any[];
    append?: ReactNode;
    prepend?: ReactNode;
    children: any;
    [x: string]: any;
};

export const T = ({ className, style, width, minWidth, maxWidth, as = 'span', params, append, prepend, children, ...props }: TProps) => {
    if (children && Array.isArray(children) && children.length === 1 && typeof children[0] === 'string') {
        children = children[0];
    }

    style = { ...style, width, minWidth, maxWidth };

    let input = children;
    if (!input || typeof children !== 'string') {
        input = undefined;
    }
    if (!params) params = props as any;

    const { t } = useT();
    let text = translate(children, params, t);
    if (append)
        text = (
            <>
                <span className="m-e-1">{text}</span>
                {append}
            </>
        );
    if (prepend)
        text = (
            <>
                {translate(prepend, params, t)} <span className="m-s-1">{text}</span>
            </>
        );
    if (!as) as = 'span';
    if (getHilightTexts()) className = ((className ?? '') + ' box-warning border border-secondary m-1').trim();
    return React.createElement(
        as,
        {
            ...props,
            className,
            style,
            'data-code': input,
            'data-type': typeof children,
        },
        text
    );
};

function findEndOfParameter(s: any, pos: number) {
    for (let i = pos; i < s.length; i++) {
        const c = s[i];
        var is_valid = c === '_' || (c >= '0' && c <= '9') || (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');
        if (!is_valid) return i;
    }
    return s.length;
}

function canTranslate(value: string) {
    if (!value) return false;
    return [...value].map((x) => x.charCodeAt(0)).every((x) => x < 128 && x != 32);
}

export function translate(value: any, props?: any, trans?: any) {
    const t = (s: any) => (trans ? trans(s) : i18next.t(s, { ns: 'common' }));
    if (!value || value === ' ') return value;
    if (typeof value !== 'string') return value;
    if (!canTranslate(value)) return value;

    if (!props) props = {};
    const s = t(value);

    if (!s) return s;

    let pos = 0;
    let i = s.indexOf('@', pos);
    let text = i >= 0 ? '' : s;
    if (i >= 0) {
        while (i >= 0 && i < s.length) {
            const i2 = findEndOfParameter(s, i + 1);
            const p_name = s.substr(i + 1, i2 - i - 1);
            const p_value = props[p_name];
            text += s.substr(pos, i - pos) + (code.localNumbers(p_value) ?? `@${p_name}`);
            pos = i2;
            i = s.indexOf('@', pos);
        }
        if (pos < s.length) text += s.substr(pos, s.length - pos);
    }
    return text;
}

export const TOptGroup = ({ labelCode, children, ...props }: any) => {
    if (labelCode) {
        props['label'] = translate(labelCode);
        props['data-code'] = labelCode;
    }
    return <optgroup {...props}>{children}</optgroup>;
};

export const TOption = ({ children, ...props }: any) => {
    if (typeof (children !== 'string')) return <option {...props}>{children}</option>;
    return (
        <option {...props} data-code={children}>
            {translate(children)}
        </option>
    );
};

export const Text = T;
