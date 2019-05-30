
// //toggle gold bar
// const toggleMenu = (e, identifier, goldBarMobile) => {
//     e = e.target
//     const expanded = e.getAttribute('aria-expanded') === "false" ? true : false
//     e.setAttribute('aria-expanded', expanded)

//     const el = document.querySelector(identifier)
//     const currAttr = (window.getComputedStyle ? getComputedStyle(el, null) : el.currentStyle).display
//     if (currAttr && currAttr === 'flex') {
//         el.removeAttribute('style')
//     } else {
//         el.style.display = 'flex'
//     }

//     if (goldBarMobile) {
//         let height = (window.getComputedStyle ? getComputedStyle(el, null) : el.currentStyle).maxHeight
//         if (height === '48px') {
//             el.style.maxHeight = '900px'
//         } else if (height == '900px') {
//             el.style.maxHeight = height === '48px'
//         }
//         setTimeout(() => {
//             height = (window.getComputedStyle ? getComputedStyle(el, null) : el.currentStyle).maxHeight
//         }, 1000)
//     }
// }
// document.querySelector(".header__goldBar--inner>button").addEventListener('click', (e) => { toggleMenu(e, `.header__goldBar--inner`, true) })
// document.querySelector(".header__goldBar__findInfoFor>button").addEventListener('click', (e) => { toggleMenu(e, `#findInfoFor`, true) })
// //toggle function

// const toggle = (e) => {
//     let clicked = e.currentTarget
//     const className = (term) => {
//         return clicked.classList.contains(term);
//     }
//     switch (true) {
//         case className('dropdown-button'):
//             const dropTarget = clicked.parentNode.children[1]
//             if (dropTarget.classList[0] !== 'header__mainNav--dropdownInner') {
//                 const outerDropdowns = document.querySelectorAll('.header__mainNav--dropdownOuter')
//                 const innerDropdowns = document.querySelectorAll('.header__mainNav--dropdownInner')
//                 const dropdowns = [...outerDropdowns, ...innerDropdowns]
//                 for (const dropdown of dropdowns) {
//                     if (dropdown !== dropTarget) {
//                         dropdown.removeAttribute('style')
//                     }
//                 }
//             } else if (dropTarget.classList[0] === 'header__mainNav--dropdownInner') {
//                 const innerDropdowns = document.querySelectorAll('.header__mainNav--dropdownInner')
//                 for (const dropdown of innerDropdowns) {
//                     if (dropdown !== dropTarget) {
//                         dropdown.removeAttribute('style')
//                     }
//                 }
//             }
//             let display = (window.getComputedStyle ? getComputedStyle(dropTarget, null) : dropTarget.currentStyle).display
//             if (display === "flex") {
//                 dropTarget.removeAttribute('style')
//             } else {
//                 dropTarget.style.display = 'flex'
//             }
//             break

//         default:
//             switch (clicked.id) {
//                 case "mainNavMo":
//                     console.log('clicked')
//                     const dropTarget = clicked.parentNode.children[1]
//                     let height = (window.getComputedStyle ? getComputedStyle(dropTarget, null) : dropTarget.currentStyle).maxHeight
//                     if (height === '0px') {
//                         dropTarget.style.maxHeight = '1900px'
//                     } else if (height !== '0px') {
//                         dropTarget.style.maxHeight = '0px'
//                     }
//                     break
//                 default:
//                     break
//             }
//             break
//     }
//     const dropTarget = e.target.parentNode.children[1]
// }

// //Toggle drop-downs on the top nav bar
// const navDropdowns = document.querySelectorAll(`.dropdown-button`)

// for (const dropdown of navDropdowns) {
//     dropdown.addEventListener('click', (e) => { toggle(e) })
// }

// document.addEventListener('click', (e) => {
//     if (e.target.tagName !== "A" && e.target.tagName !== "BUTTON") {
//         const outerDropdowns = document.querySelectorAll('.header__mainNav--dropdownOuter')
//         const innerDropdowns = document.querySelectorAll('.header__mainNav--dropdownInner')
//         const dropdowns = [...outerDropdowns, ...innerDropdowns]
//         for (const dropTarget of dropdowns) {
//             dropTarget.removeAttribute('style')
//         }
//     }
// })

// document.querySelector('#mainNavMo').addEventListener('click', (e) => { toggle(e) })

