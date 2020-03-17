import got from 'got';
import {
  calculateWorkerSecureCost,
  calculateWorkerAmountToPay,
  calculateCompanyAmountToPay,
} from '../utils/policy';

interface WorkerInterface {
  age: number;
  childs: number;
}

interface PolicyPricesInterface {
  amountToPayForHealth: number;
  amountToPayForDental: number;
  totalAmountToPay: number;
}

interface WorkerProcessedInterface {
  age: number;
  childs: number;
  companyCoverage: PolicyPricesInterface;
  workerAmountToPay: PolicyPricesInterface;
  enableForThisPolicy: boolean;
}

interface CompanyPolicyInterface {
  companyPolicyPrice: number;
  hasDentalCare: boolean;
  companyPercentage: number;
  companyWorkers: [WorkerProcessedInterface];
}

const getPolicy = async (): Promise<CompanyPolicyInterface> => {
  const {
    POLICY_API_URL: policyApiUrl = '',
    POLICY_AGE_LIMIT: policyAgeLimit = '',
    POLICY_PRICES__HEALTH__WITHOUT_CHILDREN: healthPriceWithoutChildren = '',
    POLICY_PRICES__HEALTH__ONE_CHILD: healthPriceWithOneChild = '',
    POLICY_PRICES__HEALTH__TWO_OR_MORE_CHILDREN: healthPriceWithTwoOrMoreChildren = '',
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

    let companyPolicyPrice: number = 0;

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

      const companyCoverageHealth = calculateCompanyAmountToPay(
        healthPolicyPrice,
        companyPercentage,
      );
      const companyCoverageDental = calculateCompanyAmountToPay(
        dentalPolicyPrice,
        companyPercentage,
      );

      const workerCoverageHealth = calculateWorkerAmountToPay(healthPolicyPrice, companyPercentage);
      const workerCoverageDental = calculateWorkerAmountToPay(dentalPolicyPrice, companyPercentage);

      companyPolicyPrice += companyCoverageHealth + companyCoverageDental;

      return {
        ...worker,
        companyCoverage: {
          amountToPayForHealth: companyCoverageHealth,
          amountToPayForDental: companyCoverageDental,
          totalAmountToPay: companyCoverageHealth + companyCoverageDental,
        },
        workerAmountToPay: {
          amountToPayForHealth: workerCoverageHealth,
          amountToPayForDental: workerCoverageDental,
          totalAmountToPay: workerCoverageHealth + workerCoverageDental,
        },
        enableForThisPolicy: true,
      };
    });

    return {
      companyPolicyPrice,
      hasDentalCare,
      companyPercentage,
      companyWorkers,
    };
  } catch (error) {
    throw new Error(error);
  }
};

export default getPolicy;
