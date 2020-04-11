import Application from 'koa';

const handleError: Application.Middleware = async (ctx, next) => {
    try {
        await next();
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
    }
};

export default handleError;
