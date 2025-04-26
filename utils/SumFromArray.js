export const SumFromArray= (arr) => {
    let total = 0;
    arr.map(item => {
        total += item.amount;
    });
    return total;
}