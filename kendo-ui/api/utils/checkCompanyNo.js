// 檢查 公司的統一編號
/*
* 規則 : 正確的統編總共有8位，最後一位是檢查碼，
*       前面七位數，1、3、5不做換算，
*       2、4、6位依123456789換成246813579，
*       第七位依123456789換成483726159，
*       最後七位加總起來再加第八位數，應該會是10的倍數。
* */
function isValidGUI(taxId) {
    const invalidList = "00000000,11111111";

    // 8位數字
    if (/^\d{8}$/.test(taxId) === false) return false;

    // 全 1 或 全 0
    if (invalidList.indexOf(taxId) !== -1) return false;

    let validateOperator = [1, 2, 1, 2, 1, 2, 4, 1],
        sum = 0,
        calculate = function (product) { // 個位數 + 十位數
            let ones = product % 10,
                tens = (product - ones) / 10;
            return ones + tens;
        };

    for (let i = 0; i < validateOperator.length; i++) {
        sum += calculate(taxId[i] * validateOperator[i]);
    }

    return sum % 10 === 0 || (taxId[6] === "7" && (sum + 1) % 10 === 0);
}

let test1 = '54900838';
let test2 = '80115665';

console.log('test1=',isValidGUI(test1));
console.log('test2=',isValidGUI(test2));
