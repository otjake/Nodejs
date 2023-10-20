const Paystack = require('paystack');

const paystack = Paystack(process.env.PAYSTACK_SECRET_KEY);

const initialize = async (data) => {
    console.log("body data", data);

    return new Promise(async (resolve, reject) => {
        try {
            const response = await paystack.transaction.initialize({
                email: data.email,
                amount: data.amount,
            });

            const authorizationUrl = response.data.authorization_url;
            resolve(authorizationUrl);
        } catch (error) {
            console.error("Error in Paystack initialization:", error);
            reject(error);
        }
    });
};

module.exports = {
    initialize,
};