// const reset = (oldWidth) => {
//     const footerHeadings = document.querySelectorAll(".footer__resources--column>h3>button.accordion__heading--footer");
//     const width = document.body.clientWidth;
//     const goldBarDisplay = document.querySelector(".header__goldBar--menus")
//     const goldBarHeight = document.querySelector(".header__goldBar--inner")
//     const findInfoFor = document.querySelector("#findInfoFor")

//     if (width > 768) {
//         goldBarDisplay.removeAttribute('style')
//         goldBarHeight.removeAttribute('style')
//         document.querySelector('.header__mainNav--main').removeAttribute('style')
//     } else {
//         findInfoFor.removeAttribute('style')
//     }
// }

// window.addEventListener('resize', () => {
//     reset(width);
//     let timer;
//     clearInterval(timer);
//     timer = setTimeout(() => {
//         width = document.body.clientWidth
//     }, 250);
// });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Below are functions used for footer

//toggle function
const toggleNew = (e) => {
    let clicked = e
    const checkClassName = (el, term) => {
        return el.classList && el.classList.contains(term);
    }
    const checkElement = (el, selector) => {
        return el === document.querySelector(selector)
    }
    const getCurrDisplay = (el) => {
        return window.getComputedStyle(el).getPropertyValue('display')
    }
    switch (true) {
        case checkClassName(clicked, 'accordion__heading'): // specifically footer accordion
            const expanded = clicked.getAttribute('aria-expanded') === "false" ? true : false;
            clicked.setAttribute('aria-expanded', expanded);
            const contentId = clicked.getAttribute('aria-controls');

            
            let icons = clicked.querySelectorAll('svg');
            const content = document.querySelector('#' + contentId);
            const currAttr = getCurrDisplay(content)
            if (currAttr && currAttr === 'flex' && content.getAttribute('state-animating') === null) {
                icons.forEach((icon) => {
                    swapIcon(icon)
                })
                content.style.height = 0;
                content.setAttribute('state-animating', 'true')
                setTimeout(() => {
                    hide(content)
                    content.removeAttribute('state-animating')
                }, 200)
            } else if(content.getAttribute('state-animating') === null) {
                icons.forEach((icon) => {
                    swapIcon(icon)
                })
                show(content);
                content.setAttribute('state-animating', 'true')
                setTimeout(() => {
                    content.removeAttribute('state-animating')
                }, 200)
                content.style.height = content.scrollHeight+"px";
            }
            break
        case  checkClassName(clicked, 'header__goldBar--moButton'): // specifically gold bar mobile menu
            const goldBarContent = document.querySelector('.header__goldBar--menus')
            const goldBarContainer = document.querySelector('.header__goldBar--inner')
            const currGoldBarAttr = getCurrDisplay(goldBarContent)

            if (currGoldBarAttr && currGoldBarAttr === 'flex' && goldBarContent.getAttribute('state-animating') === null) {
                goldBarContainer.style.height = 0;
                goldBarContent.setAttribute('state-animating', 'true')
                setTimeout(() => {
                    hide(goldBarContent)
                    goldBarContent.removeAttribute('state-animating')
                    goldBarContent.style.height = 0;
                }, 200)
            } else if(goldBarContent.getAttribute('state-animating') === null) {
                const goldBarHeight = parseInt(goldBarContainer.scrollHeight)
                show(goldBarContent);
                goldBarContent.style.height = `${goldBarContent.scrollHeight}px`
                goldBarContainer.style.height = `${(parseInt(goldBarContent.style.height) + goldBarHeight + 6).toString()}px`
                goldBarContent.setAttribute('state-animating', 'true')
                setTimeout(() => {
                    goldBarContent.removeAttribute('state-animating')
                }, 200)
            }

            break
        case checkElement(clicked, '.header__goldBar__findInfoFor button'): // specifically find info for button
            const menu = document.querySelector('#findInfoFor')
            const currDisplayVal = getCurrDisplay(menu)
            const allDropdowns = [...document.querySelectorAll('.header__mainNav--dropdownOuter'), ...document.querySelectorAll('.header__mainNav--dropdownInner')]
            allDropdowns.map((checkDropdown) => {
                if (checkDropdown !== dropdown) {
                    hide(checkDropdown)
                }
            })
            if (currDisplayVal !== 'none') {
                hide(menu)
            } else {
                show(menu)
            }
            break
        case checkClassName(clicked, 'dropdown-button'):
            const dropdown = clicked.nextElementSibling
            const findInfoForMenu = document.querySelector('#findInfoFor')
            hide(findInfoForMenu)
            if(checkClassName(dropdown, 'header__mainNav--dropdownInner')) {
                const allInnerDropdowns = [...document.querySelectorAll('.header__mainNav--dropdownInner')]
                allInnerDropdowns.map((innerDropdown) => {
                    if (innerDropdown !== dropdown) {
                        hide(innerDropdown)
                    }
                })
            } else {
                const allDropdowns = [...document.querySelectorAll('.header__mainNav--dropdownOuter'), ...document.querySelectorAll('.header__mainNav--dropdownInner')]
                allDropdowns.map((checkDropdown) => {
                    if (checkDropdown !== dropdown) {
                        hide(checkDropdown)
                    }
                })
            }
            const dropdownDisplayVal = getCurrDisplay(dropdown)
            if (dropdownDisplayVal !== 'none') {
                hide(dropdown)
            } else {
                show(dropdown)
            }
            break
        default:
            console.log('ran default')
            const allDropdownsDefault = [...document.querySelectorAll('.header__mainNav--dropdownInner'), ...document.querySelectorAll('.header__mainNav--dropdownOuter'), document.querySelector('#findInfoFor')]
            allDropdownsDefault.map((dropdown) => {
                hide(dropdown)
            })

            break
    }
}
// Hide an element
const hide = function (elem) {
    elem.classList.add('hide');
    elem.classList.remove('show');
};
// show an element
const show = function (elem) {
    elem.classList.add('show');
    elem.classList.remove('hide');
};
//Reset visibility
const resetStyles = function (elems) {
    for (const elem of elems) {
        elem.classList.remove('hide', 'show');
        elem.removeAttribute('style');
    }
};
//Change element display
const swapIcon = (el) => {
    const currAttr = window.getComputedStyle(el).getPropertyValue('display');
    if (currAttr && currAttr === 'block') {
        hide(el);
    } else {
        show(el);
    }
}
//Collapse footer  and show icon at the beginning on small screen
const width = document.body.clientWidth;
document.querySelectorAll('.accordion__heading--footer').forEach((el) => {
    if (width < 768) {
       el.setAttribute('aria-expanded', false);
    }
});
document.querySelectorAll('.accordion__content--footer').forEach((el) => {
    if (width < 768) {
        hide(el);
        el.setAttribute('data-collapsed', true);
    }
});
document.querySelectorAll('.accordion__heading--footer>svg.fa-plus').forEach((el) => {
    if (width < 768) {
        show(el)
    }
});
document.querySelectorAll('.accordion__heading--footer>svg.fa-minus').forEach((el) => {
    if (width < 768) {
        hide(el)
    }
});

