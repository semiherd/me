function createImage({ src, attributes }){     
    const imageElm = new Image();
    imageElm.src = src;
    imageElm.onload= () => {
        if(attributes.class){
            imageElm.classList.add(attributes.class);
        }
        if (attributes) {
            Object.entries(attributes).forEach(([key, value]) => {
                if (key.indexOf("on") === 0) {
                    imageElm.addEventListener(key.substring(2), value);
                } else {
                    imageElm.setAttribute(key, value);
                }
            });
        };
    }
    return imageElm;
}
function ImageItem({id,src,attributes}){
	let self={
		id,
		src,
		attributes,
        elm: null
	};
    self.elm= createImage({src: self.src, attributes: self.attributes })
    return Object.assign(
		self
	)
}

const calculateAspectRatioFit= function (srcWidth, srcHeight, maxWidth, maxHeight) {
    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    var rtnWidth = srcWidth * ratio;
    var rtnHeight = srcHeight * ratio;
    return {
        width: rtnWidth,
        height: rtnHeight
    };
}

const renderImages= (list,attributes) => {
    let icons=[];
    if(list){
        list.forEach((item,_) => {
            const newTLogo= ImageItem({
                id: item.id,
                src: item.path,
                attributes:{
                    ...attributes,
                    alt: `${attributes.alt? attributes.alt :''} ${item.id}`,
                }
            });
            icons.push(newTLogo)    
        })
        return icons.map(i => i.elm);
    }else return []
}