import got from "got";
import express from "express";

const controller = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const {
      body: { policy }
    } = await got(
      "https://dn8mlk7hdujby.cloudfront.net/interview/insurance/policy",
      { responseType: "json" }
    );

    const {
      POLICY_PRICES__HEALTH__WITHOUT_CHILDS,
      POLICY_PRICES__HEALTH__ONE_CHILDS,
      POLICY_PRICES__HEALTH__TWO_OR_MORE_CHILDS,
      POLICY_PRICES__DENTAL__WITHOUT_CHILDS,
      POLICY_PRICES__DENTAL__ONE_CHILDS,
      POLICY_PRICES__DENTAL__TWO_OR_MORE_CHILDS,
     } = process.env;

    res.status(200).send({
      policy,
      env: {
        health: {
          withoutChilds: Number(POLICY_PRICES__HEALTH__WITHOUT_CHILDS) || 0.279,
          oneChild: Number(POLICY_PRICES__HEALTH__ONE_CHILDS) || 0.4396,
          twoOrMoreChilds: Number(POLICY_PRICES__HEALTH__TWO_OR_MORE_CHILDS) || 0.5599,
        },
        dental: {
          withoutChilds: Number(POLICY_PRICES__DENTAL__WITHOUT_CHILDS) || 0.12,
          oneChild: Number(POLICY_PRICES__DENTAL__ONE_CHILDS) || 0.1950,
          twoOrMoreChilds: Number(POLICY_PRICES__DENTAL__TWO_OR_MORE_CHILDS) || 0.2480,
        }
      }
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      error,
    });
  }
};

export default controller;
