function renderSocialMedia(parent){
    const socialMediaWrapper= createDOMElement({
        type: 'div',
        attributes: {
            class: 'social-images'
        }
    });
    const socialMediaList= createDOMElement({type:'ul'});
    mySocialMedia.forEach((item,index) => {
        const styling= `
            --id: ${index}
            --background-image: ${item.image};
            --clr: ${item.color};
            --logo: ${item.url}
        `
        const socialIcon= ImageItem({
            id: 'socia-icon',
            src: item.image,
            attributes:{
                alt: item.id,
                class: 'social-media-icon',
                width: '16%',
                height: '24%'
            }
        });
        const smItem= createDOMElement({type: 'li',attributes:{ class: 'social-media-box','data-name': item.id, style: styling}})
        const anchorElmSM= createDOMElement({type: 'a',attributes:{href: item.url, target: '_blank'}})
        const spanText= createDOMElement({type:'span',text:item.id});
        anchorElmSM.append(socialIcon.elm);
        anchorElmSM.append(spanText);
        smItem.append(anchorElmSM);
        socialMediaList.append(smItem);
    })
    socialMediaWrapper.append(socialMediaList);
    parent.append(socialMediaWrapper); 
}