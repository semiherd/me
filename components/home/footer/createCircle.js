function createCircle({id,className,attributes}){
    const circleItem= createDOMElement({
        type: 'span',
        attributes:{
            id,
            class: `circle ${className}`,
            ...attributes
        }
    });
    return circleItem;
}