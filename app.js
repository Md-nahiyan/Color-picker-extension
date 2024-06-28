
// SELECTORS
// MAKE PICK COLOR BUTTON FUNCTIONAL
//MAKE COPY COLOR FUNCTIONAL
//SHOW COLOR ON THE FOM
// CLEAR BUTTON TO CLEAR ALL THE PREVIER
// LOCAL STORAGE

const colorPicker = document.getElementById("color-picker");
const colorList = document.querySelector(".all-colors");
const clearAll = document.querySelector(".clear-all");
// let allColors = [];

let allColors = JSON.parse(localStorage.getItem("links") || "[]");


// if (allColors) {
//     allColors = allColors;
//     showColor(allLinks);
// }


// const copyColor  = (elm) => {
//     let allColor = elm.dataset.color;
//     console.log(allColor);
//     navigator.clipboard.writeText(allColor);
//     elm.innerText = "Copied";
//     setTimeout( () => (elm.innerText = allColor), 1000);
// }


// step-6 //
const showColor = (arr)=>{
    colorList.innerHTML = ""
    if (!allColors.length) {
        return;
    }
    arr.forEach( item => {
        colorList.innerHTML += `
            <li class="color">
                <span class="rect" style="background-color:${item}"></span>
                <span class="value hex">${item}</span>
            </li>
        `
    });

    document.querySelector(".picked-colors").classList.remove("hide");

    // step-7 copy color//

    const colors = document.querySelectorAll(".color");
    colors.forEach( li => {
        li.addEventListener("click", (e)=> {
            // copyColor(e.currentTarget.lastElementChild)
            // console.log(e.currentTarget.lastElementChild)
            let allColor = e.target.innerText;
            // console.log(allColor);
            navigator.clipboard.writeText(allColor);
            e.target.innerText = "Copied";
            setTimeout( () => (e.target.innerText = allColor), 1000);
        })
    })
}

const activeEyeDropper = async ()=> {
    try {
        const eyeDroper = new EyeDropper();

        const {sRGBHex} = await eyeDroper.open();
        navigator.clipboard.writeText(sRGBHex);

        allColors.push(sRGBHex);
        localStorage.setItem("links", JSON.stringify(allColors))
        showColor(allColors);
        
    } catch (error) {
        alert("failed");
    }
}

const clearList = ()=> {
    allColors.length = 0;
    localStorage.setItem("all-colors", JSON.stringify(allColors))
    document.querySelector(".picked-colors").classList.add("hide");

}

colorPicker.addEventListener("click", activeEyeDropper);
clearAll.addEventListener("click", clearList);
// console.log(clearList)
showColor(allColors);

