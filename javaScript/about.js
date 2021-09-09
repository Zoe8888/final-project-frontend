document.querySelector('.profile-container').addEventListener('mouseover', () => {
    document.querySelector('.profile-menu').classList.remove('hideMenu')
})

document.querySelector('.profile-container').addEventListener('mouseleave', () => {
    document.querySelector('.profile-menu').classList.add('hideMenu')
})