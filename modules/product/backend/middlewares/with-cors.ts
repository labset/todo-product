import cors from 'cors';
import { Express } from 'express';

interface WithCors {
    app: Express;
    product: {
        gatewayUrl: string;
        baseUrl: string;
    };
}

const withCors = ({ app, product }: WithCors) => {
    console.info('** configure cors');
    app.options(
        `/gateway/*`,
        cors<cors.CorsRequest>({ origin: [product.baseUrl], credentials: true })
    );
    app.use(
        `/gateway/*`,
        cors<cors.CorsRequest>({ origin: [product.baseUrl], credentials: true })
    );
};

export { withCors };
