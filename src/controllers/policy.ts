import got from 'got';
import express from 'express';
import {
  calculateWorkerSecureCost,
  calculateWorkerAmountToPay,
  calculateCompanyAmountToPay,
} from '../utils/policy';

interface WorkerInterface {
  age: number;
  childs: number;
}

const getPolicy = async (
  _req: express.Request,
  res: express.Response,
): Promise<express.Response> => {
  const {
    POLICY_API_URL: policyApiUrl = '',
    POLICY_AGE_LIMIT: policyAgeLimit = '',
    POLICY_PRICES__HEALTH__WITHOUT_CHILDREN: healthPriceWithoutChildren = '',
    POLICY_PRICES__HEALTH__ONE_CHILD: healthPriceWithOneChild = '',
    POLICY_PRICES__HEALTH__TWO_OR_MORE_CHILDEN: healthPriceWithTwoOrMoreChildren = '',
    POLICY_PRICES__DENTAL__WITHOUT_CHILDEN: dentalPriceWithoutChildren = '',
    POLICY_PRICES__DENTAL__ONE_CHILD: dentalPriceWithOneChild = '',
    POLICY_PRICES__DENTAL__TWO_OR_MORE_CHILDREN: dentalPriceWithTwoOrMoreChildren = '',
  } = process.env;

  const healthPriceOptions = {
    priceWithoutChildren: Number(healthPriceWithoutChildren),
    priceWithOneChild: Number(healthPriceWithOneChild),
    priceWithTwoOrMoreChildren: Number(healthPriceWithTwoOrMoreChildren),
  };

  const dentalPriceOptions = {
    priceWithoutChildren: Number(dentalPriceWithoutChildren),
    priceWithOneChild: Number(dentalPriceWithOneChild),
    priceWithTwoOrMoreChildren: Number(dentalPriceWithTwoOrMoreChildren),
  };

  try {
    const {
      body: { policy },
    } = await got(policyApiUrl, {
      responseType: 'json',
    });

    const {
      workers,
      has_dental_care: hasDentalCare,
      company_percentage: companyPercentage,
    } = policy;

    let companyAmountToPayWithoutDiscounts = 0;

    const companyWorkers = workers.map((worker: WorkerInterface) => {
      const { age, childs: children } = worker;

      if (age > Number(policyAgeLimit)) {
        return {
          ...worker,
          healthPolicyPrice: 0,
          dentalPolicyPrice: 0,
          amountToPay: 0,
          enableForThisPolicy: false,
        };
      }

      const healthPolicyPrice = calculateWorkerSecureCost(children, healthPriceOptions);
      const dentalPolicyPrice = hasDentalCare
        ? calculateWorkerSecureCost(children, dentalPriceOptions)
        : 0;

      const totalPolicyPrice = healthPolicyPrice + dentalPolicyPrice;

      companyAmountToPayWithoutDiscounts += totalPolicyPrice;

      return {
        ...worker,
        healthPolicyPrice,
        dentalPolicyPrice,
        amountToPay: calculateWorkerAmountToPay(totalPolicyPrice, companyPercentage),
        enableForThisPolicy: true,
      };
    });

    return res.status(200).send({
      companyPolicyPrice: calculateCompanyAmountToPay(
        companyAmountToPayWithoutDiscounts,
        companyPercentage,
      ),
      hasDentalCare,
      companyPercentage,
      companyWorkers,
    });
  } catch (error) {
    return res.status(500).send({
      message: 'Internal server error',
      error,
    });
  }
};

export default getPolicy;
