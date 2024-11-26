function handleBoxClick(e) {
    console.log("Box clicked", e.target);


    if (e.target.classList.contains("blue-box")) {
        e.target.classList.remove("blue-box")
        e.target.classList.add("red-box")
    } else {
        e.target.classList.remove("red-box")
        e.target.classList.add("blue-box")
    }
}