const DropShape= ({id,content,attributes}) => {
    const element= createDOMElement({
        type: 'div',
        attributes: {
            id,
            class: 'shape-drop',
            style:`
                --top: ${attributes.top};
                --left: ${attributes.left};
                --width: ${attributes.width};
                --height: ${attributes.height};
                --background-color: ${attributes.backgroundColor};
                --border-color: ${attributes.borderColor};
                --border-width: ${attributes.borderWidth};
                --opacity: ${attributes.opacity};
                --bf-bg-cl: ${attributes.bfbgcl};
                --af-bg-cl: ${attributes.afbgcl};
            `
        }
    })
    const title= createDOMElement({
        type: 'h1',attributes: { class: content.className },text: content.label
    })
    const contentContainer= createDOMElement({
        type: 'div',
        attributes:{ 
            id: `${id}-drop-content`, 
            class:'shape-drop_content', 
            'data-text': content.text 
        }
    })

    contentContainer.append(title);
    element.append(contentContainer);

    return element
}
