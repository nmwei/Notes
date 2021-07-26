var invoices = require('./invoices');
var plays = require('./plays');

//账单
function statement (invoice, plays) {
    let totalAmount = 0; //总金额
    let result = `Statement for ${invoice.customer}\n`;
    for (let perf of invoice.performances) {
        // print line for this order
        result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`;
        totalAmount += amountFor(perf);
    }

    let volumeCredits = 0; //总积分
    for (let perf of invoice.performances) {
        volumeCredits += volumeCreditsFor(perf);
    }
    result += `Amount owed is ${usd(totalAmount)}\n`;
    result += `You earned ${volumeCredits} credits\n`;
    return result;
}

function usd(aNumber) { //格式化数字
    return new Intl.NumberFormat(
        "en-US",
        { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(aNumber/100);
}

function playFor(aPerformance) {
    return plays[aPerformance.playID];
}

function volumeCreditsFor(aPerformance) {
    let volumeCredits = 0;
    volumeCredits += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === playFor(aPerformance).type) volumeCredits += Math.floor(aPerformance.audience / 5);
    return volumeCredits;
}

function amountFor(aPerformance) {
    let result = 0;
    switch (playFor(aPerformance).type) {
        case "tragedy":
            result = 40000;
            if (aPerformance.audience > 30) {
                result += 1000 * (aPerformance.audience - 30);
            }
            break;
        case "comedy":
            result = 30000;
            if (aPerformance.audience > 20) {
                result += 10000 + 500 * (aPerformance.audience - 20);
            }
            result += 300 * aPerformance.audience;
            break;
        default:
            throw new Error(`unknown type: ${playFor(aPerformance).type}`);
    }
    return result;
}

console.log(statement(invoices[0], plays));
// Statement for BigCo
// Hamlet: $650.00 (55 seats)
// As You Like It: $580.00 (35 seats)
// Othello: $500.00 (40 seats)
// Amount owed is $1,730.00
// You earned 47 credits
