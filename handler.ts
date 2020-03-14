import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import server from './src/index';

export const handler = async (
  event: APIGatewayEvent,
  context: Context,
): Promise<APIGatewayProxyResult> => {
  return server(event, context);
};
