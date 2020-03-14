interface PricesPerChildrenInterface {
  priceWithoutChildren: number;
  priceWithOneChild: number;
  priceWithTwoOrMoreChildren: number;
}

const HUNDRED_PERCENT = 100;

const calculateWorkerSecureCost = (
  children: number,
  pricesPerChildren: PricesPerChildrenInterface,
): number => {
  if (children < 0) return 0;

  const { priceWithoutChildren, priceWithOneChild, priceWithTwoOrMoreChildren } = pricesPerChildren;
  let healthPrice: number;

  switch (children) {
    case 0:
      healthPrice = priceWithoutChildren;
      break;

    case 1:
      healthPrice = priceWithOneChild;
      break;

    default:
      healthPrice = priceWithTwoOrMoreChildren;
      break;
  }

  return healthPrice;
};

const calculateWorkerAmountToPay = (policyCost: number, companyPayPercentage: number): number =>
  ((HUNDRED_PERCENT - companyPayPercentage) * policyCost) / HUNDRED_PERCENT;

const calculateCompanyAmountToPay = (policyCost: number, companyPayPercentage: number): number =>
  (companyPayPercentage * policyCost) / HUNDRED_PERCENT;

export { calculateWorkerSecureCost, calculateWorkerAmountToPay, calculateCompanyAmountToPay };