//Reset
window.addEventListener('resize', () => {
    var width = document.body.clientWidth;

    const resetLg = [...document.querySelectorAll('.footer__resources--column>h3>button>svg'), ...document.querySelectorAll('.accordion__content--footer'), document.querySelector('.header__goldBar--menus'), document.querySelector('.header__goldBar--inner'), document.querySelector('#findInfoFor')]

    const resetSm = [document.querySelector('#findInfoFor')]

    if( width >= 768) {
        resetStyles(resetLg)
    } else if (width < 768) {
        resetStyles(resetSm)
    }

    document.querySelectorAll('.accordion__heading--footer').forEach((el) => {
        let content = document.querySelector('#' + el.getAttribute('aria-controls'));
        const currAttr = window.getComputedStyle(content).getPropertyValue('display');
        if (width >= 768) {
           el.setAttribute('aria-expanded', true);
        }else if(currAttr === "block"){
            el.setAttribute('aria-expanded', true);
        }else{
            el.setAttribute('aria-expanded', false);
        }
    });
});

const assignListeners = () => {
    document.addEventListener('click', (e) => {
        e = e.target
        if (e.classList && e.classList.contains('accordion__heading')) {
            let width = document.body.clientWidth;
            if (width < 768) {
                toggleNew(e);
            }
        } else if (
            e.classList && (
                (
                    e.classList.contains('header__goldBar--moButton') || 
                    e.classList.contains('dropdown-button')
                ) || 
                e === document.querySelector('.header__goldBar__findInfoFor button')
            )
        ) {
            toggleNew(e)
        } else {
            toggleNew(e)
        }
    })
}

assignListeners()