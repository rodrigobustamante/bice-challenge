'use strict';
import server from './src/index';

export const handler = async (event: any = {}, context: any): Promise<any> => {
  return await server(event, context);
}