import got from "got";
import express from "express";

const controller = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const {
      body
    } = await got(
      "https://dn8mlk7hdujby.cloudfront.net/interview/insurance/policy",
      { responseType: "json" },
    );

    res.status(200).send({body});
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      error
    });
  }
};

export default controller;
