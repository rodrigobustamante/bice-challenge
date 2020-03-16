import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import policy from './src/services/policy';

export const handler = async (
  _event: APIGatewayEvent,
  _context: Context,
): Promise<APIGatewayProxyResult> => {
  try {
    const data = await policy();

    return {
      statusCode: 200,
      body: JSON.stringify({
        ...data,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal server error',
      }),
    };
  }
};
