function renderMyPhoto(){
    
    const profilePhoto= ImageItem({
        id: 'profile-image',
        src: 'assets/photo/semih.jpeg',
        attributes:{
            alt: `my-photo`,
            class: 'profile-photo',
            width: '80%',
            height: '80%'
        }
    });
    return profilePhoto;
}