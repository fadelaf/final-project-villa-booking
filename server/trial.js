const { villaid, dateStart, dateEnd, days, price } = req.body;

let tax = 0.05;
let discount = 0;

if (days > 2) {
  discount = 0.05;
}

let discountPrice = price * discount;
let total_due = price * (1 + tax) - discountPrice;
