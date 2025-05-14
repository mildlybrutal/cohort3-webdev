function waitFor3S(resolve) {
    setTimeout(resolve, 3000);
    console.log("Inside promise");
}

function main() {
    console.log("main is called");
}

waitFor3S(main);
console.log("Done")
