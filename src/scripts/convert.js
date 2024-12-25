export function binToDec(bin) {
    let binDigits = String(bin).split("");
    binDigits.reverse();
    let dec = 0;
    for (let i = binDigits.length - 1; i >= 0; i--) {
        dec += binDigits[i] * 2 ** i
    }
    return dec;
}
// console.log(binToDec("100101010101000101010100"));

export function decToBin(dec, prefix = "") {
    let bin = [];
    while (dec !== 0) {
        let remainder = dec % 2;
        bin.unshift(remainder)
        dec = Math.floor(dec / 2);
    }
    bin = `${prefix}${bin.join("")}`;
    return bin
}
// console.log(decToBin(181));

// convertBtn.addEventListener("click", () =>{
//     let from = fromInput.value;
//     let to = toInput.value;

//     let num = input.value;
//     let converted = null;

//     if(from === to) converted = num;

//     if(from === "bin" && to === "dec") converted = binToDec(num); 
//     if(from === "dec" && to === "bin") converted = decToBin(num); 

//     output.value = converted;
// });