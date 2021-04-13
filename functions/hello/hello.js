exports.handler = async (event, context) => {
  console.log('serverless context', context);
  console.log('serverless event', event);
  return {
    statusCode: 200,
    body: 'Hello!!',
  };
};
