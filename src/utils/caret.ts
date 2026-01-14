/**
 * Utility to get caret coordinates in a textarea
 * Based on basic mirror div technique
 */
export function getCaretCoordinates(element: HTMLTextAreaElement, position: number) {
    const properties = [
        'direction',
        'boxSizing',
        'width',
        'height',
        'overflowX',
        'overflowY',
        'borderTopWidth',
        'borderRightWidth',
        'borderBottomWidth',
        'borderLeftWidth',
        'paddingTop',
        'paddingRight',
        'paddingBottom',
        'paddingLeft',
        'fontStyle',
        'fontVariant',
        'fontWeight',
        'fontStretch',
        'fontSize',
        'fontSizeAdjust',
        'lineHeight',
        'fontFamily',
        'textAlign',
        'textTransform',
        'textIndent',
        'textDecoration',
        'letterSpacing',
        'wordSpacing',
        'tabSize',
        'MozTabSize',
    ];

    const div = document.createElement('div');
    div.id = 'input-textarea-caret-position-mirror-div';
    document.body.appendChild(div);

    const style = div.style;
    const computed = window.getComputedStyle(element);

    style.whiteSpace = 'pre-wrap';
    if (element.nodeName !== 'INPUT')
        style.wordWrap = 'break-word';

    style.position = 'absolute';
    style.visibility = 'hidden';

    properties.forEach((prop: any) => {
        style[prop] = computed[prop];
    });

    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        if (element.scrollHeight > parseInt(computed.height))
            style.overflowY = 'scroll';
    } else {
        style.overflow = 'hidden';
    }

    div.textContent = element.value.substring(0, position);

    if (element.nodeName === 'INPUT')
        div.textContent = div.textContent.replace(/\s/g, '\u00a0');

    const span = document.createElement('span');
    span.textContent = element.value.substring(position) || '.';
    div.appendChild(span);

    const coordinates = {
        top: span.offsetTop + parseInt(computed['borderTopWidth']),
        left: span.offsetLeft + parseInt(computed['borderLeftWidth']),
        height: parseInt(computed['lineHeight'])
    };

    document.body.removeChild(div);

    return coordinates;
}
