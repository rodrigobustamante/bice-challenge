import {
  calculateWorkerSecureCost,
  calculateWorkerAmountToPay,
  calculateCompanyAmountToPay,
} from '../../../src/utils/policy';

describe('Test calculateWorkerSecureCost utils function', () => {
  it('Should return 0 when pass a negative children value', () => {
    const workerSecureCost = calculateWorkerSecureCost(-1, {
      priceWithoutChildren: 0,
      priceWithOneChild: 0,
      priceWithTwoOrMoreChildren: 0,
    });

    expect(workerSecureCost).toBe(0);
  });

  it('Should return 10 when pass zero children', () => {
    const workerSecureCost = calculateWorkerSecureCost(0, {
      priceWithoutChildren: 10,
      priceWithOneChild: 0,
      priceWithTwoOrMoreChildren: 0,
    });

    expect(workerSecureCost).toBe(10);
  });

  it('Should return 20 when pass one child', () => {
    const workerSecureCost = calculateWorkerSecureCost(1, {
      priceWithoutChildren: 0,
      priceWithOneChild: 20,
      priceWithTwoOrMoreChildren: 0,
    });

    expect(workerSecureCost).toBe(20);
  });

  it('Should return 25 when pass two children', () => {
    const workerSecureCost = calculateWorkerSecureCost(2, {
      priceWithoutChildren: 0,
      priceWithOneChild: 0,
      priceWithTwoOrMoreChildren: 25,
    });

    expect(workerSecureCost).toBe(25);
  });

  it('Should return 100 when pass 9999 children', () => {
    const workerSecureCost = calculateWorkerSecureCost(9999, {
      priceWithoutChildren: 0,
      priceWithOneChild: 0,
      priceWithTwoOrMoreChildren: 100,
    });

    expect(workerSecureCost).toBe(100);
  });

  it('Should return 0 when pass 0.8 children', () => {
    const workerSecureCost = calculateWorkerSecureCost(0.8, {
      priceWithoutChildren: 0,
      priceWithOneChild: 0,
      priceWithTwoOrMoreChildren: 0,
    });

    expect(workerSecureCost).toBe(0);
  });
});

describe('Test calculateWorkerAmountToPay utils function', () => {
  it('Should return 0 when pass policyCost as 1000 and companyPorcentage copay 100', () => {
    const workerAmountToPay = calculateWorkerAmountToPay(1000, 100);

    expect(workerAmountToPay).toBe(0);
  });

  it('Should return 200 when pass policyCost as 1000 and companyPorcentage copay 80', () => {
    const workerAmountToPay = calculateWorkerAmountToPay(1000, 80);

    expect(workerAmountToPay).toBe(200);
  });

  it('Should return 7.5 when pass policyCost as 25 and companyPorcentage copay 70', () => {
    const workerAmountToPay = calculateWorkerAmountToPay(25, 70);

    expect(workerAmountToPay).toBe(7.5);
  });

  it('Should return 0 when pass policyCost as -5 and companyPorcentage copay 70', () => {
    const workerAmountToPay = calculateWorkerAmountToPay(-5, 70);

    expect(workerAmountToPay).toBe(0);
  });

  it('Should return 0 when pass policyCost as 25 and companyPorcentage copay -50', () => {
    const workerAmountToPay = calculateWorkerAmountToPay(25, -50);

    expect(workerAmountToPay).toBe(0);
  });

  it('Should return 0 when pass policyCost as -25 and companyPorcentage copay -50', () => {
    const workerAmountToPay = calculateWorkerAmountToPay(-25, -50);

    expect(workerAmountToPay).toBe(0);
  });
});

describe('Test calculateCompanyAmountToPay utils function', () => {
  it('Should return 800 when pass companyTotalPolicyCost as 1000 and companyPorcentage copay 80', () => {
    const companyAmountToPay = calculateCompanyAmountToPay(1000, 80);

    expect(companyAmountToPay).toBe(800);
  });

  it('Should return 500 when pass companyTotalPolicyCost as 1000 and companyPorcentage copay 50', () => {
    const companyAmountToPay = calculateCompanyAmountToPay(1000, 50);

    expect(companyAmountToPay).toBe(500);
  });

  it('Should return 10 when pass companyTotalPolicyCost as 1000 and companyPorcentage copay 1', () => {
    const companyAmountToPay = calculateCompanyAmountToPay(1000, 1);

    expect(companyAmountToPay).toBe(10);
  });

  it('Should return 0 when pass companyTotalPolicyCost as -5 and companyPorcentage copay 70', () => {
    const companyAmountToPay = calculateCompanyAmountToPay(-5, 70);

    expect(companyAmountToPay).toBe(0);
  });

  it('Should return 0 when pass companyTotalPolicyCost as 25 and companyPorcentage copay -50', () => {
    const companyAmountToPay = calculateCompanyAmountToPay(25, -50);

    expect(companyAmountToPay).toBe(0);
  });

  it('Should return 0 when pass companyTotalPolicyCost as -25 and companyPorcentage copay -50', () => {
    const companyAmountToPay = calculateCompanyAmountToPay(-25, -50);

    expect(companyAmountToPay).toBe(0);
  });
});
